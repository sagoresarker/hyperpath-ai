import Layout from "../components/Layout.jsx";
import { ToolButton } from "../components/ui.jsx";

export default function NotFound() {
  return (
    <Layout current="">
      <section className="py-28">
        <span className="label">Error 404</span>
        <h1 className="mt-5 text-[clamp(3rem,8vw,6rem)] leading-none">Page not found.</h1>
        <p className="mt-5 max-w-xl text-lg text-slate-600">The link may be out of date, or the page has moved.</p>
        <div className="mt-8"><ToolButton primary href="./">Return to the overview</ToolButton></div>
      </section>
    </Layout>
  );
}
