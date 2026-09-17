"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Wallet } from "lucide-react";
import { BrowserWallet } from "@meshsdk/wallet";
import { hasBrowserCardanoWallet, shortenAddress } from "@/lib/cardano";
import type { WalletConnectionState } from "@/lib/types";

type AvailableWallet = {
  name: string;
  icon?: string;
  version?: string;
};

export function WalletConnectPanel() {
  const [availableWallets, setAvailableWallets] = useState<AvailableWallet[]>([]);
  const [hasWallet, setHasWallet] = useState(true);
  const [connectingWalletName, setConnectingWalletName] = useState<string | null>(null);
  const [state, setState] = useState<WalletConnectionState>({ connected: false });

  useEffect(() => {
    let active = true;

    async function loadWallets() {
      const browserWalletDetected = hasBrowserCardanoWallet();
      setHasWallet(browserWalletDetected);

      if (!browserWalletDetected) {
        setAvailableWallets([]);
        return;
      }

      try {
        const wallets = await BrowserWallet.getAvailableWallets();
        if (!active) return;
        setAvailableWallets(wallets.map((wallet) => ({ name: wallet.name, icon: wallet.icon, version: wallet.version })));
      } catch (error) {
        if (!active) return;
        setState({
          connected: false,
          error: error instanceof Error ? error.message : "Could not load Cardano wallets."
        });
      }
    }

    void loadWallets();

    return () => {
      active = false;
    };
  }, []);

  async function connect(walletName: string) {
    setConnectingWalletName(walletName);
    setState({ connected: false });

    try {
      const wallet = await BrowserWallet.enable(walletName);
      const [address, rewardAddresses, networkId] = await Promise.all([
        wallet.getChangeAddress(),
        wallet.getRewardAddresses(),
        wallet.getNetworkId()
      ]);

      setState({
        connected: true,
        walletName,
        address,
        rewardAddress: rewardAddresses[0],
        network: networkId === 1 ? "mainnet" : "testnet/preprod"
      });
    } catch (error) {
      setState({
        connected: false,
        walletName,
        error: error instanceof Error ? error.message : "Wallet connection was cancelled or failed."
      });
    } finally {
      setConnectingWalletName(null);
    }
  }

  const displayAddress = useMemo(() => shortenAddress(state.rewardAddress ?? state.address, 12), [state.address, state.rewardAddress]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tellus-mint text-tellus-teal">
          <Wallet aria-hidden="true" className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">Connect a Cardano wallet</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            For v003, Cardano Passport supports existing Cardano browser wallets through CIP-30. Embedded email/passkey wallets are planned for v004.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {availableWallets.length > 0 ? (
          availableWallets.map((wallet) => (
            <button
              key={wallet.name}
              type="button"
              onClick={() => void connect(wallet.name)}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-tellus-aqua hover:bg-tellus-mint"
            >
              <span className="flex items-center gap-3">
                {wallet.icon ? <img src={wallet.icon} alt="" className="h-7 w-7 rounded-full" /> : <span className="h-7 w-7 rounded-full bg-tellus-mint" />}
                <span>
                  <span className="block text-sm font-bold capitalize text-slate-950">{wallet.name}</span>
                  {wallet.version ? <span className="block text-xs text-slate-500">Version {wallet.version}</span> : null}
                </span>
              </span>
              {connectingWalletName === wallet.name ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin text-tellus-teal" /> : null}
            </button>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {hasWallet ? "Looking for installed CIP-30 wallets..." : "No installed Cardano browser wallet was detected."}
          </div>
        )}
      </div>

      {!hasWallet ? (
        <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>No Cardano browser wallet was detected. Install a CIP-30 wallet such as Lace, Eternl, Yoroi, Nami, Typhon, or Flint, then refresh this page.</p>
        </div>
      ) : null}

      {state.connected ? (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
            Wallet connected
          </div>
          <dl className="mt-3 grid gap-2 text-sm">
            {state.walletName ? (
              <div className="flex justify-between gap-4">
                <dt className="text-emerald-700">Wallet</dt>
                <dd className="font-medium capitalize">{state.walletName}</dd>
              </div>
            ) : null}
            {displayAddress ? (
              <div className="flex justify-between gap-4">
                <dt className="text-emerald-700">Address</dt>
                <dd className="font-mono text-xs font-medium">{displayAddress}</dd>
              </div>
            ) : null}
            {state.network ? (
              <div className="flex justify-between gap-4">
                <dt className="text-emerald-700">Network</dt>
                <dd className="font-medium">{state.network}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      ) : null}

      {state.error ? <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">{state.error}</p> : null}
    </div>
  );
}
