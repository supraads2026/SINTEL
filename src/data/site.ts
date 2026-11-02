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

  // Contact
  whatsapp: '919337705030', // country code + number, digits only
  phone: '+91 93377 05030', // TODO(SINTEL): confirm the calling number (currently the WhatsApp number)
  phoneHref: '+919337705030',
  email: 'info@example.com', // TODO(SINTEL): email address for enquiries
  addressLines: ['Lewis Road', 'Bhubaneswar, Odisha'], // TODO(SINTEL): full office address with plot no. and PIN
  city: 'Bhubaneswar',
  region: 'Odisha',
  hours: 'Mon – Sat · 10:00 am – 6:00 pm', // TODO(SINTEL): confirm office hours
  mapQuery: 'Lewis Road, Bhubaneswar, Odisha',

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

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
