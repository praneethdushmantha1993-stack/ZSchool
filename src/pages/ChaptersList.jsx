import { Link } from 'react-router-dom'
import { textbookChapters } from '../data/mathContent'

export default function ChaptersList() {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-center text-ink-900 mb-10">
        පෙළපොතේ පරිච්ඡේදය
      </h1>

      <div className="glass rounded-3xl border border-ink-200/60 shadow-xl shadow-ink-900/5 overflow-hidden">
        {textbookChapters.map((section, sectionIndex) => (
          <div key={section.term}>
            {sectionIndex > 0 && (
              <div className="border-t-2 border-sipyaya-200/60" />
            )}
            <div className="px-6 py-4 bg-gradient-to-r from-sipyaya-50/80 to-transparent border-b border-sky-200/40">
              <h2 className="text-xl font-bold text-sipyaya-800">{section.label}</h2>
            </div>
            <ul className="divide-y divide-sky-100">
              {section.lessons.map((lesson) => (
                <li key={lesson.num}>
                  <Link
                    to={`/chapter/${lesson.num}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-sipyaya-50/30 transition-colors group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-sipyaya-100 text-sipyaya-700 font-bold text-sm shrink-0 group-hover:bg-sipyaya-200/80 transition-colors">
                      {lesson.num}
                    </span>
                    <span className="text-ink-800 font-medium group-hover:text-sipyaya-700 transition-colors">
                      {lesson.title}
                    </span>
                    <svg className="w-4 h-4 text-ink-400 ml-auto group-hover:text-sipyaya-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
