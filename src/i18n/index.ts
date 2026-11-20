// Languages: English (default, no URL prefix), Odia (/or/) and Hindi (/hi/).
// Pages under src/pages/[...lang]/ are built once per language; the legal pages stay English only.
import { u } from '../lib/url';
import en from './en';
import or from './or';
import hi from './hi';

export const LANGS = ['en', 'or', 'hi'] as const;
export type Lang = (typeof LANGS)[number];
export type Dict = typeof en;

export const langMeta: Record<Lang, { label: string; name: string; html: string; wa: string }> = {
  en: { label: 'EN', name: 'English', html: 'en-IN', wa: 'English' },
  or: { label: 'ଓଡ଼ିଆ', name: 'ଓଡ଼ିଆ (Odia)', html: 'or-IN', wa: 'Odia' },
  hi: { label: 'हिंदी', name: 'हिंदी (Hindi)', html: 'hi-IN', wa: 'Hindi' },
};

const dicts: Record<Lang, Dict> = { en, or, hi };
export const useT = (lang: Lang): Dict => dicts[lang];

/** getStaticPaths entries for one page in every language (lang undefined = English at the root). */
export const langPaths = () => LANGS.map((l) => ({ params: { lang: l === 'en' ? undefined : l }, props: { lang: l } }));

const isLang = (s: string | undefined): s is Lang => !!s && (LANGS as readonly string[]).includes(s);

/** Path without the base path, e.g. "/or/about/". */
const sitePath = (pathname: string) => pathname.slice(import.meta.env.BASE_URL.replace(/\/$/, '').length) || '/';

/** Language of the page at this URL. */
export function langFromUrl(url: URL): Lang {
  const seg = sitePath(url.pathname).split('/')[1];
  return isLang(seg) ? seg : 'en';
}

/** Path with any language prefix removed, e.g. "/or/about/" → "/about/". */
export function stripLang(path: string): string {
  const seg = path.split('/')[1];
  return isLang(seg) && seg !== 'en' ? path.slice(seg.length + 1) || '/' : path;
}

/** Internal path in the given language, without the base path (for components that add it with u()).
 *  Legal pages always link to English. */
export function lp(lang: Lang, path = '/'): string {
  if (lang === 'en' || /^(https?:|mailto:|tel:|#)/.test(path) || /^\/?(disclaimer|privacy-policy)\//.test(path)) return path;
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}
/** Internal link in the given language, with the base path added. */
export const lu = (lang: Lang, path = '/') => u(lp(lang, path));

/** Pages that exist in every language (the legal pages and 404 are English only). */
export const isLocalized = (path: string) => !/^\/(disclaimer|privacy-policy|404)\b/.test(stripLang(path));

/** URL of the current page in each language; for English-only pages, the other languages' home pages. */
export function alternates(url: URL): { localized: boolean; href: Record<Lang, string> } {
  const p = stripLang(sitePath(url.pathname));
  const localized = isLocalized(p);
  const href = Object.fromEntries(LANGS.map((l) => [l, localized ? lu(l, p) : l === 'en' ? u(p) : lu(l, '/')])) as Record<Lang, string>;
  return { localized, href };
}
