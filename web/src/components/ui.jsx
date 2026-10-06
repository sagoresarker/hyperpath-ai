import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

const spring = { type: "spring", stiffness: 420, damping: 18 };

/** Chunky cartoon button with a spring hover/press. Renders <a> when href is given. */
export function PopButton({ href, onClick, children, tone = "ink", className = "", ...rest }) {
  const tones = {
    ink: "bg-ink text-white",
    sun: "bg-sun text-ink",
    pink: "bg-pink text-white",
    white: "bg-white text-ink",
    mint: "bg-mint text-ink",
  };
  const Comp = href ? m.a : m.button;
  return (
    <Comp
      href={href}
      onClick={onClick}
      type={href ? undefined : "button"}
      className={`inline-flex items-center gap-2 font-display font-bold text-base md:text-lg px-5 py-3 rounded-2xl border-3 border-ink shadow-pop select-none ${tones[tone]} ${className}`}
      whileHover={{ y: -3, x: -1, boxShadow: "8px 9px 0 0 #16133A", transition: spring }}
      whileTap={{ y: 3, x: 3, boxShadow: "1px 1px 0 0 #16133A", scale: 0.98, transition: spring }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** High-contrast badge with a little wobble on hover. */
export function Badge({ children, tone = "sun", icon, className = "" }) {
  const tones = {
    sun: "bg-sun text-ink",
    pink: "bg-pink text-white",
    mint: "bg-mint text-ink",
    sky: "bg-sky text-white",
    grape: "bg-grape text-white",
    white: "bg-white text-ink",
    tang: "bg-tang text-ink",
  };
  return (
    <m.span
      className={`inline-flex items-center gap-1.5 rounded-full border-3 border-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-popsm ${tones[tone]} ${className}`}
      whileHover={{ rotate: [0, -4, 4, 0], scale: 1.06, transition: { duration: 0.4 } }}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </m.span>
  );
}

/** Fades and springs children up when they scroll into view. */
export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
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
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/** Small logo mark: three nodes joined into one, in cartoon style. */
export function LogoMark({ size = 34 }) {
  return (
    <m.svg viewBox="0 0 40 40" width={size} height={size} aria-hidden whileHover={{ rotate: -12, scale: 1.1, transition: spring }}>
      <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="#3B5BFF" stroke="#16133A" strokeWidth="3" />
      <path d="M11 13 C19 15 21 18 28 20 M11 27 C19 25 21 22 28 20" stroke="#FFC93C" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="13" r="4" fill="#fff" stroke="#16133A" strokeWidth="2.4" />
      <circle cx="11" cy="27" r="4" fill="#fff" stroke="#16133A" strokeWidth="2.4" />
      <circle cx="29" cy="20" r="5" fill="#FF4D8D" stroke="#16133A" strokeWidth="2.4" />
    </m.svg>
  );
}
