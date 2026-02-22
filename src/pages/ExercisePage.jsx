import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getExercise } from '../data/mathContent'

/** අභ්‍යාස ප්‍රශ්නයකට රූපසටහන — shape type සහ අගයන් අනුව */
function ExerciseDiagram({ question }) {
  const cx = 140
  const cy = 95
  const { shape } = question

  if (shape === 'rectangle') {
    const { lengthVal, widthVal } = question
    const l = 140
    const w = 90
    return (
      <svg viewBox="0 0 280 180" className="w-full max-w-xs drop-shadow-lg">
        <rect x={cx - l / 2} y={cy - w / 2} width={l} height={w} fill="white" stroke="#16a34a" strokeWidth="2" />
        <text x={cx} y={cy - w / 2 - 12} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">
          දිග {lengthVal}cm
        </text>
        <text
          x={cx - l / 2 - 28}
          y={cy}
          textAnchor="middle"
          transform={`rotate(-90 ${cx - l / 2 - 28} ${cy})`}
          className="fill-ink-700 text-sm font-semibold"
        >
          පළල {widthVal}cm
        </text>
      </svg>
    )
  }
  if (shape === 'square') {
    const { sideVal } = question
    const s = 80
    return (
      <svg viewBox="0 0 280 180" className="w-full max-w-xs drop-shadow-lg">
        <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} fill="white" stroke="#16a34a" strokeWidth="2" />
        <text x={cx} y={cy - s / 2 - 12} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">
          පැත්ත {sideVal}cm
        </text>
      </svg>
    )
  }
  if (shape === 'triangle') {
    const { a, b, c } = question
    const pts = [
      [70, 75],
      [70, 180],
      [210, 180],
    ]
    return (
      <svg viewBox="0 0 280 220" className="w-full max-w-xs drop-shadow-lg">
        <polygon points={pts.flat().join(' ')} fill="white" stroke="#16a34a" strokeWidth="2" />
        <text x={62} y={127} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">
          {a}cm
        </text>
        <text x={140} y={178} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">
          {b}cm
        </text>
        <text x={148} y={120} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">
          {c}cm
        </text>
      </svg>
    )
  }
  if (shape === 'circle') {
    const { radiusVal } = question
    const r = 60
    return (
      <svg viewBox="0 0 280 180" className="w-full max-w-xs drop-shadow-lg">
        <circle cx={cx} cy={cy} r={r} fill="white" stroke="#16a34a" strokeWidth="2" />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#16a34a" strokeWidth="2" strokeDasharray="4" />
        <text x={cx + r / 2 + 8} y={cy - 10} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">
          r = {radiusVal} cm
        </text>
      </svg>
    )
  }
  return null
}

function normalizeAnswer(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/cm|සෙ\.මී\.?/gi, '')
}

function checkAnswer(userInput, correctAnswer) {
  const u = normalizeAnswer(userInput)
  const c = normalizeAnswer(correctAnswer)
  if (u === c) return true
  const uNum = parseFloat(u.replace(/[^\d.-]/g, ''))
  const cNum = parseFloat(c.replace(/[^\d.-]/g, ''))
  return !isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) < 0.01
}

export default function ExercisePage() {
  const { chapterNum, exerciseId } = useParams()
  const result = getExercise(chapterNum, exerciseId)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})

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

  const handleCheck = (idx) => {
    const correct = checkAnswer(answers[idx], questions[idx].answer)
    setChecked((prev) => ({ ...prev, [idx]: correct }))
  }

  const handleCheckAll = () => {
    const newChecked = {}
    questions.forEach((q, idx) => {
      newChecked[idx] = checkAnswer(answers[idx], q.answer)
    })
    setChecked(newChecked)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500 flex-wrap">
        <Link to="/chapters" className="hover:text-sipyaya-600 transition-colors">
          පාඩම්
        </Link>
        <span className="text-ink-300">/</span>
        <Link to={`/chapter/${chapterNum}`} className="hover:text-sipyaya-600 transition-colors">
          {section.label} — {lesson.title}
        </Link>
        <span className="text-ink-300">/</span>
        <span className="font-medium text-ink-900">{exercise.title}</span>
      </nav>

      <article className="glass rounded-3xl border border-ink-200/60 shadow-xl shadow-ink-900/5 overflow-hidden">
        <header className="bg-gradient-to-br from-sipyaya-50 to-emerald-50/80 border-b border-sipyaya-200/60 px-8 py-8">
          <span className="inline-block px-3 py-1 rounded-lg bg-sipyaya-100 text-sipyaya-700 text-sm font-medium mb-2">
            අභ්‍යාස
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-900">{exercise.title}</h1>
          <p className="text-ink-600 mt-1">
            පහත රූපවල පරිමිතිය සොයා උත්තරය {unit} ඒකකයෙන් ලියන්න.
          </p>
        </header>

        <div className="p-8 space-y-10">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 p-6 transition-colors ${
                checked[idx] === true
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : checked[idx] === false
                    ? 'border-amber-300 bg-amber-50/30'
                    : 'border-sipyaya-200/80 bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-full sm:w-48 flex justify-center">
                  <ExerciseDiagram question={q} />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <p className="font-medium text-ink-700">
                    {idx + 1}. {q.prompt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="text"
                      value={answers[idx] ?? ''}
                      onChange={(e) => handleAnswerChange(idx, e.target.value)}
                      placeholder={`උත්තරය (${unit})`}
                      className="flex-1 min-w-[140px] px-4 py-3 rounded-xl border-2 border-ink-200 focus:border-sipyaya-500 focus:ring-2 focus:ring-sipyaya-200 outline-none transition-all text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleCheck(idx)}
                      className="px-5 py-3 rounded-xl bg-sipyaya-600 hover:bg-sipyaya-700 text-white font-medium transition-colors"
                    >
                      පරීක්ෂා කරන්න
                    </button>
                  </div>
                  {checked[idx] === true && (
                    <p className="text-emerald-700 font-medium flex items-center gap-2">
                      <span className="text-xl">✓</span> නිවැරදියි!
                    </p>
                  )}
                  {checked[idx] === false && (
                    <p className="text-amber-700 font-medium flex items-center gap-2">
                      <span className="text-xl">✗</span> නැවත උත්සාහ කරන්න.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-ink-200">
            <button
              type="button"
              onClick={handleCheckAll}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sipyaya-100 hover:bg-sipyaya-200 text-sipyaya-700 font-medium transition-colors"
            >
              සියලු උත්තර පරීක්ෂා කරන්න
            </button>
          </div>
        </div>
      </article>

      <div className="mt-8 flex justify-between items-center">
        <Link
          to={`/chapter/${chapterNum}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sipyaya-600 hover:bg-sipyaya-50 font-medium transition-colors"
        >
          ← පාඩමට ආපසු
        </Link>
      </div>
    </div>
  )
}
