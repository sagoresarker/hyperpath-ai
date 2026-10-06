import { useEffect, useRef } from "react";

/**
 * Lightweight animated background: soft colour glows drifting slowly plus a few
 * twinkling particles. One fixed canvas, capped frame rate, pauses when the tab
 * is hidden, and draws a single still frame for reduced-motion users.
 */
export default function Background() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#3B5BFF", "#FF4D8D", "#FFC93C", "#22D3A6", "#8B5CF6"];
    let W = 0, H = 0, raf = 0, last = 0;

    const glows = colors.map((c, i) => ({
      c, x: Math.random(), y: Math.random(), r: 0.28 + Math.random() * 0.18,
      sx: 0.00004 + Math.random() * 0.00005, sy: 0.00003 + Math.random() * 0.00005, p: i * 1.3,
    }));
    const dots = Array.from({ length: 36 }, (_, i) => ({
      x: Math.random(), y: Math.random(), r: 1.5 + Math.random() * 2.5,
      c: colors[i % colors.length], v: 0.00002 + Math.random() * 0.00004, p: Math.random() * 6.28,
      shape: i % 3,
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (t - last < 33) return; // ~30fps is plenty for a background
      last = t;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      for (const g of glows) {
        const x = (0.5 + 0.45 * Math.sin(t * g.sx + g.p)) * W;
        const y = (0.5 + 0.45 * Math.cos(t * g.sy + g.p * 0.7)) * H;
        const r = g.r * Math.max(W, H);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, g.c + "2e");
        grad.addColorStop(1, g.c + "00");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }
      for (const d of dots) {
        const y = ((d.y - t * d.v) % 1 + 1) % 1;
        const x = d.x + Math.sin(t * 0.0006 + d.p) * 0.01;
        const a = 0.35 + 0.35 * Math.sin(t * 0.002 + d.p);
        ctx.globalAlpha = a;
        ctx.fillStyle = d.c;
        const px = x * W, py = y * H;
        if (d.shape === 0) {
          ctx.beginPath(); ctx.arc(px, py, d.r, 0, Math.PI * 2); ctx.fill();
        } else if (d.shape === 1) {
          ctx.save(); ctx.translate(px, py); ctx.rotate(t * 0.001 + d.p);
          ctx.fillRect(-d.r, -d.r, d.r * 2, d.r * 2); ctx.restore();
        } else {
          ctx.beginPath();
          ctx.moveTo(px, py - d.r * 1.6); ctx.lineTo(px + d.r * 0.5, py - d.r * 0.5);
          ctx.lineTo(px + d.r * 1.6, py); ctx.lineTo(px + d.r * 0.5, py + d.r * 0.5);
          ctx.lineTo(px, py + d.r * 1.6); ctx.lineTo(px - d.r * 0.5, py + d.r * 0.5);
          ctx.lineTo(px - d.r * 1.6, py); ctx.lineTo(px - d.r * 0.5, py - d.r * 0.5);
          ctx.closePath(); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (reduce) cancelAnimationFrame(raf);
    }

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-20 dot-grid" aria-hidden />
      <canvas ref={ref} className="fixed inset-0 -z-10 w-full h-full pointer-events-none" aria-hidden />
    </>
  );
}
