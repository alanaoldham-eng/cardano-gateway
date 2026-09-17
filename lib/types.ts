export type UserProfile = {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  campaignSlug: string;
  assetType: string;
  network: string;
  claimedAt: string;
  status: "local-record" | "minting-coming-soon";
};

export type Campaign = {
  id: string;
  slug: string;
  title: string;
  badgeTitle: string;
  description: string;
  network: string;
  sponsorMode: string;
  assetType: string;
  sponsorFees: boolean;
  createdAt: string;
};

export type ClaimRecord = {
  id: string;
  campaignSlug: string;
  campaignTitle: string;
  email: string;
  walletAddress?: string;
  badgeTitle: string;
  claimedAt: string;
  status: "local-record";
};

export type SponsorQuote = {
  sponsored: boolean;
  estimatedFeeAda: string;
  minUtxoAda: string;
  mode: "mock" | "preprod" | "production";
  note: string;
};

export type WalletConnectionState = {
  connected: boolean;
  walletName?: string;
  address?: string;
  rewardAddress?: string;
  network?: string;
  error?: string;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
};
