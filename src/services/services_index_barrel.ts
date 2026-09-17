/**
 * Tellus Gateway - Services Barrel Export
 * * Centralized entry point for exporting backend infrastructure utilities.
 * Keeps API routes clean by allowing unified imports from '@/services'.
 */

export {
    BlockfrostProvider,
    MaestroProvider,
    GasStationRelayer,
    createGasStationRelayer
} from './indexer-pipeline';

// Export type definitions for downstream usage in API controllers
export type {
    CardanoNetwork,
    UTXO,
    IIndexerProvider
} from './indexer-pipeline';
```

---

### 2. Next Steps to Call This Service

Now that your barrel file is created, you don't need to specify `./indexer-pipeline` anymore. Your configuration (`tsconfig.json`) supports path aliasing (`@/*`).

You can easily instantiate and utilize the pipeline in your API routes (e.g., `src/pages/api/sponsor.ts` or `src/app/api/sponsor/route.ts`) like this:

```typescript
// Clean import using your new barrel file and path alias
import { createGasStationRelayer } from '@/services';

export async function POST(req: Request) {
    try {
        const { signedTxCbor } = await req.json();
        
        // 1. Instantiates the live Blockfrost/Maestro wire automatically from your .env variables
        const relayer = createGasStationRelayer();
        
        // 2. Broadcast directly to the Cardano Preprod or Mainnet clusters
        const txHash = await relayer.executeRelay(signedTxCbor);
        
        return Response.json({ success: true, txHash });
    } catch (error: any) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}