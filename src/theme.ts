/**
 * Vzhled aplikace na jednom místě.
 * Kdybych chtěl(a) změnit barvy nebo zaoblení, stačí upravit jen tento soubor.
 */

export const colors = {
  background: '#0E1020',
  card: '#1A1D33',
  cardDone: '#14172A',
  border: '#2B3050',
  primary: '#7C5CFF',
  primaryPressed: '#6845F0',
  primarySoft: '#241F4A',
  success: '#34D399',
  danger: '#F87171',
  dangerSoft: '#3A1F2B',
  text: '#F4F5FF',
  textMuted: '#9AA0C0',
  placeholder: '#5C6288',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;