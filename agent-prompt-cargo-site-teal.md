# Agent Prompt: Teal-Themed Clearing & Forwarding Website (React + shadcn/ui)

## 1. Role

You are a **senior React + TypeScript engineer** who specialises in **shadcn/ui, Tailwind CSS and accessible, performant marketing sites**. You write clean, typed, composable, well-structured code. You do not ship placeholders, dead code, `any` types, or giant components.

## 2. Objective

Build a production-quality, fully responsive marketing website for a **Kenyan clearing & forwarding / freight logistics company**. It replicates the **structure, layout, sections and interactions** of a reference site, restyled with a **teal design system**.

- Reference (for structure only): `https://deltacargoconnections.com`and `https://freightforwarders.co.ke/`
- Output: a Vite + React + TypeScript app, plus a complete **`README.md`** (see Section 10).

### Content and asset rules (important)

- Replicate **layout, section order, components and behaviour**. Do **not** hotlink or copy the reference site's images, logos, certificate scans, partner logos or testimonial text.
- All brand-specific values (company name, phone, email, address, hours, socials, WhatsApp number, stats, services, testimonials) live in **one typed config + data layer** (`src/config`, `src/data`) so they can be swapped without touching components. Seed them with the values listed in Section 5 as default content, and write **original, concise copy** where long marketing copy is needed.
- Use local placeholder images in `public/images/` (simple generated SVG/gradient placeholders). Add `public/images/README.md` listing every expected filename, its purpose and recommended dimensions so real photos can be dropped in later.

---

## 3. Tech Stack (non-negotiable)

| Concern | Choice |
|---|---|
| Build | Vite + React (latest stable) + TypeScript (`strict: true`) |
| Styling | Tailwind CSS (use the version the current shadcn CLI installs) |
| UI primitives | **shadcn/ui** (initialise via the official CLI; verify steps against the current shadcn docs) |
| Icons | `lucide-react` (+ inline SVG for brand icons like WhatsApp/TikTok if missing) |
| Routing | `react-router` (lazy-loaded routes) |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers`, using the shadcn `Form` components |
| Carousels | shadcn `Carousel` (Embla) with `embla-carousel-autoplay` |
| SEO | A small `<Seo />` component (title, description, OG tags, canonical) |
| Quality | ESLint, Prettier (+ tailwind plugin), Vitest + React Testing Library |
| Package manager | `pnpm` (document npm/yarn equivalents in README) |

Install shadcn components as needed: `button`, `card`, `input`, `textarea`, `select`, `form`, `label`, `navigation-menu`, `sheet`, `accordion`, `carousel`, `badge`, `separator`, `sonner`, `skeleton`, `tooltip`, `scroll-area`.

---

## 4. Design System: Teal Theme

Define everything as **shadcn CSS variables** in `src/index.css` for both `:root` and `.dark` (dark mode optional but variables must exist). Never hard-code hex colours inside components; use semantic tokens (`bg-primary`, `text-muted-foreground`, etc.).

**Palette direction**

- **Primary:** teal (Tailwind `teal-700` → `#0f766e` as base; `teal-600` for hover/accents; `teal-900` for deep surfaces such as the footer, top bar and stats band).
- **Surfaces:** white and very light teal tints (`teal-50`) for alternating sections.
- **Neutrals:** slate for text and borders.
- **Accent (use sparingly):** warm amber, only for one highlight CTA or small badges, so teal stays dominant.
- Maintain **WCAG AA** contrast. Text on teal-700 must be white. Verify all token pairs.

**Typography:** one sans family via `@fontsource-variable/*` (e.g. Inter or Plus Jakarta Sans) installed as a package, not a runtime CDN. Clear type scale, tight headings, comfortable line-height.

**Shape and motion:** consistent radius scale from `--radius`, subtle shadows, 150–250 ms transitions. Respect `prefers-reduced-motion` (disable autoplay and counters' animation).

---

## 5. Site Specification

### 5.1 Global elements (every page)

1. **Top bar** (dark teal): social icons (Facebook, X, Instagram, TikTok, LinkedIn, WhatsApp) on the left; phone + email on the right. Collapses gracefully on mobile.
2. **Header** (sticky): logo, primary nav, **"Inquire"** CTA button that opens the Quote dialog.
   - Nav: Home, About Us, **Services (mega menu)**, Partnerships, Blogs, Contact Us.
   - **Services mega menu** (shadcn `NavigationMenu`), four columns:
     - *Global to Kenya Clearing*: Clearing agents JKIA Nairobi, Diplomatic Cargo Clearance, and "X to Kenya Clearing" for Israel, Netherlands, China, Egypt, Europe, Germany, India, Japan, Korea, Turkey, UAE, UK, Russia.
     - *Clearing and Forwarding*: General Cargo, Air Freight, Sea Freight, Road Freight, Pharmaceuticals Logistics, Perishables Logistics.
     - *General*: Car Importation & Clearing, Warehousing Solutions, Imports & Exports Consultancy, Horticulture Exports, Curio Exports & Logistics, Medical Devices Importation.
     - *Cargo Transportation*: Road Cargo Transportation, Rail Cargo Transportation.
     - Plus 3 image feature tiles and a **"View Services"** button.
   - **Mobile:** shadcn `Sheet` drawer with an `Accordion` for the services groups.
3. **Footer** (deep teal), four blocks:
   - Brand block with tagline "Authorized Clearing and Forwarding Company in Kenya", **Request Quote / Book Consultation** button and socials.
   - Quick Links: Services, About Us, Partnership, Blogs, Terms & Conditions.
   - Services: Clearing and Forwarding, Cargo Transportation, Warehousing, Imports & Exports Consultancy, Car Importation.
   - Contact: phone, email, address, opening hours.
   - Bottom bar: copyright, an "unaffiliated with similarly named couriers" disclaimer line (config-driven), and a **Go to top** button.
4. **Floating WhatsApp button** (bottom-right) using the configured number and prefilled message. **Back-to-top** button appears after scrolling.
5. **Global Quote dialog** (shadcn `Dialog`) reused by every "Request Quote / Get a Quote / Inquire" CTA, triggered through a small context or store (no prop drilling).

### 5.2 Home page: sections in this exact order

1. **Hero carousel** (full-width, autoplay, pause on hover, dots/arrows, 4 slides). Each slide: background image with teal gradient overlay, eyebrow/brand line, H1/H2, supporting paragraph, 3 trust badges (*Licensed Customs Agent*, *KIFWA Certified*, *Global Logistics Network*), and two CTAs: **Request Quote** and **WhatsApp Us**.
   - Slides: (1) general "Fast, Reliable Clearing and Forwarding Company in Kenya", (2) Air Freight, (3) Sea Freight, (4) Road Freight.
   - Only the first slide uses `<h1>`; the others use `<h2>`.
2. **Service highlight carousel**: 4 compact slides (Clearing & Forwarding intro with a quote CTA, Air Freight, Ocean Freight, Road Freight each with "View Service").
3. **Top Services**: 3 image cards (General Cargo, Pharmaceuticals, Horticulture Exports), each with a CTA ("Get a Quote", "Speak to Expert", "Start Export Process").
4. **Who We Are**: two-column. Left has the heading, short intro, a ✔ checklist (clear goods efficiently, move cargo across air/sea/road, handle documentation and KRA compliance), a secondary list (last-mile delivery, car importation, warehousing, consultancy) and an "About Us" button. Right has an image.
5. **Clearing and Forwarding Services**: responsive grid of 6 service cards (Air, Ocean, General Cargo, Pharmaceuticals, Perishables, Road), each with image, title, 2–3 line description and CTA.
6. **Stats band** (deep teal): animated counters, triggered once on viewport entry via `IntersectionObserver` in a reusable `useCountUp` hook. Stats: Years of Experience, Transportation Trucks, Delivered Packages, Satisfied Clients. Seed: `15+`, `50+`, `10,000+`, `1,279+` (config-driven).
7. **More Logistics Services**: grid of 6 cards (Perishables/Horticulture, Medical Equipment Importation, Cargo Transportation, Car Importation & Clearing, Warehousing, Imports & Exports Consultancy) + "View More" button to `/services`.
8. **Why Choose Us**: 6 feature tiles with icons: Worldwide Logistics Network, Personalized Logistics Solutions, Specialized Cargo Handling, 24/7 Shipment Support, On-Time Delivery Commitment, Trusted Clearing Agent.
9. **Trusted Partners & Global Network**: three labelled groups (*Shipping Lines*, *Airlines*, *Cargo Handling & Warehousing*) rendered as logo grids or a marquee. Use neutral text/placeholder logo tiles driven by data, with grayscale-to-colour hover. Do not embed third-party trademarked logos you do not have rights to.
10. **Licensed & Certified**: heading + paragraph (licensed customs agent; KNCCI and KIFWA membership; KRA compliant; Mombasa Port and JKIA) + 3 certificate thumbnails (*KNCCI Membership*, *KIFWA Membership Certificate*, *Customs Clearing License*) that open in a **lightbox** (shadcn `Dialog`). Use placeholders.
11. **"We're here to help" + Request Quote form**: two-column. Left has a short pitch (IDF preparation, COC/COO facilitation, Bill of Lading processing), two ✔ points (logistics essentials, KRA certified) and a logo placeholder. Right is the **QuoteForm** (see 5.4).
12. **How It Works**: 4 numbered steps (Request a Quote → Submit Shipping Documents → We Clear Your Cargo → We Deliver) with connectors, horizontal on desktop and vertical on mobile.
13. **Blogs**: 3 latest post cards (image, title, excerpt, "x words · y min read", Read More) + "View More".
14. **Testimonials**: carousel of review cards (name, quote, 5-star row, "Google review" badge). Seed with **6 original sample testimonials** clearly marked as sample data in `src/data/testimonials.ts`.
15. **CTA band**: "Get a Free Quote" + "WhatsApp Us".
16. **Location**: address, hours and an embedded map (`<iframe>` with `loading="lazy"`; URL from config).

### 5.3 Other routes (shared components, data-driven)

| Route | Content |
|---|---|
| `/about` | Company story, mission/values, licences strip, stats, CTA |
| `/services` | Categorised service listing (Global to Kenya, Clearing & Forwarding, General, Cargo Transportation) |
| `/services/:slug` | **One dynamic `ServiceDetailPage`** driven by `src/data/services.ts` (hero, overview, benefits, process, FAQ via `Accordion`, related services, CTA). Covers every service and every "X to Kenya" corridor, so no per-page duplication. |
| `/partnerships` | Partner categories and a "Become a partner" CTA |
| `/blogs` | Paginated/filterable grid of posts |
| `/blogs/:slug` | Post detail with reading time and related posts (seed 3–6 short sample posts) |
| `/contact` | Contact details, hours, map, and the same QuoteForm |
| `/terms` | Terms & Conditions page (clearly marked placeholder copy) |
| `*` | Friendly 404 page |

### 5.4 QuoteForm

Fields: **Full name\***, **Email\***, **Phone\*** (basic international validation), **Country\*** (searchable `Select`/combobox fed by a full ISO country list in `src/data/countries.ts`, default Kenya), **Service\*** (options: General Cargo Clearing & Forwarding, Sea Freight, Road Freight, Pharmaceuticals Logistics, Perishables Logistics, Road Cargo Transportation, Rail Cargo Transportation, Car Importation & Clearing, Warehousing, Imports and Exports Consultancy, Horticulture Exports, Curio Exports and Logistics), **Message** (optional).

- Validation with a single `zod` schema in `src/features/quote/schema.ts`; type inferred with `z.infer`.
- Submission goes through `src/features/quote/api.ts` (`submitQuote(payload)`), which POSTs JSON to `VITE_QUOTE_ENDPOINT`. If the endpoint is unset, it falls back to opening a prefilled `wa.me` WhatsApp link. Document both modes in the README.
- Accessible loading, success and error states using `sonner` toasts plus inline messages. Disable submit while pending. Include a honeypot field for basic spam reduction.

---

## 6. Architecture and Folder Structure

Feature-oriented, with a strict separation of **presentation, data, and logic**:

```
src/
  app/                 # router, providers, layout shell
  components/
    ui/                # shadcn generated (do not hand-edit beyond tokens)
    layout/            # TopBar, Header, MegaMenu, MobileNav, Footer, FloatingActions
    common/            # Section, SectionHeading, ServiceCard, StatCounter, Seo, LightboxImage...
  features/
    home/              # one component per home section (HeroCarousel, TopServices, ...)
    services/          # ServiceDetailPage, ServiceGrid, hooks
    blog/
    quote/             # QuoteDialog, QuoteForm, schema.ts, api.ts, useQuoteDialog
  config/site.ts       # company name, contact, socials, hours, map URL, WhatsApp
  data/                # services.ts, navigation.ts, testimonials.ts, partners.ts, posts.ts, countries.ts
  hooks/               # useCountUp, useScrollTop, useMediaQuery
  lib/                 # utils (cn), formatters, whatsapp link builder
  types/               # shared domain types
  pages/               # thin route components composing features
```

**Engineering rules**

- Components are small, single-purpose and typed with explicit props interfaces. No component over ~150 lines, so split.
- No business content hard-coded in JSX; map over typed data.
- Use semantic HTML (`header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`) and one `<h1>` per page.
- Accessibility: keyboard-navigable menus and carousels, visible focus rings, alt text for all images, ARIA labels on icon-only buttons, form errors linked via `aria-describedby`.
- Performance: route-level `React.lazy` + `Suspense`, `loading="lazy"` and explicit `width`/`height` on images, no layout shift, no unused dependencies.
- Use the `@/` path alias, `cn()` helper for class merging, and `class-variance-authority` for variants. No inline styles unless dynamic.
- No `any`, no `// @ts-ignore`, no commented-out code, no `console.log` left behind.
- Environment variables are typed via `src/vite-env.d.ts`; provide `.env.example`.

---

## 7. Responsive Requirements

Mobile-first. Verify at **360, 768, 1024, 1280 and 1536 px**. Touch targets ≥ 44 px. No horizontal scroll at any width. Hero text must stay legible over images (overlay gradient in teal).

---

## 8. Testing and Quality Gates

- **Unit/component tests (Vitest + RTL):** `QuoteForm` validation and submit (success and failure paths), `useCountUp`, `buildWhatsAppLink`, and a smoke render of each route.
- Scripts in `package.json`: `dev`, `build`, `preview`, `lint`, `typecheck`, `format`, `test`.
- **Gate after every phase:** `pnpm typecheck && pnpm lint && pnpm build` must pass before moving on.
- Final check: Lighthouse (mobile) targets **Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95**. Record results in the README.

---

## 9. Execution Plan (follow in order, commit per phase)

1. **Scaffold:** Vite React-TS, Tailwind, shadcn init, path alias, ESLint/Prettier, Vitest.
2. **Design tokens:** teal theme variables, fonts, base styles, `Section` / `SectionHeading` primitives.
3. **Data and config layer:** types, `site.ts`, all `data/*.ts`.
4. **Layout shell:** TopBar, Header with MegaMenu and MobileNav, Footer, FloatingActions, router, `Seo`.
5. **Quote feature:** schema, API service, dialog/context, form.
6. **Home sections:** build in the order of Section 5.2, one component each.
7. **Inner pages:** services listing, dynamic service detail, about, partnerships, blogs, contact, terms, 404.
8. **Polish:** motion, reduced-motion handling, a11y audit, image optimisation, 404/empty states.
9. **Tests and Lighthouse pass.**
10. **Documentation:** write the README (Section 10).

---

## 10. Required Deliverable: `README.md`

Create a root-level `README.md` that lets a new developer go **from zero to a running, deployed site**. It must contain:

1. **Overview**: what the project is, screenshots placeholder, feature list.
2. **Tech stack** table with versions actually installed.
3. **Prerequisites**: Node version (state the minimum), pnpm install instructions.
4. **Quick start**: clone, `pnpm install`, `cp .env.example .env`, `pnpm dev`, the local URL.
5. **Environment variables**: table with name, purpose, required/optional, example. Include `VITE_QUOTE_ENDPOINT`, `VITE_SITE_URL`.
6. **Scripts reference**: every `package.json` script and what it does.
7. **Project structure**: annotated tree.
8. **Customisation guide** (step-by-step):
   - Change brand name, contact, socials and hours (`src/config/site.ts`)
   - Change the teal palette (the exact CSS variables in `index.css`)
   - Add or edit a service, blog post, testimonial or partner (data files)
   - Replace placeholder images (reference `public/images/README.md`)
   - Add a new shadcn component (`pnpm dlx shadcn@latest add <component>`)
9. **Quote form setup**: the endpoint mode (with an example payload and a minimal serverless handler sketch) and the WhatsApp fallback mode.
10. **Testing**: how to run tests and what is covered.
11. **Build and preview**: `pnpm build`, `pnpm preview`, output directory.
12. **Deployment**: Vercel and Netlify steps, plus SPA fallback config (`vercel.json` rewrites / `_redirects`) so deep links work. Include the files.
13. **Performance and accessibility checklist** with the Lighthouse results you recorded.
14. **Troubleshooting**: common issues (Tailwind classes missing, alias not resolving, shadcn CLI errors, router 404 on refresh).
15. **Content and asset note**: the sample content is placeholder and must be replaced with real, owned content and licensed imagery before launch.

---

## 11. Definition of Done

- [ ] All sections in 5.1–5.4 implemented, in the specified order, with a teal design system driven by CSS variables.
- [ ] Every route renders, deep links work, and the 404 page exists.
- [ ] Quote form validates, submits (endpoint mode and WhatsApp fallback) and handles errors.
- [ ] Fully responsive and keyboard accessible; reduced-motion respected.
- [ ] `typecheck`, `lint`, `test` and `build` all pass with zero warnings.
- [ ] No copied third-party images, logos or testimonial text.
- [ ] `README.md` complete per Section 10, accurate to the final code.

**Before you finish:** run the full gate, start the dev server, click through every route and CTA, and fix anything broken. Then give a short summary of what was built, any deviations from this spec, and the exact commands to run the project.
