/**
 * Tellus Gateway - GasStation Indexer Pipeline
 * * This service handles live connections to Cardano indexers (Blockfrost & Maestro).
 * It provides UTXO querying for the sponsor wallet and handles robust transaction
 * submission with exponential backoff for production reliability.
 */

export type CardanoNetwork = 'mainnet' | 'preprod' | 'preview';

export interface UTXO {
    txHash: string;
    index: number;
    lovelace: bigint;
    // We can expand this to include custom assets if the GasStation needs to sponsor Native Tokens
}

export interface IIndexerProvider {
    getUTXOs(address: string): Promise<UTXO[]>;
    submitTransaction(cborHex: string): Promise<string>;
}

/**
 * Utility: Exponential Backoff Retry
 * Essential for production DevOps to handle indexer rate limits and temporary network drops.
 */
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
    let delay = 1000;
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.status === 429 || response.status >= 500) {
                throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
            }
            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            console.warn(`[Indexer Pipeline] Request failed, retrying in ${delay}ms...`, url);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error("Unreachable");
}

/**
 * Blockfrost Implementation
 */
export class BlockfrostProvider implements IIndexerProvider {
    private baseUrl: string;

    constructor(private projectId: string, network: CardanoNetwork = 'preprod') {
        this.baseUrl = `https://cardano-${network}.blockfrost.io/api/v0`;
    }

    async getUTXOs(address: string): Promise<UTXO[]> {
        const url = `${this.baseUrl}/addresses/${address}/utxos`;
        const res = await fetchWithRetry(url, {
            headers: { 'project_id': this.projectId, 'Accept': 'application/json' }
        });

        if (!res.ok) throw new Error(`Blockfrost UTXO fetch failed: ${await res.text()}`);
        
        const data = await res.json();
        return data.map((utxo: any) => {
            const lovelaceAsset = utxo.amount.find((a: any) => a.unit === 'lovelace');
            return {
                txHash: utxo.tx_hash,
                index: utxo.output_index,
                lovelace: lovelaceAsset ? BigInt(lovelaceAsset.quantity) : 0n
            };
        });
    }

    async submitTransaction(cborHex: string): Promise<string> {
        const url = `${this.baseUrl}/tx/submit`;
        const txBuffer = Buffer.from(cborHex, 'hex');

        const res = await fetchWithRetry(url, {
            method: 'POST',
            headers: { 
                'project_id': this.projectId,
                'Content-Type': 'application/cbor'
            },
            body: txBuffer
        });

        if (!res.ok) throw new Error(`Blockfrost Tx Submit failed: ${await res.text()}`);
        return await res.json(); // Returns the transaction hash
    }
}

/**
 * Maestro Implementation
 */
export class MaestroProvider implements IIndexerProvider {
    private baseUrl: string;

    constructor(private apiKey: string, network: CardanoNetwork = 'preprod') {
        this.baseUrl = `https://${network}.gomaestro-api.org/v1`;
    }

    async getUTXOs(address: string): Promise<UTXO[]> {
        const url = `${this.baseUrl}/addresses/${address}/utxos`;
        const res = await fetchWithRetry(url, {
            headers: { 'api-key': this.apiKey, 'Accept': 'application/json' }
        });

        if (!res.ok) throw new Error(`Maestro UTXO fetch failed: ${await res.text()}`);
        
        const data = await res.json();
        // Maestro pagination wrapper check
        const utxoList = data.data || data; 
        
        return utxoList.map((utxo: any) => {
            const lovelaceAsset = utxo.assets.find((a: any) => a.unit === 'lovelace');
            return {
                txHash: utxo.tx_hash,
                index: utxo.index,
                lovelace: lovelaceAsset ? BigInt(lovelaceAsset.amount) : 0n
            };
        });
    }

    async submitTransaction(cborHex: string): Promise<string> {
        // Maestro supports turbo transaction submission
        const url = `${this.baseUrl}/txmanager`;
        const txBuffer = Buffer.from(cborHex, 'hex');

        const res = await fetchWithRetry(url, {
            method: 'POST',
            headers: { 
                'api-key': this.apiKey,
                'Content-Type': 'application/cbor'
            },
            body: txBuffer
        });

        if (!res.ok) throw new Error(`Maestro Tx Submit failed: ${await res.text()}`);
        return await res.text(); // Returns the transaction hash
    }
}

/**
 * Gas Station Relayer Service
 * Wraps the chosen indexer provider to expose domain-specific methods for the Tellus Gateway.
 */
export class GasStationRelayer {
    constructor(private provider: IIndexerProvider, private sponsorAddress: string) {}

    /**
     * Verifies the sponsor wallet has enough lovelace to cover the required fee structure.
     * @param requiredLovelace Minimum threshold needed to safely sponsor the transaction.
     */
    async validateSponsorCapacity(requiredLovelace: bigint): Promise<boolean> {
        try {
            const utxos = await this.provider.getUTXOs(this.sponsorAddress);
            const totalBalance = utxos.reduce((acc, utxo) => acc + utxo.lovelace, 0n);
            
            console.log(`[GasStation] Sponsor Balance: ${totalBalance.toString()} lovelace`);
            return totalBalance >= requiredLovelace;
        } catch (error) {
            console.error(`[GasStation] Failed to query sponsor capacity:`, error);
            throw new Error('Sponsor relayer temporarily unavailable');
        }
    }

    /**
     * Submits the fully assembled and signed CBOR transaction to the live network.
     * @param signedTxCbor The hex-encoded CBOR string of the signed transaction.
     */
    async executeRelay(signedTxCbor: string): Promise<string> {
        try {
            console.log(`[GasStation] Submitting sponsored transaction to network...`);
            const txHash = await this.provider.submitTransaction(signedTxCbor);
            console.log(`[GasStation] Transaction successful. Hash: ${txHash}`);
            return txHash;
        } catch (error) {
            console.error(`[GasStation] Transaction submission failed:`, error);
            throw error;
        }
    }
}

// ============================================================================
// Factory Instantiation Example (For your API routes / Dependency Injection)
// ============================================================================
export function createGasStationRelayer(): GasStationRelayer {
    const network = (process.env.CARDANO_NETWORK as CardanoNetwork) || 'preprod';
    const sponsorAddress = process.env.SPONSOR_WALLET_ADDRESS!;
    
    let provider: IIndexerProvider;

    // Prefer Maestro for high-throughput enterprise routing, fallback to Blockfrost
    if (process.env.MAESTRO_API_KEY) {
        provider = new MaestroProvider(process.env.MAESTRO_API_KEY, network);
    } else if (process.env.BLOCKFROST_API_KEY) {
        provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY, network);
    } else {
        throw new Error("No Indexer API keys found in environment.");
    }

    return new GasStationRelayer(provider, sponsorAddress);
}