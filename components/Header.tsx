import Link from "next/link";
import { StatusPill } from "@/components/StatusPill";
import { TellusLogo } from "@/components/TellusLogo";

const navItems = [
  { href: "/passport", label: "Passport" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-tellus-teal/15 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Tellus Gateway home">
          <TellusLogo compact />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-tellus-charcoal transition hover:text-tellus-teal">
              {item.label}
            </Link>
          ))}
          <StatusPill tone="gold">v003 UX demo</StatusPill>
        </nav>
        <Link
          href="/passport"
          className="rounded-full bg-tellus-teal px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-tellus-ink md:hidden"
        >
          Try Passport
        </Link>
      </div>
    </header>
  );
}
