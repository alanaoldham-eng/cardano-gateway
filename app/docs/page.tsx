import { StatusPill } from "@/components/StatusPill";

const kits = [
  {
    name: "AuthKit",
    description: "Email-first user profile orchestration. v003 stores profiles locally; v004 should add project auth, database records, and anti-abuse controls."
  },
  {
    name: "WalletKit",
    description: "CIP-30 wallet connection today, embedded passkey wallet research tomorrow. Wallet custody is not implemented in v003."
  },
  {
    name: "ClaimKit",
    description: "Claim campaign links, local claim records, and dashboard management. Backend-backed claims and QR codes are v004."
  },
  {
    name: "AssetKit",
    description: "Native Cardano badge/pass/reward model. v003 records concepts locally; v004 can mint on preprod."
  },
  {
    name: "GasStation",
    description: "Sponsor quote and fee UX scaffolding. Real sponsor wallets need UTXO management, rate limits, transaction simulation, and security review."
  }
];

const futureSdk = `const user = await tellusGateway.users.getOrCreate({
  email: "new.user@example.com",
  projectId: "proj_123"
});

const campaign = await tellusGateway.claims.create({
  slug: "founders-badge",
  title: "Founders Badge",
  assetType: "cardano-native-badge",
  sponsorFees: true
});

const tx = await tellusGateway.gas.submitSponsoredTransaction({
  campaignId: campaign.id,
  walletAddress: user.walletAddress,
  policy: "claim-once-per-user"
});`;

export default function DocsPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-tellus-teal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-tellus-mint">Developer docs</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Tellus Gateway architecture</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-tellus-mint">
            A clean service map for onboarding users into Cardano apps without pretending v003 has production custody or gasless rails.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft lg:sticky lg:top-28 lg:self-start">
            <StatusPill tone="blue">v003 docs</StatusPill>
            <h2 className="mt-4 text-2xl font-black text-slate-950">What is Tellus Gateway?</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Tellus Gateway is a proposed developer/platform layer for Cardano dApps. Cardano Passport is the consumer-facing demo app that proves the first-use flow.
            </p>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              v003 is a prototype. It does not hold private keys, submit transactions, mint native assets, or sponsor real ADA fees.
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">v003 architecture</h2>
              <p className="mt-4 leading-7 text-slate-600">
                The app uses Next.js App Router, TypeScript, Tailwind CSS, and Mesh SDK. LocalStorage stands in for a database so the prototype deploys to Vercel without infrastructure. Route handlers expose health, sponsor quote, and mock campaign APIs.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">Service interfaces</h2>
              <div className="mt-6 grid gap-4">
                {kits.map((kit) => (
                  <div key={kit.name} className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="font-bold text-slate-950">{kit.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{kit.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="text-xl font-black text-emerald-950">What is real in v003</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-900">
                  <li>Email profile UX stored in localStorage</li>
                  <li>External Cardano browser wallet connection through Mesh and CIP-30</li>
                  <li>Claim pages, campaign links, local claim records, and CSV export</li>
                  <li>Mock API route shapes for sponsor quotes and campaigns</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <h2 className="text-xl font-black text-amber-950">What is scaffolded</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-900">
                  <li>Embedded wallet custody</li>
                  <li>Passkey/device-secured wallet creation</li>
                  <li>Sponsored transaction execution</li>
                  <li>Native asset minting and delivery</li>
                  <li>Developer SDK, API keys, billing, and abuse prevention</li>
                </ul>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">Example future SDK calls</h2>
              <pre className="mt-5 overflow-x-auto rounded-3xl bg-slate-950 p-5 text-sm leading-6 text-tellus-mint">
                <code>{futureSdk}</code>
              </pre>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">v004 roadmap</h2>
              <p className="mt-4 leading-7 text-slate-600">
                v004 should introduce a real backend database, passkey-based embedded wallet research, Blockfrost or Maestro integration, preprod native asset minting, QR claim codes, project authentication, and abuse prevention.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
