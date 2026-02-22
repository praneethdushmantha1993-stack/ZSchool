import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserTotalScore } from '../services/scoreService'
import BadgeShield from '../components/BadgeShield'
import { getEarnedBadges, getNextBadge } from '../utils/badgeUtils'
import { BADGE_DEFINITIONS, getBadgeThreshold, getBadgeRange } from '../data/badgeData'
import { formatPoints } from '../utils/formatPoints'

export default function Achievements() {
  const { user } = useAuth()
  const [totalScore, setTotalScore] = useState(null)

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

  const earned = getEarnedBadges(totalScore ?? 0)
  const nextBadge = getNextBadge(totalScore ?? 0)
  const earnedSet = new Set(earned.map((b) => b.index))

  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-500 dark:text-ink-400">බැජ් බලන්න පිවිසෙන්න</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 text-gradient">
          zSchool Achievement Core
        </h1>
        <p className="text-ink-500 dark:text-ink-400 font-medium tracking-wider uppercase text-xs">
          පිරිසිදු අයිකන සහ ලෝගෝ පද්ධතිය
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300">
          <span className="text-2xl">🏆</span>
          <span className="text-xl font-bold">{formatPoints(totalScore ?? 0)}</span>
          <span className="text-sm">ලකුණු</span>
        </div>
      </header>

      {nextBadge && (
        <div className="mb-10 p-4 rounded-xl glass border border-ink-200/60 dark:border-ink-700/60">
          <p className="text-sm text-ink-600 dark:text-ink-400 mb-2">
            ඊළඟ බැජ් එක ලබා ගැනීමට <strong className="text-sipyaya-600 dark:text-sipyaya-400">{formatPoints(nextBadge.threshold - (totalScore ?? 0))}</strong> ලකුණු තව ඉතිරි
          </p>
          <div className="flex items-center gap-3">
            <BadgeShield
              color={nextBadge.color}
              glow={nextBadge.glow}
              iconIndex={nextBadge.index}
              threshold={nextBadge.threshold}
              size="sm"
              earned={false}
            />
            <span className="text-sm text-ink-500 dark:text-ink-400">
              {formatPoints(getBadgeRange(nextBadge.index).min)} - {formatPoints(getBadgeRange(nextBadge.index).max)} ලකුණු
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-20 gap-x-6 items-center justify-items-center">
        {BADGE_DEFINITIONS.map((def, i) => {
          const threshold = getBadgeThreshold(i)
          const { min, max } = getBadgeRange(i)
          const earned = earnedSet.has(i)
          return (
            <div key={i} className="flex flex-col items-center">
              <BadgeShield
                color={def.color}
                glow={def.glow}
                iconIndex={i}
                threshold={threshold}
                size="md"
                earned={earned}
                showPoints
                pointsLabel={`${formatPoints(min)} - ${formatPoints(max)}`}
              />
            </div>
          )
        })}
      </div>

      <footer className="mt-16 text-center">
        <p className="text-ink-500 dark:text-ink-600 text-[10px] font-black uppercase tracking-[0.8em] opacity-40">
          zSchool Silent Shield Protocol v5.0
        </p>
      </footer>
    </div>
  )
}
