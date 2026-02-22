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
export default function BadgeCard({ index, name, color, iconIndex, earned = true, size = 64 }) {
  const IconComponent = BADGE_ICONS[iconIndex] ?? (() => null)
  const num = index + 1

  return (
    <div
      className={`flex flex-col items-center gap-2 transition-all duration-300 ${
        earned ? 'opacity-100' : 'opacity-50 grayscale'
      }`}
    >
      <div
        className="relative rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: earned ? `0 4px 14px ${color}40` : undefined,
          border: color === '#ffffff' ? '2px solid #e2e8f0' : undefined,
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
      <div className="text-center">
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-200">{name}</p>
        <p className="text-[10px] text-ink-500 dark:text-ink-400 font-mono">{color}</p>
      </div>
    </div>
  )
}
