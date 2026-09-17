import Link from "next/link";
import { BadgeCheck, Code2, Fuel, Link2, Mail, WalletCards } from "lucide-react";
import { ArchitectureCard } from "@/components/ArchitectureCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Hero } from "@/components/Hero";
import { StatusPill } from "@/components/StatusPill";
import { TellusLogo } from "@/components/TellusLogo";

const features = [
  {
    icon: Mail,
    title: "Email onboarding",
    description: "Create a beginner-friendly profile before the user understands wallets, keys, UTXOs, or addresses.",
    label: "Works now"
  },
  {
    icon: WalletCards,
    title: "CIP-30 wallet connect",
    description: "Connect existing Cardano browser wallets through Mesh SDK and show wallet state safely on the client.",
    label: "Works now"
  },
  {
    icon: Fuel,
    title: "Sponsored transaction UX",
    description: "Preview gas station quotes and sponsor-mode messaging without pretending v003 submits funded transactions.",
    label: "Mocked"
  },
  {
    icon: BadgeCheck,
    title: "Native Cardano assets",
    description: "Demonstrate badges, passes, and rewards as Cardano-native concepts, with minting reserved for v004.",
    label: "Concept"
  },
  {
    icon: Link2,
    title: "Claim links and QR drops",
    description: "Share campaign links today and leave clean room for QR generation and abuse controls in the next version.",
    label: "Link ready"
  },
  {
    icon: Code2,
    title: "Developer APIs coming soon",
    description: "Expose AuthKit, WalletKit, ClaimKit, AssetKit, and GasStation as future service interfaces.",
    label: "Roadmap"
  }
];

const architectureSteps = [
  {
    title: "User signs in with email",
    description: "Email creates a demo profile. It is not a wallet identity or proof of custody."
  },
  {
    title: "User connects or later creates Cardano wallet",
    description: "v003 supports external CIP-30 wallets. Embedded passkey wallets remain a research track."
  },
  {
    title: "Project sponsors claim",
    description: "v003 displays sponsor quote scaffolding. Real sponsor wallets need controls, limits, and transaction simulation."
  },
  {
    title: "User receives badge/pass",
    description: "v003 stores a local record. The next production track can mint/send native Cardano assets on preprod."
  },
  {
    title: "Developer uses SDK/API",
    description: "The dashboard and docs shape the future API without over-promising production rails."
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <StatusPill tone="aqua">Platform layer plus proof app</StatusPill>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-tellus-charcoal sm:text-4xl">Tellus Gateway, two faces</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Tellus Gateway is the branded developer layer for Cardano dApps. Cardano Passport is the consumer demo that proves a gentle path from email to wallet connection to first claim.
            </p>
          </div>
          <div className="rounded-[2rem] border border-tellus-teal/12 bg-white p-6 shadow-soft">
            <TellusLogo />
            <div className="mt-6 tellus-gold-line" />
            <p className="mt-6 text-2xl font-black leading-tight text-tellus-teal">From email to ownership on Cardano.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Simple, trusted, regenerative, and frictionless onboarding for people who want the usefulness before the vocabulary lesson.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="bg-tellus-teal py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <StatusPill className="border-white/20 bg-white/10 text-white">Architecture map</StatusPill>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">The gateway path, not a custody black box</h2>
            <p className="mt-4 text-lg leading-8 text-tellus-mint">
              Each capability is separated so v003 can be useful without sneaking unreviewed wallets, hidden keys, or pretend gasless transactions into the product.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {architectureSteps.map((step, index) => (
              <ArchitectureCard key={step.title} step={`${index + 1}`} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="tellus-card rounded-[2rem] p-8">
            <StatusPill tone="gold">v003 scope</StatusPill>
            <h2 className="mt-4 text-3xl font-black text-tellus-charcoal">What works now</h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
              <li>Email profile onboarding stored in localStorage for demo use.</li>
              <li>CIP-30 browser wallet connection using Mesh SDK client-side only.</li>
              <li>Claim pages, campaign links, local claim records, and CSV export.</li>
              <li>Mock sponsor quote endpoint and clear sponsor messaging.</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-tellus-gold/40 bg-tellus-gold/12 p-8">
            <StatusPill tone="slate">Honest boundaries</StatusPill>
            <h2 className="mt-4 text-3xl font-black text-tellus-charcoal">What is deliberately scaffolded</h2>
            <ul className="mt-6 grid gap-4 text-sm leading-6 text-slate-700 md:grid-cols-2">
              <li>No private keys are generated, stored, or recovered by this prototype.</li>
              <li>No production embedded wallet or passkey custody is implemented.</li>
              <li>No real ADA sponsor wallet, UTXO management, or transaction submission exists yet.</li>
              <li>No native asset minting or smart contracts are deployed in v003.</li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/docs" className="rounded-full bg-tellus-teal px-5 py-3 text-center text-sm font-black text-white hover:bg-tellus-ink">
                Read the docs
              </Link>
              <Link href="/claim/founders-badge" className="rounded-full border border-tellus-teal/25 bg-white px-5 py-3 text-center text-sm font-black text-tellus-charcoal hover:bg-tellus-neutral">
                Open founders claim
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
