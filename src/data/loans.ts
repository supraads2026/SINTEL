// The seven Dwarika Finserv loan pages. SINTEL reviews all copy, documents and FAQs before launch.
// Never add rates, "guaranteed approval" or "instant loan" wording.

export interface Faq { q: string; a: string }
export interface Loan {
  slug: string;
  name: string;
  short: string;
  h1: [string, string];
  oneLiner: string;
  whoFor: string;
  whoForList: string[];
  uses: string[];
  docs: string[];
  faqs: Faq[];
  img: string;
  description: string;
}

const commonFaqs: Faq[] = [
  {
    q: 'Does Dwarika Finserv charge a fee?',
    a: 'We explain any fees clearly before you proceed, so there are no surprises. TODO(SINTEL): confirm the fee policy.',
  },
  {
    q: 'Who decides the interest rate and approval?',
    a: 'The lending bank or NBFC decides approval, the interest rate and the final terms. We help you prepare and compare suitable options.',
  },
];

export const loans: Loan[] = [
  {
    slug: 'personal-loan',
    name: 'Personal Loan',
    short: 'Personal',
    h1: ['Personal Loan.', "For life's big moments."],
    oneLiner: 'For weddings, travel, education, medical needs and more.',
    whoFor: 'Salaried and self-employed individuals',
    whoForList: ['Salaried employees with a steady income', 'Self-employed professionals', 'Business owners needing personal funds'],
    uses: ['Weddings and family functions', 'Travel', 'Higher education', 'Medical needs', 'Home renovation', 'Combining existing debts'],
    docs: ['Identity proof (PAN, Aadhaar)', 'Address proof', 'Last 3 months’ salary slips or 2 years’ ITR', 'Last 6 months’ bank statements', 'Passport-size photographs'],
    faqs: [
      { q: 'Do I need a guarantor or collateral?', a: 'Personal loans are usually unsecured, so no collateral is needed. The lender decides based on your income and credit history.' },
      { q: 'Can self-employed people apply?', a: 'Yes. Self-employed applicants usually share income-tax returns and bank statements instead of salary slips.' },
      ...commonFaqs,
    ],
    img: 'img-l1-personal-loan',
    description: 'Personal loans in Bhubaneswar for weddings, travel, education and medical needs. Dwarika Finserv helps you compare suitable options from banks and NBFCs.',
  },
  {
    slug: 'business-loan',
    name: 'Business Loan',
    short: 'Business',
    h1: ['Business Loan.', 'Fuel your next step.'],
    oneLiner: 'Term funding for expansion, equipment and new branches.',
    whoFor: 'Proprietors, partnerships, companies',
    whoForList: ['Proprietorships', 'Partnership firms and LLPs', 'Private limited companies', 'MSMEs and growing businesses'],
    uses: ['Expanding to a new branch', 'Buying machinery or equipment', 'Upgrading premises', 'Hiring and growth', 'Large stock purchases'],
    docs: ['KYC of the business and its owners', 'Business registration / GST certificate', 'Last 2–3 years’ ITR and financial statements', 'Last 12 months’ bank statements', 'Business address proof'],
    faqs: [
      { q: 'Can a new business apply?', a: 'Most lenders look for a few years of business history and filed returns. Talk to us and we will tell you what is realistic for your stage.' },
      { q: 'Is collateral needed?', a: 'It depends on the amount and the lender. Some business loans are unsecured; larger amounts may need security.' },
      ...commonFaqs,
    ],
    img: 'img-l2-business-loan',
    description: 'Business loans in Bhubaneswar for expansion, equipment and new branches. Dwarika Finserv guides proprietors, partnerships and companies to suitable lenders.',
  },
  {
    slug: 'loan-against-property',
    name: 'Loan Against Property',
    short: 'Against Property',
    h1: ['Loan Against Property.', 'Unlock what you own.'],
    oneLiner: 'Use a home or commercial property you own to raise funds.',
    whoFor: 'Property owners: individuals and businesses',
    whoForList: ['Salaried and self-employed property owners', 'Businesses that own premises', 'Owners of residential or commercial property'],
    uses: ['Business expansion', 'Working capital', 'Education or a family event', 'Clearing high-cost debts', 'Any genuine personal or business need'],
    docs: ['KYC of all applicants and property owners', 'Income proof (salary slips or ITR)', 'Last 6–12 months’ bank statements', 'Complete property papers: title deed, RoR / mutation, approved plan', 'Latest property tax receipt'],
    faqs: [
      { q: 'Which properties can be mortgaged?', a: 'Usually self-occupied or rented residential and commercial property with clear title. The lender values the property and decides the eligible amount.' },
      { q: 'Can I keep using my property?', a: 'Yes. You keep living in or using the property; the lender holds the papers as security until the loan is repaid.' },
      ...commonFaqs,
    ],
    img: 'img-l3-loan-against-property',
    description: 'Loan against property in Bhubaneswar. Use a residential or commercial property you own to raise funds, with guidance from Dwarika Finserv.',
  },
  {
    slug: 'home-loan',
    name: 'Home Loan',
    short: 'Home',
    h1: ['Home Loan.', 'Your home, within reach.'],
    oneLiner: 'Buy, build or renovate a home, or move an existing home loan.',
    whoFor: 'Salaried and self-employed home buyers',
    whoForList: ['First-time home buyers', 'Families upgrading to a bigger home', 'Owners building on their own plot', 'Borrowers moving an existing home loan (balance transfer)'],
    uses: ['Buying a flat or villa', 'Buying a plot and building on it', 'Building on land you own', 'Renovation or extension', 'Balance transfer of an existing loan'],
    docs: ['KYC of all applicants', 'Income proof (salary slips / ITR)', 'Last 6 months’ bank statements', 'Property documents and sale agreement', 'Approved building plan and ORERA details (for new projects)'],
    faqs: [
      { q: 'Can you help me find the property too?', a: 'Yes. Our sister company Dwarika Venture lists flats, villas and plots, so you can find the home and the funding in one place.' },
      { q: 'Can I add a co-applicant?', a: 'Yes. Adding an earning family member as co-applicant can improve eligibility. The lender sets the rules.' },
      ...commonFaqs,
    ],
    img: 'img-l4-home-loan',
    description: 'Home loans in Bhubaneswar to buy, build or renovate a home, or transfer an existing loan. Dwarika Finserv helps you compare options.',
  },
  {
    slug: 'project-funding',
    name: 'Project Funding',
    short: 'Project',
    h1: ['Project Funding.', 'Built for big plans.'],
    oneLiner: 'Structured funding for builders, developers and large projects.',
    whoFor: 'Builders, developers, project owners',
    whoForList: ['Real-estate builders and developers', 'Owners of large commercial projects', 'Institutions planning new facilities'],
    uses: ['Construction finance', 'Land development', 'Commercial complexes', 'Large expansion projects'],
    docs: ['Company KYC and constitution documents', 'Project report and cost estimates', 'Land title and approvals (plan, ORERA where applicable)', 'Last 3 years’ audited financials and ITR', 'Bank statements and existing loan details'],
    faqs: [
      { q: 'What does a lender look at for project funding?', a: 'Usually the project report, approvals, land title, the developer’s track record and financials. We help you prepare a clear proposal.' },
      { q: 'How long does it take?', a: 'Project funding takes longer than retail loans because of valuation and legal checks. TODO(SINTEL): add a typical timeline.' },
      ...commonFaqs,
    ],
    img: 'img-l5-project-funding',
    description: 'Project funding for builders and developers in Odisha. Dwarika Finserv helps structure proposals for construction and large projects.',
  },
  {
    slug: 'cash-credit',
    name: 'Cash Credit',
    short: 'Cash Credit',
    h1: ['Cash Credit.', 'Working capital, on tap.'],
    oneLiner: 'A working-capital limit that keeps day-to-day business running.',
    whoFor: 'Traders, manufacturers, service businesses',
    whoForList: ['Traders and distributors', 'Manufacturers', 'Service businesses with regular cash cycles'],
    uses: ['Buying stock and raw material', 'Paying suppliers and salaries', 'Bridging gaps between sales and collections', 'Seasonal demand'],
    docs: ['KYC of the business and owners', 'GST registration and returns', 'Last 2–3 years’ financial statements and ITR', 'Stock and debtor statements', 'Last 12 months’ bank statements'],
    faqs: [
      { q: 'How is cash credit different from a term loan?', a: 'A term loan is a fixed amount repaid in instalments. Cash credit is a limit you draw from and repay as your business needs, with interest usually charged only on what you use.' },
      { q: 'Is the limit renewed?', a: 'Cash credit limits are usually reviewed and renewed every year by the lender.' },
      ...commonFaqs,
    ],
    img: 'img-l6-cash-credit',
    description: 'Cash credit and working capital limits for traders, manufacturers and service businesses in Bhubaneswar, with guidance from Dwarika Finserv.',
  },
  {
    slug: 'invoice-funding',
    name: 'Invoice Funding',
    short: 'Invoice',
    h1: ['Invoice Funding.', 'Get paid sooner.'],
    oneLiner: 'Turn unpaid invoices into cash flow instead of waiting.',
    whoFor: 'Businesses selling on credit terms',
    whoForList: ['Suppliers to large companies', 'MSMEs with long payment cycles', 'Businesses selling on 30–90 day credit'],
    uses: ['Releasing cash stuck in receivables', 'Taking on bigger orders', 'Paying suppliers on time'],
    docs: ['KYC of the business and owners', 'GST registration and returns', 'Copies of the invoices to be funded', 'Buyer details and past payment record', 'Last 12 months’ bank statements'],
    faqs: [
      { q: 'How does invoice funding work?', a: 'A lender advances a part of the value of your unpaid invoices. When your customer pays, the advance is settled.' },
      { q: 'Does my customer need to be involved?', a: 'It depends on the product the lender offers. We explain the options before you decide.' },
      ...commonFaqs,
    ],
    img: 'img-l7-invoice-funding',
    description: 'Invoice funding in Bhubaneswar: turn unpaid invoices into working capital. Dwarika Finserv helps businesses selling on credit terms.',
  },
];

export const loanBySlug = (slug: string) => loans.find((l) => l.slug === slug)!;
