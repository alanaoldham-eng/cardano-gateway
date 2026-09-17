"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Gift, ShieldCheck } from "lucide-react";
import { WalletConnectPanel } from "@/components/WalletConnectPanel";
import { StatusPill } from "@/components/StatusPill";
import { createLocalClaim, findCampaign } from "@/lib/claimService";
import { getProfile, saveProfile, createId } from "@/lib/localStorage";
import type { Campaign, ClaimRecord } from "@/lib/types";

type ClaimFlowProps = {
  slug: string;
  campaign?: Campaign;
};

export function ClaimFlow({ slug, campaign: serverCampaign }: ClaimFlowProps) {
  const [campaign, setCampaign] = useState<Campaign | undefined>(serverCampaign);
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [claim, setClaim] = useState<ClaimRecord | null>(null);

  useEffect(() => {
    const profile = getProfile();
    if (profile?.email) setEmail(profile.email);
    setCampaign(findCampaign(slug, serverCampaign));
  }, [serverCampaign, slug]);

  const claimLink = useMemo(() => `/claim/${slug}`, [slug]);

  function handleClaim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!campaign) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    const existingProfile = getProfile();
    if (!existingProfile || existingProfile.email !== normalizedEmail) {
      saveProfile({
        id: existingProfile?.id ?? createId("user"),
        email: normalizedEmail,
        displayName: existingProfile?.displayName,
        createdAt: existingProfile?.createdAt ?? new Date().toISOString()
      });
    }

    const result = createLocalClaim({
      campaign,
      email: normalizedEmail,
      walletAddress: walletAddress.trim() || undefined
    });
    setClaim(result.claim);
  }

  if (!campaign) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft">
        <h1 className="text-2xl font-black text-slate-950">Campaign not found</h1>
        <p className="mt-3 text-slate-600">This v003 demo could not find a static or locally created campaign for this claim link.</p>
        <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-tellus-teal px-5 py-3 text-sm font-bold text-white hover:bg-tellus-ink">
          Create a demo campaign
        </Link>
      </section>
    );
  }

  if (claim) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-white p-8 shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
          <CheckCircle2 aria-hidden="true" className="h-8 w-8" />
        </div>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <StatusPill tone="green">Local claim record</StatusPill>
          <h1 className="mt-4 text-3xl font-black text-slate-950">Demo badge claimed</h1>
          <p className="mt-3 text-slate-600">
            Your claim for {campaign.badgeTitle} was stored in this browser. Production v004 will mint/send a native Cardano asset.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-500">Email</dt>
              <dd className="mt-1 font-bold text-slate-950">{claim.email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Campaign</dt>
              <dd className="mt-1 font-bold text-slate-950">{claim.campaignTitle}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Network</dt>
              <dd className="mt-1 font-bold text-slate-950">{campaign.network}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Asset</dt>
              <dd className="mt-1 font-bold text-slate-950">{campaign.assetType}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/passport" className="rounded-full bg-tellus-teal px-5 py-3 text-center text-sm font-bold text-white hover:bg-tellus-ink">
            View Passport
          </Link>
          <Link href="/dashboard" className="rounded-full border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-800 hover:bg-slate-50">
            Open dashboard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-tellus-mint text-tellus-teal">
            <Gift aria-hidden="true" className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill tone="blue">UX demo</StatusPill>
              <StatusPill tone="amber">Production minting coming in v004</StatusPill>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">{campaign.title}</h1>
            <p className="mt-3 leading-7 text-slate-600">{campaign.description}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm sm:grid-cols-2">
          <div>
            <p className="font-semibold text-slate-500">Network</p>
            <p className="mt-1 font-bold text-slate-950">{campaign.network}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500">Sponsor mode</p>
            <p className="mt-1 font-bold text-slate-950">{campaign.sponsorMode}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500">Asset type</p>
            <p className="mt-1 font-bold text-slate-950">{campaign.assetType}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500">Claim link</p>
            <p className="mt-1 font-mono text-xs font-bold text-slate-950">{claimLink}</p>
          </div>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleClaim}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email address
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-950 outline-none ring-tellus-aqua/20 transition placeholder:text-slate-400 focus:border-tellus-aqua focus:ring-4"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Cardano address optional
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm text-slate-950 outline-none ring-tellus-aqua/20 transition placeholder:font-sans placeholder:text-slate-400 focus:border-tellus-aqua focus:ring-4"
              type="text"
              value={walletAddress}
              onChange={(event) => setWalletAddress(event.target.value)}
              placeholder="addr_test..."
            />
          </label>
          <button type="submit" className="rounded-full bg-tellus-teal px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-tellus-ink">
            Claim Demo Badge
          </button>
        </form>

        <div className="mt-5 flex gap-3 rounded-2xl border border-tellus-aqua/20 bg-tellus-mint p-4 text-sm leading-6 text-tellus-teal">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>v003 records the claim locally. Production v004 will mint/send a native Cardano asset.</p>
        </div>
      </section>

      <div className="space-y-6">
        <WalletConnectPanel />
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">What happens here?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This page demonstrates a claim link that can be shared directly or turned into a QR code later. It does not submit a Cardano transaction yet.
          </p>
        </section>
      </div>
    </div>
  );
}
