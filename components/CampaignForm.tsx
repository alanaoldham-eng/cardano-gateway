"use client";

import { FormEvent, useState } from "react";
import { PlusCircle } from "lucide-react";
import { createId, saveCustomCampaign } from "@/lib/localStorage";
import type { Campaign } from "@/lib/types";

type CampaignFormProps = {
  onCampaignCreated?: (campaign: Campaign) => void;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function CampaignForm({ onCampaignCreated }: CampaignFormProps) {
  const [campaignName, setCampaignName] = useState("");
  const [slug, setSlug] = useState("");
  const [badgeTitle, setBadgeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sponsorFees, setSponsorFees] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleNameChange(value: string) {
    setCampaignName(value);
    if (!slug) setSlug(slugify(value));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanSlug = slugify(slug || campaignName);
    if (!campaignName.trim() || !cleanSlug || !badgeTitle.trim()) return;

    const campaign: Campaign = {
      id: createId("campaign"),
      slug: cleanSlug,
      title: campaignName.trim(),
      badgeTitle: badgeTitle.trim(),
      description: description.trim() || "A locally created v003 demo campaign.",
      network: "Cardano Preprod Demo",
      sponsorMode: sponsorFees ? "Project sponsored UX demo" : "User pays fee UX demo",
      assetType: "Native Cardano Badge Concept",
      sponsorFees,
      createdAt: new Date().toISOString()
    };

    saveCustomCampaign(campaign);
    onCampaignCreated?.(campaign);
    setCampaignName("");
    setSlug("");
    setBadgeTitle("");
    setDescription("");
    setSponsorFees(true);
    setSaved(true);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tellus-mint text-tellus-teal">
          <PlusCircle aria-hidden="true" className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">Create demo campaign</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Create a local claim campaign and share the generated claim link.</p>
        </div>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Campaign name
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-950 outline-none ring-tellus-aqua/20 transition focus:border-tellus-aqua focus:ring-4"
            value={campaignName}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Spring builder drop"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Slug
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm text-slate-950 outline-none ring-tellus-aqua/20 transition focus:border-tellus-aqua focus:ring-4"
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            placeholder="spring-builder-drop"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Badge title
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-950 outline-none ring-tellus-aqua/20 transition focus:border-tellus-aqua focus:ring-4"
            value={badgeTitle}
            onChange={(event) => setBadgeTitle(event.target.value)}
            placeholder="Builder Badge"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Description
          <textarea
            className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 text-slate-950 outline-none ring-tellus-aqua/20 transition focus:border-tellus-aqua focus:ring-4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A demo badge for early Cardano testers."
          />
        </label>
        <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
          Sponsor fees toggle
          <input
            type="checkbox"
            checked={sponsorFees}
            onChange={(event) => setSponsorFees(event.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-tellus-teal focus:ring-tellus-aqua"
          />
        </label>
        <button type="submit" className="rounded-full bg-tellus-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-tellus-ink">
          Save campaign
        </button>
      </form>

      {saved ? <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Campaign saved locally.</p> : null}
    </section>
  );
}
