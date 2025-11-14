# Aethermind — Cognitive Analytics & Digital Wellbeing Insights

Aethermind is a data visualization application built with SolidJS and Vite. It explores and analyzes cognitive and digital wellbeing metrics collected across Dhaka metropolitan zones, including attention span, screen time, and contributing factors such as sleep, stress, and social media.

## Key Features

- Responsive, themed dashboard with a cyan/violet palette
- Data Exploration section for demographic overviews
  - Age Group attention span distribution
  - Gender count distribution
  - Zone-wise participant distribution
- Data Analytics section for deeper insights
  - Root causes of attention span decline (doughnut)
  - Hierarchical attribution of factors (horizontal bar)
  - Gender vs. reasons (stacked bars)
  - Age groups vs. reasons (grouped bars)
  - Screen time categories and correlation (bar + line)
  - Zone vs. reasons heatmap, plus a compact data table
- Smooth animations, hover effects, and adaptive typography

## Tech Stack

- SolidJS (`solid-js`)
- Vite (bundler) and `vite-plugin-solid`
- Tailwind CSS v4 (`@tailwindcss/vite`, `tailwindcss`) with custom theme in `src/index.css`
- Chart.js (`chart.js`) with plugins (`chartjs-adapter-date-fns`, `chartjs-plugin-datalabels`)
- SQL-in-browser helpers (`alasql`) for ad‑hoc queries

## Getting Started

- Prerequisites: Node.js 18+ (recommended: 20+)
- Install dependencies: `npm install`
- Development server: `npm run dev`
- Production build: `npm run build`
- Local preview of production build: `npm run preview`

## Project Structure

- `index.html` — HTML shell and meta tags
- `src/` — SolidJS app
  - `App.tsx` — page layout, sections, and data wiring
  - `components/` — UI building blocks
    - `charts/` — Chart.js wrappers: `Barchart.tsx`, `DoughChart.tsx`, `LineChart.tsx`, `MultiBarChart.tsx`, `HeatmapChart.tsx`
    - `cards/` — stat/info cards
    - `DataTable.tsx` — responsive table with highlighting
  - `types/` — shared typings for charts, tables, data
  - `index.css` — Tailwind and theme variables
- `data/` — static datasets
  - `analytics/` — JSON-like arrays exported from `.js` files
  - `index.ts` — exports + optional query helper

## Data Sources

Data lives under `data/analytics/`. Each file exports a constant array. Examples:

- `agegroup_stats.js` — attention span and screen time per age group
- `gender_counts.js` — participant counts by gender
- `zone_distribution.js` — counts by zone
- `reason_stats.js` — aggregated reasons for low attention span
- `agegroup_reason_counts.js`, `gender_reason_counts.js`, `zone_reason_counts.js` — breakdowns by dimension
- `zone_stats.js` — per-zone attention/screentime

Types for these datasets are defined in `src/types/data.d.ts` for reference and IDE hints.

## How Data Flows

- `App.tsx` imports datasets from `data/analytics/*` and transforms them into chart/table‑friendly props.
- Chart components encapsulate Chart.js configuration, sizing, and responsive behaviors.
- Tailwind utility classes (plus custom classes in `index.css`) handle spacing, typography, borders, and transitions.

### Notable references

- Table component: `src/components/DataTable.tsx:42`
- Heatmap component: `src/components/charts/HeatmapChart.tsx:66`
- Multi bar chart: `src/components/charts/MultiBarChart.tsx:195`
- App layout and sections: `src/App.tsx:168`

## UI/UX and Theming

- Global theme variables are defined in `src/index.css` under `:root`.
- Panel backgrounds use `bg-panel` and gradient helpers to match the brand.
- All chart wrappers are sized with responsive heights like `h-48 sm:h-56 md:h-64` to fit small screens.
- Tables use compact paddings and responsive font sizes for readability.

### Customizing the Theme

- Edit CSS variables in `src/index.css`:
  - `--brand-bg-1`, `--brand-bg-2` — background gradient
  - `--accent-cyan`, `--accent-violet` — accent colors
  - `--surface-1`, `--surface-2` — panel surfaces
- Utility class `bg-panel` is used for surface sections in `App.tsx`.

## Adding New Analytics or Visualizations

1. Place your new dataset in `data/analytics/` and export an array.
2. Export it from `data/index.ts` for central access (optional).
3. In `src/App.tsx`, import your dataset and transform it to chart props.
4. Choose a chart component from `src/components/charts/*` and add a new section.
5. For tables, define column metadata (key/label/align) and pass to `DataTable`.

Example columns for a table:

```ts
const columns = [
  { key: 'Zone_of_Residence', label: 'Zone of Residence', align: 'left' },
  { key: 'Smartphones_Social_Media', label: 'Smartphones & Social Media', align: 'center' },
];
```

## Responsiveness and Performance Notes

- Chart containers auto‑resize; fonts and bar thickness are tuned for legibility.
- Legend fonts and paddings are compacted; hover tooltips emphasize values.
- Tables add horizontal scroll on small viewports; typography scales down.

## Development Tips

- Prefer small, reusable transformations in `App.tsx` using `.map()` to build `label/value` pairs.
- Keep datasets normalized and consistent with the keys in `src/types/data.d.ts`.
- If you need SQL‑like aggregation, use `query()` from `data/index.ts` with `alasql`.

## Deployment

- Build with `npm run build`. The output is in `dist/` ready for static hosting.
- Preview locally with `npm run preview`.

## Roadmap

- Add filters (age, zone, gender) for interactive analytics
- Export reports (CSV/PNG) from charts and tables
- Add automated tests (Cypress wiring exists but test specs are not yet included)

## Acknowledgements

- Chart.js for robust charting
- SolidJS for fast and ergonomic UI composition
- Tailwind CSS for utility-first design
