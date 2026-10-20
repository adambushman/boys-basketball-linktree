# 3rd Grade Boys Basketball — Parent Links

A single mobile-first "link tree" page for team parents, hosted on GitHub Pages.

Live: https://adambushman.github.io/boys-basketball-linktree/

## Updating content

Everything on the page comes from [`src/data/site.ts`](src/data/site.ts):

- **Calendar** – paste the Google Calendar *public iCal address* into `calendar.icsUrl`.
  The Apple / Google / Outlook subscribe buttons are generated from it.
- **Team pictures** – fill in `date`, `time`, `place` (leave as `null` to show "TBA").
- **Links & files** – add entries to `links`. Repo-hosted files go in `public/files/`
  and are linked as `files/name.pdf`. The section stays hidden while the list is empty.
- **Coach photo** – save as `public/coach.jpg` (square works best).

Push to `main` and the GitHub Actions workflow rebuilds and deploys.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
```

Stack: Vue 3, Vite, Tailwind CSS v4, shadcn-vue, lucide icons.
Colors (Jazz "Mountain" palette) are defined as CSS variables in `src/assets/main.css`.
