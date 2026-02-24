import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getExercise } from '../data/mathContent'
import {
  ShortAnswerQuestion,
  MCQQuestion,
  MatchingQuestion,
  checkQuestion,
} from '../components/QuestionTypes'
import { useAuth } from '../context/AuthContext'
import { saveExerciseScore } from '../services/scoreService'

export default function ExercisePage() {
  const { chapterNum, exerciseId } = useParams()
  const { user } = useAuth()
  const result = getExercise(chapterNum, exerciseId)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})
  const [scoreSaved, setScoreSaved] = useState(false)
  const [savingScore, setSavingScore] = useState(false)
  const [lastScoreBreakdown, setLastScoreBreakdown] = useState(null)
  const startTimeRef = useRef(Date.now())

  if (!result) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="inline-flex w-16 h-16 rounded-full bg-ink-100 items-center justify-center text-3xl mb-4">?</div>
        <p className="text-ink-600 mb-4">මෙම අභ්‍යාසය හමු නොවුණි.</p>
        <Link to="/chapters" className="inline-flex items-center gap-2 text-sipyaya-600 hover:text-sipyaya-700 font-medium">
          ← පාඩම් වෙත ආපසු යන්න
        </Link>
      </div>
    )
  }

  const { exercise, lesson, section } = result
  const questions = exercise.questions || []
  const unit = questions[0]?.unit || 'cm'

  const handleAnswerChange = (idx, value) => {
    setAnswers((prev) => ({ ...prev, [idx]: value }))
    setChecked((prev) => ({ ...prev, [idx]: false }))
  }

  const handleCheckAll = async () => {
    const newChecked = {}
    questions.forEach((q, idx) => {
      newChecked[idx] = checkQuestion(q, answers[idx])
    })
    setChecked(newChecked)

    const correctCount = Object.values(newChecked).filter(Boolean).length
    const wrongCount = questions.length - correctCount
    const totalCount = questions.length
    const elapsedSec = (Date.now() - startTimeRef.current) / 1000
    const maxBonusTime = totalCount * 45
    const bonusPoints = Math.round(500 * Math.max(0, 1 - elapsedSec / maxBonusTime))
    const points = correctCount * 10 - wrongCount * 2 + bonusPoints

    setLastScoreBreakdown({ correctCount, wrongCount, bonusPoints, points, elapsedSec })

    if (user) {
      setSavingScore(true)
      try {
        await saveExerciseScore(user.uid, chapterNum, exerciseId, {
          correctCount,
          wrongCount,
          totalCount,
          bonusPoints,
          points,
        })
        setScoreSaved(true)
        window.dispatchEvent(new CustomEvent('score-updated'))
      } catch (err) {
        console.error('ලකුණු සුරැකීමට අපොහොසත් විය:', err)
      } finally {
        setSavingScore(false)
      }
    }
  }

  const showResultsList = questions.length > 0 && questions.every((_, i) => checked[i] === true || checked[i] === false)

  function renderQuestion(q, idx) {
    const type = q.type || 'shortAnswer'
    const value = answers[idx]
    const isChecked = checked[idx]

    if (type === 'mcq') {
      return (
        <MCQQuestion
          question={q}
          idx={idx}
          value={value}
          onChange={(v) => handleAnswerChange(idx, v)}
          checked={isChecked}
        />
      )
    }

    if (type === 'matching') {
      return (
        <MatchingQuestion
          question={q}
          idx={idx}
          value={value}
          onChange={(v) => handleAnswerChange(idx, v)}
          checked={isChecked}
        />
      )
    }

    return (
      <ShortAnswerQuestion
        question={q}
        idx={idx}
        value={value}
        onChange={(v) => handleAnswerChange(idx, v)}
        checked={isChecked}
        unit={q.unit || unit}
      />
    )
  }

  function getCorrectAnswerDisplay(q) {
    const type = q.type || 'shortAnswer'
    if (type === 'mcq') {
      const opt = q.options?.find((o) => o.value === q.answer)
      return opt?.label || q.answer
    }
    if (type === 'matching') {
      return q.pairs?.map((p) => `${p.left} → ${p.right}`).join(', ') || ''
    }
    return q.answer
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400 flex-wrap">
        <Link to="/chapters" className="hover:text-sipyaya-600 dark:hover:text-sipyaya-400 transition-colors">
          පාඩම්
        </Link>
        <span className="text-ink-300 dark:text-ink-500">/</span>
        <Link to={`/chapter/${chapterNum}`} className="hover:text-sipyaya-600 dark:hover:text-sipyaya-400 transition-colors">
          {section.label} — {lesson.title}
        </Link>
        <span className="text-ink-300 dark:text-ink-500">/</span>
        <span className="font-medium text-ink-900 dark:text-ink-100">{exercise.title}</span>
      </nav>

      <article className="glass rounded-3xl border border-ink-200/60 dark:border-ink-700/60 shadow-xl shadow-ink-900/5 dark:shadow-black/20 overflow-hidden">
        <header className="bg-gradient-to-br from-sipyaya-50 to-emerald-50/80 dark:from-sipyaya-900/30 dark:to-emerald-900/20 border-b border-sipyaya-200/60 dark:border-ink-700/60 px-8 py-8">
          <span className="inline-block px-3 py-1 rounded-lg bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300 text-sm font-medium mb-2">
            අභ්‍යාස
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-900 dark:text-ink-100">{exercise.title}</h1>
          <p className="text-ink-600 dark:text-ink-400 mt-1">
            පහත ප්‍රශ්න විසඳන්න. එක් එක් ආකාරයේ ගැටලු තියෙනවා.
          </p>
        </header>

        <div className="p-8 space-y-10">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 p-6 transition-colors ${
                checked[idx] === true
                  ? 'border-emerald-300 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20'
                  : checked[idx] === false
                    ? 'border-amber-300 dark:border-amber-600 bg-amber-50/30 dark:bg-amber-900/20'
                    : 'border-sipyaya-200/80 dark:border-ink-600 bg-white dark:bg-ink-900/50'
              }`}
            >
              {renderQuestion(q, idx)}
            </div>
          ))}

          <div className="pt-4 border-t border-ink-200 dark:border-ink-700 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCheckAll}
                disabled={savingScore}
                className="px-6 py-3 rounded-xl bg-sipyaya-100 dark:bg-sipyaya-900/50 hover:bg-sipyaya-200 dark:hover:bg-sipyaya-800/50 text-sipyaya-700 dark:text-sipyaya-300 font-medium transition-colors disabled:opacity-70"
              >
                {savingScore ? 'ලකුණු සුරකිමින්...' : 'සියලු උත්තර පරීක්ෂා කරන්න'}
              </button>
              {!user && (
                <Link
                  to="/login"
                  className="text-sm text-ink-500 dark:text-ink-400 hover:text-sipyaya-600 dark:hover:text-sipyaya-400"
                >
                  ලකුණු සුරැකීමට පිවිසෙන්න
                </Link>
              )}
            </div>
            {lastScoreBreakdown && (
              <div className="text-emerald-700 dark:text-emerald-400 font-medium space-y-1">
                {scoreSaved && (
                  <p className="flex items-center gap-2">
                    <span className="text-xl">✓</span> ඔබේ ලකුණු සාර්ථකව සුරකින ලදී!
                  </p>
                )}
                <p className="text-sm text-ink-600 dark:text-ink-400">
                  නිවැරදි {lastScoreBreakdown.correctCount} × 10 = {lastScoreBreakdown.correctCount * 10} | වැරදි {lastScoreBreakdown.wrongCount} × 2 = -{lastScoreBreakdown.wrongCount * 2}
                  {lastScoreBreakdown.bonusPoints > 0 && ` | කාල bonus +${lastScoreBreakdown.bonusPoints}`}
                  {' '}→ මුළු {lastScoreBreakdown.points} ලකුණු
                </p>
              </div>
            )}
            {showResultsList && (
              <div className="mt-4 p-4 rounded-xl bg-ink-50 dark:bg-ink-900/50 border border-ink-200 dark:border-ink-700 animate-fade-in">
                <h3 className="font-semibold text-ink-800 dark:text-ink-200 mb-3">උත්තර සාරාංශය</h3>
                <ul className="space-y-2">
                  {questions.map((q, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                        checked[idx] ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-amber-50 dark:bg-amber-900/20'
                      }`}
                    >
                      <span className={`text-lg font-bold shrink-0 ${checked[idx] ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {checked[idx] ? '✓' : '✗'}
                      </span>
                      <span className="flex-1 text-ink-700 dark:text-ink-300 min-w-0">
                        {idx + 1}. {q.prompt}
                      </span>
                      {checked[idx] ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium shrink-0">හරි</span>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400 text-sm shrink-0">
                          නිවැරදි: {getCorrectAnswerDisplay(q)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>

      <div className="mt-8 flex justify-between items-center">
        <Link
          to={`/chapter/${chapterNum}`}
          className="inline-flex items-center gap-2 p-2.5 md:px-4 md:py-2.5 rounded-xl text-sipyaya-600 dark:text-sipyaya-400 hover:bg-sipyaya-50 dark:hover:bg-ink-800 font-medium transition-colors"
          aria-label="පාඩමට ආපසු"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden md:inline">පාඩමට ආපසු</span>
        </Link>
      </div>
    </div>
  )
}
