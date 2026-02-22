/**
 * zSchool Achievement Badges
 * රටාව: 1වන බැජ් 0-1000, 2වන 1000-3000, 3වන 3000-6000, 4වන 6000-10000...
 * ලකුණු අඩුවේ නම් බැජ් පහත හෙලනු ලැබේ.
 */

/** Get threshold for badge index i: 1000, 3000, 6000, 10000, 15000... */
export function getBadgeThreshold(i) {
  return 1000 * ((i + 1) * (i + 2)) / 2
}

/** Get range for badge i: { min, max } e.g. { min: 0, max: 1000 } */
export function getBadgeRange(i) {
  const max = getBadgeThreshold(i)
  const min = i === 0 ? 0 : getBadgeThreshold(i - 1)
  return { min, max }
}

/** Shield base path for SVG */
export const SHIELD_BASE_PATH = 'M50 5 L92 22 V60 C92 82 50 96 50 96 C50 96 8 82 8 60 V22 L50 5 Z'

/** Badge definitions: name, color, glow class (icon rendered via BADGE_ICONS[index]) */
export const BADGE_DEFINITIONS = [
  { name: 'Supernova', color: '#fbbf24', glow: 'bg-amber-500' },
  { name: 'Velocity', color: '#38bdf8', glow: 'bg-sky-500' },
  { name: 'Logic', color: '#fb7185', glow: 'bg-rose-500' },
  { name: 'Evergreen', color: '#34d399', glow: 'bg-emerald-500' },
  { name: 'Prism', color: '#a855f7', glow: 'bg-purple-500' },
  { name: 'Pulse', color: '#818cf8', glow: 'bg-indigo-500' },
  { name: 'Summit', color: '#60a5fa', glow: 'bg-blue-500' },
  { name: 'Archon', color: '#fb923c', glow: 'bg-orange-500' },
  { name: 'Solar', color: '#fde047', glow: 'bg-yellow-400' },
  { name: 'Ocean', color: '#1e40af', glow: 'bg-blue-800' },
  { name: 'Flame', color: '#ef4444', glow: 'bg-red-600' },
  { name: 'Aura', color: '#d946ef', glow: 'bg-fuchsia-500' },
  { name: 'Core', color: '#78350f', glow: 'bg-amber-900' },
  { name: 'Vortex', color: '#22d3ee', glow: 'bg-cyan-500' },
  { name: 'Shield', color: '#a3e635', glow: 'bg-lime-500' },
  { name: 'Coda', color: '#4ade80', glow: 'bg-green-400' },
  { name: 'Turbo', color: '#dc2626', glow: 'bg-red-700' },
  { name: 'Zen', color: '#8b5cf6', glow: 'bg-violet-500' },
  { name: 'Giga', color: '#6366f1', glow: 'bg-indigo-600' },
  { name: 'Aero', color: '#bae6fd', glow: 'bg-sky-200' },
  { name: 'Forest', color: '#166534', glow: 'bg-green-800' },
  { name: 'Sonic', color: '#f97316', glow: 'bg-orange-500' },
  { name: 'Pixel', color: '#f43f5e', glow: 'bg-rose-600' },
  { name: 'Nova', color: '#fca5a5', glow: 'bg-red-300' },
  { name: 'Titan', color: '#475569', glow: 'bg-slate-700' },
  { name: 'Lunar', color: '#94a3b8', glow: 'bg-slate-400' },
  { name: 'Neo', color: '#2dd4bf', glow: 'bg-teal-400' },
  { name: 'Orbit', color: '#fb7185', glow: 'bg-rose-500' },
  { name: 'Spark', color: '#fde047', glow: 'bg-yellow-400' },
  { name: 'Elite', color: '#ffffff', glow: 'bg-white' },
]
