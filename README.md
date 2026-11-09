# Personal Academic Website

A static academic portfolio built with Astro 6, Tailwind CSS v4, and Markdown/MDX. It includes home, research, publications, CV, and write-up pages, light/dark themes, KaTeX math, and Shiki code highlighting.

## Quick start

Use a current Node 22 LTS release satisfying the repository's Node `>=22.12.0` requirement, and npm. From the repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:4321`. Stop the server with `Ctrl+C`.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies from the committed lockfile |
| `npm run dev` | Start the development server with live updates |
| `npm run build` | Generate the static site in `dist/` |
| `npm run preview` | Serve the most recent production build locally |

## Guides

- [Local setup and troubleshooting](docs/getting-started.md)
- [Update pages, publications, and write-ups](docs/content-guide.md)
- [Build, review, and deploy](docs/deployment.md)

## Current status

Sample content has been removed; the existing name, profile photo, and page structure remain. Content lists start empty. The CV download appears only when `public/cv.pdf` exists at build time, and social sharing images are optional. Draft write-ups are hidden from the listing but still get generated pages. No deployment workflow is configured; see the deployment guide for setup and URL limitations.
