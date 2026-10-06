# Hyperpath AI website

Public website for Hyperpath AI. Plain HTML and CSS, with no build step.

- `index.html`: Vision (home)
- `about.html`: About
- `contact.html`: Contact
- `404.html`: Not-found page
- `assets/`: Stylesheet, script and favicon

## Publishing

GitHub Pages publishes the site directly from the `main` branch (root folder) on every push.
Setting: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
The `.nojekyll` file tells GitHub to serve the files as they are, without a Jekyll build.

## Editing

- **Contact email:** the contact page currently points to the GitHub repository. To show an email address instead, replace the `REPO` value in the "Reach us" block of `contact.html`.
- **Team:** the About page describes the team without names. Add people only with their consent.
- **Custom domain:** add a `CNAME` file containing the domain, then configure DNS as described in GitHub's Pages documentation.

## What this site does not include

This site describes the vision only. Research methods, results and technical details are deliberately left out.
