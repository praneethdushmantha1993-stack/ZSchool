import { SHIELD_BASE_PATH } from '../data/badgeData'
import { BADGE_ICONS } from './BadgeIcons'
import { formatPoints } from '../utils/formatPoints'

/**
 * Single badge shield - zSchool Elite Shield design
 * @param {{ color: string, glow: string, iconIndex: number, threshold?: number, size?: 'sm'|'md'|'lg', earned?: boolean, showPoints?: boolean, pointsLabel?: string }} props
 */
export default function BadgeShield({ color, glow, iconIndex, threshold, size = 'md', earned = true, showPoints = false, pointsLabel, darkBg = false, animationDelay = 0 }) {
  const sizeMap = {
    sm: { container: 'w-12 h-14' },
    md: { container: 'w-[78px] h-[90px]' },
    lg: { container: 'w-[130px] h-[150px]' },
  }
  const { container } = sizeMap[size]
  const IconComponent = BADGE_ICONS[iconIndex] ?? (() => null)
  const gradId = `shield-gloss-${iconIndex}-${size}`

  return (
    <div
      className={`badge-wrapper group relative ${earned ? '' : 'opacity-75'} ${container}`}
      title={threshold != null ? `${formatPoints(threshold)} ලකුණු` : undefined}
    >
      <div
        className="shield-container relative w-full h-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-[-15px] group-hover:scale-110 group-hover:drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] animate-badge-float"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        {earned && (
          <div
            className={`neon-back-glow absolute inset-[10%] blur-[40px] opacity-20 group-hover:opacity-70 group-hover:scale-125 transition-all duration-500 rounded-full -z-10 ${glow}`}
          />
        )}
        <svg className="shield-svg w-full h-full drop-shadow-md" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="40%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={SHIELD_BASE_PATH} fill="#0f172a" stroke={color} strokeWidth="3" />
          <path d={SHIELD_BASE_PATH} fill={color} fillOpacity="0.75" />
          <g className="icon-layer origin-center animate-icon-float">
            <IconComponent />
          </g>
          <path d="M12 25 Q50 15 88 25 V35 Q50 25 12 35 Z" fill={`url(#${gradId})`} opacity="0.35" />
        </svg>
      </div>
      {showPoints && (pointsLabel != null || threshold != null) && (
        <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold ${darkBg ? 'text-slate-400' : 'text-ink-600 dark:text-ink-400'}`}>
          {pointsLabel ?? formatPoints(threshold)}
        </span>
      )}
    </div>
  )
}
