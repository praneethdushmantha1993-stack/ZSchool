import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserTotalScore } from '../services/scoreService'
import { getFirstDisplayBadge, getEarnedBadges } from '../utils/badgeUtils'
import { BADGE_DEFINITIONS, getBadgeThreshold, getBadgeRange } from '../data/badgeData'
import { BADGE_ICONS } from './BadgeIcons'
import { formatPoints } from '../utils/formatPoints'
import { Link } from 'react-router-dom'

/** Mini shield path for compact badge */
const MINI_SHIELD = 'M50 5 L92 22 V60 C92 82 50 96 50 96 C50 96 8 82 8 60 V22 L50 5 Z'

/**
 * Compact badge - mini shield design matching full badge
 */
function BadgeIconCompact({ color, iconIndex, earned, size = 36 }) {
  const IconComponent = BADGE_ICONS[iconIndex] ?? (() => null)
  const uid = `badge-${iconIndex}-${size}`
  return (
    <div
      className={`flex-shrink-0 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg ${
        earned ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]' : 'opacity-75'
      }`}
      style={{ width: size, height: size * 1.15 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`gloss-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={MINI_SHIELD} fill="#0f172a" stroke={color} strokeWidth="2.5" />
        <path d={MINI_SHIELD} fill={color} fillOpacity="0.25" />
        <g transform="translate(0, 0)">
          <IconComponent />
        </g>
        <path d="M12 25 Q50 15 88 25 V35 Q50 25 12 35 Z" fill={`url(#gloss-${uid})`} opacity="0.3" />
      </svg>
    </div>
  )
}

export default function BadgeHeaderButton() {
  const { user } = useAuth()
  const [totalScore, setTotalScore] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (user) {
      getUserTotalScore(user.uid)
        .then(setTotalScore)
        .catch(() => setTotalScore(0))
    } else {
      setTotalScore(null)
    }
  }, [user])

  useEffect(() => {
    const onScoreUpdated = () => {
      if (user) getUserTotalScore(user.uid).then(setTotalScore)
    }
    window.addEventListener('score-updated', onScoreUpdated)
    return () => window.removeEventListener('score-updated', onScoreUpdated)
  }, [user])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const firstBadge = getFirstDisplayBadge(totalScore ?? 0)
  const earnedSet = new Set(getEarnedBadges(totalScore ?? 0).map((b) => b.index))

  if (!firstBadge) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((o) => !o)}
        className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        title={`බැජ් - ${formatPoints(firstBadge.threshold)} ලකුණු`}
      >
        <BadgeIconCompact
          color={firstBadge.color}
          iconIndex={firstBadge.index}
          earned={firstBadge.earned}
          size={36}
        />
      </button>

      {dropdownOpen && (
        <div className="fixed sm:absolute left-4 sm:left-auto sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-2rem)] sm:w-56 max-w-72 py-2 rounded-xl dropdown-menu shadow-xl shadow-ink-900/10 dark:shadow-black/30 animate-scale-in origin-top-left sm:origin-top-right z-50 max-h-[70vh] overflow-y-auto">
          <div className="px-3 py-2 border-b border-ink-100 dark:border-ink-700">
            <p className="text-xs font-medium text-ink-600 dark:text-ink-400">බැජ්</p>
            <p className="text-sm text-ink-900 dark:text-ink-100">
              <span className="font-semibold text-sipyaya-600 dark:text-sipyaya-400">{formatPoints(totalScore ?? 0)}</span> ලකුණු
            </p>
          </div>
          <div className="py-1">
            {BADGE_DEFINITIONS.map((def, i) => {
              const { min, max } = getBadgeRange(i)
              const earned = earnedSet.has(i)
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-3 py-2 text-sm ${
                    earned ? 'text-ink-900 dark:text-ink-100' : 'text-ink-500 dark:text-ink-500 opacity-70'
                  }`}
                >
                  <BadgeIconCompact color={def.color} iconIndex={i} earned={earned} size={24} />
                  <span className="flex-1">
                    {earned ? '✓' : '○'} {formatPoints(min)} - {formatPoints(max)} ලකුණු
                  </span>
                </div>
              )
            })}
          </div>
          <div className="border-t border-ink-100 dark:border-ink-700 pt-2 px-3">
            <Link
              to="/achievements"
              onClick={() => setDropdownOpen(false)}
              className="text-xs text-sipyaya-600 dark:text-sipyaya-400 hover:underline block"
            >
              සියලු බැජ් බලන්න →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
