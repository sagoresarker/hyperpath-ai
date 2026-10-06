// Hero diagram: points light up along reused paths. Decorative only.
(function () {
  const canvas = document.getElementById("paths");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Deterministic layout so the figure looks the same for every visitor.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const nodes = Array.from({ length: 34 }, () => ({ x: 0.1 + rand() * 0.8, y: 0.1 + rand() * 0.75 }));
  const groups = [];
  for (let i = 0; i < 16; i++) {
    const a = Math.floor(rand() * nodes.length);
    const near = nodes
      .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[a].x, n.y - nodes[a].y) }))
      .sort((p, q) => p.d - q.d)
      .slice(1, 3 + Math.floor(rand() * 2))
      .map((p) => p.j);
    groups.push([a, ...near]);
  }
  const route = [0, 3, 7, 11, 14];

  function colors() {
    const s = getComputedStyle(document.documentElement);
    return {
      node: s.getPropertyValue("--node").trim(),
      line: s.getPropertyValue("--line").trim(),
      accent: s.getPropertyValue("--accent").trim(),
      soft: s.getPropertyValue("--accent-soft").trim(),
    };
  }

  function size() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return r;
  }

  let rect = size();
  window.addEventListener("resize", () => { rect = size(); draw(performance.now()); });

  function draw(t) {
    const c = colors();
    const W = rect.width, H = rect.height;
    ctx.clearRect(0, 0, W, H);
    const P = (i) => [nodes[i].x * W, nodes[i].y * H];
    const phase = reduce ? route.length : (t / 900) % (route.length + 2);

    groups.forEach((g, gi) => {
      const active = route.indexOf(gi);
      const lit = active !== -1 && active < phase;
      const [hx, hy] = P(g[g.length - 1]);
      g.slice(0, -1).forEach((i) => {
        const [x, y] = P(i);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + hx) / 2, (y + hy) / 2 - 18, hx, hy);
        ctx.strokeStyle = lit ? c.accent : c.line;
        ctx.lineWidth = lit ? 2 : 1.2;
        ctx.stroke();
      });
    });

    nodes.forEach((n, i) => {
      const [x, y] = P(i);
      const lit = groups.some((g, gi) => route.indexOf(gi) !== -1 && route.indexOf(gi) < phase && g.includes(i));
      ctx.beginPath();
      ctx.arc(x, y, lit ? 5 : 3.2, 0, Math.PI * 2);
      ctx.fillStyle = lit ? c.accent : c.node;
      ctx.fill();
    });

    if (!reduce) requestAnimationFrame(draw);
  }
  draw(performance.now());
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
