import clsx from "clsx";

type TellusLogoProps = {
  compact?: boolean;
  markOnly?: boolean;
  className?: string;
  dark?: boolean;
};

export function TellusLogo({ compact = false, markOnly = false, className, dark = false }: TellusLogoProps) {
  const textColor = dark ? "text-white" : "text-tellus-charcoal";
  const subColor = dark ? "text-tellus-mint" : "text-tellus-teal";

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <svg
        aria-label="Tellus Gateway logo"
        className={clsx(compact ? "h-11 w-11" : "h-14 w-14", "shrink-0")}
        viewBox="0 0 96 96"
        role="img"
      >
        <defs>
          <linearGradient id="tellusMarkGradient" x1="12" x2="84" y1="8" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0E4D4A" />
            <stop offset="1" stopColor="#18B7B0" />
          </linearGradient>
          <linearGradient id="tellusPathGradient" x1="28" x2="68" y1="69" y2="69" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2C14E" />
            <stop offset="1" stopColor="#F7D879" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="84" height="84" rx="26" fill="#0E4D4A" />
        <path d="M24 66V37C24 24.85 33.85 15 46 15h4c12.15 0 22 9.85 22 22v29" fill="none" stroke="#D8F4EE" strokeWidth="7" strokeLinecap="round" />
        <path d="M32 61V38c0-8.28 6.72-15 15-15h2c8.28 0 15 6.72 15 15v23" fill="none" stroke="url(#tellusMarkGradient)" strokeWidth="6" strokeLinecap="round" />
        <path d="M48 67V41" stroke="#D8F4EE" strokeWidth="5" strokeLinecap="round" />
        <path d="M48 50l12-12" stroke="#D8F4EE" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48 54L37 43" stroke="#D8F4EE" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="61" cy="37" r="5" fill="#D8F4EE" />
        <circle cx="36" cy="42" r="5" fill="#D8F4EE" />
        <path d="M20 70c10-2.8 19.6-4.2 28-4.2S66 67.2 76 70" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        <path d="M34 74h28M38 80h20" stroke="url(#tellusPathGradient)" strokeWidth="5" strokeLinecap="round" />
        <path d="M17 59c-5.5-7.5-5.8-15.5-.5-24 9.1 5 12.7 12.8 10.8 23.4" fill="#18B7B0" opacity="0.82" />
        <path d="M79 59c5.5-7.5 5.8-15.5.5-24-9.1 5-12.7 12.8-10.8 23.4" fill="#18B7B0" opacity="0.82" />
      </svg>
      {!markOnly ? (
        <div className="leading-none">
          <p className={clsx("font-black tracking-tight", compact ? "text-lg" : "text-2xl", textColor)}>Tellus Gateway</p>
          <p className={clsx("mt-1 text-xs font-semibold tracking-[0.24em]", subColor)}>CARDANO-NATIVE ONBOARDING</p>
        </div>
      ) : null}
    </div>
  );
}
