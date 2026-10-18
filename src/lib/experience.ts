/**
 * Professional experience since `start`, as a short value + label for stat tiles.
 * Calculated at render time so the portfolio never shows an out-of-date number.
 */
export function experienceSince(start: string, now: Date = new Date()) {
  const from = new Date(start);
  const months = Math.max(0, (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth()));

  if (months < 12) {
    return { value: `${Math.max(1, months)} mo`, label: 'Professional Experience' };
  }
  const years = Math.floor(months / 12);
  return { value: `${years}+`, label: years === 1 ? 'Year Experience' : 'Years Experience' };
}
