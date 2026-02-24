import { useState } from 'react'
import { TShapeDiagramAnimated, StairShapeDiagram } from './FormulaAnimations'

/** Short answer - රූපය + පෙළ input */
export function ExerciseDiagram({ question }) {
  const cx = 140
  const cy = 95
  const { shape } = question

  const labelClass = 'fill-ink-800 dark:fill-ink-200 text-base font-bold'
  if (shape === 'rectangle') {
    const { lengthVal, widthVal } = question
    const l = 140
    const w = 90
    return (
      <svg viewBox="0 0 280 180" className="w-full min-w-[200px] max-w-[320px] drop-shadow-lg">
        <rect x={cx - l / 2} y={cy - w / 2} width={l} height={w} fill="var(--shape-fill)" stroke="#16a34a" strokeWidth="2" />
        <text x={cx} y={cy - w / 2 - 14} textAnchor="middle" className={labelClass} style={{ fontSize: '16px' }}>
          දිග {lengthVal}cm
        </text>
        <text
          x={cx - l / 2 - 32}
          y={cy}
          textAnchor="middle"
          transform={`rotate(-90 ${cx - l / 2 - 32} ${cy})`}
          className={labelClass}
          style={{ fontSize: '16px' }}
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
      <svg viewBox="0 0 280 180" className="w-full min-w-[200px] max-w-[320px] drop-shadow-lg">
        <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} fill="var(--shape-fill)" stroke="#16a34a" strokeWidth="2" />
        <text x={cx} y={cy - s / 2 - 14} textAnchor="middle" className={labelClass} style={{ fontSize: '16px' }}>
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
      <svg viewBox="0 0 280 220" className="w-full min-w-[200px] max-w-[320px] drop-shadow-lg">
        <polygon points={pts.flat().join(' ')} fill="var(--shape-fill)" stroke="#16a34a" strokeWidth="2" />
        <text x={62} y={127} textAnchor="middle" className={labelClass} style={{ fontSize: '16px' }}>
          {a}cm
        </text>
        <text x={140} y={178} textAnchor="middle" className={labelClass} style={{ fontSize: '16px' }}>
          {b}cm
        </text>
        <text x={148} y={120} textAnchor="middle" className={labelClass} style={{ fontSize: '16px' }}>
          {c}cm
        </text>
      </svg>
    )
  }
  if (shape === 'circle') {
    const { radiusVal } = question
    const r = 60
    return (
      <svg viewBox="0 0 280 180" className="w-full min-w-[200px] max-w-[320px] drop-shadow-lg">
        <circle cx={cx} cy={cy} r={r} fill="var(--shape-fill)" stroke="#16a34a" strokeWidth="2" />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#16a34a" strokeWidth="2" strokeDasharray="4" />
        <text x={cx + r / 2 + 10} y={cy - 12} textAnchor="middle" className={labelClass} style={{ fontSize: '16px' }}>
          r = {radiusVal} cm
        </text>
      </svg>
    )
  }
  if (shape === 't-shape') {
    const { dims } = question
    return (
      <div className="w-full min-w-[220px] max-w-[360px] min-h-[200px] flex items-center justify-center">
        <TShapeDiagramAnimated dims={dims} highlightedEdgeCount={0} />
      </div>
    )
  }
  if (shape === 'stair-shape') {
    const { dims } = question
    return (
      <div className="w-full min-w-[220px] max-w-[360px] min-h-[200px] flex items-center justify-center">
        <StairShapeDiagram dims={dims} />
      </div>
    )
  }
  return null
}

/** Short answer question - රූපය + input */
export function ShortAnswerQuestion({ question, idx, value, onChange, checked, unit = 'cm' }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
      {!question.hideDiagram && question.shape && (
        <div className="flex-shrink-0 w-full sm:w-64 md:w-72 flex justify-center">
          <ExerciseDiagram question={question} />
        </div>
      )}
      <div className="flex-1 min-w-0 space-y-3">
        <p className="font-medium text-ink-700 dark:text-ink-300">
          {idx + 1}. {question.prompt}
        </p>
        <input
          type="number"
          inputMode="decimal"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`උත්තරය (${unit})`}
          className="w-full px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-600 dark:bg-ink-900/50 dark:text-ink-100 focus:border-sipyaya-500 focus:ring-2 focus:ring-sipyaya-200 dark:focus:border-sipyaya-400 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {checked === true && (
          <p className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-2">
            <span className="text-xl">✓</span> නිවැරදියි!
          </p>
        )}
      </div>
    </div>
  )
}

/** MCQ - බහු තේරීම් ප්‍රශ්න */
export function MCQQuestion({ question, idx, value, onChange, checked }) {
  const options = question.options || []
  return (
    <div className="space-y-3">
      <p className="font-medium text-ink-700 dark:text-ink-300">
        {idx + 1}. {question.prompt}
      </p>
      <div className="grid gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
              value === opt.value
                ? 'border-sipyaya-500 bg-sipyaya-50 dark:bg-sipyaya-900/30 dark:border-sipyaya-400'
                : 'border-ink-200 dark:border-ink-600 hover:border-sipyaya-300 dark:hover:border-ink-500'
            } ${checked === false && value === opt.value ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-900/20' : ''} ${checked === true && opt.value === question.answer ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : ''}`}
          >
            <span className="inline-flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                value === opt.value ? 'border-sipyaya-500 bg-sipyaya-500 text-white' : 'border-ink-300'
              }`}>
                {value === opt.value ? '●' : ''}
              </span>
              {opt.label}
            </span>
          </button>
        ))}
      </div>
      {checked === true && (
        <p className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-2">
          <span className="text-xl">✓</span> නිවැරදියි!
        </p>
      )}
    </div>
  )
}

/** Matching game - ගලපන්න */
function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function MatchingQuestion({ question, idx, value, onChange, checked }) {
  const pairs = question.pairs || []
  const [shuffledRight] = useState(() => shuffleArray(pairs.map((p) => p.right)))
  const userMatches = value || {} // { leftIndex: rightValue }

  const handleMatch = (leftIdx, rightVal) => {
    const newMatches = { ...userMatches, [leftIdx]: rightVal }
    onChange(newMatches)
  }

  return (
    <div className="space-y-4">
      <p className="font-medium text-ink-700 dark:text-ink-300">
        {idx + 1}. {question.prompt}
      </p>
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-ink-500 uppercase">
          <span>රූපය / සංකල්පය</span>
          <span>සූත්‍රය / උත්තරය</span>
        </div>
        {pairs.map((p, leftIdx) => (
          <div key={leftIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
            <div
              className={`px-4 py-3 rounded-xl border-2 ${
                userMatches[leftIdx] ? 'border-sipyaya-400 bg-sipyaya-50/50 dark:bg-sipyaya-900/20' : 'border-ink-200 dark:border-ink-600'
              }`}
            >
              {p.left}
            </div>
            <select
              value={userMatches[leftIdx] ?? ''}
              onChange={(e) => handleMatch(leftIdx, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-600 dark:bg-ink-900/50 dark:text-ink-100 focus:border-sipyaya-500 outline-none"
            >
              <option value="">තෝරන්න...</option>
              {shuffledRight.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {checked === true && (
        <p className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-2">
          <span className="text-xl">✓</span> නිවැරදියි!
        </p>
      )}
    </div>
  )
}

/** Check answer based on question type */
export function checkQuestion(q, userAnswer) {
  const type = q.type || 'shortAnswer'

  if (type === 'shortAnswer') {
    const u = String(userAnswer || '').trim().toLowerCase().replace(/\s+/g, '').replace(/cm|සෙ\.මී\.?/gi, '')
    const c = String(q.answer || '').trim().toLowerCase().replace(/\s+/g, '').replace(/cm|සෙ\.මී\.?/gi, '')
    if (u === c) return true
    const uNum = parseFloat(u.replace(/[^\d.-]/g, ''))
    const cNum = parseFloat(c.replace(/[^\d.-]/g, ''))
    return !isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) < 0.01
  }

  if (type === 'mcq') {
    return String(userAnswer || '').trim() === String(q.answer || '').trim()
  }

  if (type === 'matching') {
    const pairs = q.pairs || []
    const matches = userAnswer || {}
    return pairs.every((p, i) => String(matches[i] || '').trim() === String(p.right || '').trim())
  }

  return false
}
