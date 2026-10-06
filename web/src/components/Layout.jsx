import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Background from "./Background.jsx";
import { LogoMark, PopButton } from "./ui.jsx";

const LINKS = [
  { key: "home", href: "./", label: "Vision" },
  { key: "about", href: "about.html", label: "About" },
  { key: "contact", href: "contact.html", label: "Contact" },
];

function Nav({ current }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-4 pt-3">
      <nav
        aria-label="Main"
        className="mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-2xl border-3 border-ink bg-white/90 backdrop-blur px-3 py-2 shadow-popsm"
      >
        <a href="./" className="flex items-center gap-2.5 font-display font-extrabold text-lg md:text-xl" aria-label="Hyperpath AI home">
          <LogoMark />
          <span>Hyperpath AI</span>
        </a>
        <ul className="hidden sm:flex items-center gap-1">
          {LINKS.map((l) => (
            <li key={l.key}>
              <m.a
                href={l.href}
                aria-current={current === l.key ? "page" : undefined}
                className={`relative block px-4 py-2 rounded-xl font-bold ${current === l.key ? "text-ink" : "text-ink/70 hover:text-ink"}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                {current === l.key && (
                  <m.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-xl bg-sun border-2 border-ink" transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                )}
                {l.label}
              </m.a>
            </li>
          ))}
          <li className="ml-2">
            <PopButton href="contact.html" tone="pink" className="!text-sm !px-4 !py-2 !shadow-popsm">Talk to us</PopButton>
          </li>
        </ul>
        <m.button
          className="sm:hidden rounded-xl border-3 border-ink bg-sun px-3 py-1.5 font-bold"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          whileTap={{ scale: 0.9 }}
        >
          {open ? "Close" : "Menu"}
        </m.button>
      </nav>
      <AnimatePresence>
        {open && (
          <m.ul
            id="mobile-menu"
            className="sm:hidden mx-auto max-w-6xl mt-2 rounded-2xl border-3 border-ink bg-white shadow-pop p-2 flex flex-col"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            {LINKS.map((l) => (
              <li key={l.key}>
                <a href={l.href} className={`block rounded-xl px-4 py-3 font-bold ${current === l.key ? "bg-sun" : ""}`}>{l.label}</a>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4 rounded-2xl border-3 border-ink bg-white px-5 py-4 shadow-popsm">
        <span className="flex items-center gap-2 font-display font-bold"><LogoMark size={26} /> © 2026 Hyperpath AI</span>
        <nav aria-label="Footer" className="flex gap-5 font-bold text-ink/80">
          {LINKS.map((l) => <a key={l.key} href={l.href} className="hover:text-pink">{l.label}</a>)}
        </nav>
      </div>
    </footer>
  );
}

export default function Layout({ current, children }) {
  return (
    <>
      <Background />
      <Nav current={current} />
      <main id="main" className="px-4">{children}</main>
      <Footer />
    </>
  );
}
