# Personal Academic Website

Built with [Astro 6](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Features a dark (noir/volt-green) and light (glassmorphic) dual theme, KaTeX math rendering, Shiki syntax highlighting, and MDX-based write-ups.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start local dev server at `localhost:4321`  |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview the production build locally        |

## Updating the site

### Profile photo
Replace `public/profile.jpg` with your own photo (keep the filename).

### Bio, social links, and news
Edit `src/pages/index.astro` — update the `news` array and the bio paragraph in the HTML section.

### Research interests and projects
Edit `src/pages/research.astro` — update the `interests` and `projects` arrays at the top of the file.

### Publications
Edit `src/pages/publications.astro` — add entries to the `publications` array. Each entry supports:

```ts
{
  id: 'unique-id',           // used for the BibTeX modal
  title: '...',
  authors: ['Your Name', 'Co-author'],  // your name gets bolded automatically
  venue: '...',
  year: 2025,
  category: 'Conference' | 'Journal' | 'Workshop',
  pdfUrl: '...',             // optional
  codeUrl: '...',            // optional
  projectUrl: '...',         // optional
  abstract: '...',           // optional, shown in a collapsible
  bibtex: `@inproceedings{...}`,  // optional, enables the BibTeX modal
}
```

### CV
Edit `src/pages/cv.astro` — update the `education`, `awards`, and `skills` objects at the top.
Place your CV PDF at `public/cv.pdf` to make the Download button work.

### Write-ups (blog posts)
Create a new `.mdx` file in `src/content/write-ups/`. The filename becomes the URL slug (e.g. `my-post.mdx` → `/write-ups/my-post`).

Required frontmatter:

```yaml
---
title: "Post Title"
description: "One-line summary shown in the grid preview."
date: 2025-04-07
tags: ["Tag1", "Tag2"]
draft: false          # set to true to hide from listing
image: /images/cover.png  # optional cover image
---
```

Supported inside MDX:
- **Inline math**: `$E = mc^2$`
- **Block math**: `$$\mathcal{L}(\theta) = ...$$`
- **Code blocks** with syntax highlighting (Shiki): use standard fenced blocks with a language tag
- Standard Markdown: headings, lists, tables, blockquotes, images
- A Table of Contents is auto-generated from headings and shown in the sidebar on desktop

### Site-wide defaults (name, URL, SEO)
- Name in nav: `src/components/Nav.astro`
- Name in footer: `src/components/Footer.astro`
- Default SEO description and site URL: `src/layouts/Layout.astro` (top of the frontmatter block)
- Google Scholar author meta and citation name: `src/layouts/Layout.astro`

## Project structure

```
src/
  layouts/
    Layout.astro          — shared HTML shell (SEO, theme init, nav, footer)
    PostLayout.astro      — write-up page layout with ToC sidebar
  components/
    Nav.astro             — sticky glassmorphic header + theme toggle
    Footer.astro          — copyright and credits
    Publication.astro     — publication card with BibTeX modal
  pages/
    index.astro           — home (bio, photo, social icons, news timeline)
    research.astro        — research interests + project cards
    publications.astro    — filterable publications list
    cv.astro              — CV with PDF download
    write-ups/
      index.astro         — 3-column post grid
      [slug].astro        — individual post page
  content/
    write-ups/            — MDX files (one per post)
  content.config.ts       — content collection schema
  styles/
    global.css            — Tailwind v4 theme tokens, component styles
public/
  profile.jpg             — profile photo
  cv.pdf                  — CV download (add this yourself)
```
