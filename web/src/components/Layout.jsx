import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { LogoMark, StatusTag } from "./ui.jsx";

const LINKS = [
  { key: "home", href: "./", label: "Vision" },
  { key: "about", href: "about.html", label: "About" },
  { key: "contact", href: "contact.html", label: "Contact" },
];

function TopBar({ current }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar sticky top-0 z-40 border-b border-slate-200 backdrop-blur dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-2.5">
        <a href="./" className="flex shrink-0 items-center gap-2.5" aria-label="Hyperpath AI home">
          <LogoMark />
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em]">Hyperpath&nbsp;AI</span>
        </a>
        <div className="hidden min-w-0 flex-1 items-center gap-4 overflow-x-auto md:flex" aria-label="System status">
          <StatusTag live>Status: research-led</StatusTag>
          <StatusTag>Verified reuse v1.2</StatusTag>
          <StatusTag>Target: edge hardware</StatusTag>
        </div>
        <nav aria-label="Main" className="ml-auto hidden sm:block">
          <ul className="flex items-center">
            {LINKS.map((l) => (
              <li key={l.key}>
                <a
                  href={l.href}
                  aria-current={current === l.key ? "page" : undefined}
                  className={`relative block px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    current === l.key ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {current === l.key && <m.span layoutId="nav-rule" className="absolute inset-x-3 -bottom-[11px] h-px bg-indigo-500" />}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="ml-auto border border-slate-300 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] sm:hidden dark:border-slate-700"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto border-t border-slate-200 px-5 py-1.5 md:hidden dark:border-slate-800" aria-label="System status">
        <StatusTag live>Status: research-led</StatusTag>
        <StatusTag>Verified reuse v1.2</StatusTag>
      </div>
      <AnimatePresence>
        {open && (
          <m.ul
            id="mobile-menu"
            className="border-t border-slate-200 px-5 py-2 sm:hidden dark:border-slate-800"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          >
            {LINKS.map((l) => (
              <li key={l.key}>
                <a href={l.href} className={`block py-2 font-mono text-xs uppercase tracking-[0.14em] ${current === l.key ? "text-indigo-600 dark:text-indigo-400" : ""}`}>{l.label}</a>
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
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-2.5"><LogoMark size={16} /> © 2026 Hyperpath AI</span>
        <nav aria-label="Footer" className="flex gap-5">
          {LINKS.map((l) => <a key={l.key} href={l.href} className="hover:text-slate-900 dark:hover:text-white">{l.label}</a>)}
        </nav>
      </div>
    </footer>
  );
}

export default function Layout({ current, children }) {
  return (
    <>
      <TopBar current={current} />
      <main id="main" className="mx-auto max-w-7xl px-5">{children}</main>
      <Footer />
    </>
  );
}
