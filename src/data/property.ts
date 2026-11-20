// Dwarika Venture: property types, owner/buyer pages and listings.

export type PropType = 'flat' | 'villa' | 'plot' | 'commercial';

export interface PropertyType {
  key: PropType;
  slug: string;
  name: string;
  h1: [string, string];
  oneLiner: string;
  intro: string;
  lookFor: string[];
  faqs: { q: string; a: string }[];
  img: string;
  description: string;
}

export const propertyTypes: PropertyType[] = [
  {
    key: 'flat',
    slug: 'flats-apartments',
    name: 'Flats & Apartments',
    h1: ['Flats & Apartments.', 'Homes in the heart of the city.'],
    oneLiner: '1, 2, 3 BHK and larger apartments in Bhubaneswar and nearby.',
    intro: 'Ready-to-move and under-construction apartments across Bhubaneswar, with the documents checked and site visits arranged for you.',
    lookFor: ['ORERA registration number', 'Carpet area vs built-up area', 'Possession date', 'Amenities and maintenance', 'Parking'],
    faqs: [
      { q: 'What is the difference between carpet and built-up area?', a: 'Carpet area is the usable floor area inside the walls. Built-up area adds the wall thickness and balconies. ORERA requires projects to quote the carpet area.' },
      { q: 'Can I get a home loan for an under-construction flat?', a: 'Yes, usually from an ORERA-registered project. Dwarika Finserv can help you with the home loan.' },
      { q: 'Do you arrange site visits?', a: 'Yes. Tell us the flats you like and we will arrange a visit.' },
    ],
    img: 'img-v1-flats-apartments',
    description: 'Flats and apartments for sale in Bhubaneswar: 1, 2 and 3 BHK homes with documents checked and site visits arranged by Dwarika Venture.',
  },
  {
    key: 'villa',
    slug: 'villas-independent-houses',
    name: 'Villas & Independent Houses',
    h1: ['Villas & Independent Houses.', 'Space to call your own.'],
    oneLiner: 'Independent homes and villas, ready or under construction.',
    intro: 'Independent houses and villas with your own land and space, in established localities and new developments around Bhubaneswar.',
    lookFor: ['Clear title', 'Approved building plan', 'Plot size', 'Road width', 'Water and power connections'],
    faqs: [
      { q: 'What documents should I check for a villa?', a: 'The title deed, RoR / mutation, the approved building plan, encumbrance certificate and latest tax receipts. Our Buyer’s Guide explains each one.' },
      { q: 'Is a villa in a gated project different from an independent house?', a: 'A villa in a project usually shares amenities and maintenance; an independent house is on its own plot. Both need a clear title.' },
      { q: 'Can I get a home loan for a villa?', a: 'Yes. Dwarika Finserv can help you compare home-loan options.' },
    ],
    img: 'img-v2-villas-houses',
    description: 'Villas and independent houses for sale in and around Bhubaneswar, with clear titles and guidance from Dwarika Venture.',
  },
  {
    key: 'plot',
    slug: 'plots-land',
    name: 'Plots & Land',
    h1: ['Plots & Land.', 'Build on solid ground.'],
    oneLiner: 'Residential and investment plots with clear documents.',
    intro: 'Residential plots to build your home and land for long-term investment, with the paperwork checked before you commit.',
    lookFor: ['Title and RoR / mutation', 'Land use (kisam)', 'Approved layout', 'Road access', 'Boundaries'],
    faqs: [
      { q: 'What is kisam and why does it matter?', a: 'Kisam is the land-use classification in Odisha land records. A residential home usually needs the land to be classified for homestead or a suitable use.' },
      { q: 'Can I get a loan to buy a plot?', a: 'Many lenders fund plot purchases, often with a plan to build. Dwarika Finserv can explain the options.' },
      { q: 'Do you help with registration?', a: 'We guide you through the documents and the registration steps.' },
    ],
    img: 'img-v3-plots-land',
    description: 'Residential and investment plots for sale near Bhubaneswar with clear documents, kisam and RoR checks by Dwarika Venture.',
  },
  {
    key: 'commercial',
    slug: 'commercial-property',
    name: 'Commercial Property',
    h1: ['Commercial Property.', 'Space for business to grow.'],
    oneLiner: 'Shops, offices and showrooms for sale.',
    intro: 'Shops, offices and showrooms in busy locations, for businesses that want their own premises and for investors.',
    lookFor: ['Location and footfall', 'Frontage', 'Approvals', 'Parking', 'Maintenance'],
    faqs: [
      { q: 'Can I get a loan for commercial property?', a: 'Yes, lenders offer commercial-property purchase loans and loans against property. Dwarika Finserv can help.' },
      { q: 'What should I check before buying a shop?', a: 'The approved plan and usage, frontage, footfall at different times of day, parking and the maintenance arrangement.' },
      { q: 'Do you list commercial property for rent?', a: 'We currently focus on sales. TODO(SINTEL): confirm whether rentals are offered.' },
    ],
    img: 'img-v4-commercial',
    description: 'Commercial property for sale in Bhubaneswar: shops, offices and showrooms, with guidance from Dwarika Venture.',
  },
];

export const typeByKey = (k: PropType) => propertyTypes.find((t) => t.key === k)!;

export interface Property {
  slug: string;
  title: string;
  type: PropType;
  location: string;
  area: string;
  price: string; // e.g. "₹ 85 Lakh" or "Price on request"
  orera?: string;
  highlights: string[];
  photos: string[]; // files in /public/media/ (e.g. "properties/xyz-1.webp")
  mapQuery?: string;
  sample?: boolean; // true = placeholder shown with a "Sample" badge; delete once real listings are added
}

// TODO(SINTEL): add real listings (photo, carpet/plot area, location, price, ORERA no.).
// Entries with sample: true are templates only: they are never published. Copy one, fill it in and remove `sample`.
const allProperties: Property[] = [
  {
    slug: 'sample-3bhk-apartment',
    title: '3 BHK Apartment',
    type: 'flat',
    location: 'Bhubaneswar',
    area: '— sq ft (carpet)',
    price: 'Price on request',
    highlights: ['Sample listing: replace with real details', 'ORERA number to be added', 'Site visit on request'],
    photos: ['img/img-v1-flats-apartments.webp'],
    sample: true,
  },
  {
    slug: 'sample-independent-villa',
    title: 'Independent Villa',
    type: 'villa',
    location: 'Bhubaneswar',
    area: '— sq ft plot',
    price: 'Price on request',
    highlights: ['Sample listing: replace with real details', 'Clear title', 'Site visit on request'],
    photos: ['img/img-v2-villas-houses.webp'],
    sample: true,
  },
  {
    slug: 'sample-residential-plot',
    title: 'Residential Plot',
    type: 'plot',
    location: 'Near Bhubaneswar',
    area: '— sq ft',
    price: 'Price on request',
    highlights: ['Sample listing: replace with real details', 'RoR / mutation to be checked', 'Road access'],
    photos: ['img/img-v3-plots-land.webp'],
    sample: true,
  },
];

/** Listings shown on the site (samples are never published). */
export const properties: Property[] = allProperties.filter((p) => !p.sample);
