import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, SmilePlus, Sparkles } from "lucide-react";
import { StatusPill } from "@/components/StatusPill";
import { TellusLogo } from "@/components/TellusLogo";

const pillars = [
  { label: "Simple", icon: SmilePlus },
  { label: "Trusted", icon: ShieldCheck },
  { label: "Regenerative", icon: Leaf },
  { label: "Frictionless", icon: Sparkles }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-tellus-hero">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:54px_54px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <StatusPill tone="gold" className="border-white/20 bg-white/10 text-white">
            Tellus Gateway v003
          </StatusPill>
          <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
            Email-first onboarding for Cardano dApps
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-tellus-mint">
            From email to ownership on Cardano. Let crypto-newbie users claim assets, join communities, and use Cardano apps without touching seed phrases on day one.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/passport"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-tellus-gold px-6 py-3 text-sm font-black text-tellus-charcoal shadow-gold transition hover:bg-[#f7d879]"
            >
              Try Cardano Passport
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Open Project Dashboard
            </Link>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-4">
            {pillars.map(({ label, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-3 text-center text-sm font-bold text-white backdrop-blur">
                <Icon aria-hidden="true" className="mx-auto mb-2 h-5 w-5 text-tellus-mint" />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-8 flex max-w-xl items-start gap-3 rounded-3xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-tellus-mint backdrop-blur">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-tellus-gold" />
            <p>
              v003 connects existing Cardano browser wallets through CIP-30. Embedded email/passkey wallets and sponsored transaction execution are planned service layers, not hidden custody.
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/20 bg-white/95 p-5 shadow-glow">
          <div className="rounded-[1.5rem] bg-tellus-teal p-5 text-white">
            <div className="mb-6 flex items-center justify-between gap-5">
              <TellusLogo compact dark />
              <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-bold text-tellus-mint ring-1 ring-white/15">UX demo</span>
            </div>
            <div className="rounded-3xl bg-white p-5 text-tellus-charcoal">
              <p className="text-sm font-bold text-tellus-teal">Cardano Passport preview</p>
              <p className="mt-2 text-2xl font-black">new.user@example.com</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-tellus-mint p-4">
                  <p className="text-xs font-black text-tellus-teal">Wallet</p>
                  <p className="mt-2 text-sm text-tellus-charcoal">Connect existing CIP-30 wallet</p>
                </div>
                <div className="rounded-2xl bg-tellus-gold/20 p-4">
                  <p className="text-xs font-black text-tellus-charcoal">Claim</p>
                  <p className="mt-2 text-sm text-tellus-charcoal">Founders Badge recorded locally</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-tellus-teal/15 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">Onboarding progress</span>
                  <span className="font-black text-tellus-teal">3 / 4</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-tellus-neutral">
                  <div className="h-2 w-3/4 rounded-full bg-tellus-aqua" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-16 bg-tellus-gold" />
                <Leaf aria-hidden="true" className="h-5 w-5 text-tellus-aqua" />
                <span className="h-px w-16 bg-tellus-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
