import { useParams, Link } from 'react-router-dom'
import { getTopic, getLesson } from '../data/mathContent'
import MathBlock from '../components/MathBlock'

export default function Lesson() {
  const { topicId, lessonId } = useParams()
  const topic = getTopic(topicId)
  const lesson = getLesson(topicId, lessonId)

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
    <div className="max-w-3xl mx-auto animate-fade-in-up">
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

      <div className="mt-8 flex justify-between items-center">
        <Link
          to="/chapters"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sipyaya-600 hover:bg-sipyaya-50 font-medium transition-colors"
        >
          ← පාඩම් වෙත ආපසු
        </Link>
        <Link
          to="/chapters"
          className="px-6 py-2.5 bg-gradient-to-r from-sipyaya-600 to-sipyaya-500 text-white rounded-xl font-medium shadow-lg shadow-sipyaya-500/25 hover:shadow-sipyaya-500/40 transition-all hover:-translate-y-0.5"
        >
          ඊළඟ පාඩම
        </Link>
      </div>
    </div>
  )
}
