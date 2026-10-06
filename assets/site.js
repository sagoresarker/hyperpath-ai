// Hyperpath AI site scripts.
// 1) Hero: an animated hypergraph that tells the product story.
//    Query 1 builds a reasoning path step by step (expensive);
//    Query 2 reuses the same path in a flash (cheap). Then it repeats.
// 2) Scroll reveals, growing bars and a count-up figure.
// Everything is decorative and respects prefers-reduced-motion.

(function hero() {
  const canvas = document.getElementById("paths");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const caption = document.getElementById("paths-caption");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Deterministic layout: same picture for every visitor.
  let seed = 11;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const nodes = [];
  // A loose band of nodes, denser in the middle.
  for (let i = 0; i < 46; i++) {
    nodes.push({
      x: 0.08 + rand() * 0.84,
      y: 0.12 + rand() * 0.7,
      r: 2 + rand() * 1.6,
      phase: rand() * Math.PI * 2,
      speed: 0.4 + rand() * 0.6,
    });
  }
  // Start and goal nodes for the story path.
  const START = nodes.length;
  nodes.push({ x: 0.1, y: 0.5, r: 5, phase: 0, speed: 0.3 });
  const GOAL = nodes.length;
  nodes.push({ x: 0.9, y: 0.42, r: 5, phase: 1, speed: 0.3 });

  const nearest = (x, y, k, exclude) =>
    nodes
      .map((n, j) => ({ j, d: Math.hypot(n.x - x, n.y - y) }))
      .filter((p) => !exclude.includes(p.j))
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .map((p) => p.j);

  // Background hyperedges: small groups of nearby nodes.
  const hyperedges = [];
  for (let i = 0; i < 14; i++) {
    const a = Math.floor(rand() * 46);
    hyperedges.push([a, ...nearest(nodes[a].x, nodes[a].y, 2 + Math.floor(rand() * 2), [a, START, GOAL])]);
  }

  // The story hyperpath: 5 hyperedges marching from START to GOAL.
  // Each step's premises include the previous step's conclusion.
  const path = [];
  let prev = START;
  const stops = [0.27, 0.43, 0.58, 0.74];
  stops.forEach((sx, i) => {
    const sy = 0.5 + Math.sin(i * 1.7) * 0.14;
    const head = nearest(sx, sy, 1, [START, GOAL, ...path.map((p) => p.head)])[0];
    const extra = nearest((nodes[prev].x + nodes[head].x) / 2, (nodes[prev].y + nodes[head].y) / 2 + 0.07, 1, [prev, head, START, GOAL]);
    path.push({ tail: [prev, ...extra], head });
    prev = head;
  });
  const extraLast = nearest(0.84, 0.3, 1, [prev, START, GOAL]);
  path.push({ tail: [prev, ...extraLast], head: GOAL });

  // Mouse interaction.
  const mouse = { x: -1, y: -1, active: false };
  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = (e.clientY - r.top) / r.height;
    mouse.active = true;
  });
  canvas.addEventListener("pointerleave", () => (mouse.active = false));

  let W = 0, H = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  function palette() {
    const s = getComputedStyle(document.documentElement);
    const get = (n) => s.getPropertyValue(n).trim();
    return { node: get("--node"), line: get("--line"), accent: get("--accent"), muted: get("--muted"), glow: get("--glow") || get("--accent") };
  }
  let C = palette();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => (C = palette()));

  // Node position with gentle drift and cursor repulsion.
  function pos(i, t) {
    const n = nodes[i];
    let x = n.x + (reduce ? 0 : Math.sin(t * 0.0004 * n.speed + n.phase) * 0.008);
    let y = n.y + (reduce ? 0 : Math.cos(t * 0.0005 * n.speed + n.phase) * 0.008);
    if (mouse.active) {
      const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 0.12 && d > 0.0001) {
        const push = (0.12 - d) * 0.25;
        x += (dx / d) * push; y += (dy / d) * push;
      }
    }
    return [x * W, y * H];
  }

  function centroid(ids, t) {
    let x = 0, y = 0;
    ids.forEach((i) => { const p = pos(i, t); x += p[0]; y += p[1]; });
    return [x / ids.length, y / ids.length];
  }

  // Soft blob around a group of points: the visual for a hyperedge.
  function blob(ids, t, pad) {
    const [cx, cy] = centroid(ids, t);
    const pts = ids.map((i) => pos(i, t)).map(([x, y]) => {
      const a = Math.atan2(y - cy, x - cx), d = Math.hypot(x - cx, y - cy) + pad;
      return [cx + Math.cos(a) * d, cy + Math.sin(a) * d, a];
    }).sort((p, q) => p[2] - q[2]);
    ctx.beginPath();
    if (pts.length < 3) {
      ctx.ellipse(cx, cy, Math.max(pad * 2, Math.hypot(pts[0][0] - cx, pts[0][1] - cy)), pad * 1.6, Math.atan2(pts[0][1] - cy, pts[0][0] - cx), 0, Math.PI * 2);
      return;
    }
    for (let k = 0; k < pts.length; k++) {
      const p = pts[k], q = pts[(k + 1) % pts.length];
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      if (k === 0) ctx.moveTo(mx, my);
      const r = pts[(k + 1) % pts.length], s = pts[(k + 2) % pts.length];
      ctx.quadraticCurveTo(r[0], r[1], (r[0] + s[0]) / 2, (r[1] + s[1]) / 2);
    }
    ctx.closePath();
  }

  function withAlpha(color, a) {
    // Works for #rrggbb; falls back to globalAlpha for anything else.
    if (/^#([0-9a-f]{6})$/i.test(color)) {
      const v = parseInt(color.slice(1), 16);
      return `rgba(${v >> 16},${(v >> 8) & 255},${v & 255},${a})`;
    }
    return color;
  }

  // Story timeline (ms): build slowly, pause, reuse fast, pause.
  const BUILD = 5200, HOLD1 = 1100, REUSE = 1100, HOLD2 = 1900;
  const CYCLE = BUILD + HOLD1 + REUSE + HOLD2;
  let lastCaption = "";
  function setCaption(text) {
    if (caption && text !== lastCaption) {
      caption.classList.remove("show");
      void caption.offsetWidth;
      caption.textContent = text;
      caption.classList.add("show");
      lastCaption = text;
    }
  }

  const particles = [];
  const STEPS_LIGHT = ["#2443d6", "#6d3df5", "#c026d3", "#0891b2", "#059669"];
  const STEPS_DARK = ["#7d93ff", "#a78bfa", "#f472b6", "#22d3ee", "#34d399"];
  const dark = () => getComputedStyle(document.documentElement).colorScheme.includes("dark");
  const stepColor = (k) => (dark() ? STEPS_DARK : STEPS_LIGHT)[Math.max(0, Math.min(4, k))];

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const tc = reduce ? BUILD + HOLD1 + REUSE + 10 : t % CYCLE;
    let mode, progress;
    if (tc < BUILD) { mode = "build"; progress = tc / BUILD; }
    else if (tc < BUILD + HOLD1) { mode = "built"; progress = 1; }
    else if (tc < BUILD + HOLD1 + REUSE) { mode = "reuse"; progress = (tc - BUILD - HOLD1) / REUSE; }
    else { mode = "done"; progress = 1; }

    setCaption(mode === "build" || mode === "built"
      ? "Query 1 · reasoning each step from scratch"
      : "Query 2 · the same steps, reused in a flash");

    // Background hyperedges.
    hyperedges.forEach((g) => {
      blob(g, t, 9);
      ctx.fillStyle = withAlpha(C.accent, 0.05);
      ctx.fill();
      ctx.strokeStyle = withAlpha(C.line, 0.9);
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Path hyperedges.
    const steps = path.length;
    const litCount = mode === "build" ? progress * steps : steps;
    const flash = mode === "reuse" ? 1 - progress : 0;
    path.forEach((e, k) => {
      const ids = [...e.tail, e.head];
      const lit = Math.max(0, Math.min(1, litCount - k));
      if (lit <= 0) return;
      const reused = mode === "reuse" || mode === "done";
      const col = stepColor(k);
      blob(ids, t, 12);
      ctx.fillStyle = withAlpha(col, (reused ? 0.18 + flash * 0.3 : 0.14) * lit);
      ctx.fill();
      ctx.strokeStyle = withAlpha(col, 0.9 * lit);
      ctx.lineWidth = reused ? 2 : 1.4;
      ctx.setLineDash(reused ? [] : [5, 5]);
      ctx.lineDashOffset = -t * 0.02;
      ctx.stroke();
      ctx.setLineDash([]);
      // Premise -> conclusion strands.
      const [hx, hy] = pos(e.head, t);
      e.tail.forEach((i) => {
        const [x, y] = pos(i, t);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + hx) / 2, (y + hy) / 2 - 14, hx, hy);
        ctx.strokeStyle = withAlpha(col, 0.95 * lit);
        ctx.lineWidth = reused ? 2.2 : 1.6;
        ctx.stroke();
      });
    });

    // Travelling pulse along the path.
    if (mode === "build" || mode === "reuse") {
      const f = (mode === "build" ? progress : progress) * steps;
      const k = Math.min(steps - 1, Math.floor(f));
      const local = f - k;
      const from = k === 0 ? pos(START, t) : pos(path[k - 1].head, t);
      const to = pos(path[k].head, t);
      const x = from[0] + (to[0] - from[0]) * local;
      const y = from[1] + (to[1] - from[1]) * local - Math.sin(local * Math.PI) * 14;
      const pc = stepColor(k);
      const g = ctx.createRadialGradient(x, y, 0, x, y, mode === "reuse" ? 26 : 18);
      g.addColorStop(0, withAlpha(pc, 0.95));
      g.addColorStop(1, withAlpha(pc, 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, mode === "reuse" ? 26 : 18, 0, Math.PI * 2); ctx.fill();
      if (!reduce) {
        for (let p = 0; p < (mode === "reuse" ? 4 : 2); p++) {
          particles.push({ x, y, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, life: 1, c: pc });
        }
      }
    }

    // Particles.
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life -= 0.025;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8 * p.life + 0.4, 0, Math.PI * 2);
      ctx.fillStyle = withAlpha(p.c || C.accent, p.life * 0.8);
      ctx.fill();
    }

    // Nodes.
    const onPath = new Map();
    path.forEach((e, k) => { if (litCount - k > 0) { e.tail.forEach((i) => onPath.has(i) || onPath.set(i, k)); onPath.set(e.head, k); } });
    nodes.forEach((n, i) => {
      const [x, y] = pos(i, t);
      const special = i === START || i === GOAL;
      const lit = onPath.has(i) || special;
      const nc = i === GOAL ? stepColor(4) : i === START ? stepColor(0) : onPath.has(i) ? stepColor(onPath.get(i)) : C.accent;
      let r = n.r + (lit ? 1.4 : 0);
      if (mouse.active) {
        const d = Math.hypot(x / W - mouse.x, y / H - mouse.y);
        if (d < 0.1) r += (0.1 - d) * 30;
      }
      if (lit) {
        ctx.beginPath();
        ctx.arc(x, y, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = withAlpha(nc, 0.2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = lit ? nc : C.node;
      ctx.fill();
    });

    // Pulsing rings on the query (start) and the answer (goal).
    const ring = (i, phaseT, strength) => {
      const [x, y] = pos(i, t);
      const rr = 8 + (phaseT % 1) * 22;
      ctx.beginPath();
      ctx.arc(x, y, rr, 0, Math.PI * 2);
      ctx.strokeStyle = withAlpha(C.accent, (1 - (phaseT % 1)) * strength);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };
    if (!reduce) ring(START, t / 1400, 0.7);
    if (mode === "built" || mode === "done") ring(GOAL, (tc % 1200) / 1200, 0.9);

    // Labels.
    ctx.font = "500 11px 'JetBrains Mono', ui-monospace, monospace";
    ctx.fillStyle = C.muted;
    const [sx, sy] = pos(START, t), [gx, gy] = pos(GOAL, t);
    ctx.textAlign = "left"; ctx.fillText("query", sx - 12, sy + 26);
    ctx.textAlign = "right"; ctx.fillText("answer", gx + 14, gy + 26);

    // Cost meter: thinking spent on this query.
    const meterW = Math.min(150, W * 0.36);
    const mx = W - meterW - 18, my = 22;
    const spent = mode === "build" ? progress : mode === "built" ? 1 : mode === "reuse" ? progress * 0.2 : 0.2;
    ctx.textAlign = "left";
    ctx.fillText("thinking spent", mx, my);
    ctx.fillStyle = withAlpha(C.line, 1);
    ctx.fillRect(mx, my + 8, meterW, 6);
    const mg = ctx.createLinearGradient(mx, 0, mx + meterW, 0);
    mg.addColorStop(0, stepColor(0)); mg.addColorStop(0.5, stepColor(2)); mg.addColorStop(1, stepColor(4));
    ctx.fillStyle = mg;
    ctx.fillRect(mx, my + 8, meterW * spent, 6);

    if (!reduce) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// Scroll reveals, growing bars and count-up figures.
(function reveals() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll("main section:not(.hero) .split > *, main section:not(.hero) > .stack > *, main section:not(.hero) .cta, .pillar, .list-plain li, .card, .channel");
  if (reduce || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("js-reveal");
  const show = (el) => {
    el.classList.add("in");
    el.querySelectorAll?.("[data-count]").forEach(countUp);
    if (el.matches?.("[data-count]")) countUp(el);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  targets.forEach((el, i) => { el.style.setProperty("--d", `${(i % 4) * 90}ms`); io.observe(el); });
  // Safety net: never leave content hidden.
  setTimeout(() => targets.forEach(show), 4000);

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const end = Number(el.dataset.count), suffix = el.dataset.suffix || "";
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();

// Copy buttons
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied";
    } catch (e) {
      btn.textContent = "Select and copy above";
    }
    setTimeout(() => (btn.textContent = "Copy"), 2000);
  });
});
