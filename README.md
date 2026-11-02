# SINTEL Enterprises — website

Corporate website for **SINTEL Enterprises Pvt Ltd** (Bhubaneswar) and its two companies, **Dwarika Finserv** (loans) and **Dwarika Venture** (property sales). Design: the client-approved *Twin Islands* look in Panna Green and gold.

Built with [Astro](https://astro.build) (static HTML for SEO), GSAP + ScrollTrigger and Lenis smooth scrolling. Hosted free on GitHub Pages.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Pages (24 built)

| URL | Page |
|---|---|
| `/` | Home: animated Twin Islands hero, statement, companies, loans hover-list, featured properties, steps, why SINTEL, enquiry |
| `/about/` | Tower turns as you scroll (VID-04 scrubbed by scroll), story, vision & mission, leadership, group diagram, values |
| `/dwarika-finserv/` + 7 loan pages | Hub + Personal, Business, Loan Against Property, Home, Project Funding, Cash Credit, Invoice Funding |
| `/dwarika-venture/` + 6 sub-pages | Hub (filterable listings) + Flats, Villas, Plots, Commercial, Sell Your Property, Buyer's Guide |
| `/dwarika-venture/property/<slug>/` | One page per listing, generated from `src/data/property.ts` |
| `/contact/`, `/privacy-policy/`, `/disclaimer/`, `404` | |

## Where to edit content

| What | File |
|---|---|
| Phone, WhatsApp, email, address, hours, social links, Web3Forms key | `src/data/site.ts` |
| Loan pages (copy, documents, FAQs) | `src/data/loans.ts` |
| Property types and **property listings** | `src/data/property.ts` |
| Page layouts | `src/pages/` |
| Colours, type, spacing | `src/styles/global.css` (tokens at the top) |
| Motion (preloader, curtain, reveals, hover images, scroll-scrub) | `src/scripts/main.ts` |
| Images / videos | `public/media/` |

**Placeholders:** anything still to come from SINTEL is marked `TODO(SINTEL)` in the code and shows on the page as a dashed gold "To confirm" label. Search the project for `TODO(SINTEL)` to find them all.

### Adding a property
Put the photos in `public/media/properties/` (WebP, about 1600 px wide), then add an entry to `properties` in `src/data/property.ts`. Delete the three `sample: true` entries once real listings exist.

### Enquiry forms
Forms send to email through [Web3Forms](https://web3forms.com) (free). Create an access key with SINTEL's email and paste it into `web3formsKey` in `src/data/site.ts`. Until then, "Send enquiry" opens WhatsApp with the form details pre-filled.

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Repository **Settings → Pages → Source: GitHub Actions**.
2. Merge to `main` (or run the workflow manually from the Actions tab).
3. The site appears at `https://<owner>.github.io/<repo>/`.
4. Custom domain later: add it under Settings → Pages; the workflow picks up the new address automatically.

Note: on a free GitHub plan, Pages needs the repository to be **public**.

## Stability rules
- Hero videos are muted MP4s under 3 MB with a poster shown first; they pause when off-screen.
- Reduced-motion users and data-saver / 2G connections get posters and simple layouts: no preloader, smooth scroll or video.
- The About tower video has every frame as a keyframe so scroll-scrubbing is smooth in both directions.
- Below-the-fold images lazy-load.

## Still needed from SINTEL
Logo files (SVG / high-res PNG) · domain name · full office address, email and hours · About text · photo and designation of Ashok Kumar Sahoo · loan FAQ answers (fees, timelines, partner banks) · property listings with photos and ORERA numbers · confirmation of the Sell Your Property process and Buyer's Guide text.
