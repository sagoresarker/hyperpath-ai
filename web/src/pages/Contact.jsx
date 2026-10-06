import { useState } from "react";
import { m } from "framer-motion";
import Layout from "../components/Layout.jsx";
import { ToolButton, SectionHead, Reveal } from "../components/ui.jsx";

const REPO = "https://github.com/sagoresarkerbdcse/hyperpath-ai";
const topics = [
  ["T1", "Design partners", "Teams whose AI costs grow with usage and who want to shape what we build."],
  ["T2", "Research collaboration", "Academic and industry researchers working on reasoning, memory or efficient inference."],
  ["T3", "Joining the team", "Researchers and engineers who want to work on these problems early."],
];

export default function Contact() {
  const [copied, setCopied] = useState("");
  const copy = async () => {
    try { await navigator.clipboard.writeText(REPO); setCopied("copied to clipboard"); }
    catch { setCopied("select the address above to copy it"); }
    setTimeout(() => setCopied(""), 2400);
  };
  return (
    <Layout current="contact">
      <section className="grid gap-8 pb-12 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="label">Correspondence</span>
          <m.h1 className="mt-5 text-[clamp(2.8rem,7vw,5.6rem)] leading-[1] tracking-[-0.035em]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Let’s <em>talk</em>.
          </m.h1>
        </div>
        <p className="self-end text-lg leading-relaxed text-slate-600 lg:col-span-4">
          We welcome conversations with organisations running AI at scale, researchers working on reasoning and efficiency, and people who want to build this with us.
        </p>
      </section>

      <section className="py-10">
        <SectionHead no="1" label="Topics" />
        <div className="mt-8 grid border-t border-slate-200 md:grid-cols-3">
          {topics.map(([id, t, d], i) => (
            <Reveal key={id} delay={i * 0.06} className={`py-7 md:px-7 ${i ? "border-t border-slate-200 md:border-l md:border-t-0" : "md:pl-0"}`}>
              <span className="font-mono text-xs text-indigo-600">{id}</span>
              <h2 className="mt-3 text-2xl">{t}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-10">
        <SectionHead no="2" label="Channel" />
        <Reveal className="panel mt-8 p-7 md:p-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm">
            <span className="text-slate-500">github&gt;</span>
            <span className="break-all text-slate-900">{REPO}</span>
          </div>
          <p className="mt-3 text-slate-600">For now, the quickest way to reach the team is through our GitHub profile.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ToolButton primary href={REPO}>Open GitHub</ToolButton>
            <ToolButton onClick={copy}>Copy address</ToolButton>
            <span className="font-mono text-[11px] text-slate-500" aria-live="polite">{copied}</span>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
