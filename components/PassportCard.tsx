"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, UserRound } from "lucide-react";
import { getBadges, getProfile } from "@/lib/localStorage";
import type { Badge, UserProfile } from "@/lib/types";
import { StatusPill } from "@/components/StatusPill";

type PassportCardProps = {
  profile?: UserProfile | null;
};

export function PassportCard({ profile: profileProp }: PassportCardProps) {
  const [profile, setProfile] = useState<UserProfile | null>(profileProp ?? null);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    setProfile(profileProp ?? getProfile());
    setBadges(getBadges());
  }, [profileProp]);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="bg-gradient-to-br from-tellus-teal via-navy-800 to-tellus-aqua p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-tellus-mint">Cardano Passport</p>
            <h2 className="mt-3 text-2xl font-black">{profile?.displayName || "Demo profile"}</h2>
            <p className="mt-1 text-sm text-tellus-mint">{profile?.email || "Create a profile to begin"}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <UserRound aria-hidden="true" className="h-7 w-7" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <StatusPill className="border-white/20 bg-white/10 text-white">UX demo</StatusPill>
          <StatusPill className="border-white/20 bg-white/10 text-white">No private keys stored</StatusPill>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-950">Collected badges</h3>
            <p className="mt-1 text-sm text-slate-600">Local records that preview native Cardano assets.</p>
          </div>
          <div className="rounded-2xl bg-tellus-mint px-4 py-2 text-sm font-bold text-tellus-teal">{badges.length}</div>
        </div>
        <div className="mt-5 grid gap-3">
          {badges.length > 0 ? (
            badges.map((badge) => (
              <div key={badge.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-tellus-teal" />
                <div>
                  <p className="font-semibold text-slate-950">{badge.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{badge.description}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">Local claim record. Production minting coming in v004.</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm leading-6 text-slate-600">
              Claim the Founders Badge to see your first demo badge here.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
