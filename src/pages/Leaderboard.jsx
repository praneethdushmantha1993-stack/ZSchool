import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getUserTotalScore,
  getUserSubtopicScores,
  getLeaderboard,
} from '../services/scoreService'
import { formatPoints } from '../utils/formatPoints'
import { getEarnedBadges } from '../utils/badgeUtils'
import BadgeShield from '../components/BadgeShield'

export default function Leaderboard() {
  const { user } = useAuth()
  const [totalScore, setTotalScore] = useState(null)
  const [subtopicScores, setSubtopicScores] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ranking') // 'ranking' | 'my-scores'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [board, userTotal, userScores] = await Promise.all([
          getLeaderboard(50),
          user ? getUserTotalScore(user.uid) : Promise.resolve(0),
          user ? getUserSubtopicScores(user.uid) : Promise.resolve([]),
        ])
        setLeaderboard(board)
        setTotalScore(userTotal)
        setSubtopicScores(userScores)
      } catch (err) {
        console.error('Leaderboard load error:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  useEffect(() => {
    const onScoreUpdated = () => {
      if (user) {
        getUserTotalScore(user.uid).then(setTotalScore)
        getUserSubtopicScores(user.uid).then(setSubtopicScores)
      }
    }
    window.addEventListener('score-updated', onScoreUpdated)
    return () => window.removeEventListener('score-updated', onScoreUpdated)
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-10 h-10 border-2 border-sipyaya-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-ink-900 dark:text-ink-100 mb-2">
          ලකුණු ලැයිස්තුව
        </h1>
        <p className="text-ink-500 dark:text-ink-300">
          සියලු පරිශීලකයන්ගේ ලකුණු අනුව තරඟකාරී ලැයිස්තුව
        </p>
      </header>

      <div className="flex gap-2 mb-6 justify-center">
        <button
          type="button"
          onClick={() => setActiveTab('ranking')}
          className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'ranking'
              ? 'bg-sipyaya-600 text-white'
              : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-ink-700'
          }`}
        >
          තරඟකාරී ලැයිස්තුව
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('my-scores')}
          className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'my-scores'
              ? 'bg-sipyaya-600 text-white'
              : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-ink-700'
          }`}
        >
          මගේ ලකුණු
        </button>
      </div>

      {activeTab === 'ranking' && (
        <div className="glass rounded-2xl border border-ink-200/60 dark:border-ink-700/60 overflow-hidden">
            <div className="px-4 py-3 bg-sipyaya-50/50 dark:bg-sipyaya-900/30 dark:ring-1 dark:ring-sipyaya-500/20 border-b border-ink-200/60 dark:border-ink-700/60">
            <h2 className="font-bold text-ink-900 dark:text-ink-100">සියලු පරිශීලකයන්</h2>
          </div>
          {leaderboard.length === 0 ? (
            <div className="p-12 text-center text-ink-500 dark:text-ink-300">
              තවම ලකුණු නැත. ප්‍රශ්න විසඳා ලකුණු ලබා ගන්න!
            </div>
          ) : (
            <ul className="divide-y divide-ink-200/60 dark:divide-ink-700/60">
              {leaderboard.map((entry) => {
                const earned = getEarnedBadges(entry.totalScore || 0)
                const topBadge = earned.length > 0 ? earned[earned.length - 1] : null
                return (
                  <li
                    key={entry.id}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-ink-50/50 dark:hover:bg-ink-800/30 transition-colors ${
                      user && entry.id === user.uid ? 'bg-sipyaya-50/80 dark:bg-sipyaya-900/30' : ''
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        entry.rank <= 3
                          ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                          : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300'
                      }`}
                    >
                      {entry.rank}
                    </span>
                    {topBadge && (
                      <div className="shrink-0 scale-75 origin-left p-1 rounded-lg bg-ink-50/50 dark:bg-ink-800/60 dark:ring-1 dark:ring-ink-600/50">
                        <BadgeShield
                          color={topBadge.color}
                          glow={topBadge.glow}
                          iconIndex={topBadge.index}
                          size="sm"
                          earned
                        />
                      </div>
                    )}
                    <span className="flex-1 font-medium text-ink-900 dark:text-ink-100 truncate min-w-0">
                      {entry.displayName || 'පරිශීලකයා'}
                      {user && entry.id === user.uid && (
                        <span className="ml-2 text-xs text-sipyaya-600 dark:text-sipyaya-300">(ඔබ)</span>
                      )}
                    </span>
                    <span className="font-bold shrink-0 inline-flex items-center px-2.5 py-1 rounded-lg bg-sipyaya-100 dark:bg-sipyaya-900/50 dark:ring-1 dark:ring-sipyaya-500/40 text-sipyaya-700 dark:text-sipyaya-200">
                      {formatPoints(entry.totalScore || 0)} ලකුණු
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {activeTab === 'my-scores' && (
        <div className="glass rounded-2xl border border-ink-200/60 dark:border-ink-700/60 overflow-hidden">
          {!user ? (
            <div className="p-12 text-center">
              <p className="text-ink-500 dark:text-ink-300 mb-4">මගේ ලකුණු බලන්න පිවිසෙන්න</p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sipyaya-600 hover:bg-sipyaya-700 text-white font-medium"
              >
                පිවිසෙන්න
              </Link>
            </div>
          ) : (
            <>
              <div className="px-4 py-3 bg-sipyaya-50/50 dark:bg-sipyaya-900/30 dark:ring-1 dark:ring-sipyaya-500/20 border-b border-ink-200/60 dark:border-ink-700/60 flex items-center justify-between">
                <h2 className="font-bold text-ink-900 dark:text-ink-100">අනුමාතෘකා අනුව ලකුණු</h2>
                <span className="text-lg font-bold px-3 py-1 rounded-xl bg-sipyaya-100 dark:bg-sipyaya-900/60 dark:ring-1 dark:ring-sipyaya-500/40 text-sipyaya-700 dark:text-sipyaya-200">
                  මුළු: {formatPoints(totalScore ?? 0)}
                </span>
              </div>
              {subtopicScores.length === 0 ? (
                <div className="p-12 text-center text-ink-500 dark:text-ink-300">
                  තවම ලකුණු නැත.{' '}
                  <Link to="/chapters" className="text-sipyaya-600 hover:underline">
                    පාඩම් ආරම්භ කරන්න
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink-200/60 dark:divide-ink-700/60">
                  {subtopicScores
                    .sort((a, b) => (b.points || 0) - (a.points || 0))
                    .map((s) => (
                      <li
                        key={s.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-ink-50/50 dark:hover:bg-ink-800/30"
                      >
                        <div>
                          <span className="font-medium text-ink-900 dark:text-ink-100">
                            {s.subtopicTitle || s.exerciseId}
                          </span>
                          <span className="ml-2 text-xs text-ink-500 dark:text-ink-300">
                            (පරිච්ඡේද {s.chapterNum})
                          </span>
                        </div>
                        <span className="font-bold px-2.5 py-1 rounded-lg bg-sipyaya-100 dark:bg-sipyaya-900/50 dark:ring-1 dark:ring-sipyaya-500/40 text-sipyaya-700 dark:text-sipyaya-200">
                          {formatPoints(s.points || 0)} ලකුණු
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
