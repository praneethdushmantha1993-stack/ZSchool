import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useParams, Link } from 'react-router-dom'
import { getChapterByNum } from '../data/mathContent'
import MathBlock from '../components/MathBlock'
import FormulaAnimation, {
  PerimeterExamplesSection,
  CompositePerimeterSection,
} from '../components/FormulaAnimations'
import PerimeterLessonLive from '../components/PerimeterLessonLive'

function scrollToSubtopic(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ChapterLesson() {
  const { chapterNum } = useParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const fullScreenRef = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const result = getChapterByNum(chapterNum)

  useEffect(() => {
    const handler = () => setIsFullScreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Auto full screen when lesson loads
  useEffect(() => {
    if (!result) return
    const timer = setTimeout(() => fullScreenRef.current?.requestFullscreen?.(), 150)
    return () => clearTimeout(timer)
  }, [chapterNum])

  if (!result) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="inline-flex w-16 h-16 rounded-full bg-ink-100 items-center justify-center text-3xl mb-4">?</div>
        <p className="text-ink-600 mb-4">මෙම පාඩම හමු නොවුණි.</p>
        <Link to="/chapters" className="inline-flex items-center gap-2 text-sipyaya-600 hover:text-sipyaya-700 font-medium">
          ← පාඩම් වෙත ආපසු යන්න
        </Link>
      </div>
    )
  }

  const { lesson, section } = result
  const hasContent = lesson.subtopics && lesson.subtopics.length > 0
  const subtopics = lesson.subtopics || []
  const isSlideMode = lesson.slideMode === true
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Extract exercises from subtopic content for sidebar nav
  const exercises = []
  subtopics.forEach((st) => {
    st.content?.forEach((block) => {
      if (block.type === 'exercise' && block.exerciseId) {
        exercises.push({ title: block.title, exerciseId: block.exerciseId })
      }
    })
  })

  const isExerciseOnlySubtopic = (st) => {
    const blocks = st.content || []
    return blocks.length === 1 && blocks[0].type === 'exercise' && blocks[0].exerciseId
  }

  const SubtopicNav = ({ onNavigate, className = '' }) => (
    <nav className={className}>
      <h3 className="text-sm font-bold text-ink-500 uppercase tracking-wider mb-3">අනුමාතෘකා</h3>
      <ul className="space-y-1">
        {subtopics.map((subtopic, idx) => {
          const exerciseBlock = subtopic.content?.find((b) => b.type === 'exercise' && b.exerciseId)
          if (isExerciseOnlySubtopic(subtopic) && exerciseBlock) {
            return (
              <li key={idx}>
                <Link
                  to={`/chapter/${chapterNum}/exercise/${exerciseBlock.exerciseId}`}
                  onClick={() => onNavigate?.()}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm text-sipyaya-600 hover:bg-sipyaya-50 hover:text-sipyaya-700 transition-colors font-medium"
                >
                  {subtopic.title}
                </Link>
              </li>
            )
          }
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => {
                  scrollToSubtopic(`subtopic-${idx}`)
                  onNavigate?.()
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm text-ink-600 hover:bg-sipyaya-50 hover:text-sipyaya-700 transition-colors"
              >
                {subtopic.title}
              </button>
            </li>
          )
        })}
        {exercises.filter((ex) => !subtopics.some((st) => isExerciseOnlySubtopic(st) && st.content?.[0]?.exerciseId === ex.exerciseId)).map((ex, idx) => (
          <li key={`ex-${idx}`}>
            <Link
              to={`/chapter/${chapterNum}/exercise/${ex.exerciseId}`}
              onClick={() => onNavigate?.()}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm text-sipyaya-600 hover:bg-sipyaya-50 hover:text-sipyaya-700 transition-colors font-medium"
            >
              {ex.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  // Slide mode layout (පරිමිතිය lesson)
  if (isSlideMode && subtopics.length > 0) {
    const activeSubtopic = subtopics[activeSlideIndex]
    return (
      <div
        ref={fullScreenRef}
        className={`relative flex flex-col items-center w-full bg-gradient-to-br from-sipyaya-50/80 via-white to-emerald-50/50 dark:from-ink-900 dark:via-ink-800 dark:to-ink-900 ${
          isFullScreen ? 'h-screen overflow-hidden' : 'min-h-[calc(100vh-12rem)]'
        }`}
      >
        <Link
          to="/chapters"
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors z-50 self-start ${
            isFullScreen
              ? 'fixed top-4 left-4 bg-ink-900/90 dark:bg-ink-100/90 text-white dark:text-ink-900 hover:bg-ink-900 dark:hover:bg-ink-100 shadow-lg'
              : 'text-sipyaya-600 hover:bg-sipyaya-50 mt-4 ml-4'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          පාඩම් වෙත ආපසු
        </Link>

        {/* Top center: Subtopic dropdown */}
        <div className={`flex-1 flex flex-col items-center w-full min-h-0 ${isFullScreen ? 'pt-14 pb-2' : 'pt-8'}`}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-ink-800 border-2 border-ink-200 dark:border-ink-600 rounded-lg shadow-sm hover:border-sipyaya-400 transition-colors min-w-[280px] justify-between"
            >
              <span className="font-medium text-ink-900 dark:text-ink-100">{activeSubtopic?.title}</span>
              <svg
                className={`w-5 h-5 text-ink-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white dark:bg-ink-800 border-2 border-ink-200 dark:border-ink-600 rounded-lg shadow-xl overflow-hidden min-w-[280px]">
                  {subtopics.map((st, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveSlideIndex(idx)
                        setDropdownOpen(false)
                      }}
                      className={`block w-full text-left px-6 py-3 hover:bg-sipyaya-50 dark:hover:bg-sipyaya-900/30 transition-colors ${
                        idx === activeSlideIndex ? 'bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300 font-medium' : 'text-ink-700 dark:text-ink-300'
                      }`}
                    >
                      {st.title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Slide content - white box with border */}
          <div className="flex-1 w-full max-w-5xl mx-4 mt-4 bg-white dark:bg-ink-800 border-2 border-ink-200 dark:border-ink-600 rounded-xl shadow-lg overflow-hidden min-h-0 flex flex-col">
            {activeSubtopic?.content?.length > 0 ? (
              <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
                {activeSubtopic.content.map((block, i) => (
                  <div key={i}>
                    {block.type === 'slideShapes' && block.shapes && (
                      <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
                        <PerimeterLessonLive />
                      </div>
                    )}
                    {block.type === 'text' && <p className="text-ink-700 dark:text-ink-300 leading-loose text-lg text-center">{block.value}</p>}
                    {block.type === 'math' && <div className="flex justify-center"><MathBlock value={block.value} /></div>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-ink-500 dark:text-ink-400 text-lg">මෙම අනුමාතෘකාවේ අන්තර්ගතය ඉක්මනින් එකතු කරනු ලැබේ.</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={fullScreenRef}
      className={`relative flex gap-8 animate-fade-in-up w-full min-h-[calc(100vh-12rem)] bg-gradient-to-br from-sipyaya-50/80 via-white to-emerald-50/50 dark:from-ink-900 dark:via-ink-800 dark:to-ink-900 ${isFullScreen ? 'overflow-auto' : ''}`}
    >
      {/* Back button - fixed when in full screen */}
      <Link
        to="/chapters"
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors z-50 ${
          isFullScreen
            ? 'fixed top-4 left-4 bg-ink-900/90 dark:bg-ink-100/90 text-white dark:text-ink-900 hover:bg-ink-900 dark:hover:bg-ink-100 shadow-lg'
            : 'text-sipyaya-600 hover:bg-sipyaya-50'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        පාඩම් වෙත ආපසු
      </Link>

      {/* Main content */}
      <div className={`min-w-0 flex-1 max-w-3xl ${isFullScreen ? 'pt-16' : 'pt-10'}`}>
        <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500 flex-wrap">
          <Link to="/chapters" className="hover:text-sipyaya-600 transition-colors">පාඩම්</Link>
          <span className="text-ink-300">/</span>
          <span className="text-ink-700">{section.label}</span>
          <span className="text-ink-300">/</span>
          <span className="font-medium text-ink-900">{lesson.title}</span>
        </nav>

        <article className="glass rounded-3xl border border-ink-200/60 shadow-xl shadow-ink-900/5 overflow-hidden">
          <header className="bg-gradient-to-br from-sipyaya-50 to-emerald-50/80 border-b border-sipyaya-200/60 px-8 py-8">
            <span className="inline-block px-3 py-1 rounded-lg bg-sipyaya-100 text-sipyaya-700 text-sm font-medium mb-2">
              {section.label}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-ink-900">{lesson.title}</h1>
          </header>

          <div className="p-8">
            {hasContent ? (
              <div className="space-y-12">
                {lesson.subtopics.map((subtopic, subIdx) => (
                  <section key={subIdx} id={`subtopic-${subIdx}`} className="space-y-6 scroll-mt-24">
                    <h2 className="text-xl font-bold text-ink-900 border-b border-sipyaya-200/60 pb-2">
                      {subtopic.title}
                    </h2>
                    <div className="space-y-6">
                      {subtopic.content.map((block, i) => (
                        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
{block.type === 'text' && (
                          <p className="text-ink-700 leading-loose text-lg">{block.value}</p>
                        )}
                        {block.type === 'math' && <MathBlock value={block.value} />}
                        {block.type === 'animation' && <FormulaAnimation id={block.id} exampleId={block.exampleId} />}
                        {block.type === 'examples' && (
                          <PerimeterExamplesSection shape={block.shape} shapeLabel={block.shapeLabel} examples={block.examples} />
                        )}
                        {block.type === 'compositeExamples' && (
                          <CompositePerimeterSection examples={block.examples} />
                        )}
                        {block.type === 'callout' && (
                          <div className={`rounded-2xl border-l-4 px-5 py-4 ${block.variant === 'important' ? 'bg-amber-50/80 border-amber-500 text-amber-900' : 'bg-sipyaya-50/80 border-sipyaya-500 text-sipyaya-900'}`}>
                            <p className="font-medium text-lg leading-relaxed">{block.value}</p>
                          </div>
                        )}
                        {block.type === 'exercise' && (
                          <div id={`exercise-${subIdx}-${i}`} className="rounded-2xl border-2 border-sipyaya-200 bg-sipyaya-50/50 px-6 py-5 mt-8 scroll-mt-24">
                            <h3 className="text-lg font-bold text-sipyaya-800 border-b border-sipyaya-200/80 pb-2 mb-4">
                              {block.title}
                            </h3>
                            {block.exerciseId ? (
                              <Link
                                to={`/chapter/${chapterNum}/exercise/${block.exerciseId}`}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sipyaya-600 hover:bg-sipyaya-700 text-white font-medium transition-colors"
                              >
                                අභ්‍යාසය ආරම්භ කරන්න
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </Link>
                            ) : (
                              <p className="text-ink-500 text-sm">අභ්‍යාස ප්‍රශ්න ඉක්මනින් එකතු කරනු ලැබේ.</p>
                            )}
                          </div>
                        )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-ink-500">
                <p className="text-lg">මෙම පාඩමේ අන්තර්ගතය ඉක්මනින් එකතු කරනු ලැබේ.</p>
              </div>
            )}
          </div>
        </article>

        {!isFullScreen && (
        <div className="mt-8">
          <Link
            to="/chapters"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sipyaya-600 hover:bg-sipyaya-50 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            පාඩම් වෙත ආපසු
          </Link>
        </div>
        )}
      </div>

      {/* Desktop: Right sidebar - subtopics */}
      {hasContent && (
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <div className="glass rounded-2xl border border-ink-200/60 p-4">
              <SubtopicNav />
            </div>
          </div>
        </aside>
      )}

      {/* Mobile: Menu button + slide-out panel (Portal - always fixed to viewport) */}
      {hasContent &&
        createPortal(
          <>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-sipyaya-600 text-white shadow-lg shadow-sipyaya-500/40 flex items-center justify-center hover:bg-sipyaya-700 transition-colors"
              aria-label="අනුමාතෘකා මෙනුව"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Overlay */}
            <div
              className={`lg:hidden fixed inset-0 z-40 bg-ink-900/50 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out panel */}
            <div
              className={`lg:hidden fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex justify-between items-center p-4 border-b border-ink-200">
                <h3 className="font-bold text-ink-900">අනුමාතෘකා</h3>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-700"
                  aria-label="වසන්න"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <SubtopicNav onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  )
}
