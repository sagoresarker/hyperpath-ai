import { m } from "framer-motion";
import Layout from "../components/Layout.jsx";
import { ToolButton, SectionHead, Reveal } from "../components/ui.jsx";

const principles = [
  ["P1", "Measure honestly", "We count every cost, report what fails as well as what works, and only claim results we have measured."],
  ["P2", "Verified before reused", "Efficiency never comes at the expense of correctness."],
  ["P3", "Efficiency is a feature", "Lower cost and lower energy use are part of the product, not an afterthought."],
  ["P4", "Private by design", "What an organisation learns stays with that organisation."],
];

export default function About() {
  return (
    <Layout current="about">
      <section className="grid gap-8 pb-16 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="label">About the lab</span>
          <m.h1 className="mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Building AI that learns from the work it has <em className="font-normal text-indigo-600 dark:text-indigo-400">already done</em>.
          </m.h1>
        </div>
        <p className="self-end text-lg leading-relaxed text-slate-700 lg:col-span-4 dark:text-slate-300">
          Hyperpath AI is a research-led company focused on one question: how can machine reasoning become cheaper, faster and more reliable every time it is used?
        </p>
      </section>

      <section className="py-12">
        <SectionHead no="1" label="Mission" />
        <Reveal className="mt-8 grid gap-8 lg:grid-cols-12">
          <h2 className="text-3xl leading-[1.12] lg:col-span-5 md:text-[2.6rem]">Make capable AI affordable to run at any scale.</h2>
          <div className="space-y-4 leading-relaxed text-slate-700 lg:col-span-6 lg:col-start-7 dark:text-slate-300">
            <p>The cost of running AI now exceeds the cost of building it, and it grows with every user. We think the answer is not only faster chips or smaller models, but systems that stop repeating themselves.</p>
            <p>Our work sits where research meets real-world use. We study how reasoning can be stored and reused safely, and we turn what works into infrastructure organisations can rely on.</p>
          </div>
        </Reveal>
      </section>

      <section className="py-12">
        <SectionHead no="2" label="Principles" title="How we work." />
        <div className="mt-8 grid border-t border-slate-200 sm:grid-cols-2 dark:border-slate-800">
          {principles.map(([id, t, d], i) => (
            <Reveal key={id} delay={i * 0.06} className={`group border-b border-slate-200 py-7 dark:border-slate-800 ${i % 2 ? "sm:border-l sm:pl-8" : "sm:pr-8"}`}>
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">{id}</span>
              <h3 className="mt-3 text-2xl transition-colors group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{t}</h3>
              <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHead no="3" label="Team" />
        <Reveal className="panel mt-8 grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-end md:p-10">
          <div>
            <h2 className="text-3xl md:text-[2.4rem]">Small, focused, research-first.</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-700 dark:text-slate-300">We are a small team working across machine learning, reasoning and efficient systems. We grow carefully and are always glad to hear from researchers and engineers who care about these problems.</p>
          </div>
          <ToolButton primary href="contact.html">Contact the team</ToolButton>
        </Reveal>
      </section>
    </Layout>
  );
}
