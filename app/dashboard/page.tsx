"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, BadgeDollarSign, Database, WalletCards } from "lucide-react";
import { CampaignForm } from "@/components/CampaignForm";
import { CampaignList } from "@/components/CampaignList";
import { FeatureCard } from "@/components/FeatureCard";
import { getClaims, getCustomCampaigns } from "@/lib/localStorage";
import { mockCampaigns } from "@/lib/mockCampaigns";

export default function DashboardPage() {
  const [refreshToken, setRefreshToken] = useState(0);
  const [claimCount, setClaimCount] = useState(0);
  const [customCampaignCount, setCustomCampaignCount] = useState(0);

  useEffect(() => {
    setClaimCount(getClaims().length);
    setCustomCampaignCount(getCustomCampaigns().length);
  }, [refreshToken]);

  const cards = useMemo(
    () => [
      {
        icon: Database,
        title: "Claims created",
        description: `${mockCampaigns.length + customCampaignCount} demo claim campaigns are available in this browser.`,
        label: "Local"
      },
      {
        icon: Activity,
        title: "Claims completed",
        description: `${claimCount} local claim records have been captured for CSV export.`,
        label: "Local"
      },
      {
        icon: BadgeDollarSign,
        title: "Sponsor tank status",
        description: "Mock sponsor tank is healthy. No ADA is held or spent by this v003 prototype.",
        label: "Mock"
      },
      {
        icon: WalletCards,
        title: "Active campaigns",
        description: "Campaign links can be opened, copied, and used as QR destinations in v004.",
        label: "Demo"
      }
    ],
    [claimCount, customCampaignCount]
  );

  return (
    <div className="bg-slate-50">
      <section className="bg-tellus-teal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-tellus-mint">Project dashboard</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Campaign command center</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-tellus-mint">
            Create claim campaigns, preview sponsor-mode language, share links, and export local claims without a database.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.2fr]">
          <CampaignForm onCampaignCreated={() => setRefreshToken((value) => value + 1)} />
          <CampaignList refreshToken={refreshToken} />
        </div>
      </section>
    </div>
  );
}
