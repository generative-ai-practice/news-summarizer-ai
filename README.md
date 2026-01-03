# Vue + TypeScript Template

Minimal starter with Vite, Vue 3, and the essentials for linting, formatting, and type checking.

## Scripts

- `yarn dev` — start Vite dev server
- `yarn build` — production build
- `yarn preview` — preview the build locally
- `yarn lint` — run ESLint (Vue + TS rules)
- `yarn lint:fix` — ESLint with fixes
- `yarn format` — run Prettier over source files
- `yarn format:check` — Prettier check mode
- `yarn typecheck` — type check with `vue-tsc`
- `yarn fetch:providers` — run provider news monitor (Gemini, Anthropic; writes to `output/{provider}`)
- `yarn fetch:providers:dry-run` — same as above without writes

## Getting Started

```bash
yarn install
yarn dev
```

Edit `src/App.vue` to start prototyping.

### Provider News Monitor

- Requires `GEMINI_API_KEY` in your environment (see `scripts/fetch-provider-info.ts`).
- Outputs:
  - `output/{provider}/articles/{raw,summaries}/...`
  - `output/{provider}/release-notes/overview.md` (markdown source)
  - `output/{provider}/release-notes/overview-links.json` (link list with dates)
  - `output/{provider}/articles/latest-articles.json`
  - `output/{provider}/release-notes/latest-release-notes.json`
- Design doc: `docs/ai-instructions/20260102_provider-news-monitor.md`.
