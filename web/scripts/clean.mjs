// Removes the previous build from the repository root before a new build.
import { rmSync } from "node:fs";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..", "..");
for (const f of ["index.html", "about.html", "contact.html", "404.html", "assets", "favicon.svg", "robots.txt"]) {
  rmSync(resolve(root, f), { recursive: true, force: true });
}
console.log("cleaned previous build");
