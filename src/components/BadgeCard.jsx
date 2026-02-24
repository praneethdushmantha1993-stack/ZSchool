import { BADGE_ICONS } from './BadgeIcons'

/** Check if color is light (needs dark icon for visibility) */
function isLightColor(hex) {
  if (!hex || hex === '#ffffff') return true
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return false
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  return (r * 0.299 + g * 0.587 + b * 0.114) > 200
}

/**
 * Compact badge card - circular design with number, name, color, and icon
 * Matches the style: number | name | color | SVG icon
 */
export default function BadgeCard({ index, name, color, iconIndex, earned = true, size = 64, darkBg = false, animationDelay = 0 }) {
  const IconComponent = BADGE_ICONS[iconIndex] ?? (() => null)
  const num = index + 1

  return (
    <div
      className={`flex flex-col items-center gap-2 transition-all duration-300 ${
        earned ? 'opacity-100' : 'opacity-75'
      }`}
    >
      <div
        className="relative rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-badge-glow"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: earned ? `0 6px 20px ${color}60, 0 0 30px ${color}30` : undefined,
          border: color === '#ffffff' ? '2px solid #e2e8f0' : undefined,
          animationDelay: `${animationDelay}ms`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[60%] h-[60%]"
          preserveAspectRatio="xMidYMid meet"
          style={isLightColor(color) ? { filter: 'invert(1)' } : undefined}
        >
          <IconComponent />
        </svg>
        <span
          className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center bg-ink-900 text-white"
        >
          {num}
        </span>
      </div>
      <div className={`text-center ${darkBg ? 'text-slate-100' : 'text-ink-800 dark:text-ink-200'}`}>
        <p className="text-sm font-semibold">{name}</p>
        <p className={`text-[10px] font-mono ${darkBg ? 'text-slate-300' : 'text-ink-500 dark:text-ink-300'}`}>{color}</p>
      </div>
    </div>
  )
}
