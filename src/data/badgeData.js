/**
 * zSchool Achievement Badges
 * ලකුණු 2000, 3000, 4000... යනාදී වශයෙන් වැඩිවන විට බැජ් ලබා දෙයි.
 * ලකුණු අඩුවේ නම් බැජ් පහත හෙලනු ලැබේ.
 */
export const BADGE_THRESHOLD_START = 2000
export const BADGE_THRESHOLD_STEP = 1000

/** Shield base path for SVG */
export const SHIELD_BASE_PATH = 'M50 5 L92 22 V60 C92 82 50 96 50 96 C50 96 8 82 8 60 V22 L50 5 Z'

/** Badge definitions: color, glow class (icon rendered via BADGE_ICONS[index]) */
export const BADGE_DEFINITIONS = [
  { color: '#fbbf24', glow: 'bg-amber-500' },
  { color: '#38bdf8', glow: 'bg-sky-500' },
  { color: '#fb7185', glow: 'bg-rose-500' },
  { color: '#34d399', glow: 'bg-emerald-500' },
  { color: '#a855f7', glow: 'bg-purple-500' },
  { color: '#818cf8', glow: 'bg-indigo-500' },
  { color: '#60a5fa', glow: 'bg-blue-500' },
  { color: '#fb923c', glow: 'bg-orange-500' },
  { color: '#fde047', glow: 'bg-yellow-400' },
  { color: '#1e40af', glow: 'bg-blue-800' },
  { color: '#ef4444', glow: 'bg-red-600' },
  { color: '#d946ef', glow: 'bg-fuchsia-500' },
  { color: '#78350f', glow: 'bg-amber-900' },
  { color: '#22d3ee', glow: 'bg-cyan-500' },
  { color: '#a3e635', glow: 'bg-lime-500' },
  { color: '#4ade80', glow: 'bg-green-400' },
  { color: '#dc2626', glow: 'bg-red-700' },
  { color: '#8b5cf6', glow: 'bg-violet-500' },
  { color: '#6366f1', glow: 'bg-indigo-600' },
  { color: '#bae6fd', glow: 'bg-sky-200' },
  { color: '#166534', glow: 'bg-green-800' },
  { color: '#f97316', glow: 'bg-orange-500' },
  { color: '#f43f5e', glow: 'bg-rose-600' },
  { color: '#fca5a5', glow: 'bg-red-300' },
  { color: '#475569', glow: 'bg-slate-700' },
  { color: '#94a3b8', glow: 'bg-slate-400' },
  { color: '#2dd4bf', glow: 'bg-teal-400' },
  { color: '#fb7185', glow: 'bg-rose-500' },
  { color: '#fde047', glow: 'bg-yellow-400' },
  { color: '#ffffff', glow: 'bg-white' },
]
