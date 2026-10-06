import { useState } from "react";
import { m } from "framer-motion";
import Layout from "../components/Layout.jsx";
import { Hops, Bubble } from "../components/Mascots.jsx";
import { Badge, PopButton, Reveal } from "../components/ui.jsx";

const REPO = "https://github.com/sagoresarkerbdcse/hyperpath-ai";
const topics = [
  { tag: "Partnerships", title: "Early design partners", text: "Teams whose AI costs grow with usage, and who want to shape what we build.", tone: "bg-pink text-white", icon: "🤝" },
  { tag: "Research", title: "Collaboration", text: "Academic and industry researchers working on reasoning, memory or efficient inference.", tone: "bg-mint", icon: "🧪" },
  { tag: "People", title: "Joining us", text: "Researchers and engineers who want to work on these problems early.", tone: "bg-sky text-white", icon: "🚀" },
];

export default function Contact() {
  const [copied, setCopied] = useState("");
  const copy = async () => {
    try { await navigator.clipboard.writeText(REPO); setCopied("Copied!"); }
    catch { setCopied("Select the link above to copy it"); }
    setTimeout(() => setCopied(""), 2200);
  };
  return (
    <Layout current="contact">
      <section className="mx-auto max-w-6xl pt-12 pb-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-center">
        <div className="space-y-6">
          <Badge tone="pink" icon="💬">Contact</Badge>
          <m.h1 className="text-[clamp(2.8rem,7vw,5.4rem)] font-extrabold leading-[0.95]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
            Let's <span className="marker" style={{ "--marker": "#22D3A680" }}>talk.</span>
          </m.h1>
          <p className="text-xl font-semibold text-ink/75 max-w-2xl">We'd love to hear from organisations that run AI at scale, researchers working on reasoning and efficiency, and people who want to build this with us.</p>
        </div>
        <div className="flex items-end justify-center gap-2">
          <Hops size={130} wave />
          <Bubble side="left" className="mb-28 w-52"><p className="text-sm font-bold">Say hi! I promise I'll remember it. 😉</p></Bubble>
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-8 grid gap-6 md:grid-cols-3">
        {topics.map((t, i) => (
          <Reveal key={t.tag} delay={i * 0.1}>
            <m.div className={`h-full rounded-3xl border-3 border-ink p-6 shadow-pop ${t.tone}`} whileHover={{ y: -8, rotate: i === 1 ? 0 : i ? 1.5 : -1.5, boxShadow: "10px 12px 0 0 #16133A" }} transition={{ type: "spring", stiffness: 320, damping: 14 }}>
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border-3 border-ink bg-white text-xl">{t.icon}</span>
              <span className="eyebrow opacity-80">{t.tag}</span>
              <h2 className="mt-1 text-2xl font-extrabold">{t.title}</h2>
              <p className="mt-2 font-semibold opacity-85">{t.text}</p>
            </m.div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-6xl py-12">
        <Reveal>
          <div className="card-pop p-7 md:p-10 space-y-4">
            <span className="eyebrow text-grape">Reach us</span>
            <p className="font-mono text-base md:text-lg font-bold break-all">{REPO}</p>
            <p className="font-semibold text-ink/70">For now, the quickest way to reach the team is through our GitHub profile.</p>
            <div className="flex flex-wrap items-center gap-3">
              <PopButton href={REPO} tone="ink">Open GitHub →</PopButton>
              <PopButton onClick={copy} tone="white">Copy link</PopButton>
              <span className="font-bold text-sm" aria-live="polite">{copied}</span>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
