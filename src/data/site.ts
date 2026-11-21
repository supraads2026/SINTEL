// ─────────────────────────────────────────────────────────────
// SINTEL — site-wide details.
// Anything marked TODO(SINTEL) is a placeholder still to be confirmed by the client.
// ─────────────────────────────────────────────────────────────

export const site = {
  group: 'SINTEL Enterprises',
  legalName: 'SINTEL Enterprises Pvt Ltd',
  tagline: 'Building opportunities.',
  finserv: 'Dwarika Finserv',
  venture: 'Dwarika Venture',
  founder: 'Ashok Kumar Sahoo',
  founderRole: 'Founder & Director', // TODO(SINTEL): confirm designation

  // Contact — each company has its own number; the Director's number is shown only on the Contact page.
  finservPhone: '+91 89261 50261', // Dwarika Finserv: call and WhatsApp
  finservWa: '918926150261',
  venturePhone: '+91 97768 52555', // Dwarika Venture: call and WhatsApp
  ventureWa: '919776852555',
  directorPhone: '+91 93377 05030', // Contact page only
  directorWa: '919337705030',
  landline: '0674 297 2530', // office landline
  landlineHref: '+916742972530',
  // Enquiry email. Leave empty to hide it everywhere (never show a placeholder address on the live site).
  email: 'connect@sintelenterprise.com',
  streetAddress: 'Plot No. 433/5174, Lewis Road, In front of IFFCO Office, Nageswar Tangi, BJB Nagar',
  addressLines: ['Plot No. 433/5174, Lewis Road', 'In front of IFFCO Office, Nageswar Tangi', 'BJB Nagar, Bhubaneswar, Odisha 751002'],
  postalCode: '751002',
  city: 'Bhubaneswar',
  region: 'Odisha',
  hours: 'Mon – Sat · 10:00 am – 6:00 pm', // TODO(SINTEL): confirm office hours
  mapQuery: 'Plot No 433, 5174, Lewis Road, Infront of Iffco Office, Nageswar Tangi, BJB Nagar, Bhubaneswar, Odisha 751002',

  // Registrations shown in the footer when filled in. Leave empty to hide.
  // Dwarika Venture sells property as an agent, so ORERA (Odisha RERA) agent registration usually applies.
  oreraAgent: 'ORA/0410/2026', // Dwarika Venture, ORERA real-estate agent certificate valid 31-08-2026 to 30-08-2029 (renew before expiry)
  cin: '', // optional: company CIN

  // Google: Business Profile reviews link, Analytics 4 ID, Search Console verification code. Empty = off.
  googleReviewsUrl: '', // TODO(SINTEL): "Share profile" / review link from Google Business Profile
  googleRating: '', // e.g. '4.8' — only fill in the real rating shown on Google
  googleReviewCount: '', // e.g. '62'
  gaId: '', // TODO(SINTEL): Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX"
  gscVerification: '', // Google Search Console "HTML tag" content value

  // Forms: free key from https://web3forms.com (enter SINTEL's email there). Empty = WhatsApp only.
  web3formsKey: '', // TODO(SINTEL): add the Web3Forms access key

  social: {
    // TODO(SINTEL): add profile links when the accounts are ready
    instagram: '',
    facebook: '',
    linkedin: '',
    x: '',
  },
};

/** schema.org address used by every LocalBusiness block (helps "loan / property in Bhubaneswar" local search). */
export const postalAddress = {
  '@type': 'PostalAddress', streetAddress: site.streetAddress, addressLocality: site.city,
  addressRegion: site.region, postalCode: site.postalCode, addressCountry: 'IN',
};
export const sameAs = [site.googleReviewsUrl, ...Object.values(site.social)].filter(Boolean);

export type Company = 'finserv' | 'venture';
export const waNumberFor = (co: Company) => (co === 'venture' ? site.ventureWa : site.finservWa);
export const phoneFor = (co: Company) => (co === 'venture' ? site.venturePhone : site.finservPhone);
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;
export const waLink = (text: string, co: Company) =>
  `https://wa.me/${waNumberFor(co)}?text=${encodeURIComponent(text)}`;

// Track record. Only claims that a visitor can check or that SINTEL can document.
// The stronger lines SINTEL supplied ("Odisha's 1st PAN-India corporate DSA", "0 defaults since 2015",
// "0 compliance issues") are softened until there is proof to link to (a lender letter, certificate, etc.).
export const trackRecord = [
  { v: '2008', t: 'In loans and property since', d: 'Over 18 years of experience in loans and property.' },
  { v: '11 yrs', t: 'At the same office', d: 'On Lewis Road, Bhubaneswar, for the last 11 years.' },
  { v: 'PAN-India', t: 'Corporate DSA', d: 'A corporate DSA (Direct Selling Agent) working with lenders across India, from Odisha.' },
  { v: '7', t: 'Loan solutions', d: 'From personal loans to project funding and working capital.' },
  { v: '2', t: 'Companies, one team', d: 'Dwarika Finserv for loans, Dwarika Venture for property.' },
];

// Customer reviews: copy real reviews from Google (with the reviewer's first name as shown there). Empty = section hidden.
export const reviews: { name: string; text: string; rating?: number; about?: string }[] = [];

// Partner banks / NBFCs: only add a lender once SINTEL has its written permission to show the logo.
// logo = file in public/media/partners/ (SVG or PNG, transparent background).
export const partners: { name: string; logo: string }[] = [];

// Leadership & team. photo = file in public/media/team/ (square WebP, ~600 px). Empty photo = initials.
export const team: { name: string; role: string; photo?: string; bio?: string }[] = [
  // TODO(SINTEL): confirm designation and add photo + a 2–3 line intro
  { name: 'Ashok Kumar Sahoo', role: 'Founder & Director', photo: '', bio: '' },
];
