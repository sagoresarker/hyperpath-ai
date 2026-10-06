# Hyperpath AI website

Public website for Hyperpath AI: a static, client-side-only site in a playful "tech-cartoon" style.

- **Stack:** React 18, Tailwind CSS 3 and Framer Motion, built with Vite. All animation runs in the browser (Framer Motion springs, HTML5 Canvas and SVG). There is no server code.
- **Pages:** Vision (home, with the interactive reasoning playground), About, Contact and 404.
- **Hosting:** GitHub Pages, deployed from the `main` branch root.

## Layout

| Path | What it is |
|---|---|
| `web/` | Source code (edit here) |
| `web/src/components/Playground.jsx` | Interactive canvas demo: nodes, springs, pulses, stickers |
| `web/src/components/Mascots.jsx` | Hops, Vee and Lemma (SVG mascots) and the speech bubble |
| `web/src/components/Background.jsx` | Animated glow and particle background |
| `index.html`, `about.html`, `contact.html`, `404.html`, `assets/` | **Built output** served by GitHub Pages. Do not edit by hand |

## Develop and publish

```bash
cd web
npm ci
npm run dev      # local dev server
npm run build    # writes the static site into the repository root
```

Then commit the rebuilt root files together with any source changes and push to `main`. GitHub Pages republishes automatically.

For a custom domain, build with `VITE_BASE=/ npm run build` and add a `CNAME` file.

## Notes

- Motion respects the visitor's reduced-motion setting: canvases draw still frames and springs are disabled.
- The site describes the vision only. Research methods, results and technical details are deliberately left out.
- The contact page points to this GitHub repository until a contact email is added (`REPO` in `web/src/pages/Contact.jsx`).
