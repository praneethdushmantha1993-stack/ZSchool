import { useState } from 'react'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

/** ඍජුකෝණාස්‍රයේ පරිමිතිය - සූත්‍රය පියවරෙන් පියවර නිර්මාණය */
export function RectanglePerimeterAnimation() {
  const [step, setStep] = useState(0)
  const totalSteps = 5

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const goPrev = () => setStep((s) => Math.max(s - 1, 0))

  const l = 140
  const w = 90
  const cx = 140
  const cy = 95

  // Step 0: පරිමිතිය = only
  // Step 1: highlight top (දිග), formula shows දිග
  // Step 2: highlight left (පළල), formula shows දිග + පළල
  // Step 3: highlight bottom+right (2nd set), formula shows 2 × (දිග + පළල)
  // Step 4: වීජීය සංකේත P = 2(l + w)
  const highlightLength = step >= 1
  const highlightWidth = step >= 2
  const highlightSecondSet = step >= 3

  const stepLabels = [
    'පරිමිතිය සොයා ගැනීම ආරම්භ කරමු',
    'දිග highlight කරයි — සූත්‍රයට දිග එකතු වේ',
    'පළල highlight කරයි — දිගට + පළල එකතු වේ',
    'තව දිගක් සහ පළලක් තියෙනවා — වරහන දා 2න් ගුණ කරයි',
    'වීජීය සංකේත: P = 2(l + w) — l = දිග, w = පළල',
  ]

  // Formula builds progressively
  const getFormulaDisplay = () => {
    if (step === 0) return { left: 'පරිමිතිය = ', right: '' }
    if (step === 1) return { left: 'පරිමිතිය = ', right: 'දිග' }
    if (step === 2) return { left: 'පරිමිතිය = ', right: 'දිග + පළල' }
    if (step === 3) return { left: 'පරිමිතිය = ', right: '2 × (දිග + පළල)' }
    if (step >= 4) return { left: 'P = ', right: '2(l + w)' }
    return { left: '', right: '' }
  }

  const formula = getFormulaDisplay()
  const showFormulaArea = true

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />

      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6">
          {/* SVG Diagram */}
          <div className="relative w-full max-w-md">
            <svg
              viewBox="0 0 280 220"
              className="w-full drop-shadow-lg"
              style={{ minHeight: 240 }}
            >
              <defs>
                <linearGradient id="lengthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="widthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="50%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <filter id="borderGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softShadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Main rectangle - සුදු, අඳුරු නැත, border වෙනම draw කරමු */}
              <rect
                x={cx - l / 2}
                y={cy - w / 2}
                width={l}
                height={w}
                fill="white"
                stroke="none"
                filter="url(#softShadow)"
              />

              {/* Borders - highlight කරන විට ලස්සන gradient + glow */}
              <g strokeLinecap="round" strokeLinejoin="round">
                {/* Top (දිග) - step 1 */}
                <line
                  x1={cx - l / 2}
                  y1={cy - w / 2}
                  x2={cx + l / 2}
                  y2={cy - w / 2}
                  stroke={highlightLength ? 'url(#lengthGrad)' : '#64748b'}
                  strokeWidth={highlightLength ? 6 : 2.5}
                  filter={highlightLength ? 'url(#borderGlow)' : undefined}
                  className="transition-all duration-500"
                />
                {/* Bottom (දිග) - step 3 */}
                <line
                  x1={cx - l / 2}
                  y1={cy + w / 2}
                  x2={cx + l / 2}
                  y2={cy + w / 2}
                  stroke={highlightSecondSet ? 'url(#lengthGrad)' : '#64748b'}
                  strokeWidth={highlightSecondSet ? 6 : 2.5}
                  filter={highlightSecondSet ? 'url(#borderGlow)' : undefined}
                  className="transition-all duration-500"
                />
                {/* Left (පළල) - step 2 */}
                <line
                  x1={cx - l / 2}
                  y1={cy - w / 2}
                  x2={cx - l / 2}
                  y2={cy + w / 2}
                  stroke={highlightWidth ? 'url(#widthGrad)' : '#64748b'}
                  strokeWidth={highlightWidth ? 6 : 2.5}
                  filter={highlightWidth ? 'url(#borderGlow)' : undefined}
                  className="transition-all duration-500"
                />
                {/* Right (පළල) - step 3 */}
                <line
                  x1={cx + l / 2}
                  y1={cy - w / 2}
                  x2={cx + l / 2}
                  y2={cy + w / 2}
                  stroke={highlightSecondSet ? 'url(#widthGrad)' : '#64748b'}
                  strokeWidth={highlightSecondSet ? 6 : 2.5}
                  filter={highlightSecondSet ? 'url(#borderGlow)' : undefined}
                  className="transition-all duration-500"
                />
              </g>

              {/* Labels */}
              <text x={cx} y={cy - w / 2 - 14} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">
                දිග
              </text>
              <text
                x={cx - l / 2 - 22}
                y={cy}
                textAnchor="middle"
                transform={`rotate(-90 ${cx - l/2 - 22} ${cy})`}
                className="fill-ink-700 text-sm font-semibold"
              >
                පළල
              </text>

              {/* Formula - builds step by step, border highlights with draw animation when formula has content */}
              {showFormulaArea && (
                <g>
                  <rect
                    x="15"
                    y="175"
                    width="250"
                    height="36"
                    fill="white"
                    stroke={step >= 1 ? '#16a34a' : '#e2e8f0'}
                    strokeWidth={step >= 1 ? 2 : 1.5}
                    strokeDasharray={step >= 1 ? 572 : undefined}
                    className={step >= 1 ? 'animate-formula-border-draw' : ''}
                    filter="url(#softShadow)"
                  />
                  {/* Formula text - builds step by step */}
                  <text x="140" y="197" textAnchor="middle" className="fill-sipyaya-800 text-base font-bold">
                    {formula.left}
                    <tspan fill={formula.right ? '#16a34a' : '#94a3b8'}>{formula.right || '...'}</tspan>
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Step description */}
          <div className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-ink-900/80 px-5 py-4 shadow-sm border border-ink-100 dark:border-ink-700 backdrop-blur-sm max-md:backdrop-blur-none max-md:bg-white/95 max-md:dark:bg-ink-900/95">
            <p className="text-center text-ink-700 font-medium">{stepLabels[step]}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 w-full max-w-sm justify-center">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200"
              aria-label="මුලට"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goPrev}
              className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={step === 0}
              aria-label="පෙර"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {[...Array(totalSteps)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStep(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === step ? 'w-8 bg-gradient-to-r from-sipyaya-500 to-emerald-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300 hover:w-3'
                  }`}
                  aria-label={`පියවර ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={step === totalSteps - 1}
              aria-label="ඊළඟ"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** පියවර සහ සිදුකරන දේ — වෙනම */
const STEPS = [
  { num: 1, label: 'සූත්‍රය දීම' },
  { num: 2, label: 'ආදේශය (දිග = 6, පළල = 4)' },
  { num: 3, label: 'වරහන සුළු කිරීම' },
  { num: 4, label: 'පිළිතුර' },
]

/** විසඳන ආකාරය — පියවර අනුව */
const RECTANGLE_STEPS = [
  { num: 1, label: 'සූත්‍රය දීම' },
  { num: 2, label: 'ආදේශය' },
  { num: 3, label: 'ගණනය' },
  { num: 4, label: 'පිළිතුර' },
]
function buildRectangleSolution(l, w) {
  const sum = l + w
  const ans = 2 * sum
  return ['පරිමිතිය = 2 × (දිග + පළල)', `පරිමිතිය = 2 × (${l} + ${w})`, `පරිමිතිය = 2 × ${sum}`, `පරිමිතිය = ${ans}cm`]
}

const SOLUTION_LINES = buildRectangleSolution(6, 4)

/** ඍජුකෝණාස්‍රයේ පරිමිතිය - උදාහරණය */
function RectanglePerimeterExampleAnimation({ exampleId = '01.01.01', lengthVal = 6, widthVal = 4 }) {
  return (
    <ExampleAnimationLayout
      exampleId={exampleId}
      shape="rectangle"
      lengthVal={lengthVal}
      widthVal={widthVal}
      steps={RECTANGLE_STEPS}
      solutionLines={buildRectangleSolution(lengthVal, widthVal)}
    />
  )
}

/** සමචතුරස්‍රයේ පරිමිතිය - සූත්‍රය (4 පැති සමාන) */
function SquarePerimeterAnimation() {
  const [step, setStep] = useState(0)
  const totalSteps = 5
  const side = 100
  const cx = 140
  const cy = 100

  const highlightSides = step >= 1
  const stepLabels = [
    'පරිමිතිය සොයා ගැනීම ආරම්භ කරමු',
    'පැත්ත 1 — සූත්‍රයට පැත්ත එකතු වේ',
    'පැත්ත 2 — දෙවන පැත්ත',
    'පැති 3 සහ 4 — සියලු පැති සමාන, පරිමිතිය = 4 × පැත්ත',
    'වීජීය සංකේත: P = 4s — s = පැත්තක දිග',
  ]
  const getFormulaDisplay = () => {
    if (step === 0) return { left: 'පරිමිතිය = ', right: '' }
    if (step === 1) return { left: 'පරිමිතිය = ', right: 'පැත්ත' }
    if (step === 2) return { left: 'පරිමිතිය = ', right: 'පැත්ත + පැත්ත' }
    if (step === 3) return { left: 'පරිමිතිය = ', right: '4 × පැත්ත' }
    if (step >= 4) return { left: 'P = ', right: '4s' }
    return { left: '', right: '' }
  }
  const formula = getFormulaDisplay()

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 280 220" className="w-full drop-shadow-lg" style={{ minHeight: 240 }}>
              <defs>
                <linearGradient id="squareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <filter id="squareGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="squareShadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" /></filter>
              </defs>
              <rect x={cx - side/2} y={cy - side/2} width={side} height={side} fill="white" stroke="none" filter="url(#squareShadow)" />
              <g strokeLinecap="round" strokeLinejoin="round">
                {[[0,1],[1,2],[2,3],[3,0]].map(([i,j], idx) => {
                  const pts = [[cx-side/2,cy-side/2],[cx+side/2,cy-side/2],[cx+side/2,cy+side/2],[cx-side/2,cy+side/2]]
                  const [x1,y1] = pts[i]
                  const [x2,y2] = pts[j]
                  return (
                    <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={highlightSides ? 'url(#squareGrad)' : '#64748b'} strokeWidth={highlightSides ? 6 : 2.5}
                      filter={highlightSides ? 'url(#squareGlow)' : undefined} className="transition-all duration-500" />
                  )
                })}
              </g>
              <text x={cx} y={cy - side/2 - 14} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">පැත්ත</text>
              <g>
                <rect x="15" y="175" width="250" height="36" fill="white" stroke={step >= 1 ? '#16a34a' : '#e2e8f0'} strokeWidth={step >= 1 ? 2 : 1.5} filter="url(#squareShadow)" />
                <text x="140" y="197" textAnchor="middle" className="fill-sipyaya-800 text-base font-bold">
                  {formula.left}<tspan fill={formula.right ? '#16a34a' : '#94a3b8'}>{formula.right || '...'}</tspan>
                </text>
              </g>
            </svg>
          </div>
          <div className="w-full max-w-md rounded-2xl bg-white/80 px-5 py-4 shadow-sm border border-ink-100">
            <p className="text-center text-ink-700 font-medium">{stepLabels[step]}</p>
          </div>
          <StepControls step={step} totalSteps={totalSteps} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

/** සමචතුරස්‍රය — උදාහරණය (පැත්ත 5cm) */
const SQUARE_STEPS = [
  { num: 1, label: 'සූත්‍රය දීම' },
  { num: 2, label: 'ආදේශය (s = 5)' },
  { num: 3, label: 'පිළිතුර' },
]

function buildSquareSolution(s) {
  return ['පරිමිතිය = 4 × s', `පරිමිතිය = 4 × ${s}`, `පරිමිතිය = ${4 * s}cm`]
}

function SquarePerimeterExampleAnimation({ exampleId = '01.01.02', sideVal = 5 }) {
  return (
    <ExampleAnimationLayout
      exampleId={exampleId}
      shape="square"
      sideVal={sideVal}
      steps={SQUARE_STEPS}
      solutionLines={buildSquareSolution(sideVal)}
    />
  )
}

/** ත්‍රිකෝණයේ පරිමිතිය - සූත්‍රය (පාද තුනේ එකතුව) */
function TrianglePerimeterAnimation() {
  const [step, setStep] = useState(0)
  const totalSteps = 5
  // 3-4-5 right triangle: top-left, bottom-left, bottom-right (a=4 base, b=3 left, c=5 hypotenuse)
  const pts = [[70, 75], [70, 180], [210, 180]]

  const highlightSides = step >= 1
  const stepLabels = [
    'පරිමිතිය සොයා ගැනීම ආරම්භ කරමු',
    'පාදය a — සූත්‍රයට a එකතු වේ',
    'පාදය b — a + b',
    'පාදය c — පාද තුනේ එකතුව',
    'වීජීය සංකේත: P = a + b + c',
  ]
  const getFormulaDisplay = () => {
    if (step === 0) return { left: 'පරිමිතිය = ', right: '' }
    if (step === 1) return { left: 'පරිමිතිය = ', right: 'a' }
    if (step === 2) return { left: 'පරිමිතිය = ', right: 'a + b' }
    if (step === 3) return { left: 'පරිමිතිය = ', right: 'a + b + c' }
    if (step >= 4) return { left: 'P = ', right: 'a + b + c' }
    return { left: '', right: '' }
  }
  const formula = getFormulaDisplay()

  // Labels: a=3 (left), b=4 (base), c=5 (hypotenuse) — formula rect at y=205
  const labelA = { x: 62, y: 127 }
  const labelB = { x: 140, y: 178 }
  const labelC = { x: 148, y: 120 }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 280 250" className="w-full drop-shadow-lg" style={{ minHeight: 240 }}>
              <defs>
                <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#0d9488" /></linearGradient>
                <filter id="triGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="triShadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" /></filter>
              </defs>
              <polygon points={pts.flat().join(' ')} fill="white" stroke="none" filter="url(#triShadow)" />
              <g strokeLinecap="round" strokeLinejoin="round">
                {[[0,1],[1,2],[2,0]].map(([i,j], idx) => {
                  const isBase = idx === 1
                  const shouldHighlight = highlightSides && !isBase
                  return (
                    <line key={idx} x1={pts[i][0]} y1={pts[i][1]} x2={pts[j][0]} y2={pts[j][1]}
                      stroke={shouldHighlight ? 'url(#triGrad)' : '#64748b'} strokeWidth={shouldHighlight ? 6 : 2.5}
                      filter={shouldHighlight ? 'url(#triGlow)' : undefined} className="transition-all duration-500" />
                  )
                })}
              </g>
              <text x={labelA.x} y={labelA.y} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">a</text>
              <text x={labelB.x} y={labelB.y} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">b</text>
              <text x={labelC.x} y={labelC.y} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">c</text>
              <g>
                <rect x="15" y="205" width="250" height="36" fill="white" stroke={step >= 1 ? '#16a34a' : '#e2e8f0'} strokeWidth={step >= 1 ? 2 : 1.5} filter="url(#triShadow)" />
                <text x="140" y="223" textAnchor="middle" className="fill-sipyaya-800 text-base font-bold">
                  {formula.left}<tspan fill={formula.right ? '#16a34a' : '#94a3b8'}>{formula.right || '...'}</tspan>
                </text>
              </g>
            </svg>
          </div>
          <div className="w-full max-w-md rounded-2xl bg-white/80 px-5 py-4 shadow-sm border border-ink-100">
            <p className="text-center text-ink-700 font-medium">{stepLabels[step]}</p>
          </div>
          <StepControls step={step} totalSteps={totalSteps} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

/** ත්‍රිකෝණ වර්ග — සමපාද (පැති තුනම සමාන) */
function TriangleTypeEquilateralAnimation() {
  const [step, setStep] = useState(0)
  const totalSteps = 3
  const cx = 140
  const cy = 100
  const size = 70
  const pts = [[cx, cy - size], [cx - size * 0.866, cy + size / 2], [cx + size * 0.866, cy + size / 2]]
  const stepLabels = [
    'සමපාද ත්‍රිකෝණය — පැති තුනම සමාන දිගක් ඇත',
    'a = b = c — සෑම පාදයක්ම සමාන දිග',
    'පරිමිතිය = 3a (a = පැත්තක දිග)',
  ]
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 280 220" className="w-full drop-shadow-lg" style={{ minHeight: 200 }}>
              <defs><filter id="triTypeShadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" /></filter></defs>
              <polygon points={pts.flat().join(' ')} fill="white" stroke="#64748b" strokeWidth="2.5" filter="url(#triTypeShadow)" />
              <text x={cx} y={cy - size - 8} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">a</text>
              <text x={cx - size * 0.866 - 12} y={cy + size / 2 + 4} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">b</text>
              <text x={cx + size * 0.866 + 12} y={cy + size / 2 + 4} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">c</text>
              <text x={cx} y={cy + size / 2 + 28} textAnchor="middle" className="fill-ink-600 text-xs">a = b = c</text>
            </svg>
          </div>
          <div className="w-full max-w-md rounded-2xl bg-white/80 px-5 py-4 shadow-sm border border-ink-100">
            <p className="text-center text-ink-700 font-medium">{stepLabels[step]}</p>
          </div>
          <StepControls step={step} totalSteps={totalSteps} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

/** ත්‍රිකෝණ වර්ග — සමද්විපාද (පැති දෙකක් සමාන) */
function TriangleTypeIsoscelesAnimation() {
  const [step, setStep] = useState(0)
  const totalSteps = 3
  const pts = [[140, 60], [90, 180], [190, 180]]
  const stepLabels = [
    'සමද්විපාද ත්‍රිකෝණය — පැති දෙකක් සමාන දිගක් ඇත',
    'a = b ≠ c — පාද දෙකක් සමාන, තුන්වැන්න වෙනස්',
    'පරිමිතිය = 2a + c (a = සමාන පැති, c = පාදය)',
  ]
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 280 220" className="w-full drop-shadow-lg" style={{ minHeight: 200 }}>
              <defs><filter id="triTypeIsoShadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" /></filter></defs>
              <polygon points={pts.flat().join(' ')} fill="white" stroke="#64748b" strokeWidth="2.5" filter="url(#triTypeIsoShadow)" />
              <text x={115} y={115} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">a</text>
              <text x={165} y={115} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">b</text>
              <text x={140} y={188} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">c</text>
              <text x={140} y={205} textAnchor="middle" className="fill-ink-600 text-xs">a = b</text>
            </svg>
          </div>
          <div className="w-full max-w-md rounded-2xl bg-white/80 px-5 py-4 shadow-sm border border-ink-100">
            <p className="text-center text-ink-700 font-medium">{stepLabels[step]}</p>
          </div>
          <StepControls step={step} totalSteps={totalSteps} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

/** ත්‍රිකෝණ වර්ග — විෂම පාද (පැති තුනම වෙනස්) */
function TriangleTypeScaleneAnimation() {
  const [step, setStep] = useState(0)
  const totalSteps = 3
  const pts = [[70, 75], [70, 180], [210, 180]]
  const stepLabels = [
    'විෂම පාද ත්‍රිකෝණය — පැති තුනම වෙනස් දිගක් ඇත',
    'a ≠ b ≠ c — සෑම පාදයක්ම වෙනස් දිග',
    'පරිමිතිය = a + b + c',
  ]
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 280 220" className="w-full drop-shadow-lg" style={{ minHeight: 200 }}>
              <defs><filter id="triTypeScalShadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" /></filter></defs>
              <polygon points={pts.flat().join(' ')} fill="white" stroke="#64748b" strokeWidth="2.5" filter="url(#triTypeScalShadow)" />
              <text x={62} y={127} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">a</text>
              <text x={140} y={178} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">b</text>
              <text x={148} y={120} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">c</text>
              <text x={140} y={200} textAnchor="middle" className="fill-ink-600 text-xs">a ≠ b ≠ c</text>
            </svg>
          </div>
          <div className="w-full max-w-md rounded-2xl bg-white/80 px-5 py-4 shadow-sm border border-ink-100">
            <p className="text-center text-ink-700 font-medium">{stepLabels[step]}</p>
          </div>
          <StepControls step={step} totalSteps={totalSteps} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

/** ත්‍රිකෝණය — උදාහරණය (පැති 3, 4, 5) */
const TRIANGLE_STEPS = [
  { num: 1, label: 'සූත්‍රය දීම' },
  { num: 2, label: 'ආදේශය (a=3, b=4, c=5)' },
  { num: 3, label: 'පිළිතුර' },
]

function buildTriangleSolution(a, b, c) {
  const sum = a + b + c
  return ['පරිමිතිය = a + b + c', `පරිමිතිය = ${a} + ${b} + ${c}`, `පරිමිතිය = ${sum}cm`]
}

function TrianglePerimeterExampleAnimation({ exampleId = '01.01.03', a = 3, b = 4, c = 5 }) {
  return (
    <ExampleAnimationLayout
      exampleId={exampleId}
      shape="triangle"
      a={a}
      b={b}
      c={c}
      steps={TRIANGLE_STEPS}
      solutionLines={buildTriangleSolution(a, b, c)}
    />
  )
}

/** වෘත්තයේ පරිමිතිය - සූත්‍රය (2πr) */
function CirclePerimeterAnimation() {
  const [step, setStep] = useState(0)
  const totalSteps = 4
  const cx = 140
  const cy = 95
  const r = 70

  const stepLabels = [
    'පරිමිතිය (පරිධිය) සොයා ගැනීම ආරම්භ කරමු',
    'අරය r — පරිධිය = 2 × π × අරය',
    <span key="pi">π = <InlineMath math={'\\frac{22}{7}'} /> — පරිධිය = 2πr</span>,
    'වීජීය සංකේත: P = 2πr',
  ]
  const getFormulaDisplay = () => {
    if (step === 0) return { left: 'පරිධිය = ', right: '' }
    if (step === 1) return { left: 'පරිධිය = ', right: '2 × π × අරය' }
    if (step === 2) return { left: 'පරිධිය = ', right: '2πr' }
    if (step >= 3) return { left: 'P = ', right: '2πr' }
    return { left: '', right: '' }
  }
  const formula = getFormulaDisplay()

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 280 220" className="w-full drop-shadow-lg" style={{ minHeight: 240 }}>
              <defs>
                <filter id="circleShadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" /></filter>
              </defs>
              <circle cx={cx} cy={cy} r={r} fill="white" stroke="#64748b" strokeWidth="2.5" className="transition-all duration-500" />
              <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#64748b" strokeWidth="2" strokeDasharray="4" />
              <text x={cx + r/2 + 10} y={cy - 8} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">r (අරය)</text>
              <g>
                <rect x="15" y="175" width="250" height="36" fill="white" stroke={step >= 1 ? '#16a34a' : '#e2e8f0'} strokeWidth={step >= 1 ? 2 : 1.5} filter="url(#circleShadow)" />
                <text x="140" y="197" textAnchor="middle" className="fill-sipyaya-800 text-base font-bold">
                  {formula.left}<tspan fill={formula.right ? '#16a34a' : '#94a3b8'}>{formula.right || '...'}</tspan>
                </text>
              </g>
            </svg>
          </div>
          <div className="w-full max-w-md rounded-2xl bg-white/80 px-5 py-4 shadow-sm border border-ink-100">
            <p className="text-center text-ink-700 font-medium">{stepLabels[step]}</p>
          </div>
          <StepControls step={step} totalSteps={totalSteps} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

/** වෘත්තය — උදාහරණය (අරය 7cm) */
function getCircleSteps(radiusVal) {
  const rLabel = radiusVal
  const hasFraction = radiusVal === 3.5 || radiusVal === 10.5
  return [
    { num: 1, label: 'සූත්‍රය දීම' },
    { num: 2, label: `ආදේශය (r = ${rLabel})` },
    { num: 3, label: hasFraction ? '7 හා 2 කැපීම' : '7 කැපීම' },
    { num: 4, label: 'පිළිතුර' },
  ]
}
const CIRCLE_SOLUTION = [
  'පරිමිතිය = 2πr',
  <span key="c2">පරිමිතිය = 2 × <InlineMath math={'\\frac{22}{7}'} /> × 7</span>,
  <span key="c3">පරිමිතිය = 2 × <InlineMath math={'\\frac{22}{\\overset{1}{\\cancel{7}}}'} /> × <InlineMath math={'\\overset{1}{\\cancel{7}}'} /> = 2 × 22 × 1 = 44 cm</span>,
  'පරිමිතිය = 44 cm',
]

function buildCircleSolution(r) {
  const ans = Math.round(2 * (22 / 7) * r)
  const rNum = typeof r === 'number' ? r : parseFloat(r)
  const hasCancel = rNum % 7 === 0 && Number.isInteger(rNum)
  const isFractionForm35 = rNum === 3.5 || rNum === 7 / 2
  const isFractionForm105 = rNum === 10.5 || rNum === 21 / 2

  if (hasCancel) {
    const factor = rNum / 7
    const cancelDenom = '\\frac{22}{\\overset{1}{\\cancel{7}}}'
    const cancelNum = `\\overset{${factor}}{\\cancel{${rNum}}}`
    return [
      'පරිමිතිය = 2πr',
      <span key="c2">පරිමිතිය = 2 × <InlineMath math={'\\frac{22}{7}'} /> × {rNum}</span>,
      <span key="c3">පරිමිතිය = 2 × <InlineMath math={cancelDenom} /> × <InlineMath math={cancelNum} /> = 2 × 22 × {factor} = {ans} cm</span>,
      `පරිමිතිය = ${ans} cm`,
    ]
  }
  if (isFractionForm35) {
    return [
      'පරිමිතිය = 2πr',
      <span key="c2">පරිමිතිය = 2 × <InlineMath math={'\\frac{22}{7}'} /> × <InlineMath math={'\\frac{7}{2}'} /></span>,
      <span key="c3">පරිමිතිය = 2 × <InlineMath math={'\\frac{22}{\\cancel{7}}'} /> × <InlineMath math={'\\frac{\\cancel{7}}{2}'} /> = 2 × 22 × <InlineMath math={'\\frac{1}{2}'} /> = 22 cm</span>,
      'පරිමිතිය = 22 cm',
    ]
  }
  if (isFractionForm105) {
    return [
      'පරිමිතිය = 2πr',
      <span key="c2">පරිමිතිය = 2 × <InlineMath math={'\\frac{22}{7}'} /> × <InlineMath math={'\\frac{21}{2}'} /></span>,
      <span key="c3">පරිමිතිය = 2 × <InlineMath math={'\\frac{22}{\\cancel{7}}'} /> × <InlineMath math={'\\frac{\\cancel{21}}{2}'} />. 21÷7=3, 2 කැපෙනවා. = 22 × 3 = 66 cm</span>,
      'පරිමිතිය = 66 cm',
    ]
  }
  return [
    'පරිමිතිය = 2πr',
    `පරිමිතිය = 2 × (22/7) × ${rNum}`,
    `පරිමිතිය = ${Math.round(ans * 10) / 10} cm`,
  ]
}

function CirclePerimeterExampleAnimation({ exampleId = '01.01.04', radiusVal = 7 }) {
  return (
    <ExampleAnimationLayout
      exampleId={exampleId}
      shape="circle"
      radiusVal={radiusVal}
      steps={getCircleSteps(radiusVal)}
      solutionLines={buildCircleSolution(radiusVal)}
    />
  )
}

/** පොදු Example layout — රූපය, පියවර, විසඳන ආකාරය */
function ExampleAnimationLayout({ exampleId, shape, sideVal, a, b, c, radiusVal, lengthVal, widthVal, steps, solutionLines }) {
  const [step, setStep] = useState(0)
  const totalSteps = steps.length + 1

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const goPrev = () => setStep((s) => Math.max(s - 1, 0))

  const renderDiagram = () => {
    const cx = 140
    const cy = 95
    if (shape === 'rectangle') {
      const l = 140
      const w = 90
      return (
        <svg viewBox="0 0 280 180" className="w-full drop-shadow-lg">
          <rect x={cx - l/2} y={cy - w/2} width={l} height={w} fill="white" stroke="#64748b" strokeWidth="2" />
          <text x={cx} y={cy - w/2 - 12} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">දිග {lengthVal}cm</text>
          <text x={cx - l/2 - 28} y={cy} textAnchor="middle" transform={`rotate(-90 ${cx - l/2 - 28} ${cy})`} className="fill-ink-700 text-sm font-semibold">පළල {widthVal}cm</text>
        </svg>
      )
    }
    if (shape === 'square') {
      const s = sideVal ? 80 : 100
      return (
        <svg viewBox="0 0 280 180" className="w-full drop-shadow-lg">
          <rect x={cx-s/2} y={cy-s/2} width={s} height={s} fill="white" stroke="#64748b" strokeWidth="2" />
          <text x={cx} y={cy-s/2-12} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">පැත්ත {sideVal}cm</text>
        </svg>
      )
    }
    if (shape === 'triangle') {
      // 3-4-5 right triangle: a=3 left, b=4 base, c=5 hypotenuse
      const pts = [[70, 75], [70, 180], [210, 180]]
      return (
        <svg viewBox="0 0 280 220" className="w-full drop-shadow-lg">
          <polygon points={pts.flat().join(' ')} fill="white" stroke="#64748b" strokeWidth="2" />
          <text x={62} y={127} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">{a}cm</text>
          <text x={140} y={178} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">{b}cm</text>
          <text x={148} y={120} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">{c}cm</text>
        </svg>
      )
    }
    if (shape === 'circle') {
      const r = 60
      const radiusLabel = radiusVal
      return (
        <svg viewBox="0 0 280 180" className="w-full drop-shadow-lg">
          <circle cx={cx} cy={cy} r={r} fill="white" stroke="#64748b" strokeWidth="2" />
          <line x1={cx} y1={cy} x2={cx+r} y2={cy} stroke="#64748b" strokeWidth="2" strokeDasharray="4" />
          <text x={cx+r/2+8} y={cy-10} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">r = {radiusLabel} cm</text>
        </svg>
      )
    }
    return null
  }

  const circleRadiusLabel = radiusVal
  const diagramLabel = shape === 'rectangle' ? `දිග ${lengthVal}cm සහ පළල ${widthVal}cm ඇති ඍජුකෝණාස්‍රය` :
    shape === 'square' ? `පැත්ත ${sideVal}cm ඇති සමචතුරස්‍රය` :
    shape === 'triangle' ? `පැති ${a}cm, ${b}cm, ${c}cm ඇති ත්‍රිකෝණය` :
    shape === 'circle' ? `අරය ${circleRadiusLabel} cm ඇති වෘත්තය` : ''

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="px-4 py-2 bg-sipyaya-50/50 border-b border-sipyaya-200/60">
        <p className="text-center text-sm font-medium text-sipyaya-700">උදාහරණය {exampleId}</p>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">
          <div className="flex flex-col items-center gap-2">
            <p className="text-ink-600 font-medium">{diagramLabel}</p>
            <div className="relative w-full max-w-xs">{renderDiagram()}</div>
          </div>
          <div className="rounded-2xl border border-sipyaya-200/80 bg-white/90 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-sipyaya-700 uppercase tracking-wider mb-4">පියවර</h3>
            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={s.num} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  step === i + 1 ? 'bg-sipyaya-100 border-2 border-sipyaya-400' : step > i + 1 ? 'bg-emerald-50/60 text-ink-600' : 'bg-ink-50/50 text-ink-400'
                }`}>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                    step === i + 1 ? 'bg-sipyaya-500 text-white' : step > i + 1 ? 'bg-emerald-500 text-white' : 'bg-ink-200 text-ink-500'
                  }`}>
                    {step > i + 1 ? '✓' : s.num}
                  </span>
                  <span className="font-medium">{s.label}</span>
                </li>
              ))}
            </ol>
          </div>
          {step >= 1 && (
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4">විසඳන ආකාරය</h3>
              <div className="space-y-3">
                {solutionLines.map((line, i) => {
                  const isVisible = step > i
                  const isCurrent = step === i + 1
                  if (!isVisible) return null
                  return (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-lg transition-all ${
                      isCurrent ? 'bg-emerald-100 border-2 border-emerald-500 shadow-md' : 'bg-white/80 border border-emerald-100'
                    }`}>
                      <span className="flex-shrink-0 w-6 h-6 rounded bg-emerald-200/80 text-emerald-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <span className={isCurrent ? 'font-bold text-emerald-900' : 'text-ink-700'}>{line}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          <div className="flex items-center gap-4 w-full justify-center">
            <button type="button" onClick={() => setStep(0)} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200" aria-label="මුලට">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button type="button" onClick={goPrev} disabled={step === 0} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="පෙර">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2">
              {[...Array(totalSteps)].map((_, i) => (
                <button key={i} type="button" onClick={() => setStep(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-gradient-to-r from-sipyaya-500 to-emerald-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300 hover:w-3'}`} aria-label={`පියවර ${i + 1}`} />
              ))}
            </div>
            <button type="button" onClick={goNext} disabled={step === totalSteps - 1} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="ඊළඟ">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Step controls — පොදු */
function StepControls({ step, totalSteps, setStep }) {
  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const goPrev = () => setStep((s) => Math.max(s - 1, 0))
  return (
    <div className="flex items-center gap-4 w-full max-w-sm justify-center">
      <button type="button" onClick={() => setStep(0)} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200" aria-label="මුලට">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      </button>
      <button type="button" onClick={goPrev} disabled={step === 0} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="පෙර">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div className="flex gap-2">
        {[...Array(totalSteps)].map((_, i) => (
          <button key={i} type="button" onClick={() => setStep(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-gradient-to-r from-sipyaya-500 to-emerald-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300 hover:w-3'}`} aria-label={`පියවර ${i + 1}`} />
        ))}
      </div>
      <button type="button" onClick={goNext} disabled={step === totalSteps - 1} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="ඊළඟ">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}

/** සංයුක්ත තල රූපවල පරිමිතිය — L හැඩය, කොටුවකින් කැපූ රූප ආදිය */
export function LShapeDiagram({ dims }) {
  const { topW, leftH, rightH, bottomW, innerW, innerH } = dims
  const scale = 16
  const ox = 35
  const oy = 25
  const path = `M ${ox} ${oy} h ${topW * scale} v ${rightH * scale} h ${-innerW * scale} v ${innerH * scale} h ${-bottomW * scale} v ${-(leftH) * scale} Z`
  return (
    <svg viewBox="0 0 220 160" className="w-full drop-shadow-lg">
      <path d={path} fill="white" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
      <text x={ox + (topW * scale) / 2} y={oy - 6} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{topW}cm</text>
      <text x={ox - 10} y={oy + (leftH * scale) / 2} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{leftH}cm</text>
      <text x={ox + (topW - innerW) * scale + (innerW * scale) / 2} y={oy + rightH * scale + 12} textAnchor="middle" className="fill-ink-600 text-xs font-medium">{innerW}cm</text>
      <text x={ox + (topW - innerW) * scale + innerW * scale + 12} y={oy + rightH * scale + (innerH * scale) / 2} textAnchor="middle" className="fill-ink-600 text-xs font-medium">{innerH}cm</text>
      <text x={ox + (bottomW * scale) / 2} y={oy + leftH * scale + 14} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{bottomW}cm</text>
      <text x={ox + topW * scale + 12} y={oy + (rightH * scale) / 2} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{rightH}cm</text>
    </svg>
  )
}

/** L හැඩය — පියවර අනුව දාර එකින් එක highlight (0=කිසිදු, 1=පළමු පාදය, 2=පළමු දෙක, ... 6=සියල්ල) */
function LShapeDiagramAnimated({ dims, highlightedEdgeCount = 0 }) {
  const { topW, leftH, rightH, bottomW, innerW, innerH } = dims
  const scale = 14
  const ox = 40
  const oy = 30
  const s = scale
  const hl = (edgeIdx) => highlightedEdgeCount > edgeIdx
  const edges = [
    { d: `M ${ox} ${oy} h ${topW * s}`, idx: 0 },
    { d: `M ${ox + topW * s} ${oy} v ${rightH * s}`, idx: 1 },
    { d: `M ${ox + topW * s - innerW * s} ${oy + rightH * s} h ${innerW * s}`, idx: 2 },
    { d: `M ${ox + topW * s - innerW * s} ${oy + rightH * s} v ${innerH * s}`, idx: 3 },
    { d: `M ${ox + topW * s - innerW * s - bottomW * s} ${oy + leftH * s} h ${bottomW * s}`, idx: 4 },
    { d: `M ${ox} ${oy + leftH * s} v ${-leftH * s}`, idx: 5 },
  ]
  return (
    <svg viewBox="0 0 240 180" className="w-full drop-shadow-lg">
      <defs>
        <linearGradient id="lShapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <path d={`M ${ox} ${oy} h ${topW * s} v ${rightH * s} h ${-innerW * s} v ${innerH * s} h ${-bottomW * s} v ${-leftH * s} Z`} fill="white" stroke="#e2e8f0" strokeWidth="2" strokeLinejoin="round" />
      {edges.map(({ d, idx }) => (
        <path key={idx} d={d} fill="none" stroke={hl(idx) ? 'url(#lShapeGrad)' : '#94a3b8'} strokeWidth={hl(idx) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      ))}
      <text x={ox + (topW * s) / 2} y={oy - 8} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">{topW}cm</text>
      <text x={ox - 12} y={oy + (leftH * s) / 2} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">{leftH}cm</text>
      <text x={ox + topW * s - innerW * s / 2} y={oy + rightH * s + 14} textAnchor="middle" className="fill-ink-600 text-xs font-medium">{innerW}cm</text>
      <text x={ox + topW * s - innerW * s + 14} y={oy + rightH * s + (innerH * s) / 2} textAnchor="middle" className="fill-ink-600 text-xs font-medium">{innerH}cm</text>
      <text x={ox + (bottomW * s) / 2} y={oy + leftH * s + 16} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">{bottomW}cm</text>
      <text x={ox + topW * s + 14} y={oy + (rightH * s) / 2} textAnchor="middle" className="fill-ink-700 text-sm font-semibold">{rightH}cm</text>
    </svg>
  )
}

/** T හැඩය — ඉහළ තිරස් තීරුව, මැදින් පහළට කඳ, සෑම පාදයකටම අගය (cm) */
export function TShapeDiagramAnimated({ dims, highlightedEdgeCount = 0 }) {
  const { topW, stemW, sideH } = dims
  const s = 14
  const ox = 35
  const oy = 30
  const leftPart = (topW - stemW) / 2
  const hl = (i) => highlightedEdgeCount > i
  const edgeVals = [topW, sideH, leftPart, sideH, stemW, sideH, leftPart, sideH]
  const edges = [
    { d: `M ${ox} ${oy} h ${topW * s}`, idx: 0 },
    { d: `M ${ox + topW * s} ${oy} v ${sideH * s}`, idx: 1 },
    { d: `M ${ox + topW * s} ${oy + sideH * s} h ${-leftPart * s}`, idx: 2 },
    { d: `M ${ox + leftPart * s + stemW * s} ${oy + sideH * s} v ${sideH * s}`, idx: 3 },
    { d: `M ${ox + leftPart * s + stemW * s} ${oy + 2 * sideH * s} h ${-stemW * s}`, idx: 4 },
    { d: `M ${ox + leftPart * s} ${oy + 2 * sideH * s} v ${-sideH * s}`, idx: 5 },
    { d: `M ${ox + leftPart * s} ${oy + sideH * s} h ${-leftPart * s}`, idx: 6 },
    { d: `M ${ox} ${oy + sideH * s} v ${-sideH * s}`, idx: 7 },
  ]
  const fullPath = `M ${ox} ${oy} h ${topW * s} v ${sideH * s} h ${-leftPart * s} v ${sideH * s} h ${-stemW * s} v ${-sideH * s} h ${-leftPart * s} v ${-sideH * s} Z`
  const labels = [
    { x: ox + (topW * s) / 2, y: oy - 8, anchor: 'middle' },
    { x: ox + topW * s + 12, y: oy + (sideH * s) / 2, anchor: 'start' },
    { x: ox + topW * s - (leftPart * s) / 2, y: oy + sideH * s + 12, anchor: 'middle' },
    { x: ox + leftPart * s + stemW * s + 12, y: oy + sideH * s + (sideH * s) / 2, anchor: 'start' },
    { x: ox + leftPart * s + (stemW * s) / 2, y: oy + 2 * sideH * s + 12, anchor: 'middle' },
    { x: ox + leftPart * s - 10, y: oy + sideH * s + (sideH * s) / 2, anchor: 'end' },
    { x: ox + (leftPart * s) / 2, y: oy + sideH * s + 12, anchor: 'middle' },
    { x: ox - 10, y: oy + (sideH * s) / 2, anchor: 'end' },
  ]
  return (
    <svg viewBox="0 0 240 240" className="w-full drop-shadow-lg">
      <defs>
        <linearGradient id="tShapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <path d={fullPath} fill="white" stroke="#e2e8f0" strokeWidth="2" strokeLinejoin="round" />
      {edges.map(({ d, idx }) => (
        <path key={idx} d={d} fill="none" stroke={hl(idx) ? 'url(#tShapeGrad)' : '#94a3b8'} strokeWidth={hl(idx) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      ))}
      {edgeVals.map((val, i) => (
        <text key={i} x={labels[i].x} y={labels[i].y} textAnchor={labels[i].anchor} className="fill-ink-700 text-[10px] font-medium">{val}cm</text>
      ))}
    </svg>
  )
}

/** U හැඩය — පහළ තිරස්, ඉහළ මැද කැපුම (U අකුර වගේ), සෑම පාදයකටම අගය */
export function UShapeDiagramAnimated({ dims, highlightedEdgeCount = 0 }) {
  const { topW, cutW, cutH, sideH, leftPart } = dims
  const s = 14
  const ox = 35
  const oy = 30
  const lp = leftPart ?? (topW - cutW) / 2
  const hl = (i) => highlightedEdgeCount > i
  const edges = [
    { d: `M ${ox} ${oy + sideH * s} h ${topW * s}`, idx: 0, val: topW },
    { d: `M ${ox + topW * s} ${oy + sideH * s} v ${-sideH * s}`, idx: 1, val: sideH },
    { d: `M ${ox + topW * s} ${oy} h ${-lp * s}`, idx: 2, val: lp },
    { d: `M ${ox + lp * s + cutW * s} ${oy} v ${cutH * s}`, idx: 3, val: cutH },
    { d: `M ${ox + lp * s + cutW * s} ${oy + cutH * s} h ${-cutW * s}`, idx: 4, val: cutW },
    { d: `M ${ox + lp * s} ${oy + cutH * s} v ${-cutH * s}`, idx: 5, val: cutH },
    { d: `M ${ox + lp * s} ${oy} h ${-lp * s}`, idx: 6, val: lp },
    { d: `M ${ox} ${oy} v ${sideH * s}`, idx: 7, val: sideH },
  ]
  const fullPath = `M ${ox} ${oy + sideH * s} h ${topW * s} v ${-sideH * s} h ${-lp * s} v ${cutH * s} h ${-cutW * s} v ${-cutH * s} h ${-lp * s} v ${sideH * s} Z`
  const labels = [
    { x: ox + (topW * s) / 2, y: oy + sideH * s + 12, anchor: 'middle' },
    { x: ox + topW * s + 12, y: oy + (sideH * s) / 2, anchor: 'start' },
    { x: ox + topW * s - (lp * s) / 2, y: oy - 8, anchor: 'middle' },
    { x: ox + lp * s + cutW * s + 12, y: oy + (cutH * s) / 2, anchor: 'start' },
    { x: ox + lp * s + (cutW * s) / 2, y: oy + cutH * s + 12, anchor: 'middle' },
    { x: ox + lp * s - 10, y: oy + (cutH * s) / 2, anchor: 'end' },
    { x: ox + (lp * s) / 2, y: oy - 8, anchor: 'middle' },
    { x: ox - 10, y: oy + (sideH * s) / 2, anchor: 'end' },
  ]
  return (
    <svg viewBox="0 0 240 230" className="w-full drop-shadow-lg">
      <defs>
        <linearGradient id="uShapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <path d={fullPath} fill="white" stroke="#e2e8f0" strokeWidth="2" strokeLinejoin="round" />
      {edges.map(({ d, idx }) => (
        <path key={idx} d={d} fill="none" stroke={hl(idx) ? 'url(#uShapeGrad)' : '#94a3b8'} strokeWidth={hl(idx) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      ))}
      {edges.map((e, i) => (
        <text key={i} x={labels[i].x} y={labels[i].y} textAnchor={labels[i].anchor} className="fill-ink-700 text-[10px] font-medium">{e.val}cm</text>
      ))}
    </svg>
  )
}

function FrameDiagram({ dims }) {
  const { outerL, outerW, innerL, innerW } = dims
  const scale = 12
  const ox = 30
  const oy = 25
  const ix = ox + (outerL - innerL) / 2 * scale
  const iy = oy + (outerW - innerW) / 2 * scale
  return (
    <svg viewBox="0 0 220 140" className="w-full drop-shadow-lg">
      <rect x={ox} y={oy} width={outerL * scale} height={outerW * scale} fill="white" stroke="#0d9488" strokeWidth="2" />
      <rect x={ix} y={iy} width={innerL * scale} height={innerW * scale} fill="white" stroke="#0d9488" strokeWidth="2" strokeDasharray="4" />
      <text x={ox + (outerL * scale) / 2} y={oy - 6} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{outerL}×{outerW}cm</text>
      <text x={ix + (innerL * scale) / 2} y={iy + (innerW * scale) / 2 + 4} textAnchor="middle" className="fill-ink-600 text-xs font-medium">{innerL}×{innerW}</text>
    </svg>
  )
}

/** ත්‍රිකෝණ කොටසකින් කැපූ සංයුක්ත රූපය — A→B(4)→C(6)→D(3)→E(3)→F(3)→A(කර්ණය 5) */
function DiagonalShapeDiagram({ dims }) {
  const { bottomLeft, bottomRight, rightH, topW } = dims
  const scale = 12
  const ox = 40
  const oy = 25
  const path = `M ${ox} ${oy + rightH * scale} h ${bottomLeft * scale} h ${bottomRight * scale} v ${-rightH * scale} h ${-topW * scale} h ${-topW * scale} L ${ox} ${oy + rightH * scale} Z`
  return (
    <svg viewBox="0 0 220 110" className="w-full drop-shadow-lg">
      <path d={path} fill="white" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
      <text x={ox + (bottomLeft * scale) / 2} y={oy + rightH * scale + 14} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{bottomLeft}cm</text>
      <text x={ox + bottomLeft * scale + (bottomRight * scale) / 2} y={oy + rightH * scale + 14} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{bottomRight}cm</text>
      <text x={ox + (bottomLeft + bottomRight) * scale + 10} y={oy + (rightH * scale) / 2} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{rightH}cm</text>
      <text x={ox + bottomLeft * scale - (topW * scale)} y={oy - 6} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{topW}cm</text>
      <line x1={ox} y1={oy + rightH * scale} x2={ox + bottomLeft * scale} y2={oy} stroke="#0d9488" strokeWidth="2" strokeDasharray="4" />
      <text x={ox + (bottomLeft * scale) / 2 - 8} y={oy + (rightH * scale) / 2 + 8} textAnchor="middle" className="fill-ink-600 text-xs font-medium">5cm</text>
    </svg>
  )
}

/** Diagonal shape — highlightedEdgeCount: 0=කිසිදු, 1-6=පාද එකින් එක (bottomL, bottomR, right, top1, top2, කර්ණය) */
function DiagonalShapeDiagramAnimated({ dims, highlightedEdgeCount = 0 }) {
  const { bottomLeft, bottomRight, rightH, topW } = dims
  const scale = 12
  const ox = 40
  const oy = 28
  const s = scale
  const hl = (edgeIdx) => highlightedEdgeCount > edgeIdx
  return (
    <svg viewBox="0 0 220 120" className="w-full drop-shadow-lg">
      <defs>
        <linearGradient id="diagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <path d={`M ${ox} ${oy + rightH * s} h ${bottomLeft * s} h ${bottomRight * s} v ${-rightH * s} h ${-topW * s} h ${-topW * s} L ${ox} ${oy + rightH * s} Z`} fill="white" stroke="#e2e8f0" strokeWidth="2" strokeLinejoin="round" />
      <path d={`M ${ox} ${oy + rightH * s} h ${bottomLeft * s}`} fill="none" stroke={hl(0) ? 'url(#diagGrad)' : '#94a3b8'} strokeWidth={hl(0) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      <path d={`M ${ox + bottomLeft * s} ${oy + rightH * s} h ${bottomRight * s}`} fill="none" stroke={hl(1) ? 'url(#diagGrad)' : '#94a3b8'} strokeWidth={hl(1) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      <path d={`M ${ox + (bottomLeft + bottomRight) * s} ${oy + rightH * s} v ${-rightH * s}`} fill="none" stroke={hl(2) ? 'url(#diagGrad)' : '#94a3b8'} strokeWidth={hl(2) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      <path d={`M ${ox + bottomLeft * s} ${oy} h ${-topW * s}`} fill="none" stroke={hl(3) ? 'url(#diagGrad)' : '#94a3b8'} strokeWidth={hl(3) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      <path d={`M ${ox + bottomLeft * s - topW * s} ${oy} h ${-topW * s}`} fill="none" stroke={hl(4) ? 'url(#diagGrad)' : '#94a3b8'} strokeWidth={hl(4) ? 5 : 2} strokeLinecap="round" className="transition-all duration-400" />
      <line x1={ox} y1={oy + rightH * s} x2={ox + bottomLeft * s} y2={oy} stroke={hl(5) ? 'url(#diagGrad)' : '#94a3b8'} strokeWidth={hl(5) ? 5 : 2} strokeDasharray="4" className="transition-all duration-400" />
      <text x={ox + (bottomLeft * s) / 2} y={oy + rightH * s + 14} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{bottomLeft}cm</text>
      <text x={ox + bottomLeft * s + (bottomRight * s) / 2} y={oy + rightH * s + 14} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{bottomRight}cm</text>
      <text x={ox + (bottomLeft + bottomRight) * s + 12} y={oy + (rightH * s) / 2} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{rightH}cm</text>
      <text x={ox + bottomLeft * s - topW * s} y={oy - 8} textAnchor="middle" className="fill-ink-700 text-xs font-semibold">{topW}cm</text>
      <text x={ox + (bottomLeft * s) / 2 - 10} y={oy + (rightH * s) / 2 + 10} textAnchor="middle" className="fill-ink-600 text-xs font-medium">5cm</text>
    </svg>
  )
}

/** සංයුක්ත රූප උදාහරණ — පාදය highlight වන විට පරිමිතිය = ... + දාලා ගොඩනැගීම */
function CompositeExampleAnimation({ example, exampleId }) {
  const edgeValues = example.edgeValues || []
  const useEdgeByEdge = edgeValues.length > 0 && ['l-shape', 'diagonal', 't-shape', 'u-shape'].includes(example.shape)

  const [step, setStep] = useState(0)
  const totalSteps = useEdgeByEdge ? edgeValues.length + 2 : (example.steps?.length || 0) + 1
  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const goPrev = () => setStep((s) => Math.max(s - 1, 0))

  const highlightedEdgeCount = useEdgeByEdge ? step : 0
  const renderDiagram = () => {
    if (example.shape === 'l-shape') return <LShapeDiagramAnimated dims={example.dims} highlightedEdgeCount={highlightedEdgeCount} />
    if (example.shape === 'diagonal') return <DiagonalShapeDiagramAnimated dims={example.dims} highlightedEdgeCount={highlightedEdgeCount} />
    if (example.shape === 't-shape') return <TShapeDiagramAnimated dims={example.dims} highlightedEdgeCount={highlightedEdgeCount} />
    if (example.shape === 'u-shape') return <UShapeDiagramAnimated dims={example.dims} highlightedEdgeCount={highlightedEdgeCount} />
    if (example.shape === 'frame') return <FrameDiagram dims={example.dims} />
    return <LShapeDiagram dims={example.dims} />
  }

  const getFormulaDisplay = () => {
    if (!useEdgeByEdge || step === 0) return 'පරිමිතිය = '
    if (step <= edgeValues.length) {
      const parts = edgeValues.slice(0, step)
      return `පරිමිතිය = ${parts.join(' + ')}`
    }
    return `පරිමිතිය = ${edgeValues.join(' + ')} = ${example.perimeter} cm`
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-sipyaya-200/80 bg-gradient-to-br from-white via-sipyaya-50/30 to-emerald-50/40 shadow-xl shadow-sipyaya-900/5">
      <div className="h-1.5 bg-gradient-to-r from-sipyaya-400 via-sipyaya-500 to-emerald-500" />
      <div className="px-4 py-2 bg-sipyaya-50/50 border-b border-sipyaya-200/60">
        <p className="text-center text-sm font-medium text-sipyaya-700">උදාහරණය {exampleId}</p>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
          <p className="text-ink-600 font-medium text-center">{example.label}</p>
          {example.explanation && (
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm text-ink-700">
              <span className="font-semibold text-amber-800">පැහැදිළි කිරීම: </span>
              {example.explanation}
            </div>
          )}
          <div className={`flex justify-center mx-auto ${['t-shape', 'u-shape'].includes(example.shape) ? 'max-w-[560px]' : 'max-w-[320px]'}`}>{renderDiagram()}</div>
          {useEdgeByEdge && (
            <div className="rounded-2xl border border-sipyaya-200/80 bg-white/90 p-5 shadow-sm">
              <p className="text-ink-500 text-sm mb-3 px-4 py-2 rounded-xl bg-sipyaya-50/50">
                {step === 0 ? 'පාදය highlight වන විට පරිමිතිය = කියලා පටන්ගන්න. ඊළඟ පාදය highlight වන වට + දාලා දාන්න.' : step <= edgeValues.length ? `පාදය ${step} එකතු කළා` : 'පිළිතුර'}
              </p>
              <p className="px-4 py-3 rounded-xl bg-sipyaya-100 text-sipyaya-800 font-semibold text-lg">
                {getFormulaDisplay()}
              </p>
            </div>
          )}
          {useEdgeByEdge && step > edgeValues.length && (
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 shadow-sm animate-fade-in">
              <p className="px-4 py-3 rounded-xl bg-sipyaya-100 text-sipyaya-800 font-semibold text-lg">
                පිළිතුර: පරිමිතිය = {example.perimeter} cm
              </p>
            </div>
          )}
          {!useEdgeByEdge && example.steps && (
            <>
              <div className="rounded-2xl border border-sipyaya-200/80 bg-white/90 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-sipyaya-700 uppercase tracking-wider mb-4">පියවර</h3>
                {step === 0 && (
                  <p className="text-ink-500 text-sm mb-4 px-4 py-2 rounded-xl bg-sipyaya-50/50">පියවර අනුගමනය කිරීමට ඊළඟ බොත්තම ඔබන්න</p>
                )}
                <ol className="space-y-3">
                  {example.steps.map((s, i) => (
                    <li key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      step === i + 1 ? 'bg-sipyaya-100 border-2 border-sipyaya-400' : step > i + 1 ? 'bg-emerald-50/60 text-ink-600' : 'bg-ink-50/50 text-ink-400'
                    }`}>
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        step === i + 1 ? 'bg-sipyaya-500 text-white' : step > i + 1 ? 'bg-emerald-500 text-white' : 'bg-ink-200 text-ink-500'
                      }`}>
                        {step > i + 1 ? '✓' : i + 1}
                      </span>
                      <span className="font-medium">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {step >= example.steps.length && (
                <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 shadow-sm animate-fade-in">
                  <p className="px-4 py-3 rounded-xl bg-sipyaya-100 text-sipyaya-800 font-semibold text-lg">
                    පිළිතුර: පරිමිතිය = {example.perimeter} cm
                  </p>
                </div>
              )}
            </>
          )}
          <div className="flex items-center gap-4 w-full justify-center">
            <button type="button" onClick={() => setStep(0)} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200" aria-label="මුලට">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button type="button" onClick={goPrev} disabled={step === 0} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="පෙර">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2">
              {[...Array(totalSteps)].map((_, i) => (
                <button key={i} type="button" onClick={() => setStep(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-gradient-to-r from-sipyaya-500 to-emerald-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300 hover:w-3'}`} aria-label={`පියවර ${i + 1}`} />
              ))}
            </div>
            <button type="button" onClick={goNext} disabled={step === totalSteps - 1} className="p-2.5 rounded-xl bg-ink-100 text-ink-500 hover:bg-sipyaya-100 hover:text-sipyaya-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="ඊළඟ">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CompositePerimeterSection({ examples }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="my-8 space-y-10">
      <CompositeExampleAnimation example={examples[0]} exampleId="01" />
      {examples.length > 1 && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sipyaya-100 hover:bg-sipyaya-200/80 text-sipyaya-700 font-medium transition-colors"
            >
              {expanded ? 'උදාහරණ හැකුලුම් කරන්න' : `තවත් උදාහරණ ${examples.length - 1} බලන්න`}
              <svg className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {expanded && (
            <div className="space-y-10 animate-fade-in pt-4 border-t border-sipyaya-200/60">
              {examples.slice(1).map((ex, i) => (
                <CompositeExampleAnimation key={i} example={ex} exampleId={`${String(i + 2).padStart(2, '0')}`} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

/** තල රූපයකට උදාහරණ 5 — කැමති නම් බලන්න, නැත්නම් මගහැර යන්න */
export function PerimeterExamplesSection({ shape, examples, shapeLabel }) {
  const [expanded, setExpanded] = useState(false)
  const ExampleComponent = shape === 'rectangle' ? RectanglePerimeterExampleAnimation :
    shape === 'square' ? SquarePerimeterExampleAnimation :
    shape === 'triangle' ? TrianglePerimeterExampleAnimation :
    CirclePerimeterExampleAnimation

  return (
    <div className="my-8 space-y-4">
      <div className="space-y-6">
        <ExampleComponent exampleId="01" {...examples[0]} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sipyaya-100 hover:bg-sipyaya-200/80 text-sipyaya-700 font-medium transition-colors"
        >
          {expanded ? 'උදාහරණ හැකුලුම් කරන්න' : `තවත් උදාහරණ ${examples.length - 1} බලන්න`}
          <svg className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {!expanded && (
          <span className="text-sm text-ink-500">නැත්නම් මෙතැනින් මගහැර යන්න</span>
        )}
      </div>
      {expanded && (
        <div className="space-y-8 animate-fade-in pt-4 border-t border-sipyaya-200/60">
          {examples.slice(1).map((ex, i) => (
            <ExampleComponent key={i} exampleId={`${String(i + 2).padStart(2, '0')}`} {...ex} />
          ))}
        </div>
      )}
    </div>
  )
}

const ANIMATIONS = {
  'rectangle-perimeter': RectanglePerimeterAnimation,
  'rectangle-perimeter-example': RectanglePerimeterExampleAnimation,
  'square-perimeter': SquarePerimeterAnimation,
  'square-perimeter-example': SquarePerimeterExampleAnimation,
  'triangle-perimeter': TrianglePerimeterAnimation,
  'triangle-perimeter-example': TrianglePerimeterExampleAnimation,
  'triangle-type-equilateral': TriangleTypeEquilateralAnimation,
  'triangle-type-isosceles': TriangleTypeIsoscelesAnimation,
  'triangle-type-scalene': TriangleTypeScaleneAnimation,
  'circle-perimeter': CirclePerimeterAnimation,
  'circle-perimeter-example': CirclePerimeterExampleAnimation,
}

export default function FormulaAnimation({ id, exampleId }) {
  const Component = ANIMATIONS[id]
  if (!Component) return null
  return <Component exampleId={exampleId} />
}
