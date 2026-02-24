import { useState, useRef, useEffect } from 'react'
import { PerimeterExamplesSection } from './FormulaAnimations'

/** එක් එක් රූපයට උදාහරණ — 2 විසඳුම් + 3 හිස්තැන් පුරවන්න */
const SHAPE_EXAMPLES = {
  rectangle: [
    { lengthVal: 10, widthVal: 5 },
    { lengthVal: 12, widthVal: 8 },
    { lengthVal: 8, widthVal: 6 },
    { lengthVal: 15, widthVal: 9 },
    { lengthVal: 7, widthVal: 4 },
  ],
  square: [
    { sideVal: 7 },
    { sideVal: 5 },
    { sideVal: 6 },
    { sideVal: 9 },
    { sideVal: 4 },
  ],
  triangle: [
    { a: 5, b: 12, c: 13 },
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 8, c: 10 },
    { a: 7, b: 24, c: 25 },
    { a: 4, b: 5, c: 6 },
  ],
  circle: [
    { radiusVal: 7 },
    { radiusVal: 3.5 },
    { radiusVal: 14 },
    { radiusVal: 10.5 },
    { radiusVal: 21 },
  ],
}

const SHAPES = {
  rectangle: {
    title: 'සෘජුකෝණාස්‍රය',
    parts: [
      { label: 'a', desc: 'පළමු දිග (a) මනිමු.', val: 'a' },
      { label: 'b', desc: 'පළල (b) එකතු කරමු.', val: '+ b' },
      { label: 'a', desc: 'දෙවන දිග (a) එකතු කරමු.', val: '+ a' },
      { label: 'b', desc: 'දෙවන පළල (b) එකතු කරමු.', val: '+ b' },
    ],
    finalSteps: [
      { delay: 4800, desc: 'දිගු (a) දෙකක් සහ පළලවල් (b) දෙකක් ඇති බැවින්...', formula: '= 2a + 2b' },
      { delay: 6500, desc: 'එය සරල කළ විට අවසන් සූත්‍රය ලැබේ.', formula: '= 2 × (a + b)' },
    ],
    svg: (
        <svg viewBox="0 0 300 200" className="w-full h-full max-h-[240px] md:max-h-[280px]">
        <path d="M50 50 L250 50 L250 150 L50 150 Z" fill="var(--shape-fill)" stroke="var(--shape-stroke)" strokeWidth="1" />
        <path id="side-0" d="M50 50 L250 50" className="shape-side" />
        <text id="label-0" x="150" y="40" textAnchor="middle" className="label-text">a</text>
        <path id="side-1" d="M250 50 L250 150" className="shape-side" />
        <text id="label-1" x="265" y="105" textAnchor="start" className="label-text">b</text>
        <path id="side-2" d="M250 150 L50 150" className="shape-side" />
        <text id="label-2" x="150" y="175" textAnchor="middle" className="label-text">a</text>
        <path id="side-3" d="M50 150 L50 50" className="shape-side" />
        <text id="label-3" x="35" y="105" textAnchor="end" className="label-text">b</text>
      </svg>
    ),
  },
  square: {
    title: 'සමචතුරස්‍රය',
    parts: [
      { label: 'a', desc: 'පළමු පැත්ත (a) මනිමු.', val: 'a' },
      { label: 'a', desc: 'දෙවන පැත්ත (a) මනිමු.', val: '+ a' },
      { label: 'a', desc: 'තෙවන පැත්ත (a) මනිමු.', val: '+ a' },
      { label: 'a', desc: 'හතරවන පැත්ත (a) මනිමු.', val: '+ a' },
    ],
    finalSteps: [
      { delay: 4800, desc: 'සමාන පැති 4 බැවින් සූත්‍රය සරල වේ.', formula: '= 4 × a' },
    ],
    svg: (
        <svg viewBox="0 0 300 200" className="w-full h-full max-h-[240px] md:max-h-[280px]">
        <path d="M75 25 L225 25 L225 175 L75 175 Z" fill="var(--shape-fill)" stroke="var(--shape-stroke)" strokeWidth="1" />
        <path id="side-0" d="M75 25 L225 25" className="shape-side" />
        <text id="label-0" x="150" y="20" textAnchor="middle" className="label-text">a</text>
        <path id="side-1" d="M225 25 L225 175" className="shape-side" />
        <text id="label-1" x="235" y="105" textAnchor="start" className="label-text">a</text>
        <path id="side-2" d="M225 175 L75 175" className="shape-side" />
        <text id="label-2" x="150" y="195" textAnchor="middle" className="label-text">a</text>
        <path id="side-3" d="M75 175 L75 25" className="shape-side" />
        <text id="label-3" x="65" y="105" textAnchor="end" className="label-text">a</text>
      </svg>
    ),
  },
  triangle: {
    title: 'ත්‍රිකෝණය',
    parts: [
      { label: 'a', desc: 'පැත්ත (a) එකතු කරමු.', val: 'a' },
      { label: 'b', desc: 'පැත්ත (b) එකතු කරමු.', val: '+ b' },
      { label: 'c', desc: 'පැත්ත (c) එකතු කරමු.', val: '+ c' },
    ],
    finalSteps: [
      { delay: 4800, desc: 'ත්‍රිකෝණයේ පරිමිතිය = පාද තුනේ එකතුව.', formula: 'P = a + b + c' },
    ],
    svg: (
        <svg viewBox="0 0 300 200" className="w-full h-full max-h-[240px] md:max-h-[280px]">
        <path d="M150 30 L250 170 L50 170 Z" fill="var(--shape-fill)" stroke="var(--shape-stroke)" strokeWidth="1" />
        <path id="side-0" d="M150 30 L250 170" className="shape-side" />
        <text id="label-0" x="215" y="100" textAnchor="start" className="label-text">a</text>
        <path id="side-1" d="M250 170 L50 170" className="shape-side" />
        <text id="label-1" x="150" y="190" textAnchor="middle" className="label-text">b</text>
        <path id="side-2" d="M50 170 L150 30" className="shape-side" />
        <text id="label-2" x="85" y="100" textAnchor="end" className="label-text">c</text>
      </svg>
    ),
  },
  circle: {
    title: 'වෘත්තය',
    isCircle: true,
    parts: [
      { label: 'r', desc: 'අරය r — පරිධිය = 2 × π × අරය', val: '2 × π × r' },
    ],
    finalSteps: [
      { delay: 2200, desc: 'සරල කළ විට පරිධිය = 2πr', formula: '= 2πr' },
    ],
    svg: (
        <svg viewBox="0 0 300 200" className="w-full h-full max-h-[240px] md:max-h-[280px]">
        <circle cx="150" cy="100" r="70" fill="var(--shape-fill)" stroke="var(--shape-stroke)" strokeWidth="1" />
        <circle id="side-0" cx="150" cy="100" r="70" fill="none" pathLength="100" className="shape-side circle-side" />
        <line x1="150" y1="100" x2="220" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" id="radius-line" />
        <text id="label-0" x="185" y="92" textAnchor="middle" className="label-text">r (අරය)</text>
      </svg>
    ),
  },
}

export default function PerimeterLessonLive() {
  const [selectedShape, setSelectedShape] = useState(null)
  const [currentShape, setCurrentShape] = useState('rectangle')
  const [sumParts, setSumParts] = useState([])
  const [visiblePartIndices, setVisiblePartIndices] = useState([])
  const [stepDesc, setStepDesc] = useState('ආරම්භ කිරීමට බොත්තම ඔබන්න...')
  const [formulaStep2, setFormulaStep2] = useState('')
  const [formulaStep3, setFormulaStep3] = useState('')
  const [showStep2, setShowStep2] = useState(false)
  const [showStep3, setShowStep3] = useState(false)
  const [showExampleOverlay, setShowExampleOverlay] = useState(false)
  const svgContainerRef = useRef(null)
  const timeoutsRef = useRef([])

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const startAnimation = () => {
    clearTimeouts()
    const shape = SHAPES[currentShape]

    setSumParts([])
    setVisiblePartIndices([])
    setFormulaStep2('')
    setFormulaStep3('')
    setShowStep2(false)
    setShowStep3(false)

    const container = svgContainerRef.current
    if (container) {
      container.querySelectorAll('.shape-side').forEach((s) => s.classList.remove('active-side-draw'))
      container.querySelectorAll('.label-text').forEach((l) => l.classList.remove('label-visible'))
      const radiusLine = container?.querySelector('#radius-line')
      if (radiusLine) radiusLine.style.stroke = '#94a3b8'
    }

    if (shape.isCircle) {
      const radiusLine = container?.querySelector('#radius-line')
      if (radiusLine) radiusLine.style.stroke = '#2563eb'
    }

    shape.parts.forEach((part, i) => {
      const t = setTimeout(() => {
        const side = container?.querySelector(`#side-${i}`)
        if (side) side.classList.add('active-side-draw')
        const label = container?.querySelector(`#label-${i}`)
        if (label) label.classList.add('label-visible')

        setStepDesc(part.desc)
        setSumParts((prev) => [...prev, { val: part.val, key: `${i}-${Date.now()}` }])
        setTimeout(() => setVisiblePartIndices((prev) => [...prev, i]), 50)
      }, i * 1100)
      timeoutsRef.current.push(t)
    })

    shape.finalSteps.forEach((fs, idx) => {
      const t = setTimeout(() => {
        setStepDesc(fs.desc)
        if (idx === 0) {
          setFormulaStep2(fs.formula)
          setShowStep2(true)
        } else {
          setFormulaStep3(fs.formula)
          setShowStep3(true)
        }
      }, fs.delay)
      timeoutsRef.current.push(t)
    })
  }

  const showShape = (id) => {
    setSelectedShape(id)
    setCurrentShape(id)
    clearTimeouts()
    setSumParts([])
    setVisiblePartIndices([])
    setFormulaStep2('')
    setFormulaStep3('')
    setShowStep2(false)
    setShowStep3(false)
    setStepDesc('ආරම්භ කිරීමට බොත්තම ඔබන්න...')
  }

  useEffect(() => {
    return () => clearTimeouts()
  }, [])

  useEffect(() => {
    if (selectedShape) {
      const t = setTimeout(startAnimation, 1000)
      return () => clearTimeout(t)
    }
  }, [selectedShape])

  return (
    <div className="h-full flex flex-col min-h-0 w-full overflow-hidden relative">
      {/* උදාහරණය — හිස්පිටුවක (full overlay) */}
      {showExampleOverlay && selectedShape && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-ink-900 flex flex-col overflow-auto">
          <div className="shrink-0 flex justify-between items-center px-4 py-3 border-b border-ink-200 dark:border-ink-700">
            <h3 className="font-bold text-ink-800 dark:text-ink-100">
              උදාහරණය — {SHAPES[currentShape].title}
            </h3>
            <button
              type="button"
              onClick={() => setShowExampleOverlay(false)}
              className="p-2 rounded-xl bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-300 transition"
              aria-label="වසන්න"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            <PerimeterExamplesSection
              shape={currentShape}
              examples={SHAPE_EXAMPLES[currentShape]}
              shapeLabel={SHAPES[currentShape].title}
            />
          </div>
        </div>
      )}

      {!selectedShape ? (
        <div className="flex-1 flex flex-col justify-center p-4 md:p-6 min-h-0 overflow-auto">
          <p className="text-center text-ink-600 dark:text-ink-300 font-medium mb-4 md:mb-6">තලරූපයක් තෝරන්න</p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-end">
            {['rectangle', 'square', 'triangle', 'circle'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => showShape(id)}
                className="flex flex-col items-center gap-2 p-4 md:p-5 rounded-xl hover:bg-sipyaya-50 dark:hover:bg-sipyaya-900/20 transition-colors group border-2 border-transparent hover:border-sipyaya-300 dark:hover:border-sipyaya-700"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  {id === 'rectangle' && <div className="w-14 h-11 md:w-16 md:h-12 bg-blue-500 rounded-sm group-hover:ring-2 group-hover:ring-sipyaya-400 transition-all" />}
                  {id === 'square' && <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500 rounded-sm group-hover:ring-2 group-hover:ring-sipyaya-400 transition-all" />}
                  {id === 'triangle' && <svg viewBox="0 0 96 84" className="w-14 h-12 md:w-16 md:h-14"><polygon points="48,0 96,84 0,84" fill="#3b82f6" className="group-hover:opacity-90 transition-opacity" /></svg>}
                  {id === 'circle' && <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-500 group-hover:ring-2 group-hover:ring-sipyaya-400 transition-all" />}
                </div>
                <span className="text-ink-700 dark:text-ink-300 font-bold text-sm md:text-base">{SHAPES[id].title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="shrink-0 px-3 pt-2 pb-1">
            <button
              type="button"
              onClick={() => { setSelectedShape(null); clearTimeouts(); }}
              className="inline-flex items-center gap-2 p-2 md:p-0 md:py-0.5 text-sm text-sipyaya-600 hover:text-sipyaya-700 dark:text-sipyaya-300 dark:hover:text-sipyaya-200 font-medium"
              aria-label="රූප තෝරන්න"
            >
              <svg className="w-5 h-5 shrink-0 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline">රූප තෝරන්න</span>
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 min-h-0 overflow-hidden">
        <div className="flex flex-col bg-slate-50 dark:bg-ink-900/50 rounded-xl p-3 md:p-4 border border-slate-200 dark:border-ink-700 shadow-inner min-h-0">
          <div ref={svgContainerRef} className="flex-1 flex items-center justify-center min-h-[200px]">
            {SHAPES[currentShape].svg}
          </div>
          <div className="shrink-0 mt-3 md:mt-4 bg-white/95 dark:bg-ink-800/95 backdrop-blur p-2 md:p-3 rounded-lg border border-blue-100 dark:border-ink-600 shadow-md flex items-center justify-center text-center">
            <p className="text-blue-900 dark:text-blue-100 font-bold text-sm md:text-base">{stepDesc}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 min-h-0 overflow-auto">
          <div className="bg-white dark:bg-ink-800 p-3 md:p-4 rounded-xl border-2 border-dashed border-blue-200 dark:border-ink-600 shadow-sm shrink-0">
            <h3 className="text-ink-500 dark:text-ink-300 font-bold uppercase tracking-widest text-xs mb-2 text-center">
              පරිමිතිය සඳහා සූත්‍රය ගොඩනැගීම
            </h3>
            <div className="space-y-1">
              <div className="flex justify-center items-center min-h-[32px] mb-1 text-base md:text-lg font-bold text-blue-800 dark:text-blue-200">
                <span className="text-ink-400 dark:text-ink-300 text-lg mr-2">
                  {SHAPES[currentShape].isCircle ? 'පරිධිය =' : 'පරිමිතිය ='}
                </span>
                <div className="flex items-center flex-wrap justify-center gap-1">
                  {sumParts.map((p, i) => (
                    <span
                      key={p.key}
                      className={`formula-part inline-block text-blue-600 dark:text-blue-300 mx-0.5 ${visiblePartIndices.includes(i) ? 'visible' : ''}`}
                    >
                      {p.val}
                    </span>
                  ))}
                </div>
              </div>
              {showStep2 && (
                <div className="formula-step flex justify-center items-center min-h-[28px] text-base md:text-lg font-bold text-indigo-700 dark:text-indigo-300 transition-opacity duration-500">
                  <span className="text-ink-400 dark:text-ink-300 text-sm mr-1">=</span>
                  {formulaStep2}
                </div>
              )}
              {showStep3 && (
                <div className="formula-step flex justify-center items-center min-h-[28px] text-lg md:text-xl font-black text-green-600 dark:text-green-400 transition-opacity duration-500">
                  <span className="text-ink-400 dark:text-ink-300 text-sm mr-1">=</span>
                  {formulaStep3}
                </div>
              )}
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 md:p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shrink-0">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1 text-sm">ගණිතමය පැහැදිලි කිරීම:</h4>
            <p className="text-indigo-800 dark:text-indigo-300 text-xs md:text-sm leading-relaxed">
              {currentShape === 'rectangle' && 'දිග a සහ පළල b ලෙස ගත් විට, සෘජුකෝණාස්‍රයක එකිනෙකට ප්‍රතිවිරුද්ධ පැති සමාන වේ. පරිමිතිය = පාද 4 එකතුව = a + b + a + b = 2 × (a + b).'}
              {currentShape === 'square' && 'සමචතුරස්‍රයක පැති 4 සමාන වේ. පරිමිතිය = a + a + a + a = 4 × a.'}
              {currentShape === 'triangle' && 'ත්‍රිකෝණයක පරිමිතිය = පාද තුනේ එකතුව = a + b + c.'}
              {currentShape === 'circle' && 'වෘත්තයක පරිධිය (පරිමිතිය) අරය r යොදා පරිධිය = 2 × π × r = 2πr ලෙස සොයා ගනී. π ≈ 22/7.'}
            </p>
          </div>

          <button
            type="button"
            onClick={startAnimation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl shadow-lg transition transform active:scale-95 text-base md:text-lg shrink-0"
          >
            සජීවීකරණය ආරම්භ කරන්න
          </button>

          <button
            type="button"
            onClick={() => setShowExampleOverlay(true)}
            className="w-full bg-sipyaya-100 dark:bg-sipyaya-900/50 hover:bg-sipyaya-200 dark:hover:bg-sipyaya-800/50 text-sipyaya-700 dark:text-sipyaya-300 font-bold py-3 rounded-xl border-2 border-dashed border-sipyaya-300 dark:border-sipyaya-600 transition text-base md:text-lg shrink-0"
          >
            උදාහරණය පෙන්වන්න
          </button>
        </div>
      </div>
        </>
      )}
    </div>
  )
}
