import type { WalletConnectionState } from "@/lib/types";

export const DEFAULT_NETWORK = process.env.NEXT_PUBLIC_CARDANO_NETWORK || "preprod-demo";

export function hasBrowserCardanoWallet(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean((window as Window & { cardano?: unknown }).cardano);
}

export function shortenAddress(address?: string, chars = 10): string {
  if (!address) return "";
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function emptyWalletState(): WalletConnectionState {
  return {
    connected: false,
    network: DEFAULT_NETWORK
  };
}
