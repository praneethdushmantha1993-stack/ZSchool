/**
 * Format points for display (e.g. 2000 → "2,000")
 */
export function formatPoints(n) {
  if (n == null || typeof n !== 'number') return '0'
  return n.toLocaleString('si-LK')
}
