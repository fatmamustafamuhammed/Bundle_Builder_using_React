# Wyze Bundle Builder

A multi-step product configurator for Wyze security systems with a live review panel and persistence.

## Features

- **4-step accordion builder** with product selection
- **Live review panel** showing selected items with quantities
- **Variant support** with color selection (each variant tracked separately)
- **Quantity management** on both product cards and review panel, kept in sync
- **Automatic total calculation** with discount/savings display
- **Save configuration** to localStorage for persistence ("Save my system for later")
- **Responsive design** from desktop to mobile

## Tech Stack

- React 18 with Hooks
- Vite
- CSS Modules
- localStorage for persistence

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

### Build

```bash
npm run build
```

Outputs a production build to `dist/`.

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
src/
  components/       # Accordion steps, product cards, variant selector, review panel
  data/
    products.json    # Data source driving all product/step rendering
  hooks/            # State + persistence logic (e.g. useBundleState, useLocalStorage)
  types/            # TypeScript interfaces for products, variants, steps
  App.tsx
  main.tsx
```

## Data Model

The app renders entirely from `src/data/products.json`. Each step, product, and variant is described in data — nothing is hardcoded per-product. Variants carry their own independent quantity, and the "N selected" count, review panel, and totals are all derived from this single source of state.

## Decisions & Tradeoffs

- **Local JSON over a backend:** a static `products.json` was used since a backend was called out as a bonus, not a requirement. This keeps the setup to a single `npm install` + `npm run dev`.
- **Persistence:** the full configuration (selected quantities per product/variant, active variant per card) is serialized to a single localStorage key on "Save my system for later," and rehydrated on load if present.
- **Variant chip styling:** per the spec, selected-chip highlighting was deprioritized in favor of correct selection-and-quantity behavior.
- **Checkout button:** wired to a placeholder confirmation (no real checkout flow), as specified.

- ## Notes

### Decisions
- Built the project using React.
- Used Tailwind CSS for faster UI development.
- Organized the code into reusable components.

### Tradeoffs
- Focused on the core functionality & adding Styles.
- Kept state management simple using React Context.
