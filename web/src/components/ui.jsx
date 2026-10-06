import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

/** Precision "tool" button: hairline border, square corners, mono label, soft hover glow. */
export function ToolButton({ children, onClick, disabled, primary = false, href, className = "" }) {
  const Comp = href ? m.a : m.button;
  return (
    <Comp
      href={href}
      type={href ? undefined : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`tool-btn group inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        primary
          ? "border-slate-900 bg-slate-900 text-white hover:border-indigo-600 hover:bg-indigo-600 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900 dark:hover:border-indigo-400 dark:hover:bg-indigo-400"
          : "border-slate-300 bg-transparent text-slate-800 hover:border-indigo-500 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
      } ${className}`}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <span aria-hidden className="text-[9px] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100">▸</span>
      {children}
    </Comp>
  );
}

/** System status tag, e.g. [ STATUS: RESEARCH-LED ]. */
export function StatusTag({ children, live = false }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
      <span className="text-slate-400 dark:text-slate-600">[</span>
      {live && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />}
      {children}
      <span className="text-slate-400 dark:text-slate-600">]</span>
    </span>
  );
}

/** Numbered section header in the style of a technical paper. */
export function SectionHead({ no, label, title, children, className = "" }) {
  return (
    <Reveal className={`space-y-3 ${className}`}>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">§{no}</span>
        <span className="label">{label}</span>
        <span className="h-px flex-1 translate-y-[-3px] bg-slate-200 dark:bg-slate-800" aria-hidden />
      </div>
      {title && <h2 className="text-3xl md:text-[2.6rem] leading-[1.1]">{title}</h2>}
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
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className="text-slate-900 dark:text-slate-100">
      <rect x="0.5" y="0.5" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M6 7 C11 8 12 10.5 17 12 M6 17 C11 16 12 13.5 17 12" fill="none" stroke="#6366F1" strokeWidth="1.4" />
      <circle cx="6" cy="7" r="1.8" fill="currentColor" />
      <circle cx="6" cy="17" r="1.8" fill="currentColor" />
      <circle cx="17.5" cy="12" r="2.4" fill="#6366F1" />
    </svg>
  );
}
