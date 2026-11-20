# SINTEL Enterprises — website

Corporate website for **SINTEL Enterprises Pvt Ltd** (Bhubaneswar) and its two companies, **Dwarika Finserv** (loans) and **Dwarika Venture** (property sales). Design: the client-approved *Twin Islands* look in Panna Green and gold.

Built with [Astro](https://astro.build) (static HTML for SEO), GSAP + ScrollTrigger and Lenis smooth scrolling. Hosted free on GitHub Pages.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Pages (57 built: 18 per language, plus 3 English-only)

| URL | Page |
|---|---|
| `/` | Home: animated Twin Islands hero, statement, companies, loans hover-list, featured properties, steps, why SINTEL, enquiry |
| `/about/` | Tower turns as you scroll (VID-04 scrubbed by scroll), story, vision & mission, leadership, group diagram, values |
| `/dwarika-finserv/` + 7 loan pages | Hub + Personal, Business, Loan Against Property, Home, Project Funding, Cash Credit, Invoice Funding |
| `/dwarika-venture/` + 6 sub-pages | Hub (filterable listings) + Flats, Villas, Plots, Commercial, Sell Your Property, Buyer's Guide |
| `/dwarika-venture/property/<slug>/` | One page per listing, generated from `src/data/property.ts` |
| `/contact/`, `/privacy-policy/`, `/disclaimer/`, `404` | |
| `/or/…`, `/hi/…` | Odia and Hindi versions of every page above except the legal pages and 404, which stay English |

## Where to edit content

| What | File |
|---|---|
| Phone, WhatsApp, email, address, hours, social links, Web3Forms key, ORERA no., Google reviews link, GA4 ID, Search Console code | `src/data/site.ts` |
| Track record, reviews, partner logos, team | `src/data/site.ts` (each section stays hidden while its list is empty) |
| Loan pages (copy, eligibility, documents, rate range, FAQs) | `src/data/loans.ts` |
| Property types and **property listings** | `src/data/property.ts` |
| Page layouts | `src/pages/[...lang]/` (built once per language); legal pages and 404 in `src/pages/` |
| Page and button text (all three languages) | `src/i18n/en.ts`, `or.ts`, `hi.ts`; browser messages in `src/i18n/client.ts` |
| Odia / Hindi loan and property-type copy | `src/data/loans.or.ts`, `loans.hi.ts`, `property.or.ts`, `property.hi.ts` |
| Colours, type, spacing | `src/styles/global.css` (tokens at the top) |
| Motion (preloader, curtain, reveals, hover images, scroll-scrub) | `src/scripts/main.ts` |
| Images / videos | `public/media/` |

**Placeholders:** anything still to come from SINTEL is marked `TODO(SINTEL)` in the code. The dashed gold "To confirm" labels show only on the dev server (`npm run dev`), never in the live build. Search the project for `TODO(SINTEL)` to find them all.

## Languages (English, Odia, Hindi)

English stays at the root (`/about/`); Odia is under `/or/` and Hindi under `/hi/` (Astro i18n routing, see `astro.config.mjs`). Every page has a language switcher (EN · ଓଡ଼ିଆ · हिंदी) in the header and the mobile menu that opens the same page in the other language. Pages carry `hreflang` links, the sitemap lists all three languages, and Odia / Hindi pages load Noto Sans Oriya / Noto Sans Devanagari.

> **The Odia and Hindi text is a machine-translated draft. A native Odia speaker and a native Hindi speaker at SINTEL must review it before it is relied on.** The files to review are `src/i18n/or.ts`, `src/i18n/hi.ts`, `src/i18n/client.ts`, `src/data/loans.or.ts`, `src/data/loans.hi.ts`, `src/data/property.or.ts` and `src/data/property.hi.ts` (each has a header saying so).

- Brand names (SINTEL, Dwarika Finserv, Dwarika Venture), phone numbers, the office address and ORERA terms are not translated.
- The disclaimer and privacy policy are English only; the footer links to them say "(in English)".
- When English copy changes in `loans.ts`, `property.ts` or `en.ts`, update the same entry in the Odia and Hindi files (same slug / key). Office hours are written out in each language file, so change them there too.
- Forms: labels are translated, but the values sent to SINTEL (interest, loan type, property type) stay in English, and Odia / Hindi forms add a `language` field so the team knows which language to call back in.

### Adding a property
Put the photos in `public/media/properties/` (WebP, about 1600 px wide), then add an entry to `allProperties` in `src/data/property.ts`. Entries with `sample: true` are templates and are never published; while there are no real listings, the property sections show a "tell us your budget" panel instead.

### Enquiry forms
Forms email each enquiry to `site.email` and then show a "Thank you" panel. With no Web3Forms key they use [FormSubmit](https://formsubmit.co) (no account): the **first** enquiry triggers an activation email to that address, and someone must click its link once before enquiries are delivered. To use [Web3Forms](https://web3forms.com) instead, create an access key for the same address and paste it into `web3formsKey`. If sending fails, the visitor is asked to WhatsApp or call.

### Analytics
Set `gaId` in `src/data/site.ts` to the GA4 measurement ID. Events sent: `whatsapp_click` (with `company` and `location`), `phone_click`, `email_click`, `directions`, `generate_lead` (enquiry sent). In GA4, mark `whatsapp_click` and `generate_lead` as key events.

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Repository **Settings → Pages → Source: GitHub Actions**.
2. Merge to `main` (or run the workflow manually from the Actions tab).
3. The site appears at `https://<owner>.github.io/<repo>/`.
4. Custom domain later: add it under Settings → Pages; the workflow picks up the new address automatically.

Note: on a free GitHub plan, Pages needs the repository to be **public**.

## Stability rules
- Hero videos are muted MP4s with a poster shown first; they pause when off-screen. Phone versions (`*-m.mp4`, 854×480) are 100–275 KB each and start 2.5 s after the page loads.
- Phones skip the loading screen and the About-page scroll video; 3G connections get posters only.
- Reduced-motion users and data-saver / 2G connections get posters and simple layouts: no preloader, smooth scroll or video.
- The About tower video has every frame as a keyframe so scroll-scrubbing is smooth in both directions.
- Below-the-fold images lazy-load.

## Still needed from SINTEL
ORERA agent number · Google Business Profile link and rating · GA4 ID · partner lender logos (with permission) · real reviews · indicative rate ranges per loan · logo files (SVG / high-res PNG) · domain name · full office address, email and hours · About text · photo and designation of Ashok Kumar Sahoo · loan FAQ answers (fees, timelines, partner banks) · property listings with photos and ORERA numbers · confirmation of the Sell Your Property process and Buyer's Guide text · **native-speaker review of the Odia and Hindi translations** (see Languages).
