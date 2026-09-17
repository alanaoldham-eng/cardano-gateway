import { NextResponse } from "next/server";
import { getCampaignBySlug } from "@/lib/mockCampaigns";

type ClaimRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: ClaimRouteProps) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  return NextResponse.json(campaign);
}
