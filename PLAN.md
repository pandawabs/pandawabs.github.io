# Role
Act as an Expert Frontend Developer.

# Task
Create a complete, production-ready codebase for a single-page Personal CV website hosted on GitHub Pages (repo: pandawabs/pandawabs.github.io, branch: gh-pages).

# Tech Stack
- TypeScript
- Vite
- Vue.js 3 (Composition API)
- Tailwind CSS v4
- dayjs (datetime formatting, locale-aware display)
- `@tailwindcss/typography` (prose styles)
- shadcn-vue (Accordion, Button, Card, Badge, Collapsible, Separator, Avatar, Skeleton)

# Architecture & UI Requirements
- No Backend: purely client-side SPA.
- Layout: LinkedIn-profile structure — Cover/Hero image, Profile Picture, Header Information, About, Experience, Education, Skills, Licenses & Certifications, Organizations, Voluntary Works.
- Theme: Light and Dark mode toggle, persisted in localStorage.
- Bilingual Support: English / Bahasa Indonesia language switcher, persisted in localStorage.
- All UI states handled: loading (Skeleton), error (retry), empty (per section).

## Theme (Tailwind CSS v4 + shadcn-vue CSS custom properties)

Light theme (`:root`) — oklch values converted from daisyUI tokens:

| Token | Light (oklch) | Dark (oklch) |
|---|---|---|
| `--background` | `oklch(100% 0 0)` | `oklch(25.33% 0.016 252.42)` |
| `--foreground` | `oklch(21% 0.006 285.885)` | `oklch(97.807% 0.029 256.847)` |
| `--card` | `oklch(98% 0 0)` | `oklch(23.26% 0.014 253.1)` |
| `--card-foreground` | `oklch(21% 0.006 285.885)` | `oklch(97.807% 0.029 256.847)` |
| `--popover` | `oklch(100% 0 0)` | `oklch(23.26% 0.014 253.1)` |
| `--popover-foreground` | `oklch(21% 0.006 285.885)` | `oklch(97.807% 0.029 256.847)` |
| `--primary` | `oklch(50% 0.134 242.749)` | `oklch(58% 0.158 241.966)` |
| `--primary-foreground` | `oklch(93% 0.034 272.788)` | `oklch(96% 0.018 272.314)` |
| `--secondary` | `oklch(65% 0.241 354.308)` | `oklch(65% 0.241 354.308)` |
| `--secondary-foreground` | `oklch(94% 0.028 342.258)` | `oklch(94% 0.028 342.258)` |
| `--muted` | `oklch(95% 0 0)` | `oklch(21.15% 0.012 254.09)` |
| `--muted-foreground` | `oklch(14% 0.005 285.823)` | `oklch(92% 0.004 286.32)` |
| `--accent` | `oklch(77% 0.152 181.912)` | `oklch(77% 0.152 181.912)` |
| `--accent-foreground` | `oklch(38% 0.063 188.416)` | `oklch(38% 0.063 188.416)` |
| `--destructive` | `oklch(71% 0.194 13.428)` | `oklch(71% 0.194 13.428)` |
| `--destructive-foreground` | `oklch(27% 0.105 12.094)` | `oklch(27% 0.105 12.094)` |
| `--border` | `oklch(95% 0 0)` | `oklch(21.15% 0.012 254.09)` |
| `--input` | `oklch(95% 0 0)` | `oklch(21.15% 0.012 254.09)` |
| `--ring` | `oklch(50% 0.134 242.749)` | `oklch(58% 0.158 241.966)` |
| `--radius` | `1rem` | `1rem` |

Also define extended semantic tokens:
| Token | Light (oklch) | Dark (oklch) |
|---|---|---|
| `--info` | `oklch(74% 0.16 232.661)` | `oklch(74% 0.16 232.661)` |
| `--info-foreground` | `oklch(29% 0.066 243.157)` | `oklch(29% 0.066 243.157)` |
| `--success` | `oklch(76% 0.177 163.223)` | `oklch(76% 0.177 163.223)` |
| `--success-foreground` | `oklch(37% 0.077 168.94)` | `oklch(37% 0.077 168.94)` |
| `--warning` | `oklch(82% 0.189 84.429)` | `oklch(82% 0.189 84.429)` |
| `--warning-foreground` | `oklch(41% 0.112 45.904)` | `oklch(41% 0.112 45.904)` |

Dark mode applied via `.dark` class on `<html>`.

# Sections (all data-driven from CV JSON)

1. **Profile** — gradient cover banner, profile picture (Avatar), full name, headline, location, current job, summary paragraph, about card (birth, nationality, email). Social profiles moved to footer.
2. **Timeline** — horizontal scrollable timeline merging Experience + Education, sorted by date desc, dot connectors, cards with descriptions/skills/activities
3. **Skills** — standalone section with category-grouped Badge cloud, placed between Timeline and Accordion
4. **Accordion Sections** — single-column layout with shared Accordion wrapping Certifications, Organizations, and Volunteer sections. Each section is one accordion item; expanded content shows item list in Card format. Accordion uses visible border styling.
5. **Footer** — copyright, version, last update timestamp, social profile icons (icon-only with tooltip)

# Data Fetching & State Management

## Data Sources
- EN: `https://gist.github.com/pandawabs/9d98240d06ce64162aebc93905798655/raw/cb800e3aefe9a03fddd9762e260c69933f5a5f23/pandawabs-cv-en.json`
- ID: `https://gist.github.com/pandawabs/9d98240d06ce64162aebc93905798655/raw/cb800e3aefe9a03fddd9762e260c69933f5a5f23/pandawabs-cv-id.json`

## Caching Strategy
- localStorage keys: `cv_data_en`, `cv_data_id`
- Also store `cv_data_ts_en` / `cv_data_ts_id` (fetch timestamp) for TTL
- TTL: 24 hours. On read, if cache expired → fetch fresh. On fetch fail → serve stale cache if available.
- Language switch: load cached data for target language; fetch fresh if missing or expired.

## State Machine per language
- `idle` → initial
- `loading` → fetching (show Skeleton)
- `loaded` → data ready (show sections)
- `error` → fetch failed, no cache (show error + retry Button)
- `stale` → cache expired, background refresh (show data from cache)

# SEO & Accessibility
- `<title>` dynamically set per language
- `<meta name="description">`, `<meta property="og:*">`, `<meta name="twitter:*">`
- JSON-LD structured data (`Person` schema)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`
- Print styles via `@media print` — hide header nav, adjust layout to A4-friendly

# TypeScript
- Explicit interfaces for all CV data shapes in `src/types/cv.ts`
- No `any` types; strict mode enabled

# shadcn-vue components to add
```bash
npx shadcn-vue@latest add accordion button card badge collapsible separator avatar skeleton
```

These land in `src/components/ui/` (auto-generated by shadcn-vue CLI).

# Deployment
- `vite.config.ts`: `base: '/'` (repo is `<username>.github.io`, serves from root)
- Build outputs to `dist/`
- Existing `deploy.sh` pushes `dist/` to `gh-pages` branch → works as-is
- GitHub Pages configured to serve from `gh-pages` branch, root directory

# Project Structure

```
pandawabs.github.io/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── components.json                  # shadcn-vue config
├── postcss.config.js
├── deploy.sh                        # existing, unmodified
├── public/
│   └── favicon.ico
└── src/
    ├── main.ts                      # createApp + global styles
    ├── App.vue                      # root: header + main + footer
    ├── style.css                    # Tailwind v4 directives + theme tokens + print
    ├── lib/
    │   └── utils.ts                 # cn() utility (shadcn-vue)
    ├── types/
    │   └── cv.ts                    # CvData, Profile, Experience, Education, etc.
    ├── data/
    │   └── urls.ts                  # CV_EN_URL, CV_ID_URL constants
    ├── locales/
    │   └── translations.ts          # Section heading labels en ↔ id
    ├── composables/
    │   ├── useCvData.ts             # fetch, cache, TTL, reactive state
    │   ├── useTheme.ts              # light/dark toggle, .dark class on <html>
    │   └── useLanguage.ts           # en/id toggle, lang attr on <html>
    └── components/
        ├── ui/                      # shadcn-vue generated components
        │   ├── Accordion.vue
        │   ├── Button.vue
        │   ├── Card.vue
        │   ├── Badge.vue
        │   ├── Collapsible.vue
        │   ├── Separator.vue
        │   ├── Avatar.vue
        │   └── Skeleton.vue
        ├── layout/
        │   ├── AppHeader.vue        # nav: site title, ThemeToggle, LangSwitcher
        │   └── AppFooter.vue        # copyright, links
        ├── ui-custom/
        │   ├── ThemeToggle.vue      # sun/moon icon Button toggle
        │   ├── LanguageSwitcher.vue # EN | ID toggle
        │   ├── LoadingSkeleton.vue  # full-page Skeleton composition
        │   ├── ErrorState.vue       # error icon + message + retry Button
        │   └── EmptyState.vue       # empty illustration + message
        └── sections/
            ├── ProfileSection.vue   # gradient cover + avatar + identity + summary + about card
            ├── TimelineSection.vue # horizontal scrollable timeline (experience + education)
            ├── SkillsSection.vue   # category-grouped Badge cloud
            ├── CertificationsSection.vue
            ├── OrganizationsSection.vue
            └── VolunteerSection.vue
```
