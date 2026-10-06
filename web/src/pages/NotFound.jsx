import Layout from "../components/Layout.jsx";
import { Hops, Bubble } from "../components/Mascots.jsx";
import { PopButton } from "../components/ui.jsx";

export default function NotFound() {
  return (
    <Layout current="">
      <section className="mx-auto max-w-3xl py-24 flex flex-col items-center text-center gap-8">
        <div className="flex items-end gap-2">
          <Hops size={140} />
          <Bubble side="left" className="mb-28 w-56 text-left"><p className="text-sm font-bold">Hmm, I don't remember this page. And I remember a lot!</p></Bubble>
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold">404</h1>
        <p className="text-xl font-semibold text-ink/70">This page doesn't exist. The link may be out of date.</p>
        <PopButton href="./" tone="sun">Back to home →</PopButton>
      </section>
    </Layout>
  );
}
