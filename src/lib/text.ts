/** Placeholder notes ("To confirm") show only on the local dev server, never on the live site. */
export const SHOW_TODOS = import.meta.env.DEV;

/** True when the text is nothing but a TODO note (e.g. an FAQ answer still to be written). */
export const isTodoOnly = (s: string) => /^\s*TODO\(SINTEL\)/.test(s);

/** Escape text; turn "TODO(SINTEL): …" into a visible placeholder mark in dev, and drop it in production. */
export function fmt(s: string): string {
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return SHOW_TODOS
    ? esc.replace(/TODO\(SINTEL\):\s*(.+)$/, '<mark class="todo">To confirm: $1</mark>')
    : esc.replace(/\s*TODO\(SINTEL\):.*$/, '');
}
