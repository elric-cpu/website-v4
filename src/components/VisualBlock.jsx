import React from "react";
const VARIANT_STYLES = {
  slate: "from-slate-900 via-slate-800 to-slate-700 text-white",
  clay: "from-amber-100 via-orange-100 to-rose-100 text-slate-900",
  moss: "from-emerald-900 via-emerald-800 to-emerald-700 text-white",
  ink: "from-stone-900 via-stone-800 to-stone-700 text-white",
};

const VisualBlock = ({
  eyebrow = "Benson Home Solutions",
  title = "Oregon Maintenance & Restoration",
  subtitle = "Planning, documentation, and execution across Harney County and the Mid-Willamette Valley.",
  variant = "clay",
  className,
}) => {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-black/10",
        "bg-gradient-to-br shadow-sm",
        VARIANT_STYLES[variant] || VARIANT_STYLES.clay,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-black/10 blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
      <div className="relative p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] opacity-80">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-xl sm:text-2xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-3 text-sm sm:text-base opacity-80">{subtitle}</p>
      </div>
    </div>
  );
};

export default VisualBlock;
