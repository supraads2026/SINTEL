/** Escape text and turn "TODO(SINTEL): …" into a visible placeholder mark, so missing client copy is obvious on previews. */
export function fmt(s: string): string {
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/TODO\(SINTEL\):\s*(.+)$/, '<mark class="todo">To confirm: $1</mark>');
}
