import { useState, useRef, useEffect } from 'react'
import { CompositeExampleAnimation, CompositeFillInExample } from './FormulaAnimations'

/** සරල රේඛාවක් — d (path), len (cm), labelPos (x,y,anchor), strokeLabel = paint-order stroke */
function Segment({ id, d, len, labelPos, strokeLabel }) {
  return (
    <g>
      <path id={id} d={d} className="shape-side" />
      <text x={labelPos.x} y={labelPos.y} textAnchor={labelPos.anchor} className={strokeLabel ? 'text-sm segment-label-stroke' : 'fill-ink-900 dark:fill-white text-base font-bold segment-label'}>{len}cm</text>
    </g>
  )
}

/** T, L, U, E — සෑම සරල රේඛාවක්ම වෙන වෙනම, පාදවල දිග දැක්වීම */
const COMPOSITE_SHAPES = {
  t: {
    title: 'T ආකාරය',
    parts: [
      { desc: 'පළමු රේඛාව මනිමු.', val: '12', d: 'M40 50 L160 50', len: 12, labelPos: { x: 100, y: 42, anchor: 'middle' } },
      { desc: 'දෙවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M160 50 L160 90', len: 4, labelPos: { x: 172, y: 70, anchor: 'start' } },
      { desc: 'තෙවන රේඛාව එකතු කරමු.', val: '+ 3', d: 'M160 90 L130 90', len: 3, labelPos: { x: 148, y: 98, anchor: 'middle' } },
      { desc: 'හතරවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M130 90 L130 130', len: 4, labelPos: { x: 138, y: 110, anchor: 'start' } },
      { desc: 'පස්වන රේඛාව එකතු කරමු.', val: '+ 6', d: 'M130 130 L70 130', len: 6, labelPos: { x: 100, y: 142, anchor: 'middle' } },
      { desc: 'හයවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M70 130 L70 90', len: 4, labelPos: { x: 58, y: 110, anchor: 'end' } },
      { desc: 'හතවන රේඛාව එකතු කරමු.', val: '+ 3', d: 'M70 90 L40 90', len: 3, labelPos: { x: 52, y: 98, anchor: 'middle' } },
      { desc: 'අටවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M40 90 L40 50', len: 4, labelPos: { x: 28, y: 70, anchor: 'end' } },
    ],
    finalFormula: 'P = 12 + 4 + 3 + 4 + 6 + 4 + 3 + 4 = 40 cm',
    svg: (
      <svg viewBox="0 0 220 200" className="w-full h-full min-h-[220px] max-h-[300px] md:max-h-[320px]" preserveAspectRatio="xMidYMid meet">
        <path d="M40 50 L160 50 L160 90 L130 90 L130 130 L70 130 L70 90 L40 90 Z" fill="var(--shape-fill)" stroke="#0d9488" strokeWidth="3" strokeLinejoin="round" />
        {[
          { id: 'side-0', d: 'M40 50 L160 50', len: 12, labelPos: { x: 100, y: 42, anchor: 'middle' } },
          { id: 'side-1', d: 'M160 50 L160 90', len: 4, labelPos: { x: 172, y: 70, anchor: 'start' } },
          { id: 'side-2', d: 'M160 90 L130 90', len: 3, labelPos: { x: 148, y: 98, anchor: 'middle' } },
          { id: 'side-3', d: 'M130 90 L130 130', len: 4, labelPos: { x: 138, y: 110, anchor: 'start' } },
          { id: 'side-4', d: 'M130 130 L70 130', len: 6, labelPos: { x: 100, y: 142, anchor: 'middle' } },
          { id: 'side-5', d: 'M70 130 L70 90', len: 4, labelPos: { x: 58, y: 110, anchor: 'end' } },
          { id: 'side-6', d: 'M70 90 L40 90', len: 3, labelPos: { x: 52, y: 98, anchor: 'middle' } },
          { id: 'side-7', d: 'M40 90 L40 50', len: 4, labelPos: { x: 28, y: 70, anchor: 'end' } },
        ].map((s) => (
          <Segment key={s.id} id={s.id} d={s.d} len={s.len} labelPos={s.labelPos} />
        ))}
      </svg>
    ),
  },
  e: {
    title: 'E ආකාරය',
    parts: [
      { desc: 'පළමු රේඛාව මනිමු.', val: '12', d: 'M40 40 L160 40', len: 12, labelPos: { x: 100, y: 32, anchor: 'middle' } },
      { desc: 'දෙවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M160 40 L160 80', len: 4, labelPos: { x: 175, y: 60, anchor: 'start' } },
      { desc: 'තෙවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M160 80 L100 80', len: 4, labelPos: { x: 135, y: 72, anchor: 'middle' } },
      { desc: 'හතරවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M100 80 L100 120', len: 4, labelPos: { x: 115, y: 100, anchor: 'start' } },
      { desc: 'පස්වන රේඛාව එකතු කරමු.', val: '+ 8', d: 'M100 120 L140 120', len: 8, labelPos: { x: 120, y: 125, anchor: 'middle' } },
      { desc: 'හයවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M140 120 L140 160', len: 4, labelPos: { x: 155, y: 140, anchor: 'start' } },
      { desc: 'හතවන රේඛාව එකතු කරමු.', val: '+ 8', d: 'M140 160 L60 160', len: 8, labelPos: { x: 100, y: 175, anchor: 'middle' } },
      { desc: 'අටවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M60 160 L60 120', len: 4, labelPos: { x: 45, y: 140, anchor: 'end' } },
      { desc: 'නවවන රේඛාව එකතු කරමු.', val: '+ 8', d: 'M60 120 L100 120', len: 8, labelPos: { x: 80, y: 125, anchor: 'middle' } },
      { desc: 'දහවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M100 120 L100 80', len: 4, labelPos: { x: 85, y: 100, anchor: 'end' } },
      { desc: 'එකොලොස්වන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M100 80 L40 80', len: 4, labelPos: { x: 70, y: 72, anchor: 'middle' } },
      { desc: 'දොළොස්වන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M40 80 L40 40', len: 4, labelPos: { x: 25, y: 60, anchor: 'end' } },
    ],
    finalFormula: 'P = 12 + 4 + 4 + 4 + 8 + 4 + 8 + 4 + 8 + 4 + 4 + 4 = 68 cm',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full max-h-[240px] md:max-h-[280px]">
        <path d="M40 40 L160 40 L160 80 L100 80 L100 120 L140 120 L140 160 L60 160 L60 120 L100 120 L100 80 L40 80 Z" fill="var(--shape-fill)" stroke="#0d9488" strokeWidth="3" strokeLinejoin="round" />
        {[
          { id: 'side-0', d: 'M40 40 L160 40', len: 12, labelPos: { x: 100, y: 32, anchor: 'middle' } },
          { id: 'side-1', d: 'M160 40 L160 80', len: 4, labelPos: { x: 175, y: 60, anchor: 'start' } },
          { id: 'side-2', d: 'M160 80 L100 80', len: 4, labelPos: { x: 135, y: 72, anchor: 'middle' } },
          { id: 'side-3', d: 'M100 80 L100 120', len: 4, labelPos: { x: 115, y: 100, anchor: 'start' } },
          { id: 'side-4', d: 'M100 120 L140 120', len: 8, labelPos: { x: 120, y: 125, anchor: 'middle' } },
          { id: 'side-5', d: 'M140 120 L140 160', len: 4, labelPos: { x: 155, y: 140, anchor: 'start' } },
          { id: 'side-6', d: 'M140 160 L60 160', len: 8, labelPos: { x: 100, y: 175, anchor: 'middle' } },
          { id: 'side-7', d: 'M60 160 L60 120', len: 4, labelPos: { x: 45, y: 140, anchor: 'end' } },
          { id: 'side-8', d: 'M60 120 L100 120', len: 8, labelPos: { x: 80, y: 125, anchor: 'middle' } },
          { id: 'side-9', d: 'M100 120 L100 80', len: 4, labelPos: { x: 85, y: 100, anchor: 'end' } },
          { id: 'side-10', d: 'M100 80 L40 80', len: 4, labelPos: { x: 70, y: 72, anchor: 'middle' } },
          { id: 'side-11', d: 'M40 80 L40 40', len: 4, labelPos: { x: 25, y: 60, anchor: 'end' } },
        ].map((s) => (
          <Segment key={s.id} id={s.id} d={s.d} len={s.len} labelPos={s.labelPos} />
        ))}
      </svg>
    ),
  },
  stair: {
    title: 'පියගැට හැඩය',
    parts: [
      { desc: 'පළමු රේඛාව මනිමු.', val: '6', d: 'M60 40 L120 40', len: 6, labelPos: { x: 90, y: 58, anchor: 'middle' } },
      { desc: 'දෙවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M120 40 L120 80', len: 4, labelPos: { x: 138, y: 60, anchor: 'middle' }, rot: 90 },
      { desc: 'තෙවන රේඛාව එකතු කරමු.', val: '+ 6', d: 'M120 80 L180 80', len: 6, labelPos: { x: 150, y: 98, anchor: 'middle' } },
      { desc: 'හතරවන රේඛාව එකතු කරමු.', val: '+ 4', d: 'M180 80 L180 120', len: 4, labelPos: { x: 198, y: 100, anchor: 'middle' }, rot: 90 },
      { desc: 'පස්වන රේඛාව එකතු කරමු.', val: '+ 6', d: 'M180 120 L240 120', len: 6, labelPos: { x: 210, y: 138, anchor: 'middle' } },
      { desc: 'හයවන රේඛාව එකතු කරමු.', val: '+ 5', d: 'M240 120 L240 170', len: 5, labelPos: { x: 258, y: 145, anchor: 'middle' }, rot: 90 },
      { desc: 'හතවන රේඛාව එකතු කරමු.', val: '+ 18', d: 'M240 170 L60 170', len: 18, labelPos: { x: 150, y: 195, anchor: 'middle' } },
      { desc: 'අටවන රේඛාව එකතු කරමු.', val: '+ 13', d: 'M60 170 L60 40', len: 13, labelPos: { x: 35, y: 105, anchor: 'middle' }, rot: -90 },
    ],
    finalFormula: 'P = 6 + 4 + 6 + 4 + 6 + 5 + 18 + 13 = 62 cm',
    svg: (
      <svg viewBox="0 0 300 220" className="w-full h-full min-h-[220px] max-h-[300px]" preserveAspectRatio="xMidYMid meet">
        <path d="M 60 170 L 240 170 L 240 120 L 180 120 L 180 80 L 120 80 L 120 40 L 60 40 Z" fill="#fecaca" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
        {[
          { id: 'side-0', d: 'M60 40 L120 40', len: 6, labelPos: { x: 90, y: 58, anchor: 'middle' } },
          { id: 'side-1', d: 'M120 40 L120 80', len: 4, labelPos: { x: 138, y: 60, anchor: 'middle' }, rot: 90 },
          { id: 'side-2', d: 'M120 80 L180 80', len: 6, labelPos: { x: 150, y: 98, anchor: 'middle' } },
          { id: 'side-3', d: 'M180 80 L180 120', len: 4, labelPos: { x: 198, y: 100, anchor: 'middle' }, rot: 90 },
          { id: 'side-4', d: 'M180 120 L240 120', len: 6, labelPos: { x: 210, y: 138, anchor: 'middle' } },
          { id: 'side-5', d: 'M240 120 L240 170', len: 5, labelPos: { x: 258, y: 145, anchor: 'middle' }, rot: 90 },
          { id: 'side-6', d: 'M240 170 L60 170', len: 18, labelPos: { x: 150, y: 195, anchor: 'middle' } },
          { id: 'side-7', d: 'M60 170 L60 40', len: 13, labelPos: { x: 35, y: 105, anchor: 'middle' }, rot: -90 },
        ].map((s) => (
          <g key={s.id}>
            <path id={s.id} d={s.d} className="shape-side" />
            <text x={s.labelPos.x} y={s.labelPos.y} textAnchor={s.labelPos.anchor} transform={s.rot ? `rotate(${s.rot} ${s.labelPos.x} ${s.labelPos.y})` : undefined} className="text-sm segment-label-stroke">{s.len}cm</text>
          </g>
        ))}
      </svg>
    ),
  },
}

/** සැබෑ ගණක් ඇති උදාහරණ — T, පියගැට (විසඳුම් සමඟ) */
const COMPOSITE_EXAMPLES = [
  {
    shape: 't-shape',
    label: 'T ආකාරය — සියලු පාදවල දිග එකතු කර පරිමිතිය සොයමු',
    dims: { topW: 12, stemW: 6, sideH: 4 },
    edgeValues: ['12cm', '4cm', '3cm', '4cm', '6cm', '4cm', '3cm', '4cm'],
    perimeter: 40,
    explanation: 'පිටත පැති 8 එකින් එක මැන එකතු කළා.',
  },
  {
    shape: 'stair-shape',
    label: 'පියගැට හැඩය — සියලු පාදවල දිග එකතු කර පරිමිතිය සොයමු',
    dims: { stepW: 6, stepH: 4, lastStepH: 5, numSteps: 3 },
    edgeValues: ['6cm', '4cm', '6cm', '4cm', '6cm', '5cm', '18cm', '13cm'],
    perimeter: 62,
    explanation: 'පියගැට පෙළේ පැති 8 එකින් එක මැන එකතු කළා.',
  },
]

/** හිස්තැන් පුරවන්න — උදාහරණ 3 */
const COMPOSITE_FILL_IN = [
  { shape: 't-shape', dims: { topW: 10, stemW: 4, sideH: 3 }, edgeValues: ['10cm', '3cm', '3cm', '3cm', '4cm', '3cm', '3cm', '3cm'], perimeter: 32, label: 'T ආකාරය' },
  { shape: 'stair-shape', dims: { stepW: 6, stepH: 4, lastStepH: 5, numSteps: 3 }, edgeValues: ['6cm', '4cm', '6cm', '4cm', '6cm', '5cm', '18cm', '13cm'], perimeter: 62, label: 'පියගැට හැඩය' },
  { shape: 'stair-shape', dims: { stepW: 4, stepH: 3, lastStepH: 4, numSteps: 3 }, edgeValues: ['4cm', '3cm', '4cm', '3cm', '4cm', '4cm', '12cm', '10cm'], perimeter: 44, label: 'පියගැට හැඩය' },
]

const SINGLE_SHAPE = COMPOSITE_SHAPES.t

export default function CompositePerimeterLessonLive() {
  const [sumParts, setSumParts] = useState([])
  const [visiblePartIndices, setVisiblePartIndices] = useState([])
  const [stepDesc, setStepDesc] = useState('ආරම්භ කිරීමට බොත්තම ඔබන්න...')
  const [showFinal, setShowFinal] = useState(false)
  const svgContainerRef = useRef(null)
  const timeoutsRef = useRef([])

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const startAnimation = () => {
    clearTimeouts()
    const shape = SINGLE_SHAPE

    setSumParts([])
    setVisiblePartIndices([])
    setShowFinal(false)

    const container = svgContainerRef.current
    if (container) {
      container.querySelectorAll('.shape-side').forEach((s) => s.classList.remove('active-side-draw'))
    }

    shape.parts.forEach((part, i) => {
      const t = setTimeout(() => {
        const side = container?.querySelector(`#side-${i}`)
        if (side) side.classList.add('active-side-draw')

        setStepDesc(part.desc)
        setSumParts((prev) => [...prev, { val: part.val, key: `${i}-${Date.now()}` }])
        setTimeout(() => setVisiblePartIndices((prev) => [...prev, i]), 50)
      }, i * 900)
      timeoutsRef.current.push(t)
    })

    const t = setTimeout(() => {
      setStepDesc('සංයුත්ත රූපයේ පරිමිතිය = සියලු පාදවල දිග එකතුව')
      setShowFinal(true)
    }, shape.parts.length * 900 + 1200)
    timeoutsRef.current.push(t)
  }

  useEffect(() => () => clearTimeouts(), [])
  useEffect(() => {
    const t = setTimeout(startAnimation, 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="h-full flex flex-col min-h-0 w-full overflow-y-auto">
      {/* 1. එක් සංයුත්ත රූපයක් — T ආකාරය animation */}
      <div className="shrink-0 p-3 md:p-4">
        <h3 className="text-ink-700 dark:text-ink-200 font-bold text-center mb-3">T ආකාරය — සියලු පාදවල දිග එකතු කර පරිමිතිය සොයමු</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <div className="flex flex-col bg-slate-50 dark:bg-ink-900/50 rounded-xl p-3 md:p-4 border border-slate-200 dark:border-ink-700 shadow-inner">
            <div ref={svgContainerRef} className="flex items-center justify-center min-h-[240px] md:min-h-[260px]">
              {SINGLE_SHAPE.svg}
            </div>
            <div className="shrink-0 mt-3 bg-white/95 dark:bg-ink-800/95 backdrop-blur p-2 md:p-3 rounded-lg border border-blue-100 dark:border-ink-600 shadow-md flex items-center justify-center text-center">
              <p className="text-blue-900 dark:text-blue-100 font-bold text-sm md:text-base">{stepDesc}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white dark:bg-ink-800 p-3 md:p-4 rounded-xl border-2 border-dashed border-blue-200 dark:border-ink-600 shadow-sm">
              <h4 className="text-ink-500 dark:text-ink-300 font-bold uppercase tracking-widest text-xs mb-2 text-center">පරිමිතිය සඳහා සූත්‍රය</h4>
              <div className="flex justify-center items-center flex-wrap gap-1 text-base md:text-lg font-bold text-blue-800 dark:text-blue-200">
                <span className="text-ink-400 dark:text-ink-300">පරිමිතිය =</span>
                {sumParts.map((p, i) => (
                  <span key={p.key} className={`formula-part inline-block text-blue-600 dark:text-blue-300 mx-0.5 ${visiblePartIndices.includes(i) ? 'visible' : ''}`}>{p.val}</span>
                ))}
              </div>
              {showFinal && (
                <div className="formula-step flex justify-center mt-2 text-lg md:text-xl font-black text-green-600 dark:text-green-400">{SINGLE_SHAPE.finalFormula}</div>
              )}
            </div>
            <button type="button" onClick={startAnimation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl shadow-lg transition active:scale-95 text-base">
              සජීවීකරණය ආරම්භ කරන්න
            </button>
          </div>
        </div>
      </div>

      {/* 2. උදාහරණ — රූප කිහිපයක් විසඳුම් සමඟ */}
      <div className="shrink-0 px-3 md:px-4 pb-4">
        <h3 className="text-ink-700 dark:text-ink-200 font-bold text-center mb-4">උදාහරණ</h3>
        <div className="space-y-8">
          {COMPOSITE_EXAMPLES.map((ex, i) => (
            <CompositeExampleAnimation key={i} example={ex} exampleId={`${String(i + 1).padStart(2, '0')}`} />
          ))}
        </div>
      </div>

      {/* 3. හිස්තැන් පුරවන්න — උදාහරණ 3 */}
      <div className="shrink-0 px-3 md:px-4 pb-6">
        <h3 className="text-ink-700 dark:text-ink-200 font-bold text-center mb-4">හිස්තැන් පුරවා ඉගෙන ගන්න</h3>
        <div className="space-y-8">
          {COMPOSITE_FILL_IN.map((ex, i) => (
            <CompositeFillInExample key={i} exampleId={`${String(i + 1).padStart(2, '0')}`} {...ex} />
          ))}
        </div>
      </div>
    </div>
  )
}
