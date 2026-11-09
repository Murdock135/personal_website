# Build, review, and deploy

This project produces a static site. The configured origin is `https://qzarifuislam.github.io` with `base: '/'`. That is a build setting, not evidence that the site is deployed. No `.github/workflows/` deployment workflow is currently included.

## Build and preview

From the repository root:

```sh
npm ci
npm run build
npm run preview
```

The build generates `dist/`. Open the preview URL printed in the terminal, then stop it with `Ctrl+C`. Rebuild after source edits to update preview. Never edit `dist/` directly; changes are replaced by the next build.

These build/output settings match Astro's official [deployment guide, Website UI and Building Your Site Locally](https://docs.astro.build/en/guides/deploy/). No server adapter is configured or needed for the current static output.

## Review before publishing

1. Review the retained name and photo, then add your own biography, news, research, publications, and CV details. Content lists start empty.
2. If offering a CV download, add `public/cv.pdf` before building. If using a social sharing image, add the asset and pass `ogImage` to the shared layout. Confirm any added assets open in preview.
3. Set the real origin in both `astro.config.mjs` (`site`) and `src/layouts/Layout.astro` (`siteUrl`). Review title, description, and author metadata as described in the [content guide](content-guide.md).
4. Remove material that must not be deployed from the write-up collection. `draft: true` only hides its listing card; it still produces a public page.
5. Run a production build and visit `/`, `/research`, `/publications`, `/cv`, `/write-ups`, and each new post. Test direct page loads as well as navigation links.
6. Check the narrow-screen menu and both themes. For content you add, check publication filters, abstract expansion, BibTeX dialog/copy, equations, code blocks, images, and CV download.

`npm run build` checks whether Astro can generate the site. It does not validate academic facts, external links, missing public assets, or browser interactions. No dedicated test, lint, or type-check scripts are configured.

## Deploy to a static host

Use these settings if connecting a Git repository to a static hosting service:

| Setting | Value |
| --- | --- |
| Project directory | Repository root |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Publish/output directory | `dist` |
| Node version | A current Node 22 LTS release satisfying `>=22.12.0` |

Alternatively, build locally and upload the **contents** of `dist/` to the host's web root. Configure the host to serve directory indexes, such as `/research/index.html` for `/research/`. No runtime Node server or database is required for these generated files.

### GitHub Pages

Astro's official [GitHub Pages guide, How to deploy](https://docs.astro.build/en/guides/deploy/github/#how-to-deploy) provides an Actions workflow and repository Pages configuration. Follow that guide to create `.github/workflows/deploy.yml`, use the correct deployment branch and a compatible Node version, and select **GitHub Actions** as the Pages source in repository settings. This documentation does not create or enable a deployment.

The current root-relative links fit a user site such as `https://USERNAME.github.io/` or a custom domain served at `/`. Change the configured origin to the actual account/domain in both URL settings before deploying.

For a project site at `https://USERNAME.github.io/REPOSITORY/`, changing Astro's `base` alone is insufficient: navigation, post links, images, and the CV download currently contain paths starting with `/`. Those paths point to the domain root. Supporting a subpath requires updating these references to include the base path and checking canonical URLs as well. The current implementation has not made that change.

## Verify a deployment

After the host reports success, open the deployed site and repeat the page, asset, and interaction checks above. Load a write-up directly in a new tab. Check page source for the expected canonical URL and social image URL. A successful build or upload alone does not confirm that hosting paths and downloads work.
