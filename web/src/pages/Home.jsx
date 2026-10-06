import { m } from "framer-motion";
import Layout from "../components/Layout.jsx";
import Playground from "../components/Playground.jsx";
import { ToolButton, SectionHead, Reveal, CountUp } from "../components/ui.jsx";

const ease = [0.2, 0.7, 0.2, 1];
const SOURCE = "https://www.techtimes.com/articles/323879/20260811/gartner-marks-first-year-inference-spending-beats-ai-training-55-cents-every-cloud-dollar.htm";

function Hero() {
  return (
    <section className="relative grid grid-cols-12 gap-x-6 pb-24 pt-8 lg:pt-6">
      {/* left ruler */}
      <div aria-hidden className="absolute -left-1 top-6 hidden h-[520px] w-3 flex-col justify-between lg:flex">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className={`block h-px bg-slate-300 dark:bg-slate-700 ${i % 5 === 0 ? "w-3" : "w-1.5"}`} />
        ))}
      </div>

      <div className="relative z-10 col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pl-8">
        <m.div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <span className="text-indigo-600 dark:text-indigo-400">Working paper HP-001</span>
          <span>Reasoning infrastructure</span>
          <span>Rev. 2026.10</span>
        </m.div>

        <m.h1
          className="mt-5 text-[clamp(2.9rem,7.4vw,6.4rem)] leading-[0.98] tracking-[-0.025em] lg:pr-6"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.05 }}
        >
          AI that gets <em className="font-normal text-indigo-600 dark:text-indigo-400">cheaper</em>
          <br className="hidden sm:block" /> the more it thinks.
        </m.h1>

        <m.div className="mt-8 grid max-w-xl gap-6 sm:grid-cols-[6.5rem_1fr]"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }}>
          <span className="label pt-1">Abstract</span>
          <p className="text-[1.06rem] leading-relaxed text-slate-700 dark:text-slate-300">
            Today, every AI answer is reasoned from scratch and then discarded. Hyperpath AI is building infrastructure that
            stores reasoning, verifies it and uses it again, so the marginal cost of each answer falls as a system is used.
          </p>
        </m.div>

        <m.div className="mt-8 flex flex-wrap gap-3 sm:pl-[7.5rem]"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 }}>
          <ToolButton primary href="contact.html">Request a briefing</ToolButton>
          <ToolButton href="#method">Read the overview</ToolButton>
        </m.div>

        <m.dl className="mt-10 grid max-w-md grid-cols-3 border-y border-slate-200 font-mono text-[11px] dark:border-slate-800 sm:ml-[7.5rem]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>
          {[["Field", "Inference efficiency"], ["Principle", "Verify, then reuse"], ["Deploy", "Cloud · edge"]].map(([k, v], i) => (
            <div key={k} className={`py-3 ${i ? "border-l border-slate-200 pl-4 dark:border-slate-800" : ""}`}>
              <dt className="uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{k}</dt>
              <dd className="mt-1 text-slate-800 dark:text-slate-200">{v}</dd>
            </div>
          ))}
        </m.dl>
      </div>

      <m.div
        className="relative z-0 col-span-12 mt-14 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-64"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }}
      >
        <Playground />
      </m.div>
    </section>
  );
}

function Problem() {
  return (
    <section className="grid gap-10 py-16 lg:grid-cols-12">
      <SectionHead no="1" label="Problem" className="lg:col-span-12" />
      <Reveal className="lg:col-span-6">
        <h2 className="text-3xl leading-[1.12] md:text-[2.6rem]">AI pays for the same thinking again and again.</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-slate-700 dark:text-slate-300">
          When many people ask related questions, a model works through many of the same intermediate steps for each of them.
          The work is computed, billed and discarded. As models reason longer before they answer, that repeated cost grows.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
        <div className="panel relative p-7">
          <span className="label">Inference share of AI cloud spend, 2026</span>
          <div className="mt-3 flex items-baseline gap-1">
            <CountUp to={55} suffix="%" className="font-serif text-7xl tabular-nums tracking-tight md:text-8xl" />
            <a href="#ref-1" className="cite">[1]</a>
          </div>
          <div className="mt-5 h-2 w-full bg-slate-100 dark:bg-slate-800" aria-hidden>
            <m.div className="h-full bg-indigo-500" initial={{ width: 0 }} whileInView={{ width: "55%" }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            <span>Running models</span><span>Training</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">The first year in which spending on running models exceeded spending on training them.</p>
        </div>
      </Reveal>
    </section>
  );
}

function Method() {
  const stages = [
    { no: "01", name: "Derive", text: "A new question is worked through step by step, as AI systems do today." },
    { no: "02", name: "Verify", text: "Each step is checked before anything is kept. Only steps that hold up are stored." },
    { no: "03", name: "Reuse", text: "When a related question arrives, stored steps are supplied instead of recomputed. Less computation, faster answers." },
  ];
  return (
    <section id="method" className="scroll-mt-28 py-16">
      <SectionHead no="2" label="Method overview" title="Work it out once. Check it. Use it again." />
      <Reveal delay={0.05} className="mt-10">
        <div className="panel">
          {/* pipeline schematic */}
          <svg viewBox="0 0 900 120" className="block w-full border-b border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600" role="img" aria-label="Pipeline: derive, then verify, then reuse, with reuse feeding later queries.">
            <defs>
              <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
              </marker>
            </defs>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={40 + i * 300} y="30" width="220" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
                <text x={150 + i * 300} y="60" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200" style={{ font: '500 13px "IBM Plex Mono", monospace', letterSpacing: "0.12em" }}>
                  {stages[i].no} {stages[i].name.toUpperCase()}
                </text>
              </g>
            ))}
            <m.path d="M260 55 H340" stroke="currentColor" strokeWidth="1" fill="none" markerEnd="url(#arr)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} />
            <m.path d="M560 55 H640" stroke="currentColor" strokeWidth="1" fill="none" markerEnd="url(#arr)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.6 }} />
            <m.path d="M750 80 V102 H150 V84" stroke="#6366F1" strokeWidth="1" strokeDasharray="4 4" fill="none" markerEnd="url(#arr)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 1 }} style={{ color: "#6366F1" }} />
            <text x="450" y="116" textAnchor="middle" fill="#6366F1" style={{ font: '500 10px "IBM Plex Mono", monospace', letterSpacing: "0.14em" }}>STORED STEPS FEED LATER QUERIES</text>
          </svg>
          <div className="grid md:grid-cols-3">
            {stages.map((s, i) => (
              <div key={s.no} className={`p-6 ${i ? "border-t border-slate-200 md:border-l md:border-t-0 dark:border-slate-800" : ""}`}>
                <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400">{s.no}</div>
                <h3 className="mt-2 text-2xl">{s.name}</h3>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Vision() {
  // Illustrative series: relative cost per answer over successive queries.
  const reuse = [1, 0.8, 0.64, 0.52, 0.43, 0.37, 0.33, 0.3];
  const W = 560, H = 240, L = 44, B = 28, T = 16, R = 12;
  const x = (i) => L + (i / (reuse.length - 1)) * (W - L - R);
  const y = (v) => T + (1 - v / 1.1) * (H - T - B);
  const path = reuse.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return (
    <section className="grid gap-10 py-16 lg:grid-cols-12">
      <SectionHead no="3" label="Vision" className="lg:col-span-12" />
      <Reveal className="lg:col-span-5">
        <h2 className="text-3xl leading-[1.12] md:text-[2.6rem]">Reasoning should be an asset, not a recurring bill.</h2>
        <p className="mt-5 leading-relaxed text-slate-700 dark:text-slate-300">
          Spaceflight became affordable when rockets became reusable. We expect the same shift in machine reasoning: work done
          once should make the next problem faster and cheaper to solve.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
        <figure className="panel p-5">
          <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Illustrative chart. Cost per answer stays flat without reuse and falls with reuse.">
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <g key={v}>
                <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
                <text x={L - 8} y={y(v) + 3} textAnchor="end" className="fill-slate-500 dark:fill-slate-400" style={{ font: '400 10px "IBM Plex Mono", monospace' }}>{v.toFixed(2)}</text>
              </g>
            ))}
            {reuse.map((_, i) => (
              <text key={i} x={x(i)} y={H - 10} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" style={{ font: '400 10px "IBM Plex Mono", monospace' }}>{`q${i + 1}`}</text>
            ))}
            <line x1={L} x2={W - R} y1={y(1)} y2={y(1)} stroke="#64748B" strokeWidth="1.5" strokeDasharray="5 4" />
            <m.path d={path} fill="none" stroke="#6366F1" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} />
            {reuse.map((v, i) => (
              <m.circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#6366F1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.18 }} />
            ))}
            <text x={W - R} y={y(1) - 8} textAnchor="end" fill="#64748B" style={{ font: '500 10px "IBM Plex Mono", monospace', letterSpacing: "0.1em" }}>WITHOUT REUSE</text>
            <text x={x(7)} y={y(0.3) - 12} textAnchor="end" fill="#6366F1" style={{ font: '500 10px "IBM Plex Mono", monospace', letterSpacing: "0.1em" }}>WITH REUSE</text>
          </svg>
          <figcaption className="mt-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <span className="text-slate-800 dark:text-slate-200">Fig. 2.</span> Relative cost per answer across successive related queries. Illustrative of our goal; not a measured result.
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

function Commitments() {
  const items = [
    { id: "C1", tag: "Reusable", title: "Work done once keeps paying off", text: "Systems that improve with use, so costs fall the longer they run." },
    { id: "C2", tag: "Trustworthy", title: "Only what holds up is reused", text: "Verification precedes reuse, and every answer can be traced to its sources." },
    { id: "C3", tag: "Efficient", title: "Built for everyday hardware", text: "Capable reasoning on laptops and edge devices, keeping data private and costs low." },
  ];
  return (
    <section className="py-16">
      <SectionHead no="4" label="Commitments" title="Three design constraints we hold ourselves to." />
      <div className="mt-10 grid border-t border-slate-200 md:grid-cols-3 dark:border-slate-800">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i * 0.08} className={`group py-7 md:px-7 ${i ? "border-t border-slate-200 md:border-l md:border-t-0 dark:border-slate-800" : "md:pl-0"}`}>
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-indigo-600 dark:text-indigo-400">{it.id}</span>
              <span className="text-slate-500 dark:text-slate-400">{it.tag}</span>
            </div>
            <h3 className="mt-4 text-2xl leading-snug transition-colors group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{it.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{it.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Applications() {
  const rows = [
    ["A1", "AI assistants and agents at scale", "Usage grows faster than the budget for it."],
    ["A2", "Rule-heavy operations", "Claims, eligibility, compliance and support, where similar cases recur daily."],
    ["A3", "Privacy-sensitive and on-device products", "Sending every request to a large cloud model is not an option."],
  ];
  return (
    <section className="py-16">
      <SectionHead no="5" label="Applications" title="Where repeated reasoning is most expensive." />
      <Reveal delay={0.05} className="mt-10">
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-slate-200 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="w-16 px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Setting</th>
                <th className="px-5 py-3 font-medium">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([id, a, b]) => (
                <tr key={id} className="border-b border-slate-200 transition-colors last:border-0 hover:bg-indigo-50/60 dark:border-slate-800 dark:hover:bg-indigo-500/5">
                  <td className="px-5 py-4 font-mono text-xs text-indigo-600 dark:text-indigo-400">{id}</td>
                  <td className="px-5 py-4 font-serif text-lg">{a}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

function Correspondence() {
  return (
    <section className="py-16">
      <Reveal>
        <div className="panel grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-end md:p-12">
          <div>
            <span className="label">Correspondence</span>
            <h2 className="mt-3 text-3xl leading-[1.12] md:text-[2.6rem]">We are early, and we publish only what we have measured.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-700 dark:text-slate-300">
              Hyperpath AI is research-led. We welcome conversations with teams running AI at scale, and with researchers working on reasoning and efficient inference.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ToolButton primary href="contact.html">Get in touch</ToolButton>
            <ToolButton href="about.html">About the lab</ToolButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function References() {
  return (
    <section className="pb-8 pt-4">
      <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
        <span className="label">References</span>
        <ol className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li id="ref-1" className="flex gap-3 scroll-mt-28">
            <span className="font-mono text-indigo-600 dark:text-indigo-400">[1]</span>
            <span>
              Gartner, reported by TechTimes, “Gartner marks first year inference spending beats AI training,” August 2026.{" "}
              <a className="underline decoration-slate-300 underline-offset-2 hover:text-indigo-600 dark:decoration-slate-700" href={SOURCE}>Link</a>
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout current="home">
      <Hero />
      <Problem />
      <Method />
      <Vision />
      <Commitments />
      <Applications />
      <Correspondence />
      <References />
    </Layout>
  );
}
