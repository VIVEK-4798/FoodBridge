# FoodBridge - UI Design System

This document outlines the design tokens, colors, typography, layout guidelines, and component patterns established during the UI redesign of FoodBridge.

---

## 1. Color System

We transitioned the UI from standard saturated Tailwind blues to a premium, soft, and minimal SaaS palette:

- **Primary**: Emerald Green (`#10B981`) - used for primary calls-to-action, success states, and brand marks.
- **Secondary**: Teal (`#14B8A6`) - used for secondary tags, auxiliary indicators, and alternate action paths.
- **Background**: Very Light Slate Gray (`#F8FAFC`) - provides a spacious, airy backdrop to contrast with cards.
- **Card Background**: Pure White (`#FFFFFF`) - used for container segments.
- **Text (Slate)**: Dark Slate (`#0F172A`) - ensures proper readability and premium look.
- **Status Colors**:
  - `Available`: Soft Green (`bg-emerald-50 text-emerald-700 border-emerald-100`)
  - `Claimed`: Soft Amber (`bg-amber-50 text-amber-700 border-amber-100`)
  - `Picked Up`: Soft Blue (`bg-blue-50 text-blue-700 border-blue-100`)
  - `Completed`: Soft Gray (`bg-gray-150 text-gray-600 border-gray-200`)

---

## 2. Typography

We use the Google Font **Geist** paired with modern sans-serif backups for readability:

- **Hero Title**: `text-4xl sm:text-5xl md:text-6xl font-black` (48-60px), line height `leading-none`.
- **Page Titles**: `text-2xl sm:text-3xl font-black tracking-tight` (28-36px).
- **Card Titles**: `text-lg font-black tracking-tight` (20px).
- **Body Text**: `text-sm text-gray-500` (14-16px) with line height `leading-relaxed`.

---

## 3. Geometry & Layout System

- **Borders & Radii**:
  - Cards, Modals, and Main components use `rounded-3xl` (24px radius).
  - Inputs, Buttons, Badges, and small actions use `rounded-2xl` (16px radius).
- **Shadow Scale**: Standardized on very soft, modern micro-shadows (`shadow-xs` and `shadow-2xs`), transitioning to `shadow-md` on hover states.
- **Spacing / Padding**:
  - Cards and lists enforce `p-6` (24px) padding.
  - Page views enforce `px-6 py-8` padding.
  - Form inputs and buttons enforce `h-12` minimum height.

---

## 4. Layout Template (Sidebar + Navbar)

- **Left Sidebar**: Renders on desktop for authenticated routes, showcasing navigation lists with modern Lucide icons (`LayoutDashboard`, `Inbox`, `ClipboardList`, `PlusCircle`, `User`), active rounded selectors, and user profile summaries. Collapses into a left-side animated drawer on mobile.
- **Top Sticky Navbar**: Translucent blur overlay (`backdrop-blur-md`) with quick search indicators, dynamic notification bells, and account role tags.
