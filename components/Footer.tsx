import Link from "next/link";
import { TellusLogo } from "@/components/TellusLogo";

export function Footer() {
  return (
    <footer className="border-t border-tellus-teal/12 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <TellusLogo compact />
          <p className="mt-4 max-w-xl leading-6">
            Tellus Gateway v003 is a deployable prototype for email-first, Cardano-native onboarding. It keeps wallet custody, sponsored transactions, and minting cleanly separated from the demo experience.
          </p>
          <p className="mt-3 font-semibold text-tellus-teal">From email to ownership on Cardano.</p>
        </div>
        <div>
          <p className="font-black text-tellus-charcoal">Prototype</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/passport" className="hover:text-tellus-teal">Cardano Passport</Link>
            <Link href="/claim/founders-badge" className="hover:text-tellus-teal">Founders claim</Link>
            <Link href="/dashboard" className="hover:text-tellus-teal">Project dashboard</Link>
          </div>
        </div>
        <div>
          <p className="font-black text-tellus-charcoal">Brand pillars</p>
          <p className="mt-3 leading-6">Simple. Trusted. Regenerative. Frictionless. No private keys are stored by this v003 prototype.</p>
        </div>
      </div>
    </footer>
  );
}
