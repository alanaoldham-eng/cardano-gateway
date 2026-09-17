import clsx from "clsx";

type ArchitectureCardProps = {
  step: string;
  title: string;
  description: string;
  className?: string;
};

export function ArchitectureCard({ step, title, description, className }: ArchitectureCardProps) {
  return (
    <div className={clsx("relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-5 text-white shadow-glow backdrop-blur", className)}>
      <div className="absolute inset-x-8 top-0 h-px bg-gateway-path" />
      <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-tellus-gold text-sm font-black text-tellus-charcoal shadow-gold">
        {step}
      </div>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-tellus-mint">{description}</p>
    </div>
  );
}
