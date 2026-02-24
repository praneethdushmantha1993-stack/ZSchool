import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ShortAnswerQuestion,
  MCQQuestion,
  MatchingQuestion,
  checkQuestion,
} from './QuestionTypes'
import { useAuth } from '../context/AuthContext'
import { saveExerciseScore } from '../services/scoreService'

/** Inline අභ්‍යාස UI — slide mode තුළ embed කිරීමට */
export default function ExerciseInline({ exercise, chapterNum, exerciseId }) {
  const { user } = useAuth()
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})
  const [scoreSaved, setScoreSaved] = useState(false)
  const [savingScore, setSavingScore] = useState(false)
  const [lastScoreBreakdown, setLastScoreBreakdown] = useState(null)
  const startTimeRef = useRef(Date.now())

  const questions = exercise?.questions || []
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

    if (user && chapterNum && exerciseId) {
      setSavingScore(true)
      try {
        await saveExerciseScore(
          user.uid,
          chapterNum,
          exerciseId,
          { correctCount, wrongCount, totalCount, bonusPoints, points },
          exercise?.title,
          user.displayName || user.email
        )
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

  if (!exercise || questions.length === 0) {
    return (
      <p className="text-ink-500 dark:text-ink-300 text-center py-8">
        මෙම අනුමාතෘකාවට අභ්‍යාස ප්‍රශ්න ඉක්මනින් එකතු කරනු ලැබේ.
      </p>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto">
      <p className="text-ink-600 dark:text-ink-300 text-sm md:text-base">
        පහත ප්‍රශ්න විසඳන්න. එක් එක් ආකාරයේ ගැටලු තියෙනවා.
      </p>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border-2 p-4 md:p-6 transition-colors ${
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
      </div>

      <div className="pt-4 border-t border-ink-200 dark:border-ink-700 space-y-3">
        <button
          type="button"
          onClick={handleCheckAll}
          disabled={savingScore}
          className="px-6 py-3 rounded-xl bg-sipyaya-100 dark:bg-sipyaya-900/50 hover:bg-sipyaya-200 dark:hover:bg-sipyaya-800/50 text-sipyaya-700 dark:text-sipyaya-300 font-medium transition-colors disabled:opacity-70"
        >
          {savingScore ? 'ලකුණු සුරකිමින්...' : 'සියලු උත්තර පරීක්ෂා කරන්න'}
        </button>
        {!user && (
          <p className="text-xs text-ink-500 dark:text-ink-300">
            ලකුණු සුරැකීමට <Link to="/login" className="text-sipyaya-600 hover:underline">පිවිසෙන්න</Link>
          </p>
        )}
        {lastScoreBreakdown && (
          <div className="text-emerald-700 dark:text-emerald-400 font-medium space-y-1 text-sm">
            {scoreSaved && (
              <p className="flex items-center gap-2">
                <span className="text-xl">✓</span> ඔබේ ලකුණු සාර්ථකව සුරකින ලදී!
              </p>
            )}
            <p className="text-ink-600 dark:text-ink-300">
              නිවැරදි {lastScoreBreakdown.correctCount} × 10 = {lastScoreBreakdown.correctCount * 10} | වැරදි {lastScoreBreakdown.wrongCount} × 2 = -{lastScoreBreakdown.wrongCount * 2}
              {lastScoreBreakdown.bonusPoints > 0 && ` | කාල bonus +${lastScoreBreakdown.bonusPoints}`}
              {' '}→ මුළු {lastScoreBreakdown.points} ලකුණු
            </p>
          </div>
        )}
        {showResultsList && (
          <div className="mt-4 p-4 rounded-xl bg-ink-50 dark:bg-ink-900/50 border border-ink-200 dark:border-ink-700 animate-fade-in">
            <h3 className="font-semibold text-ink-800 dark:text-ink-200 mb-3 text-sm">උත්තර සාරාංශය</h3>
            <ul className="space-y-2 text-sm">
              {questions.map((q, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                    checked[idx] ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-amber-50 dark:bg-amber-900/20'
                  }`}
                >
                  <span className={`font-bold shrink-0 ${checked[idx] ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {checked[idx] ? '✓' : '✗'}
                  </span>
                  <span className="flex-1 text-ink-700 dark:text-ink-300 min-w-0">
                    {idx + 1}. {q.prompt}
                  </span>
                  {!checked[idx] && (
                    <span className="text-amber-700 dark:text-amber-400 text-xs shrink-0">
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
  )
}
