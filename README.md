# Realta — Premium Real Estate Platform

A modern, production-ready real estate web application built with **Next.js 14**, featuring a stunning dark-orange design system, interactive property maps, and a full agent dashboard.

![Realta Banner](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80)

---

##  Features

- **Home Page** — Hero search, featured listings, Buy/Sell CTAs
- **Property Search** — Split layout with interactive Leaflet map, price markers & advanced filters
- **Property Details** — Full gallery, dynamic stats (area, beds, baths), amenities, mortgage calculator, map
- **Compare Properties** — Side-by-side property comparison with a neighborhood map
- **Saved Properties** — Heart-based wishlist with saved search alerts (Zustand-persisted)
- **Agent Dashboard** — Stats cards, performance chart, listings table with orange accent theme
- **Add New Listing** — Full form with Zod validation, Zustand store integration, success toast & redirect

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Maps | Leaflet + react-leaflet |
| Charts | Recharts |
| State Management | Zustand |
| Form Validation | React Hook Form + Zod |
| Fonts | Inter, Plus Jakarta Sans |

---

##  Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/12348s/realta.git
cd realta

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home page
│   ├── properties/
│   │   ├── page.tsx              # Property search with map
│   │   └── [id]/                 # Property detail page
│   ├── compare/                  # Compare properties
│   ├── saved/                    # Saved / wishlist
│   ├── agent/
│   │   ├── dashboard/            # Agent dashboard
│   │   └── new-listing/          # Add new listing form
│   └── data/
│       └── mumbaiProperties.json # Property dataset
├── components/
│   ├── PropertyMap.tsx           # Interactive Leaflet map
│   ├── NeighborhoodMap.tsx       # Static neighborhood map
│   ├── AdvancedFiltersModal.tsx  # Advanced search filters
│   └── ui/                       # shadcn/ui components
└── store/
    ├── savedStore.ts             # Wishlist Zustand store
    ├── filterStore.ts            # Filter state store
    └── useListingStore.ts        # Agent listings store
```

---

##  Design System

| Token | Value |
|---|---|
| Background | `#F5F0EB` |
| Accent (Orange) | `#E8622A` |
| Card Background | `#FFFFFF` |
| Heading Font | Inter |
| Body Font | Plus Jakarta Sans |

---

##  Build

```bash
npm run build
npm run start
```

---

## 📄 License

MIT
