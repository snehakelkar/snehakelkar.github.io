# snehakelkar.github.io

Sneha Kelkar's personal site — "My Digital Space." Live at https://snehakelkar.github.io.

## How this repo is organized

GitHub Pages serves whatever sits at the **root** of this repo directly, so the
built, ready-to-view website lives at the top level (`index.html`, `projects/`,
`resume/`, `thoughts/`, `side-quests/`, `images/`, `avatars/`, etc.).

The actual editable source code — the React/Next.js project that generates
those files — lives in [`website-source/`](website-source/). That's where you
(or Claude) make real changes.

```
snehakelkar.github.io/
├── index.html, projects/, resume/, ...   ← the live site (generated, don't hand-edit)
├── CATEGORIES/FICTIONALMAPS/             ← older standalone project (interactive map), still live
└── website-source/                       ← edit here
    ├── app/                              ← pages and components
    │   ├── components/Hero.tsx           ← the homepage
    │   ├── projects/, resume/, thoughts/, side-quests/  ← the separate pages
    ├── public/
    │   ├── avatars/                      ← the looping video clips
    │   └── images/                       ← background art + about-me photo
    └── package.json
```

## Making changes

From inside `website-source/`:

```bash
npm install       # first time only
npm run dev       # preview locally at http://localhost:3000
npm run build     # produces website-source/out/
```

After building, copy the contents of `website-source/out/` up to the repo
root (overwriting the previous build), then commit and push both the
`website-source/` changes and the refreshed root files together.

## Where old content went

The earlier "nuff said" categories blog (College, Fitness, Korea, Self,
Nutrition, Code) is preserved on the `archive/nuff-said` branch rather than
deleted — it wasn't part of this site's history yet when the switch to the
portfolio site happened.
