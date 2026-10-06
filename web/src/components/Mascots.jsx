import { m, AnimatePresence } from "framer-motion";

const INK = "#16133A";

// Shared blinking eyes.
function Eyes({ cx1, cx2, cy, rx = 5, ry = 7, delay = 0 }) {
  return (
    <m.g
      style={{ originY: `${cy}px` }}
      animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
      transition={{ duration: 4.2, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity, delay }}
    >
      <ellipse cx={cx1} cy={cy} rx={rx} ry={ry} fill={INK} />
      <ellipse cx={cx2} cy={cy} rx={rx} ry={ry} fill={INK} />
      <circle cx={cx1 + 1.8} cy={cy - 2.5} r={1.6} fill="#fff" />
      <circle cx={cx2 + 1.8} cy={cy - 2.5} r={1.6} fill="#fff" />
    </m.g>
  );
}

const bob = (delay = 0) => ({
  animate: { y: [0, -6, 0] },
  transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay },
});

/** Hops: a friendly blue robot that works problems out. */
export function Hops({ size = 120, wave = false, excited = false, className = "" }) {
  return (
    <m.svg
      viewBox="0 0 120 140"
      width={size}
      height={(size * 140) / 120}
      className={className}
      role="img"
      aria-label="Hops, a friendly blue robot"
      whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
    >
      <m.g {...bob(0)}>
        {/* antenna */}
        <line x1="60" y1="24" x2="60" y2="9" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <m.circle
          cx="60" cy="8" r="6" fill="#FFC93C" stroke={INK} strokeWidth="3"
          animate={{ scale: excited ? [1, 1.4, 1] : [1, 1.15, 1] }}
          transition={{ duration: excited ? 0.5 : 1.6, repeat: Infinity }}
          style={{ originX: "60px", originY: "8px" }}
        />
        {/* left arm */}
        <path d="M18 74 Q4 80 6 92" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        <path d="M18 74 Q4 80 6 92" fill="none" stroke="#3B5BFF" strokeWidth="4" strokeLinecap="round" />
        {/* right arm (waves) */}
        <m.g
          style={{ originX: "102px", originY: "72px" }}
          animate={wave ? { rotate: [0, -35, 0, -35, 0] } : { rotate: 0 }}
          transition={wave ? { duration: 1.4, repeat: Infinity, repeatDelay: 1.2 } : {}}
        >
          <path d="M102 72 Q118 62 114 48" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
          <path d="M102 72 Q118 62 114 48" fill="none" stroke="#3B5BFF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="114" cy="46" r="5" fill="#fff" stroke={INK} strokeWidth="3" />
        </m.g>
        {/* body */}
        <rect x="16" y="24" width="88" height="84" rx="30" fill="#3B5BFF" stroke={INK} strokeWidth="4" />
        <rect x="24" y="30" width="30" height="10" rx="5" fill="#fff" opacity="0.35" />
        {/* face screen */}
        <rect x="28" y="40" width="64" height="42" rx="16" fill="#fff" stroke={INK} strokeWidth="3" />
        <Eyes cx1={47} cx2={73} cy={58} />
        <path d={excited ? "M50 67 Q60 80 70 67 Z" : "M51 69 Q60 76 69 69"} fill={excited ? "#FF4D8D" : "none"} stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="36" cy="70" r="4" fill="#FF4D8D" opacity="0.6" />
        <circle cx="84" cy="70" r="4" fill="#FF4D8D" opacity="0.6" />
        {/* chest light */}
        <circle cx="60" cy="95" r="5" fill="#22D3A6" stroke={INK} strokeWidth="2.5" />
        {/* feet */}
        <rect x="32" y="106" width="20" height="14" rx="7" fill="#16133A" />
        <rect x="68" y="106" width="20" height="14" rx="7" fill="#16133A" />
      </m.g>
      {/* shadow */}
      <m.ellipse cx="60" cy="132" rx="30" ry="5" fill={INK} opacity="0.15" animate={{ rx: [30, 24, 30] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
    </m.svg>
  );
}

/** Vee: a mint shield that checks every step. */
export function Vee({ size = 110, className = "" }) {
  return (
    <m.svg
      viewBox="0 0 120 140" width={size} height={(size * 140) / 120} className={className}
      role="img" aria-label="Vee, a mint-green shield that checks every step"
      whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 10 } }}
    >
      <m.g {...bob(0.4)}>
        <path d="M60 10 L104 26 Q104 86 60 116 Q16 86 16 26 Z" fill="#22D3A6" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M30 32 L58 22" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        <Eyes cx1={46} cx2={74} cy={50} delay={1.3} />
        <path d="M52 62 Q60 68 68 62" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <m.path
          d="M42 82 L55 94 L80 70" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 2.4, times: [0, 0.4, 1], repeat: Infinity, repeatDelay: 1 }}
        />
        <path d="M42 82 L55 94 L80 70" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
      </m.g>
      <m.ellipse cx="60" cy="132" rx="28" ry="5" fill={INK} opacity="0.15" animate={{ rx: [28, 22, 28] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
    </m.svg>
  );
}

/** Lemma: a sunny star that hands over saved steps. */
export function Lemma({ size = 110, className = "" }) {
  const star = "M60 8 L74 40 L109 43 L82 66 L91 101 L60 82 L29 101 L38 66 L11 43 L46 40 Z";
  return (
    <m.svg
      viewBox="0 0 120 140" width={size} height={(size * 140) / 120} className={className}
      role="img" aria-label="Lemma, a sunny star that reuses saved steps"
      whileHover={{ rotate: 18, transition: { type: "spring", stiffness: 300, damping: 8 } }}
    >
      <m.g {...bob(0.8)}>
        <m.g animate={{ rotate: [0, 6, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "60px", originY: "60px" }}>
          <path d={star} fill="#FFC93C" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <Eyes cx1={50} cx2={70} cy={58} rx={4} ry={6} delay={2.1} />
          <path d="M53 70 Q60 76 67 70" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <circle cx="44" cy="68" r="3.5" fill="#FF4D8D" opacity="0.6" />
          <circle cx="76" cy="68" r="3.5" fill="#FF4D8D" opacity="0.6" />
        </m.g>
        {/* little recycle sparkle */}
        <m.g animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ originX: "102px", originY: "18px" }}>
          <path d="M102 8 L104 16 L112 18 L104 20 L102 28 L100 20 L92 18 L100 16 Z" fill="#FF4D8D" stroke={INK} strokeWidth="2" />
        </m.g>
      </m.g>
      <m.ellipse cx="60" cy="132" rx="28" ry="5" fill={INK} opacity="0.15" animate={{ rx: [28, 22, 28] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
    </m.svg>
  );
}

/** Cartoon speech bubble with a tail. `side` sets where the tail points. */
export function Bubble({ children, side = "left", tone = "white", className = "", animateKey }) {
  const bg = { white: "bg-white", sun: "bg-sun", mint: "bg-mint", pink: "bg-pink text-white", sky: "bg-sky text-white" }[tone];
  const tail = {
    left: "left-[-14px] top-6 border-r-[14px] border-y-[10px] border-y-transparent",
    bottom: "bottom-[-16px] left-8 border-t-[16px] border-x-[11px] border-x-transparent",
  }[side];
  return (
    <div className={`relative ${className}`}>
      <div className={`relative border-3 border-ink rounded-2xl shadow-popsm px-4 py-3 ${bg}`}>
        <AnimatePresence mode="wait">
          <m.div
            key={animateKey ?? "static"}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </div>
      <span aria-hidden className={`absolute w-0 h-0 ${tail}`} style={side === "left" ? { borderRightColor: "#16133A" } : { borderTopColor: "#16133A" }} />
    </div>
  );
}
