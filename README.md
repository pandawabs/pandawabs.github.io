# pandawabs.github.io

Personal CV website hosted on GitHub Pages. Single-page Vue 3 app with bilingual support, dark/light theme, and data-driven sections.

## Tech Stack

- Vue 3 (Composition API) + TypeScript
- Vite
- Tailwind CSS v4
- shadcn-vue (Accordion, Button, Card, Badge, Avatar, Skeleton, Collapsible, Separator)
- dayjs (datetime formatting)
- reka-ui (headless UI primitives)

## Development

```bash
# install dependencies
npm install

# start dev server
npm run dev

# typecheck + build
npm run build

# preview production build
npm run preview
```

## Deployment

The `deploy.sh` script builds the project and pushes `dist/` to the `gh-pages` branch. GitHub Pages serves from that branch.

## Project Structure

```
src/
├── main.ts                    # app entry
├── App.vue                    # root layout
├── style.css                  # Tailwind + theme tokens
├── lib/utils.ts               # cn() utility
├── types/cv.ts                # CV data interfaces
├── data/urls.ts               # CV JSON URLs
├── locales/translations.ts    # en/id translations
├── composables/
│   ├── useCvData.ts           # fetch, cache, TTL
│   ├── useLanguage.ts         # en/id toggle
│   └── useTheme.ts            # dark/light toggle
└── components/
    ├── ui/                    # shadcn-vue primitives
    ├── icons/                 # brand SVG icons
    ├── layout/                # AppHeader, AppFooter
    ├── ui-custom/             # LoadingSkeleton, ErrorState, EmptyState
    └── sections/              # Profile, Timeline, Certifications, etc.
```

## License

MIT

Copyright (c) 2026 Pandawa Bagus Sudewa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
