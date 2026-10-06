import { m } from "framer-motion";
import Layout from "../components/Layout.jsx";
import Playground from "../components/Playground.jsx";
import { ToolButton, SectionHead, Reveal, CountUp } from "../components/ui.jsx";

const ease = [0.2, 0.7, 0.2, 1];
const SOURCE = "https://www.techtimes.com/articles/323879/20260811/gartner-marks-first-year-inference-spending-beats-ai-training-55-cents-every-cloud-dollar.htm";

function Hero() {
  const specs = [
    ["Field", "Inference efficiency"],
    ["Principle", "Verify, then reuse"],
    ["Deploy", "Cloud and edge"],
    ["Stage", "Early research"],
  ];
  return (
    <section className="pb-20 pt-12 lg:pt-16">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pt-6">
          <m.p className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            Research overview <span className="mx-2 text-slate-300">/</span> Reasoning infrastructure <span className="mx-2 text-slate-300">/</span> October 2026
          </m.p>

          <m.h1
            className="mt-6 text-[clamp(2.75rem,6.2vw,5.25rem)] leading-[1.02] tracking-[-0.035em]"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            AI that gets <em className="pr-1 text-[1.08em]">cheaper</em> the more it thinks.
          </m.h1>

          <m.div className="mt-8 max-w-xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }}>
            <p className="label">Abstract</p>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">
              Today, every AI answer is reasoned from scratch and then discarded. Hyperpath AI is building infrastructure that
              stores reasoning, verifies it and uses it again, so the marginal cost of each answer falls as a system is used.
            </p>
          </m.div>

          <m.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 }}>
            <ToolButton primary href="contact.html">Request a briefing</ToolButton>
            <ToolButton href="#method">Read the overview</ToolButton>
          </m.div>
        </div>

        <m.div className="lg:col-span-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }}>
          <Playground />
        </m.div>
      </div>

      <m.dl
        className="mt-16 grid grid-cols-2 border-y border-slate-200 md:grid-cols-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
      >
        {specs.map(([k, v], i) => (
          <div key={k} className={`px-5 py-4 ${i % 2 ? "border-l border-slate-200" : ""} ${i === 2 ? "border-t border-slate-200 md:border-l md:border-t-0" : ""} ${i === 3 ? "border-t md:border-t-0" : ""}`}>
            <dt className="label">{k}</dt>
            <dd className="mt-1.5 text-[15px] font-medium text-slate-900">{v}</dd>
          </div>
        ))}
      </m.dl>
    </section>
  );
}

function Problem() {
  return (
    <section className="grid gap-10 py-16 lg:grid-cols-12">
      <SectionHead no="1" label="Problem" className="lg:col-span-12" />
      <Reveal className="lg:col-span-6">
        <h2 className="text-3xl leading-[1.12] md:text-[2.6rem]">AI pays for the same thinking again and again.</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-slate-600">
          When many people ask related questions, a model works through many of the same intermediate steps for each of them.
          The work is computed, billed and discarded. As models reason longer before they answer, that repeated cost grows.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
        <div className="panel relative p-7">
          <span className="label">Inference share of AI cloud spend, 2026</span>
          <div className="mt-3 flex items-baseline gap-1">
            <CountUp to={55} suffix="%" className="text-7xl font-semibold tabular-nums tracking-[-0.04em] text-slate-900 md:text-8xl" />
            <a href="#ref-1" className="cite">[1]</a>
          </div>
          <div className="mt-5 h-2 w-full bg-slate-100" aria-hidden>
            <m.div className="h-full bg-indigo-500" initial={{ width: 0 }} whileInView={{ width: "55%" }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
            <span>Running models</span><span>Training</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-600">The first year in which spending on running models exceeded spending on training them.</p>
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
          <svg viewBox="0 0 900 120" className="block w-full border-b border-slate-200 text-slate-400" role="img" aria-label="Pipeline: derive, then verify, then reuse, with reuse feeding later queries.">
            <defs>
              <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
              </marker>
            </defs>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={40 + i * 300} y="30" width="220" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
                <text x={150 + i * 300} y="60" textAnchor="middle" className="fill-slate-800" style={{ font: '500 13px "IBM Plex Mono", monospace', letterSpacing: "0.12em" }}>
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
              <div key={s.no} className={`p-6 ${i ? "border-t border-slate-200 md:border-l md:border-t-0" : ""}`}>
                <div className="font-mono text-xs text-indigo-600">{s.no}</div>
                <h3 className="mt-2 text-2xl">{s.name}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
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
        <p className="mt-5 leading-relaxed text-slate-600">
          Spaceflight became affordable when rockets became reusable. We expect the same shift in machine reasoning: work done
          once should make the next problem faster and cheaper to solve.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
        <figure className="panel p-5">
          <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Illustrative chart. Cost per answer stays flat without reuse and falls with reuse.">
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <g key={v}>
                <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="stroke-slate-200" strokeWidth="1" />
                <text x={L - 8} y={y(v) + 3} textAnchor="end" className="fill-slate-500" style={{ font: '400 10px "IBM Plex Mono", monospace' }}>{v.toFixed(2)}</text>
              </g>
            ))}
            {reuse.map((_, i) => (
              <text key={i} x={x(i)} y={H - 10} textAnchor="middle" className="fill-slate-500" style={{ font: '400 10px "IBM Plex Mono", monospace' }}>{`q${i + 1}`}</text>
            ))}
            <line x1={L} x2={W - R} y1={y(1)} y2={y(1)} stroke="#64748B" strokeWidth="1.5" strokeDasharray="5 4" />
            <m.path d={path} fill="none" stroke="#6366F1" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} />
            {reuse.map((v, i) => (
              <m.circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#6366F1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.18 }} />
            ))}
            <text x={W - R} y={y(1) - 8} textAnchor="end" fill="#64748B" style={{ font: '500 10px "IBM Plex Mono", monospace', letterSpacing: "0.1em" }}>WITHOUT REUSE</text>
            <text x={x(7)} y={y(0.3) - 12} textAnchor="end" fill="#6366F1" style={{ font: '500 10px "IBM Plex Mono", monospace', letterSpacing: "0.1em" }}>WITH REUSE</text>
          </svg>
          <figcaption className="mt-3 font-mono text-[11px] text-slate-500">
            <span className="text-slate-800">Fig. 2.</span> Relative cost per answer across successive related queries. Illustrative of our goal; not a measured result.
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
      <div className="mt-10 grid border-t border-slate-200 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i * 0.08} className={`group py-7 md:px-7 ${i ? "border-t border-slate-200 md:border-l md:border-t-0" : "md:pl-0"}`}>
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-indigo-600">{it.id}</span>
              <span className="text-slate-500">{it.tag}</span>
            </div>
            <h3 className="mt-4 text-2xl leading-snug transition-colors group-hover:text-indigo-700">{it.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-600">{it.text}</p>
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
              <tr className="border-b border-slate-200 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <th className="w-16 px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Setting</th>
                <th className="px-5 py-3 font-medium">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([id, a, b]) => (
                <tr key={id} className="border-b border-slate-200 transition-colors last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-4 font-mono text-xs text-indigo-600">{id}</td>
                  <td className="px-5 py-4 text-[15px] font-medium text-slate-900">{a}</td>
                  <td className="px-5 py-4 text-slate-600">{b}</td>
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
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
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
      <div className="border-t border-slate-200 pt-6">
        <span className="label">References</span>
        <ol className="mt-3 space-y-1 text-sm text-slate-600">
          <li id="ref-1" className="flex gap-3 scroll-mt-28">
            <span className="font-mono text-indigo-600">[1]</span>
            <span>
              Gartner, reported by TechTimes, “Gartner marks first year inference spending beats AI training,” August 2026.{" "}
              <a className="underline decoration-slate-300 underline-offset-2 hover:text-indigo-600" href={SOURCE}>Link</a>
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
