"use client";

import { FormEvent, useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { createId, getProfile, saveProfile } from "@/lib/localStorage";
import type { UserProfile } from "@/lib/types";

type EmailOnboardingCardProps = {
  onProfileChange?: (profile: UserProfile) => void;
};

export function EmailOnboardingCard({ onProfileChange }: EmailOnboardingCardProps) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = getProfile();
    if (storedProfile) {
      setProfile(storedProfile);
      setEmail(storedProfile.email);
      setDisplayName(storedProfile.displayName ?? "");
      onProfileChange?.(storedProfile);
    }
  }, [onProfileChange]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    const nextProfile: UserProfile = {
      id: profile?.id ?? createId("user"),
      email: normalizedEmail,
      displayName: displayName.trim() || undefined,
      createdAt: profile?.createdAt ?? new Date().toISOString()
    };

    saveProfile(nextProfile);
    setProfile(nextProfile);
    onProfileChange?.(nextProfile);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tellus-mint text-tellus-teal">
          <Mail aria-hidden="true" className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">Create your Passport profile</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Email is the beginner-friendly entry point. In v003, it creates a local demo profile, not a custodial wallet.
          </p>
        </div>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
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
          Display name optional
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-950 outline-none ring-tellus-aqua/20 transition placeholder:text-slate-400 focus:border-tellus-aqua focus:ring-4"
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Cardano explorer"
          />
        </label>
        <button className="rounded-full bg-tellus-teal px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-tellus-ink" type="submit">
          Save Passport profile
        </button>
      </form>

      {profile ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Profile saved locally for this browser.
        </p>
      ) : null}
    </section>
  );
}
