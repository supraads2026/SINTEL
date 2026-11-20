// Loans and property types in a given language. English comes straight from loans.ts / property.ts;
// Odia and Hindi take their text from the *.or.ts / *.hi.ts drafts and everything else (slug, image, rate) from English.
import { loans, type Loan, type LoanText } from '../data/loans';
import { propertyTypes, type PropType, type PropertyType, type PropertyTypeText } from '../data/property';
import { loansOr } from '../data/loans.or';
import { loansHi } from '../data/loans.hi';
import { propertyTypesOr } from '../data/property.or';
import { propertyTypesHi } from '../data/property.hi';
import type { Lang } from './index';

const loanText: Record<Lang, Record<string, LoanText> | null> = { en: null, or: loansOr, hi: loansHi };
const typeText: Record<Lang, Record<PropType, PropertyTypeText> | null> = { en: null, or: propertyTypesOr, hi: propertyTypesHi };

export function loansFor(lang: Lang): Loan[] {
  const tr = loanText[lang];
  return tr ? loans.map((l) => ({ ...l, ...(tr[l.slug] ?? {}) })) : loans;
}

export function propertyTypesFor(lang: Lang): PropertyType[] {
  const tr = typeText[lang];
  return tr ? propertyTypes.map((t) => ({ ...t, ...(tr[t.key] ?? {}) })) : propertyTypes;
}

export const typeByKeyFor = (lang: Lang, k: PropType) => propertyTypesFor(lang).find((t) => t.key === k)!;
