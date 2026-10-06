import { m } from "framer-motion";
import Layout from "../components/Layout.jsx";
import { Vee, Lemma, Bubble } from "../components/Mascots.jsx";
import { Badge, PopButton, Reveal } from "../components/ui.jsx";

const principles = [
  { icon: "📏", title: "Measure honestly", text: "We count every cost, report what fails as well as what works, and only claim results we have measured.", tone: "bg-sun" },
  { icon: "✅", title: "Verified before reused", text: "Efficiency never comes at the expense of correctness.", tone: "bg-mint" },
  { icon: "🌱", title: "Efficiency is a feature", text: "Lower cost and lower energy use are part of the product, not an afterthought.", tone: "bg-pink text-white" },
  { icon: "🔒", title: "Private by design", text: "What an organisation learns stays with that organisation.", tone: "bg-sky text-white" },
];

export default function About() {
  return (
    <Layout current="about">
      <section className="mx-auto max-w-6xl pt-12 pb-16 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-center">
        <div className="space-y-6">
          <Badge tone="grape" icon="👋">About Hyperpath AI</Badge>
          <m.h1 className="text-[clamp(2.5rem,6vw,4.8rem)] font-extrabold leading-[0.98]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
            We're building AI that <span className="marker">learns from the work</span> it has already done.
          </m.h1>
          <p className="text-xl font-semibold text-ink/75 max-w-2xl">
            Hyperpath AI is a research-led company focused on one question: how can machine reasoning become cheaper, faster and more reliable every time it is used?
          </p>
        </div>
        <div className="flex items-end justify-center gap-2">
          <Vee size={130} />
          <Bubble side="left" className="mb-24 w-56"><p className="text-sm font-bold">I'm Vee. Around here, nothing gets reused until it's been checked!</p></Bubble>
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-12">
        <Reveal>
          <div className="card-pop grid gap-8 p-8 md:p-12 md:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3">
              <span className="eyebrow text-pink">Mission</span>
              <h2 className="text-3xl md:text-5xl font-extrabold">Make capable AI affordable to run at any scale.</h2>
            </div>
            <div className="space-y-4 text-lg font-semibold text-ink/80">
              <p>The cost of running AI is now larger than the cost of building it, and it grows with every user. We think the answer is not only faster chips or smaller models, but systems that stop repeating themselves.</p>
              <p>Our work sits where research and real-world use meet. We study how reasoning can be kept and reused safely, and we turn what works into infrastructure organisations can rely on.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl py-12">
        <Reveal className="mb-8 space-y-3">
          <span className="eyebrow text-sky">How we work</span>
          <h2 className="text-4xl md:text-5xl font-extrabold">Principles we hold ourselves to.</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <m.div className={`h-full rounded-3xl border-3 border-ink p-6 shadow-pop ${p.tone}`} whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5, boxShadow: "10px 12px 0 0 #16133A" }} transition={{ type: "spring", stiffness: 320, damping: 14 }}>
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border-3 border-ink bg-white text-xl">{p.icon}</span>
                <h3 className="text-2xl font-extrabold">{p.title}</h3>
                <p className="mt-2 font-semibold opacity-85">{p.text}</p>
              </m.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border-3 border-ink bg-sun p-8 md:p-12 shadow-poplg flex flex-col md:flex-row items-center gap-8">
            <Lemma size={120} />
            <div className="flex-1 space-y-3 text-center md:text-left">
              <span className="eyebrow">Team</span>
              <h2 className="text-3xl md:text-5xl font-extrabold">Small, focused, research-first.</h2>
              <p className="text-lg font-semibold text-ink/80">We're a small team working across machine learning, reasoning and efficient systems. We're growing carefully and always glad to hear from researchers and engineers who care about these problems.</p>
            </div>
            <PopButton href="contact.html" tone="ink">Contact us →</PopButton>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
