# Joyería Aguilar — Inventario

A branded React inventory + credit tracking app for Joyería Aguilar. Black & rose-gold theme, elegant serif typography, bilingual (English default, one-tap Spanish toggle). Installable as a PWA. Deploys to Netlify/Vercel with automatic remote updates.

## v1.2.0 features

**Inventory**
- 17 built-in jewelry fields, plus unlimited custom fields (text, long text, number, date, dropdown)
- Multiple photos per item with reorderable carousel
- Auto photo compression (1200px max, JPEG 80%)
- QR code generation for every SKU + camera-based scanner
- Search, category + status filters
- **Profit / margin** auto-calculated from cost and retail price

**Credit tracking**
- Customer accounts (name, phone, notes)
- Record sales on credit — picks an item from inventory and **auto-changes that item's status to "Sold on Credit"**
- Deleting a sale reverts the item back to "In Stock"
- Record payments (cash, card, transfer, other)
- Per-customer dashboard: owes / paid / balance + chronological timeline
- Main Credit tab shows total outstanding across all customers

**Customer View mode (new)**
- Tap the eye icon in the header to enter Customer View
- A bright rose banner appears at the top: "Customer View — private info hidden"
- Hides: cost, supplier, date acquired, location, status, notes, SKU, profit/margin, QR code, Credit tab, Settings, Edit/Delete buttons
- Only shows items with status "In Stock" (so customers don't see sold/on-hold pieces)
- Shows: item name, photos, category, metal, purity, weight, gemstone, size, retail price, description, and any non-insider custom fields
- **Exit requires confirmation** — no accidental reveal if she taps by mistake
- State persists across refreshes via localStorage, so if she closes the app in Customer View, it stays in Customer View when reopened

**Insider fields are marked with a "Private" lock badge** in both the edit form and the detail view (when in Private mode), so mom can see at a glance which fields are hidden from customers.

**Language**
- English default, one-tap Spanish toggle in the header
- Customer View mode hides the language toggle (no need to confuse customers)

**Platform**
- PWA installable — "Add to Home Screen"
- Service worker for offline fallback
- Auto-update banner when new version deployed
- Export / Import JSON includes items + custom fields + customers + credit history

## Files

- **`jewelry_inventory.jsx`** — main component
- **`index.html`** — template with PWA meta tags, SW registration
- **`manifest.json`** — PWA manifest
- **`sw.js`** — service worker
- **`version.json`** — deployed alongside the build; app polls it every 60s

## Setup

Install Node.js LTS. Then:

```bash
npm create vite@latest joyeria-aguilar -- --template react
cd joyeria-aguilar
npm install
npm install lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js:**
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**File placement:**
- `jewelry_inventory.jsx` → `src/jewelry_inventory.jsx`
- Replace project-root `index.html` with the one in this folder
- `manifest.json`, `sw.js`, `version.json` → `public/`

**src/main.jsx:**
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import JewelryInventory from "./jewelry_inventory.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JewelryInventory />
  </React.StrictMode>
);
```

**Run:**
```bash
npm run dev
```

## Deploy & remote updates

1. Push to GitHub → Netlify → import repo → build `npm run build`, publish `dist`
2. Bump `APP_VERSION` (in `jewelry_inventory.jsx`) AND `version` (in `public/version.json`) to the same new version
3. `git push` — Netlify rebuilds in ~30s
4. Mom sees "Update" banner within 60s; one tap reloads with her data intact

## How "Sold on Credit" linkage works

When mom records a sale on a customer's account and picks an item from the dropdown, the app automatically:
1. Creates the sale record on the customer's account
2. Changes that item's status in inventory to "Sold on Credit"
3. Hides the item from Customer View (since customer view only shows "In Stock")

If she needs to undo (customer changed their mind, or she recorded the wrong item), deleting the sale from the customer's timeline reverts the item's status back to "In Stock."

Manual-description sales (where she didn't pick an item from the dropdown) don't touch inventory — useful for one-off items, repairs, or custom work that isn't in the catalog.

## How Customer View works

**What's hidden:**
- Fields marked `insider: true`: cost, supplier, date acquired, location, status, notes
- SKU (on list cards and detail page)
- Profit / margin badge
- QR code
- Edit / Delete buttons
- Credit tab and Settings
- Language toggle
- "Add" button
- Status filter
- Any item not in "In Stock" status

**What's shown:**
- Photos, name, category, metal, purity, weight, gemstone, size, retail price, description
- Any custom fields NOT marked as insider (all user-created fields default to non-insider)

**Safety:**
- Bright rose banner at the top of the screen makes it obvious she's in Customer View
- Exit button requires confirmation
- State persists — closing and reopening the app stays in Customer View
- When she taps the eye icon to enter, any open credit/settings views auto-close

## Version bump cheat sheet

```bash
# 1. Edit jewelry_inventory.jsx  →  const APP_VERSION = "1.3.0";
# 2. Edit public/version.json    →  { "version": "1.3.0", ... }
# 3. Deploy
git add -A && git commit -m "v1.3.0" && git push
```
