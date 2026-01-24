# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

News Summarizer AI is an automated news monitoring system that collects and summarizes updates from AI provider websites (OpenAI, Anthropic/Claude, Gemini). It uses Gemini 2.5 Flash to generate Japanese summaries and displays a unified timeline on a Vue 3 frontend deployed to GitHub Pages.

## Commands

```bash
# Development
yarn dev              # Start dev server (localhost:5173)
yarn build            # Production build → dist/

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Auto-fix ESLint issues
yarn format           # Format with Prettier
yarn typecheck        # Type check with vue-tsc

# Data Generation
yarn fetch:providers                           # Fetch news from all providers
yarn fetch:providers --provider=openai         # Single provider
yarn fetch:providers --dry-run                 # Dry-run mode
yarn build:data                                # Compile output/ → public/data.json
```

## Architecture

### Data Flow
```
Provider Website → Cheerio/RSS Parser → Gemini LLM (extraction/summary)
→ output/{provider}/ (Markdown + JSON) → build-timeline-data.ts
→ public/data.json → Vue frontend
```

### Provider Pattern
- `scripts/lib/provider-fetchers/base-provider.ts`: Abstract base class using template method pattern
- Concrete implementations for each provider/content-type (news, changelog, release-notes, deprecations)
- Each implements: `fetchRawData()`, `processData()`, `generateReport()`

### Key Directories
- `scripts/lib/provider-fetchers/`: Provider implementations (9 total: 3 Anthropic, 3 OpenAI, 3 Gemini)
- `scripts/lib/gemini-extractor.ts`: Gemini API wrapper with JSON parsing resilience
- `scripts/lib/rate-limiter.ts`: Exponential backoff retry logic
- `output/`: Generated data (Markdown files + JSON metadata) - gitignored
- `src/App.vue`: Main Vue component with timeline display and filtering

### Data Sources
| Provider | News | Changelog | Deprecations |
|----------|------|-----------|--------------|
| Anthropic | HTML scrape | Markdown direct | Markdown direct |
| OpenAI | RSS | HTML scrape | HTML scrape |
| Gemini | RSS | Markdown direct | N/A |

## Configuration

- **Hook configured**: After Write/Edit, auto-runs `yarn lint --fix && yarn format`
- **Plans directory**: `docs/plans/` for implementation plans
- **Environment**: Requires `GEMINI_API_KEY` in `.env`

## CI/CD

- News fetch runs every 3 hours per provider via GitHub Actions
- Creates auto-merge PRs for output changes
- Deploys to GitHub Pages at `/news-summarizer-ai/`
