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
  email: 'info@example.com', // TODO(SINTEL): email address for enquiries
  streetAddress: 'Plot No. 433/5174, Lewis Road, In front of IFFCO Office, Nageswar Tangi, BJB Nagar',
  addressLines: ['Plot No. 433/5174, Lewis Road', 'In front of IFFCO Office, Nageswar Tangi', 'BJB Nagar, Bhubaneswar, Odisha 751002'],
  postalCode: '751002',
  city: 'Bhubaneswar',
  region: 'Odisha',
  hours: 'Mon – Sat · 10:00 am – 6:00 pm', // TODO(SINTEL): confirm office hours
  mapQuery: 'Plot No 433, 5174, Lewis Road, Infront of Iffco Office, Nageswar Tangi, BJB Nagar, Bhubaneswar, Odisha 751002',

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

export type Company = 'finserv' | 'venture';
export const waNumberFor = (co: Company) => (co === 'venture' ? site.ventureWa : site.finservWa);
export const phoneFor = (co: Company) => (co === 'venture' ? site.venturePhone : site.finservPhone);
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;
export const waLink = (text: string, co: Company) =>
  `https://wa.me/${waNumberFor(co)}?text=${encodeURIComponent(text)}`;

// Track record, as supplied by SINTEL (Nov 2026).
export const trackRecord = [
  { v: '1st', t: 'PAN-India corporate DSA from Odisha', d: "Odisha's first PAN-India corporate DSA (Direct Selling Agent)." },
  { v: '2008', t: 'In loans and property since', d: 'Over 18 years of experience in loans and property.' },
  { v: '11 yrs', t: 'At the same office', d: 'On Lewis Road, Bhubaneswar, for the last 11 years.' },
  { v: '0', t: 'Defaults since 2015', d: 'No funding arranged for our customers has defaulted since 2015.' },
  { v: '0', t: 'Compliance issues', d: 'A clean record, with no compliance issues.' },
];
