import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  label?: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, label, className }: FeatureCardProps) {
  return (
    <div className={clsx("tellus-card group rounded-[1.75rem] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-glow", className)}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tellus-mint text-tellus-teal ring-1 ring-tellus-aqua/20">
          <Icon aria-hidden="true" className="h-6 w-6" />
        </div>
        {label ? <span className="rounded-full bg-tellus-neutral px-3 py-1 text-xs font-bold text-tellus-charcoal ring-1 ring-tellus-teal/10">{label}</span> : null}
      </div>
      <h3 className="text-lg font-black text-tellus-charcoal">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
