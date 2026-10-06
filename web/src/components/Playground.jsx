import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Hops, Bubble } from "./Mascots.jsx";
import { Badge } from "./ui.jsx";

const INK = "#16133A";
const STEP_COLORS = ["#3B5BFF", "#8B5CF6", "#FF4D8D", "#FF8A3D", "#22D3A6"];
const QUESTIONS = {
  fresh: "How much paint for a 4 × 5 m room?",
  similar: ["…and for a 3 × 6 m room?", "…with a thicker paint?", "…for two coats?"],
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Canvas engine: nodes with spring physics, cartoon edges, pulses, stickers.
// ---------------------------------------------------------------------------
function createEngine(canvas, reduce) {
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, raf = 0, alive = true;

  // Deterministic layout.
  let seed = 5;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const nodes = [];
  const add = (x, y, kind, r) => nodes.push({ hx: x, hy: y, kind, r, ox: 0, oy: 0, vx: 0, vy: 0, s: 1, vs: 0, lit: 0, litTarget: 0, color: "#fff", ph: rnd() * 6.28 }) - 1;

  const Q = add(0.09, 0.56, "q", 17);
  const A = add(0.91, 0.46, "a", 17);
  const stepXs = [0.25, 0.41, 0.57, 0.73];
  const stepNodes = stepXs.map((x, i) => add(x, 0.5 + Math.sin(i * 1.9 + 0.6) * 0.16, "step", 11));
  const facts = [
    add(0.17, 0.25, "fact", 8), add(0.34, 0.82, "fact", 8), add(0.49, 0.2, "fact", 8),
    add(0.66, 0.84, "fact", 8),
  ];
  const lastFacts = [add(0.83, 0.2, "fact", 8), add(0.84, 0.8, "fact", 8), add(0.95, 0.75, "fact", 8), add(0.76, 0.12, "fact", 8)];
  for (let i = 0; i < 16; i++) add(0.05 + rnd() * 0.9, 0.08 + rnd() * 0.84, "deco", 3 + rnd() * 3);

  const chain = [Q, ...stepNodes, A];
  const stepFact = [...facts]; // fact for steps 0..3; step 4 uses a variant

  // Edge state per step k: progress 0..1 and how it was produced.
  const edges = Array.from({ length: 5 }, () => ({ p: 0, target: 0, rate: 0.1, mode: "new", fact: -1 }));
  const pulses = [];
  const stickers = [];
  const sparks = [];
  const pointer = { x: -1, y: -1, in: false };

  const P = (i) => {
    const n = nodes[i];
    const fx = reduce ? 0 : Math.sin(performance.now() * 0.0011 + n.ph) * 0.006;
    const fy = reduce ? 0 : Math.cos(performance.now() * 0.0013 + n.ph) * 0.009;
    return [(n.hx + fx) * W + n.ox, (n.hy + fy) * H + n.oy];
  };

  function bounce(i, power = 1) {
    const n = nodes[i];
    n.vs += 0.32 * power;
    n.vy -= 6 * power;
  }
  function burst(i, color, count = 12) {
    const [x, y] = P(i);
    for (let k = 0; k < count; k++) {
      const a = (k / count) * Math.PI * 2 + Math.random() * 0.4;
      const sp = 1.5 + Math.random() * 2.5;
      sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, c: color });
    }
  }
  function sticker(i, text, color) {
    const [x, y] = P(i);
    stickers.push({ x, y: y - 22, text, color, life: 1 });
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function roundBlob(pts, pad, fill) {
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    const out = pts.map(([x, y]) => { const a = Math.atan2(y - cy, x - cx), d = Math.hypot(x - cx, y - cy) + pad; return [cx + Math.cos(a) * d, cy + Math.sin(a) * d, a]; }).sort((a, b) => a[2] - b[2]);
    ctx.beginPath();
    for (let k = 0; k < out.length; k++) {
      const p = out[k], q = out[(k + 1) % out.length];
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      if (k === 0) ctx.moveTo((out[out.length - 1][0] + p[0]) / 2, (out[out.length - 1][1] + p[1]) / 2);
      ctx.quadraticCurveTo(p[0], p[1], mx, my);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function curve(a, b, prog, color, width) {
    const [x1, y1] = a, [x2, y2] = b;
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 - 26;
    const steps = 22, n = Math.max(1, Math.ceil(steps * prog));
    const pt = (t) => [(1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let k = 1; k <= n; k++) ctx.lineTo(...pt(Math.min(prog, k / steps)));
    ctx.lineCap = "round";
    ctx.lineWidth = width + 5; ctx.strokeStyle = INK; ctx.stroke();
    ctx.lineWidth = width; ctx.strokeStyle = color; ctx.stroke();
    return pt;
  }

  function frame() {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    const now = performance.now();
    ctx.clearRect(0, 0, W, H);

    // Physics: springs back to home, scale spring, pointer nudge.
    for (const [i, n] of nodes.entries()) {
      const k = 0.08, d = 0.78;
      n.vx = (n.vx - n.ox * k) * d; n.vy = (n.vy - n.oy * k) * d;
      if (pointer.in) {
        const [x, y] = P(i);
        const dx = x - pointer.x, dy = y - pointer.y, dist = Math.hypot(dx, dy);
        if (dist < 60 && dist > 0.1) { n.vx += (dx / dist) * 0.9; n.vy += (dy / dist) * 0.9; }
      }
      n.ox += n.vx; n.oy += n.vy;
      n.vs = (n.vs + (1 - n.s) * 0.18) * 0.78; n.s += n.vs;
      n.lit += (n.litTarget - n.lit) * (reduce ? 1 : 0.12);
    }
    for (const e of edges) e.p += (e.target - e.p) * (reduce ? 1 : e.rate);

    // Decorative faint links between nearby deco nodes.
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(22,19,58,0.10)";
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].kind !== "deco" && nodes[j].kind !== "deco") continue;
      const [x1, y1] = P(i), [x2, y2] = P(j);
      if (Math.hypot(x1 - x2, y1 - y2) < Math.min(W, H) * 0.2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
    }

    // Step groups (two inputs -> one result) as soft blobs, then edges.
    edges.forEach((e, k) => {
      if (e.p < 0.02) return;
      const from = chain[k], to = chain[k + 1], fact = e.fact;
      const col = STEP_COLORS[k];
      ctx.globalAlpha = Math.min(1, e.p) * (e.mode === "reused" ? 0.28 : 0.2);
      roundBlob([P(from), P(fact), P(to)], 16, col);
      ctx.globalAlpha = 1;
      curve(P(fact), P(to), Math.min(1, e.p), col, 3.5);
      curve(P(from), P(to), Math.min(1, e.p), col, 5);
    });

    // Pulses travelling along a step.
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pu = pulses[i];
      const t = Math.min(1, (now - pu.t0) / pu.dur);
      const [x1, y1] = P(pu.from), [x2, y2] = P(pu.to);
      const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 - 26;
      const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
      const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 26);
      g.addColorStop(0, pu.color + "ee"); g.addColorStop(1, pu.color + "00");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
      ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
      if (!reduce && Math.random() < 0.6) sparks.push({ x, y, vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4, life: 0.8, c: pu.color });
      if (t >= 1) pulses.splice(i, 1);
    }

    // Nodes.
    nodes.forEach((n, i) => {
      const [x, y] = P(i);
      const r = n.r * n.s;
      if (n.kind === "deco") {
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(22,19,58,0.22)"; ctx.fill();
        return;
      }
      if (n.lit > 0.05) {
        ctx.beginPath(); ctx.arc(x, y, r + 9 * n.lit, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "40"; ctx.fill();
      }
      // drop shadow (cartoon offset)
      ctx.beginPath(); ctx.arc(x + 3, y + 3, r, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      const base = n.kind === "q" ? "#3B5BFF" : n.kind === "a" ? "#FF4D8D" : n.kind === "fact" ? "#FFC93C" : "#ffffff";
      ctx.fillStyle = n.kind === "step" && n.lit > 0.5 ? n.color : base;
      ctx.fill();
      ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
      // highlight
      ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.28, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.fill();
      if (n.kind === "q" || n.kind === "a") {
        ctx.fillStyle = "#fff";
        ctx.font = `800 ${Math.round(r * 1.15)}px "Bricolage Grotesque", sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(n.kind === "q" ? "?" : "!", x, y + 1);
      }
    });

    // Labels for question and answer.
    ctx.font = '700 11px "JetBrains Mono", monospace';
    ctx.fillStyle = INK; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    { const [x, y] = P(Q); ctx.fillText("QUESTION", x, y + 34); }
    { const [x, y] = P(A); ctx.fillText("ANSWER", x, y + 34); }

    // Sparks.
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.life -= 0.03;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life; ctx.fillStyle = s.c;
      ctx.beginPath(); ctx.arc(s.x, s.y, 2.6 * s.life + 0.8, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Stickers ("+1 saved", "reused").
    for (let i = stickers.length - 1; i >= 0; i--) {
      const st = stickers[i];
      st.y -= 0.5; st.life -= 0.012;
      if (st.life <= 0) { stickers.splice(i, 1); continue; }
      const pop = Math.min(1, (1 - st.life) * 8);
      const scale = 0.6 + 0.4 * pop + Math.sin(pop * Math.PI) * 0.15;
      ctx.font = '800 12px "JetBrains Mono", monospace';
      const w = ctx.measureText(st.text).width + 16;
      const sx = Math.min(Math.max(st.x, w / 2 + 6), W - w / 2 - 6);
      ctx.save(); ctx.translate(sx, Math.max(st.y, 16)); ctx.scale(scale, scale); ctx.globalAlpha = Math.min(1, st.life * 2);
      ctx.font = '800 12px "JetBrains Mono", monospace';
      ctx.fillStyle = INK; roundRect(-w / 2 + 2, -11 + 2, w, 22, 11); ctx.fill();
      ctx.fillStyle = st.color; roundRect(-w / 2, -11, w, 22, 11); ctx.fill();
      ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke();
      ctx.fillStyle = st.color === "#FFC93C" || st.color === "#22D3A6" ? INK : "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(st.text, 0, 1);
      ctx.restore();
    }
  }
  function roundRect(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  // Interaction: tap a node to make it bounce.
  function hit(px, py) {
    let best = -1, bd = 1e9;
    nodes.forEach((n, i) => { const [x, y] = P(i); const d = Math.hypot(px - x, py - y); if (d < Math.max(n.r + 10, 16) && d < bd) { bd = d; best = i; } });
    return best;
  }
  const local = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const onDown = (e) => {
    const [x, y] = local(e); const i = hit(x, y);
    if (i >= 0) { bounce(i, 1.4); burst(i, nodes[i].kind === "deco" ? "#8B5CF6" : nodes[i].kind === "fact" ? "#FFC93C" : "#FF4D8D", 10); }
  };
  const onMove = (e) => { const [x, y] = local(e); pointer.x = x; pointer.y = y; pointer.in = true; canvas.style.cursor = hit(x, y) >= 0 ? "pointer" : "default"; };
  const onLeave = () => (pointer.in = false);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  raf = requestAnimationFrame(frame);

  // ----- Story actions -----
  function clearPath(fast = true) {
    edges.forEach((e) => { e.target = 0; e.rate = fast ? 0.25 : 0.1; });
    nodes.forEach((n) => (n.litTarget = 0));
  }

  async function workStep(k, fact, onStep) {
    const from = chain[k], to = chain[k + 1], col = STEP_COLORS[k];
    edges[k].fact = fact; edges[k].mode = "new";
    nodes[fact].litTarget = 1; nodes[fact].color = "#FFC93C"; bounce(fact, 0.6);
    pulses.push({ from, to, t0: performance.now(), dur: reduce ? 1 : 750, color: col });
    edges[k].target = 1; edges[k].rate = 0.05;
    await sleep(reduce ? 120 : 780);
    nodes[to].litTarget = 1; nodes[to].color = col;
    bounce(to, 1); burst(to, col, 12);
    sticker(to, "+1 saved", col === "#22D3A6" ? "#22D3A6" : col);
    onStep?.(k, "worked");
    await sleep(reduce ? 60 : 260);
  }

  async function reuseStep(k, onStep) {
    const to = chain[k + 1], col = STEP_COLORS[k];
    edges[k].fact = stepFact[k]; edges[k].mode = "reused";
    nodes[stepFact[k]].litTarget = 1;
    edges[k].target = 1; edges[k].rate = 0.35;
    nodes[to].litTarget = 1; nodes[to].color = col;
    bounce(to, 1.2); burst(to, "#22D3A6", 8);
    sticker(to, "reused", "#22D3A6");
    onStep?.(k, "reused");
    await sleep(reduce ? 40 : 150);
  }

  return {
    async askFresh(onStep) {
      clearPath(); await sleep(reduce ? 50 : 350);
      nodes[Q].litTarget = 1; nodes[Q].color = "#3B5BFF"; bounce(Q, 1.2); burst(Q, "#3B5BFF", 10);
      await sleep(reduce ? 50 : 300);
      for (let k = 0; k < 4; k++) await workStep(k, stepFact[k], onStep);
      await workStep(4, lastFacts[0], onStep);
      nodes[A].litTarget = 1; nodes[A].color = "#FF4D8D"; bounce(A, 1.6); burst(A, "#FF4D8D", 18);
    },
    async askSimilar(variant, onStep) {
      clearPath(); await sleep(reduce ? 50 : 300);
      nodes[Q].litTarget = 1; bounce(Q, 1.2); burst(Q, "#3B5BFF", 10);
      await sleep(reduce ? 50 : 250);
      for (let k = 0; k < 4; k++) await reuseStep(k, onStep);
      await sleep(reduce ? 50 : 200);
      await workStep(4, lastFacts[1 + (variant % 3)], onStep);
      nodes[A].litTarget = 1; bounce(A, 1.8); burst(A, "#FF4D8D", 22);
    },
    reset() { clearPath(false); nodes.forEach((n, i) => i < 30 && bounce(i, 0.3)); },
    destroy() {
      alive = false; cancelAnimationFrame(raf); ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    },
  };
}

// ---------------------------------------------------------------------------
// React wrapper: controls, cost meter, Hops narrating.
// ---------------------------------------------------------------------------
export default function Playground() {
  const canvasRef = useRef(null);
  const engine = useRef(null);
  const userTook = useRef(false);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(0);
  const [steps, setSteps] = useState([null, null, null, null, null]); // "worked" | "reused" | null
  const [question, setQuestion] = useState("Tap a button to ask Hops a question.");
  const [say, setSay] = useState({ key: "hi", text: "Hi, I'm Hops! Ask me something and watch what I remember." });
  const [excited, setExcited] = useState(false);
  const variant = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    engine.current = createEngine(canvasRef.current, reduce);
    return () => engine.current?.destroy();
  }, []);

  const onStep = useCallback((k, kind) => {
    setSteps((s) => { const n = [...s]; n[k] = kind; return n; });
    if (kind === "worked") setSaved((v) => Math.min(v + 1, 8));
  }, []);

  const fresh = useCallback(async () => {
    if (!engine.current) return;
    setBusy(true); setSteps([null, null, null, null, null]); setSaved(0); setExcited(false);
    setQuestion(QUESTIONS.fresh);
    setSay({ key: "think", text: "A brand-new question! I'll work it out step by step and check each one." });
    await engine.current.askFresh(onStep);
    setSay({ key: "saved", text: "Done! Every step held up, so I saved all five for next time." });
    setBusy(false);
  }, [onStep]);

  const similar = useCallback(async () => {
    if (!engine.current) return;
    setBusy(true); setSteps([null, null, null, null, null]); setExcited(true);
    const v = variant.current++;
    setQuestion(QUESTIONS.similar[v % 3]);
    setSay({ key: "reuse" + v, text: "Ooh, I've seen steps like these! Reusing what I saved…" });
    await engine.current.askSimilar(v, onStep);
    setSay({ key: "reused" + v, text: "Answered with 4 steps reused and just 1 new one. Way less thinking!" });
    setTimeout(() => setExcited(false), 1600);
    setBusy(false);
  }, [onStep]);

  const clear = useCallback(() => {
    engine.current?.reset();
    setSaved(0); setSteps([null, null, null, null, null]); setExcited(false);
    setQuestion("Memory cleared.");
    setSay({ key: "clear" + Math.random(), text: "Memory wiped! The next question starts from scratch." });
  }, []);

  // Autoplay the story until the visitor presses a button.
  useEffect(() => {
    let stop = false;
    (async () => {
      await sleep(900);
      while (!stop && !userTook.current) {
        await fresh(); await sleep(1800);
        if (stop || userTook.current) break;
        await similar(); await sleep(2200);
        if (stop || userTook.current) break;
        await similar(); await sleep(2600);
      }
    })();
    return () => { stop = true; };
  }, [fresh, similar]);

  const take = (fn) => () => { userTook.current = true; if (!busy) fn(); };
  const worked = steps.filter((s) => s === "worked").length;
  const reused = steps.filter((s) => s === "reused").length;

  return (
    <div className="relative">
      <div className="card-pop overflow-hidden bg-gradient-to-br from-white via-white to-[#EEF1FF]">
        {/* top bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-ink bg-sun px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full border-2 border-ink bg-pink" />
              <span className="h-3 w-3 rounded-full border-2 border-ink bg-white" />
              <span className="h-3 w-3 rounded-full border-2 border-ink bg-mint" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Reasoning playground</span>
          </div>
          <m.span
            key={saved}
            initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}
            className="rounded-full border-2 border-ink bg-white px-2.5 py-0.5 font-mono text-xs font-bold"
          >
            🧠 {saved} saved {saved === 1 ? "step" : "steps"}
          </m.span>
        </div>

        {/* question chip */}
        <div className="px-4 pt-3">
          <AnimatePresence mode="wait">
            <m.p
              key={question}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
              className="inline-flex max-w-full items-center gap-2 rounded-xl border-2 border-ink bg-sky px-3 py-1 text-sm font-bold text-white"
            >
              <span className="font-mono">Q</span> <span className="truncate">{question}</span>
            </m.p>
          </AnimatePresence>
        </div>

        {/* canvas */}
        <canvas
          ref={canvasRef}
          className="block w-full aspect-[4/3] sm:aspect-[16/11] touch-manipulation"
          role="img"
          aria-label="Interactive diagram. A question node connects through five reasoning steps to an answer. New questions build each step slowly and save it; similar questions reuse the saved steps almost instantly. Tap any node to make it bounce."
        />

        {/* meter + controls */}
        <div className="border-t-3 border-ink bg-white px-4 pt-3 pb-9 space-y-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70">This answer</span>
            <div className="flex gap-1.5" aria-hidden>
              {steps.map((s, i) => (
                <m.span
                  key={i + String(s)}
                  initial={s ? { scale: 0.4, rotate: -20 } : false}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 14 }}
                  className={`grid h-7 w-7 place-items-center rounded-lg border-2 border-ink text-xs font-bold ${s === "worked" ? "bg-tang" : s === "reused" ? "bg-mint" : "bg-paper"}`}
                >
                  {s === "worked" ? "✎" : s === "reused" ? "♻" : ""}
                </m.span>
              ))}
            </div>
            <span className="text-sm font-semibold" aria-live="polite">
              <span className="text-tang font-extrabold">{worked}</span> worked out · <span className="text-[#0f9e7a] font-extrabold">{reused}</span> reused
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <ControlButton tone="bg-sky text-white" onClick={take(fresh)} disabled={busy}>✨ New question</ControlButton>
            <ControlButton tone="bg-mint" onClick={take(similar)} disabled={busy || saved === 0}>♻ Similar question</ControlButton>
            <ControlButton tone="bg-white" onClick={take(clear)} disabled={busy}>Clear memory</ControlButton>
          </div>
        </div>
      </div>

      {/* Hops narrating, peeking over the card's bottom edge */}
      <div className="relative z-10 -mt-7 ml-1 flex items-end gap-1 pr-1">
        <div className="shrink-0"><Hops size={88} excited={excited} wave={!busy} /></div>
        <Bubble side="left" animateKey={say.key} className="mb-7 flex-1 max-w-sm">
          <p className="text-sm font-bold leading-snug">{say.text}</p>
        </Bubble>
      </div>
    </div>
  );
}

function ControlButton({ children, onClick, disabled, tone }) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border-3 border-ink px-3.5 py-2 text-sm font-extrabold shadow-popsm disabled:opacity-45 disabled:cursor-not-allowed ${tone}`}
      whileHover={disabled ? {} : { y: -2, boxShadow: "5px 5px 0 0 #16133A" }}
      whileTap={disabled ? {} : { y: 2, x: 2, boxShadow: "0px 0px 0 0 #16133A", scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
    >
      {children}
    </m.button>
  );
}
