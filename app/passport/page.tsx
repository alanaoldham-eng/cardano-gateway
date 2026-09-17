"use client";

import { useState } from "react";
import { EmailOnboardingCard } from "@/components/EmailOnboardingCard";
import { PassportCard } from "@/components/PassportCard";
import { QuestChecklist } from "@/components/QuestChecklist";
import { SponsorGasPanel } from "@/components/SponsorGasPanel";
import { WalletConnectPanel } from "@/components/WalletConnectPanel";
import type { UserProfile } from "@/lib/types";

export default function PassportPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  return (
    <div className="bg-slate-50">
      <section className="bg-tellus-teal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-tellus-mint">Consumer demo</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Cardano Passport</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-tellus-mint">
            A friendly first-use flow where people start with email, connect a wallet when ready, and claim their first local demo badge.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8">
        <div className="space-y-6">
          <EmailOnboardingCard onProfileChange={setProfile} />
          <WalletConnectPanel />
          <SponsorGasPanel />
        </div>
        <div className="space-y-6">
          <PassportCard profile={profile} />
          <QuestChecklist />
        </div>
      </section>
    </div>
  );
}
