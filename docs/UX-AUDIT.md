# UX audit — baseline

**Captured:** 2026-11-02 · **Viewport sizes:** 390, 768, 1440 CSS px · **Baseline screenshots:** 30 captures in `/tmp/tt-ux-audit/` (not committed). The routes rendered without console errors or failed requests. This audit records the pre-redesign state.

## Findings by route

| Route / sections | Issues and priority |
|---|---|
| `/` — hero, service strips, company intro, services, stats, trust, partners, certificates, quote, process, blog, testimonials, CTA, map | **High:** hero uses generic claims and several unverified proof points; static four-slide carousel autoplays without pause/reduced-motion handling; visual rhythm repeats equal cards and centered headings; home contains 16 stacked sections; top section has three certification claims as badges without linked proof. **Med:** service list and reviews are generic; more services are a plain repeated grid; no clear “what documents to send” panel. |
| `/about` — intro, image, feature tiles, stats | **High:** generic story without named people/roles or evidence; repeated feature tiles and unverified stats. **Med:** image is a generic cargo montage rather than team photography. |
| `/services` — category groups and service cards | **High:** category cards repeat the same pattern and corridor group is empty because countries are not service records; global routes are not directly navigable. **Med:** card artwork is stock-like and copy is broad. |
| `/services/:slug` — summary, overview, benefits, process, FAQs, related services | **High:** uniform template and generic benefits; FAQs and related service items are not interactive links. **Med:** imagery lacks a consistent treatment. |
| `/partnerships` — partner groups, CTA | **High:** named companies imply confirmed relationships without provenance. **Med:** repetitive logo/text group layout and generic CTA. |
| `/blogs` — article grid | **High:** generic content treatment; no filtering; repeated gradient placeholder blocks. **Med:** no image-led editorial variety. |
| `/blogs/:slug` — article detail | **High:** the slug changes title, but body paragraphs are shared generic copy rather than article-specific content. |
| `/contact` — details, quote form, map | **High:** form fields have sparse guidance and errors are not programmatically associated; map is an external embed. **Med:** regular contact details and form are stacked with little hierarchy. |
| `/terms` — legal placeholder | **High:** explicitly placeholder legal text; requires approved legal copy before production use. |
| `*` — 404 | **Low:** clear recovery link exists; copy is generic. |
| Shared shell — header, footer, floating actions | **High:** topbar repeats placeholder social destination URLs; desktop menu entries are not links; footer contains generic claims/disclaimer. **Med:** shared footer is dense; hover-only services menu is difficult for keyboard/touch. |

## Cross-cutting contract checks

- **High:** no bento-style hierarchy, manifest timeline, trust-stamp evidence, reusable treated-image primitive, or open-hours indicator is present.
- **High:** count-up metrics, certification language, review quotes, partner names, and delivery/service assurances need owner verification or must be marked sample/placeholder. Avoid publishing unverifiable numbers or customer claims.
- **High:** the supplied `src/assets/tnt8 2.jpg` is a composite freight montage with a wordmark, not a clean standalone symbol. It is not suitable as a compact professional logo/favicon without an approved vector source. New minimal brand SVGs should replace the crop.
- **Med:** color tokens are cyan-led rather than contract teal/paper; several components use hard-coded hex and the site lacks a dark theme token set.
- **Med:** reduced-motion CSS exists, but carousel and count-up JavaScript do not honor it; images lack explicit dimensions/lazy loading; only basic quote-schema and home smoke tests exist.
- **Med:** mobile screenshots show the header, hero, contact form, and floating controls fit the 390 px viewport, but stacked badge/card density remains high.

## Evidence and follow-up

The baseline captures cover all current routes at the three requested widths: `/`, `/about`, `/services`, `/services/air-freight`, `/partnerships`, `/blogs`, `/blogs/import-clearing-kenya`, `/contact`, `/terms`, and an unknown-route 404. Keep screenshots temporary; do not add them to Git. Re-capture the same matrix after implementation and record remaining real-content dependencies here.
