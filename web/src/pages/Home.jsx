import { m } from "framer-motion";
import Layout from "../components/Layout.jsx";
import Playground from "../components/Playground.jsx";
import { Hops, Vee, Lemma, Bubble } from "../components/Mascots.jsx";
import { Badge, PopButton, Reveal, CountUp } from "../components/ui.jsx";

const springy = { type: "spring", stiffness: 260, damping: 14 };

function Hero() {
  return (
    <section className="mx-auto max-w-6xl pt-10 pb-24 md:pt-16 grid gap-14 lg:grid-cols-[1fr_1.05fr] items-center">
      <div className="space-y-7">
        <m.div className="flex flex-wrap gap-2" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          {[
            ["Research-led", "sun", "🔬"],
            ["Verified reuse", "pink", "✅"],
            ["Edge-ready", "mint", "⚡"],
          ].map(([t, tone, icon]) => (
            <m.span key={t} variants={{ hidden: { opacity: 0, y: 12, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1, transition: springy } }}>
              <Badge tone={tone} icon={icon}>{t}</Badge>
            </m.span>
          ))}
        </m.div>

        <m.h1
          className="text-[clamp(2.7rem,7vw,5.4rem)] font-extrabold leading-[0.95]"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springy, delay: 0.1 }}
        >
          AI that gets{" "}
          <m.span className="marker" style={{ "--marker": "#FF4D8D80" }} whileHover={{ rotate: -3, scale: 1.05 }}>cheaper</m.span>
          <br className="hidden sm:block" /> the more it{" "}
          <m.span className="marker" whileHover={{ rotate: 3, scale: 1.05 }}>thinks.</m.span>
        </m.h1>

        <m.p
          className="max-w-xl text-lg md:text-xl text-ink/80 font-semibold"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springy, delay: 0.2 }}
        >
          Today, every AI answer is reasoned from scratch and then thrown away. Hyperpath AI is building infrastructure that
          saves reasoning, checks it and uses it again, so each answer costs less than the one before.
        </m.p>

        <m.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springy, delay: 0.3 }}>
          <PopButton href="contact.html" tone="sun">Talk to us →</PopButton>
          <PopButton href="#how" tone="white">How it works</PopButton>
        </m.div>
        <p className="font-mono text-xs font-bold text-ink/60">👉 Try the playground: tap the nodes, then ask Hops a question.</p>
      </div>

      <m.div initial={{ opacity: 0, scale: 0.92, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ ...springy, delay: 0.25 }} className="lg:pl-6">
        <Playground />
      </m.div>
    </section>
  );
}

function Crew() {
  const crew = [
    {
      n: "1", name: "Hops", role: "Thinks it through", Mascot: Hops, tone: "bg-sky", bubble: "white",
      text: "When a new question arrives, I work it out one step at a time, just like AI does today.",
    },
    {
      n: "2", name: "Vee", role: "Checks every step", Mascot: Vee, tone: "bg-mint", bubble: "white",
      text: "Before anything is kept, I check it. Only steps that hold up get saved. No shortcuts on correctness.",
    },
    {
      n: "3", name: "Lemma", role: "Reuses what's proven", Mascot: Lemma, tone: "bg-sun", bubble: "white",
      text: "Next time a similar question shows up, I hand over the saved steps. Less thinking, faster answers, lower cost.",
    },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl py-20 scroll-mt-24">
      <Reveal className="mb-12 max-w-2xl space-y-3">
        <span className="eyebrow text-pink">How it works</span>
        <h2 className="text-4xl md:text-6xl font-extrabold">Meet the crew.</h2>
        <p className="text-lg font-semibold text-ink/75">Three friendly helpers explain the big idea: reasoning that is worked out once, checked, and then reused.</p>
      </Reveal>
      <div className="grid gap-8 md:grid-cols-3">
        {crew.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.12}>
            <m.article
              className="card-pop h-full p-6 flex flex-col gap-5"
              whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5, boxShadow: "10px 12px 0 0 #16133A" }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
            >
              <div className="flex items-center justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl border-3 border-ink font-display text-2xl font-extrabold ${c.tone} ${c.tone === "bg-sky" ? "text-white" : ""}`}>{c.n}</span>
                <Badge tone="white">{c.role}</Badge>
              </div>
              <div className="flex items-end gap-2">
                <c.Mascot size={92} />
                <Bubble side="left" className="flex-1 mb-10" tone={c.bubble}>
                  <p className="text-sm font-bold leading-snug">{c.text}</p>
                </Bubble>
              </div>
              <h3 className="text-2xl font-extrabold">{c.name}</h3>
            </m.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] border-3 border-ink bg-ink text-white shadow-poplg overflow-hidden relative">
        <m.div
          aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink/40 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 6, repeat: Infinity }}
        />
        <m.div
          aria-hidden className="absolute -left-20 -bottom-28 h-72 w-72 rounded-full bg-sky/50 blur-3xl"
          animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 7, repeat: Infinity }}
        />
        <div className="relative grid gap-10 p-8 md:p-14 md:grid-cols-[1.2fr_1fr] items-center">
          <Reveal className="space-y-5">
            <span className="eyebrow text-sun">The problem</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">AI pays for the same thinking again and again.</h2>
            <p className="text-lg text-white/80 font-semibold max-w-xl">
              When thousands of people ask related questions, a model works through many of the same steps for each of them.
              The work is done, billed and thrown away. As models think harder before answering, that repeated cost keeps growing.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex justify-center">
            <m.div
              className="relative w-full max-w-xs rotate-[-4deg] rounded-[1.75rem] border-3 border-white bg-sun p-7 text-ink shadow-[8px_8px_0_0_#FF4D8D]"
              whileHover={{ rotate: 0, scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              <span className="absolute -top-4 -right-4 rotate-12 rounded-full border-3 border-ink bg-pink px-3 py-1 font-mono text-xs font-bold text-white">2026</span>
              <CountUp to={55} suffix="%" className="block font-display text-7xl md:text-8xl font-extrabold leading-none" />
              <p className="mt-3 font-bold">of AI cloud spending went to running models, not training them: the first year inference came out ahead.</p>
              <p className="mt-3 text-xs font-semibold text-ink/70">
                Source: Gartner, reported by{" "}
                <a className="underline" href="https://www.techtimes.com/articles/323879/20260811/gartner-marks-first-year-inference-spending-beats-ai-training-55-cents-every-cloud-dollar.htm">TechTimes</a>, August 2026.
              </p>
            </m.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  const today = [100, 100, 100, 100, 100, 100, 100, 100];
  const reuse = [100, 80, 64, 52, 43, 37, 33, 30];
  return (
    <section className="mx-auto max-w-6xl py-24 grid gap-12 lg:grid-cols-2 items-center">
      <Reveal className="space-y-5">
        <span className="eyebrow text-grape">Our vision</span>
        <h2 className="text-4xl md:text-6xl font-extrabold">Reasoning should be an <span className="marker" style={{ "--marker": "#22D3A680" }}>asset</span>, not a recurring bill.</h2>
        <p className="text-lg font-semibold text-ink/75 max-w-xl">
          Rockets became affordable when they became reusable. We believe the same shift is coming for machine reasoning:
          work done once should make the next problem easier, faster and cheaper to solve.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="card-pop p-6 space-y-6 relative">
          {[["Today", today, "bg-tang"], ["With reuse", reuse, "bg-mint"]].map(([label, data, color]) => (
            <div key={label} className="grid grid-cols-[6.5rem_1fr] items-end gap-3">
              <span className="font-display text-lg font-extrabold">{label}</span>
              <div className="flex h-24 items-end gap-1.5">
                {data.map((h, i) => (
                  <m.span
                    key={i}
                    className={`flex-1 rounded-t-lg border-3 border-ink ${color}`}
                    initial={{ height: "6%" }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 120, damping: 12, delay: i * 0.07 }}
                    whileHover={{ y: -6 }}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-end gap-2 pt-2">
            <Lemma size={78} />
            <Bubble side="left" className="mb-8 flex-1">
              <p className="text-sm font-bold">Each bar is the cost of one answer over time. It's an illustration of our goal, not a measured result.</p>
            </Bubble>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Commitments() {
  const items = [
    { tag: "Reusable", icon: "♻", title: "Work done once keeps paying off", text: "Systems that improve with use, so costs fall the longer they run, not rise.", tone: "bg-sun", rot: -2 },
    { tag: "Trustworthy", icon: "✅", title: "Only what holds up gets reused", text: "Speed is worthless if it spreads mistakes. Checking comes before reuse, and every answer can be traced back.", tone: "bg-mint", rot: 1.5 },
    { tag: "Everywhere", icon: "⚡", title: "Efficient enough for everyday hardware", text: "Capable reasoning on laptops and edge devices, keeping data private and costs low.", tone: "bg-sky text-white", rot: -1 },
  ];
  return (
    <section className="mx-auto max-w-6xl py-16">
      <Reveal className="mb-10 space-y-3">
        <span className="eyebrow text-sky">What we stand for</span>
        <h2 className="text-4xl md:text-6xl font-extrabold">Three commitments.</h2>
      </Reveal>
      <div className="grid gap-7 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.tag} delay={i * 0.1}>
            <m.div
              className={`h-full rounded-3xl border-3 border-ink p-7 shadow-pop ${it.tone}`}
              style={{ rotate: it.rot }}
              whileHover={{ rotate: 0, y: -10, scale: 1.03, boxShadow: "12px 14px 0 0 #16133A" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            >
              <m.span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border-3 border-ink bg-white text-2xl text-ink" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>{it.icon}</m.span>
              <span className="eyebrow opacity-80">{it.tag}</span>
              <h3 className="mt-2 text-2xl font-extrabold">{it.title}</h3>
              <p className="mt-3 font-semibold opacity-85">{it.text}</p>
            </m.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Audience() {
  const who = [
    { icon: "🤖", title: "Companies scaling AI assistants and agents", text: "Where usage grows faster than the budget for it.", tone: "bg-pink text-white" },
    { icon: "📋", title: "Rule-heavy operations", text: "Claims, eligibility, compliance and support, where similar cases repeat every day.", tone: "bg-grape text-white" },
    { icon: "🔒", title: "Privacy-sensitive and on-device products", text: "Where sending everything to a large cloud model is not an option.", tone: "bg-tang" },
  ];
  return (
    <section className="mx-auto max-w-6xl py-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <Reveal className="space-y-3">
        <span className="eyebrow text-tang">Who it's for</span>
        <h2 className="text-4xl md:text-5xl font-extrabold">Teams that make many related decisions.</h2>
      </Reveal>
      <div className="space-y-4">
        {who.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.08}>
            <m.div className="card-pop flex items-center gap-5 p-5" whileHover={{ x: 10, boxShadow: "10px 8px 0 0 #16133A" }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-3 border-ink text-2xl ${w.tone}`}>{w.icon}</span>
              <div>
                <h3 className="text-xl font-extrabold">{w.title}</h3>
                <p className="font-semibold text-ink/70">{w.text}</p>
              </div>
            </m.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border-3 border-ink bg-grape p-8 md:p-12 text-white shadow-poplg">
          <m.div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} animate={{ backgroundPositionX: ["0px", "24px"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <Hops size={130} wave />
            <div className="flex-1 space-y-3 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold">We're early, and building in the open where we can.</h2>
              <p className="text-lg font-semibold text-white/85">Hyperpath AI is a research-led company. We'll share results when they're ready and measured.</p>
            </div>
            <PopButton href="contact.html" tone="sun">Get in touch →</PopButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <Layout current="home">
      <Hero />
      <Crew />
      <Problem />
      <Vision />
      <Commitments />
      <Audience />
      <CTA />
    </Layout>
  );
}
