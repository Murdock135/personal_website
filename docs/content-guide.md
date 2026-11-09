# Updating site content

Most content is edited directly in `.astro` files; write-ups use Markdown or MDX. Run `npm run dev` while editing, then follow the [production review](deployment.md#review-before-publishing).

## Profile and existing pages

| Change | File and edit location |
| --- | --- |
| Name, photo alt text, and a new biography | `src/pages/index.astro`, in the page markup; add a bio below the name when ready |
| News | `news` array in `src/pages/index.astro`; entries display in array order |
| Social profiles and email | `social` array in `src/pages/index.astro`; email uses a `mailto:` URL |
| Profile picture | Replace `public/profile.jpg`, or update the image `src` in the home page |
| Research interests | `interests` array and introductory paragraph in `src/pages/research.astro` |
| Research projects | `projects` array in `src/pages/research.astro` |
| Education, awards, skills | `education`, `awards`, and `skills` in `src/pages/cv.astro` |
| Downloadable CV | Add or replace `public/cv.pdf`; the button appears when the file exists at build time and links to `/cv.pdf` |
| Header name, initials, menu links | `src/components/Nav.astro` |
| Footer name and credits | `src/components/Footer.astro` |

In `.astro` files, the section between the opening `---` markers contains JavaScript/TypeScript data and imports. The markup below it renders the page. Preserve commas, brackets, and string quoting when editing arrays.

## Add a publication

Add an object to the `publications` array in `src/pages/publications.astro`. Cards display in array order; put new entries where you want them to appear.

```ts
{
  id: 'example-paper-2026',
  title: 'Your Paper Title',
  authors: ['Qazi Zarif Ul Islam', 'Coauthor Name'],
  venue: 'Your Venue',
  year: 2026,
  category: 'Conference' as const,
  pdfUrl: '/papers/example-paper.pdf',
  abstract: 'A short description of the paper.',
  bibtex: `@inproceedings{example2026,
  title = {Your Paper Title},
  author = {Islam, Qazi Zarif Ul and Name, Coauthor},
  booktitle = {Your Venue},
  year = {2026}
}`,
},
```

This example needs the actual PDF at `public/papers/example-paper.pdf`. Replace the sample facts with your own.

Required fields are `id`, `title`, `authors`, `venue`, `year`, and `category`. Category must be `Conference`, `Journal`, or `Workshop`. Use a unique, simple ID, such as lowercase words separated by hyphens; it identifies the BibTeX dialog and copy button.

Optional fields are `pdfUrl`, `codeUrl`, `projectUrl`, `abstract`, and `bibtex`. Omit unavailable links instead of setting them to `#`, which still creates a button. The abstract expands on click; BibTeX enables a dialog and copy button.

Author bolding uses an exact match with `myName` in `src/components/Publication.astro`. If changing the site's owner, update that value too.

## Add a write-up

Create `src/content/write-ups/my-first-post.mdx`. Use a lowercase, hyphenated filename at the top level of this folder; it becomes `/write-ups/my-first-post`. The collection also accepts `.md` files.

````mdx
---
title: "My First Post"
description: "A short summary for the write-up listing."
date: 2026-11-09
tags: ["Research", "Notes"]
draft: false
---

## Motivation

Write the introduction here. Inline math works: $E = mc^2$.

## An equation

$$
\mathcal{L}(\theta) = -\log p_\theta(x)
$$

## A code example

```python
print("Hello from my write-up")
```
````

The schema is defined in `src/content.config.ts`:

| Field | Required? | Meaning |
| --- | --- | --- |
| `title` | Yes | Listing and page title |
| `description` | Yes | Listing summary, post subtitle, and page description |
| `date` | Yes | Valid date, normally `YYYY-MM-DD`; listing sorts newest first |
| `tags` | No | List of strings; defaults to `[]` |
| `draft` | No | Boolean; defaults to `false`; `true` hides the listing card only |
| `image` | No | Listing card cover URL, such as `/images/my-first-post.png` |

For a cover, create `public/images/`, add your image, and set `image: /images/my-first-post.png`. The cover is currently shown only on the listing card; it is not automatically inserted into the article or used as its social sharing image. Add body images explicitly, for example `![Description of the plot](/images/my-first-post.png)`.

Use `##` and `###` headings for sections beneath the page title. Headings through level 3 appear in the desktop table of contents. Standard Markdown tables, lists, links, blockquotes, and fenced code blocks are supported. Use a language label on code fences for highlighting. Math support is configured through `remark-math` and `rehype-katex` in `astro.config.mjs`.

### Drafts and publication

`draft: true` hides a post from `/write-ups`, but `src/pages/write-ups/[slug].astro` generates routes for **all** posts. Draft pages are accessible by direct URL in a production build and inherit indexable metadata. Keep unpublished material outside `src/content/write-ups/` if it must not be deployed. A future date also does not schedule publication or hide a post.

To publish a finished post, set `draft: false`, review its listing and individual page locally, rebuild, and deploy the updated output. Renaming a filename changes its URL; no redirect is created automatically.

## Identity, metadata, and appearance

- Update `site` in `astro.config.mjs` and the separate `siteUrl` in `src/layouts/Layout.astro` to the same deployed origin.
- In `Layout.astro`, update the default description, title suffix, Open Graph/Twitter titles, and `citation_author`. Also update page-specific descriptions in `src/pages/`.
- Sharing images are optional. To use one, place it in `public/` and pass its root-relative path as `ogImage` to `Layout`. The post layout does not currently pass a per-post sharing image.
- Favicons live in `public/`; the current layout does not explicitly link a favicon. Add relevant head markup if selecting a specific file.
- Edit `:root` for light-theme colors and `.dark` for dark-theme colors in `src/styles/global.css`. Some elements, including `.btn-volt`, also have fixed color values; inspect those when changing the palette.

These instructions describe the checked-in implementation, including its current limits. Sample website content has been removed. Examples in this guide are illustrative and are not published as site content.
