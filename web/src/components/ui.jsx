import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

/** Research-platform button: solid slate primary or white outlined secondary. */
export function ToolButton({ children, onClick, disabled, primary = false, href, size = "md", className = "" }) {
  const Comp = href ? m.a : m.button;
  const sizes = { md: "px-4 py-2.5 text-sm", sm: "px-3 py-1.5 text-[13px]" };
  return (
    <Comp
      href={href}
      type={href ? undefined : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${sizes[size]} ${
        primary
          ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800"
          : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
      } ${className}`}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
      {primary && <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>}
    </Comp>
  );
}

/** System status tag, e.g. [ STATUS: RESEARCH-LED ]. */
export function StatusTag({ children, live = false }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-600">
      <span className="text-slate-400">[</span>
      {live && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />}
      {children}
      <span className="text-slate-400">]</span>
    </span>
  );
}

/** Numbered section header in the style of a technical paper. */
export function SectionHead({ no, label, title, children, className = "" }) {
  return (
    <Reveal className={`space-y-3 ${className}`}>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-indigo-600">{String(no).padStart(2, "0")}</span>
        <span className="label">{label}</span>
        <span className="h-px flex-1 translate-y-[-3px] bg-slate-200" aria-hidden />
      </div>
      {title && <h2 className="text-3xl leading-[1.12] md:text-[2.5rem]">{title}</h2>}
      {children}
    </Reveal>
  );
}

/** Subtle fade-and-rise when scrolled into view. */
export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </Comp>
  );
}

/** Counts up to `to` when visible. */
export function CountUp({ to, suffix = "", duration = 1400, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

/** Logo mark: two inputs joined into one conclusion, drawn in hairlines. */
export function LogoMark({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className="text-slate-900">
      <rect x="0.5" y="0.5" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M6 7 C11 8 12 10.5 17 12 M6 17 C11 16 12 13.5 17 12" fill="none" stroke="#6366F1" strokeWidth="1.4" />
      <circle cx="6" cy="7" r="1.8" fill="currentColor" />
      <circle cx="6" cy="17" r="1.8" fill="currentColor" />
      <circle cx="17.5" cy="12" r="2.4" fill="#6366F1" />
    </svg>
  );
}
