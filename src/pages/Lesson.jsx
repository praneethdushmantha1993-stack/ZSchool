import { useParams, Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { getTopic, getLesson } from '../data/mathContent'
import MathBlock from '../components/MathBlock'

export default function Lesson() {
  const { topicId, lessonId } = useParams()
  const topic = getTopic(topicId)
  const lesson = getLesson(topicId, lessonId)
  const fullScreenRef = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    const handler = () => setIsFullScreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Auto full screen when lesson loads
  useEffect(() => {
    if (!topic || !lesson) return
    const timer = setTimeout(() => fullScreenRef.current?.requestFullscreen?.(), 150)
    return () => clearTimeout(timer)
  }, [topicId, lessonId])

  if (!topic || !lesson) {
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

  return (
    <div
      ref={fullScreenRef}
      className={`relative w-full max-w-3xl mx-auto animate-fade-in-up min-h-[calc(100vh-12rem)] bg-gradient-to-br from-sipyaya-50/80 via-white to-emerald-50/50 dark:from-ink-900 dark:via-ink-800 dark:to-ink-900 ${isFullScreen ? 'overflow-auto' : ''}`}
    >
      {/* Back button - fixed when in full screen */}
      <Link
        to="/chapters"
        className={`inline-flex items-center gap-2 p-2.5 md:px-4 md:py-2.5 rounded-xl font-medium transition-colors z-50 ${
          isFullScreen
            ? 'fixed top-4 left-4 bg-ink-900/90 dark:bg-ink-100/90 text-white dark:text-ink-900 hover:bg-ink-900 dark:hover:bg-ink-100 shadow-lg'
            : 'text-sipyaya-600 hover:bg-sipyaya-50'
        }`}
        aria-label="පාඩම් වෙත ආපසු"
      >
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="hidden md:inline">පාඩම් වෙත ආපසු</span>
      </Link>

      <div className={`px-6 py-8 ${isFullScreen ? 'pt-16' : ''}`}>
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500 flex-wrap">
        <Link to="/chapters" className="hover:text-sipyaya-600 transition-colors">පාඩම්</Link>
        <span className="text-ink-300">/</span>
        <span className="text-ink-700">{topic.title}</span>
        <span className="text-ink-300">/</span>
        <span className="font-medium text-ink-900">{lesson.title}</span>
      </nav>

      <article className="glass rounded-3xl border border-ink-200/60 shadow-xl shadow-ink-900/5 overflow-hidden">
        <header className="bg-gradient-to-br from-sipyaya-50 to-emerald-50/80 border-b border-sipyaya-200/60 px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-ink-900">{lesson.title}</h1>
          <p className="text-sipyaya-700 mt-2 font-medium">{topic.title}</p>
        </header>

        <div className="p-8 space-y-6">
          {lesson.content.map((block, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              {block.type === 'text' && (
                <p className="text-ink-700 leading-loose text-lg">{block.value}</p>
              )}
              {block.type === 'math' && <MathBlock value={block.value} />}
            </div>
          ))}
        </div>
      </article>

      {!isFullScreen && (
      <div className="mt-8">
        <Link
          to="/chapters"
          className="inline-flex items-center gap-2 p-2.5 md:px-4 md:py-2.5 rounded-xl text-sipyaya-600 hover:bg-sipyaya-50 font-medium transition-colors"
          aria-label="පාඩම් වෙත ආපසු"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden md:inline">පාඩම් වෙත ආපසු</span>
        </Link>
      </div>
      )}
      </div>
    </div>
  )
}
