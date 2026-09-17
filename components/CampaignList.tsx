"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Copy, Download, ExternalLink, QrCode } from "lucide-react";
import { getClaims, getCustomCampaigns } from "@/lib/localStorage";
import { mockCampaigns } from "@/lib/mockCampaigns";
import type { Campaign, ClaimRecord } from "@/lib/types";
import { StatusPill } from "@/components/StatusPill";

type CampaignListProps = {
  refreshToken?: number;
};

function toCsv(claims: ClaimRecord[]): string {
  const header = ["id", "campaignSlug", "campaignTitle", "email", "walletAddress", "badgeTitle", "claimedAt", "status"];
  const rows = claims.map((claim) => [
    claim.id,
    claim.campaignSlug,
    claim.campaignTitle,
    claim.email,
    claim.walletAddress ?? "",
    claim.badgeTitle,
    claim.claimedAt,
    claim.status
  ]);

  return [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}

export function CampaignList({ refreshToken = 0 }: CampaignListProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    setCampaigns([...getCustomCampaigns(), ...mockCampaigns]);
    setClaims(getClaims());
  }, [refreshToken]);

  const origin = typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const summary = useMemo(() => {
    const completed = claims.length;
    const active = campaigns.length;
    return { completed, active };
  }, [campaigns.length, claims.length]);

  async function copyLink(campaign: Campaign) {
    const link = `${origin}/claim/${campaign.slug}`;
    await navigator.clipboard.writeText(link);
    setCopiedSlug(campaign.slug);
    window.setTimeout(() => setCopiedSlug(null), 1800);
  }

  function exportClaims() {
    const csv = toCsv(claims);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `tellus-gateway-claims-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Campaigns</h2>
          <p className="mt-2 text-sm text-slate-600">{summary.active} active campaigns with {summary.completed} completed local claims.</p>
        </div>
        <button
          type="button"
          onClick={exportClaims}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {campaigns.map((campaign) => {
          const claimCount = claims.filter((claim) => claim.campaignSlug === campaign.slug).length;
          const link = `${origin}/claim/${campaign.slug}`;

          return (
            <article key={campaign.id} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-950">{campaign.title}</h3>
                    <StatusPill tone={campaign.sponsorFees ? "blue" : "slate"}>{campaign.sponsorMode}</StatusPill>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{campaign.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1">{campaign.assetType}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">{campaign.network}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">{claimCount} claims</span>
                  </div>
                  <p className="mt-4 break-all rounded-2xl bg-slate-50 px-4 py-3 font-mono text-xs text-slate-700">{link}</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                  <Link
                    href={`/claim/${campaign.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-tellus-teal px-4 py-2 text-sm font-bold text-white hover:bg-tellus-ink"
                  >
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    Open
                  </Link>
                  <button
                    type="button"
                    onClick={() => void copyLink(campaign)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
                  >
                    <Copy aria-hidden="true" className="h-4 w-4" />
                    {copiedSlug === campaign.slug ? "Copied" : "Copy claim link"}
                  </button>
                  <div className="inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-bold text-slate-500">
                    <QrCode aria-hidden="true" className="h-4 w-4" />
                    QR code coming in v004
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
