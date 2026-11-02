/** Prefix an internal path with the site's base path (needed on GitHub Pages project sites). */
export function u(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
/** Media file in /public/media */
export const m = (file: string) => u(`/media/${file}`);
