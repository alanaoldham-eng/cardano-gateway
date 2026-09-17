import clsx from "clsx";

type StatusPillProps = {
  children: React.ReactNode;
  tone?: "aqua" | "blue" | "green" | "gold" | "amber" | "slate" | "teal";
  className?: string;
};

const tones = {
  aqua: "border-tellus-aqua/30 bg-tellus-mint text-tellus-teal",
  blue: "border-tellus-aqua/30 bg-tellus-mint text-tellus-teal",
  teal: "border-tellus-teal/20 bg-tellus-teal text-white",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  gold: "border-tellus-gold/45 bg-tellus-gold/18 text-tellus-charcoal",
  amber: "border-tellus-gold/45 bg-tellus-gold/18 text-tellus-charcoal",
  slate: "border-slate-200 bg-slate-50 text-slate-700"
};

export function StatusPill({ children, tone = "aqua", className }: StatusPillProps) {
  return (
    <span className={clsx("inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold", tones[tone], className)}>
      {children}
    </span>
  );
}
