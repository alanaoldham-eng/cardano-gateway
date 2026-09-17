import type { Campaign } from "@/lib/types";

export const mockCampaigns: Campaign[] = [
  {
    id: "campaign-founders-badge",
    slug: "founders-badge",
    title: "Tellus Gateway Founders Badge",
    badgeTitle: "Founders Badge",
    description: "A v003 demo badge for early testers of the Tellus Gateway onboarding flow.",
    network: "Cardano Preprod Demo",
    sponsorMode: "Platform sponsored UX demo",
    assetType: "Native Cardano Badge Concept",
    sponsorFees: true,
    createdAt: "2026-05-15T00:00:00.000Z"
  },
  {
    id: "campaign-builders-pass",
    slug: "builders-pass",
    title: "Tellus Builder Preview Pass",
    badgeTitle: "Builder Preview Pass",
    description: "A local-only pass showing how dApps could invite early community members from email to ownership on Cardano.",
    network: "Cardano Preprod Demo",
    sponsorMode: "Project sponsored UX demo",
    assetType: "Native Cardano Pass Concept",
    sponsorFees: true,
    createdAt: "2026-05-15T00:00:00.000Z"
  }
];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return mockCampaigns.find((campaign) => campaign.slug === slug);
}
