# Local setup and troubleshooting

Start here to run the site on your computer. See the [content guide](content-guide.md) for edits and the [deployment guide](deployment.md) for publishing.

## Install and run

You need a terminal, an editor, Node.js, and npm. The repository and installed Astro 6.1.4 package declare Node `>=22.12.0`; that Astro package requires npm `>=9.6.5`. Use a current Node 22 LTS release. No database, API keys, or environment variables are needed for the current site.

From the repository root:

```sh
node --version
npm --version
npm ci
npm run dev
```

`npm ci` installs the versions recorded in `package-lock.json` and replaces an existing `node_modules/` directory. Use it for a fresh checkout or to restore the locked dependencies. Use `npm install` when intentionally changing dependencies, and review the resulting lockfile changes.

Open the URL Astro prints, normally `http://localhost:4321`. Keep the terminal running while editing. Save a source file to see the development page update. Stop the server with `Ctrl+C`.

## First walkthrough

1. Visit Home, Research, Publications, Write-ups, and CV through the header. On a narrow screen, open the menu button.
2. Use the sun/moon button to change themes. The selection is saved in browser local storage.
3. The content lists start empty. Add your own entries using the [content guide](content-guide.md).
4. After adding publications, test category filters, abstracts, and BibTeX dialogs. Clipboard copying requires a browser context that permits clipboard access, such as localhost or HTTPS.
5. After adding a write-up, open its individual URL and check equations, code, and the desktop table of contents.

The CV download is hidden until a PDF exists at `public/cv.pdf` at build time.

## Where things live

| Location | Purpose |
| --- | --- |
| `src/pages/` | Page routes and most editable profile content |
| `src/content/write-ups/` | Markdown and MDX posts |
| `src/content.config.ts` | Post frontmatter schema |
| `src/components/` | Navigation, footer, and publication cards |
| `src/layouts/Layout.astro` | Shared shell, metadata, and theme scripts |
| `src/layouts/PostLayout.astro` | Post header, body, and table of contents |
| `src/styles/global.css` | Active global stylesheet and theme variables |
| `public/` | Files served at the site root without a `public/` URL prefix |
| `astro.config.mjs` | Site URL, base path, MDX, math, and build configuration |
| `dist/` | Generated production output; do not edit it |

The separate `styles/styles.css` file is not imported by the current shared layout. Make site-wide style edits in `src/styles/global.css`.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Missing Node/npm, or engine warning | Check the versions above and select a compatible Node installation. |
| Dependency installation fails | Read npm's error: check registry/network access and whether `package.json` matches the lockfile. Avoid deleting the lockfile as a routine fix. |
| Port 4321 is busy | Use Astro's printed URL, or run `npm run dev -- --port 4322`. |
| Empty collection warnings during build | Expected until the first write-up is added; the empty listing still builds. |
| A post fails to build | Check YAML indentation, required fields, valid dates, and MDX syntax against `src/content.config.ts`. |
| An image or PDF returns 404 | Check its filename case and location in `public/`. `public/images/plot.png` is served at `/images/plot.png`. |
| Preview shows old content | Stop preview, run `npm run build`, then restart `npm run preview`. Preview serves `dist/`, not live source edits. |
| Build still references a removed post | Stop the server, delete the generated `node_modules/.astro/data-store.json` (and `.astro/data-store.json` if present), and rebuild to clear cached content. |
| A draft is absent from Write-ups | Expected when `draft: true`; the individual URL still exists. See the content guide. |

## Documentation sources

Repository commands and requirements above come from `package.json`, the lockfile, and source inspection. Astro's current [installation guide, Prerequisites](https://docs.astro.build/en/install-and-setup/#prerequisites) covers the latest release and may require a newer Node version than this locked Astro 6 project. Recheck requirements when upgrading.
