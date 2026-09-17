import { getCampaignBySlug, mockCampaigns } from "@/lib/mockCampaigns";
import { createId, getCustomCampaigns, saveBadge, saveClaim } from "@/lib/localStorage";
import type { Badge, Campaign, ClaimRecord } from "@/lib/types";

export function getAllCampaigns(): Campaign[] {
  return [...getCustomCampaigns(), ...mockCampaigns];
}

export function findCampaign(slug: string, fallback?: Campaign): Campaign | undefined {
  return fallback ?? getCampaignBySlug(slug) ?? getCustomCampaigns().find((campaign) => campaign.slug === slug);
}

export function createLocalClaim(input: {
  campaign: Campaign;
  email: string;
  walletAddress?: string;
}): { claim: ClaimRecord; badge: Badge } {
  const claimedAt = new Date().toISOString();
  const claim: ClaimRecord = {
    id: createId("claim"),
    campaignSlug: input.campaign.slug,
    campaignTitle: input.campaign.title,
    email: input.email,
    walletAddress: input.walletAddress,
    badgeTitle: input.campaign.badgeTitle,
    claimedAt,
    status: "local-record"
  };

  const badge: Badge = {
    id: createId("badge"),
    title: input.campaign.badgeTitle,
    description: input.campaign.description,
    campaignSlug: input.campaign.slug,
    assetType: input.campaign.assetType,
    network: input.campaign.network,
    claimedAt,
    status: "local-record"
  };

  saveClaim(claim);
  saveBadge(badge);

  return { claim, badge };
}
