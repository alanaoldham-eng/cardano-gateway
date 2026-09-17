"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { getBadges, getProfile, hasSeenSponsorLesson } from "@/lib/localStorage";
import type { Quest } from "@/lib/types";

type QuestChecklistProps = {
  walletConnected?: boolean;
};

export function QuestChecklist({ walletConnected = false }: QuestChecklistProps) {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const profile = getProfile();
    const badges = getBadges();

    setQuests([
      {
        id: "profile",
        title: "Create Passport profile",
        description: "Save an email-first profile in this browser.",
        complete: Boolean(profile)
      },
      {
        id: "wallet",
        title: "Connect Cardano wallet",
        description: "Use an existing CIP-30 browser wallet.",
        complete: walletConnected
      },
      {
        id: "badge",
        title: "Claim first demo badge",
        description: "Record a local Founders Badge claim.",
        complete: badges.some((badge) => badge.campaignSlug === "founders-badge")
      },
      {
        id: "sponsor",
        title: "Learn what sponsored transactions mean",
        description: "Review the sponsor quote panel. v003 does not submit transactions.",
        complete: hasSeenSponsorLesson()
      }
    ]);
  }, [walletConnected]);

  const completeCount = quests.filter((quest) => quest.complete).length;
  const progress = quests.length ? Math.round((completeCount / quests.length) * 100) : 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Beginner quests</h2>
          <p className="mt-2 text-sm text-slate-600">A guided path from email to first Cardano-native claim.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">{completeCount} / {quests.length}</div>
      </div>
      <div className="mt-5 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-tellus-teal transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-6 grid gap-3">
        {quests.map((quest) => (
          <div key={quest.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
            {quest.complete ? (
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <Circle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
            )}
            <div>
              <p className="font-semibold text-slate-950">{quest.title}</p>
              <p className="mt-1 text-sm text-slate-600">{quest.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/claim/founders-badge" className="mt-6 inline-flex rounded-full bg-tellus-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-tellus-ink">
        Claim Founders Badge
      </Link>
    </section>
  );
}
