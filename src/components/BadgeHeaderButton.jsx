import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserTotalScore } from '../services/scoreService'
import { getFirstDisplayBadge, getEarnedBadges } from '../utils/badgeUtils'
import { BADGE_DEFINITIONS, getBadgeThreshold, getBadgeRange } from '../data/badgeData'
import { BADGE_ICONS } from './BadgeIcons'
import { formatPoints } from '../utils/formatPoints'
import { Link } from 'react-router-dom'

/**
 * Compact badge icon for header - small circle with badge icon
 */
function BadgeIconCompact({ color, iconIndex, earned, size = 32 }) {
  const IconComponent = BADGE_ICONS[iconIndex] ?? (() => null)
  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 ${
        earned ? 'ring-2 ring-white dark:ring-ink-700 shadow-md' : 'opacity-50 grayscale'
      }`}
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <svg viewBox="0 0 100 100" className="w-[60%] h-[60%]" preserveAspectRatio="xMidYMid meet">
        <IconComponent />
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
        <div className="absolute right-0 mt-2 w-56 py-2 rounded-xl glass border border-ink-200/60 dark:border-ink-700/60 shadow-xl shadow-ink-900/10 dark:shadow-black/30 animate-scale-in origin-top-right z-50 max-h-[70vh] overflow-y-auto">
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
