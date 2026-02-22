import { Link } from 'react-router-dom'
import { mathTopics } from '../data/mathContent'

const topicStyles = {
  sipyaya: {
    card: 'from-sipyaya-50 to-emerald-50/80 border-sipyaya-200/80',
    icon: 'bg-sipyaya-500/10 text-sipyaya-700',
    link: 'hover:bg-sipyaya-100/80 hover:border-sipyaya-300/50',
  },
  blue: {
    card: 'from-blue-50 to-sky-50/80 border-blue-200/80',
    icon: 'bg-blue-500/10 text-blue-700',
    link: 'hover:bg-blue-100/80 hover:border-blue-300/50',
  },
  amber: {
    card: 'from-amber-50 to-orange-50/80 border-amber-200/80',
    icon: 'bg-amber-500/10 text-amber-700',
    link: 'hover:bg-amber-100/80 hover:border-amber-300/50',
  },
  violet: {
    card: 'from-violet-50 to-purple-50/80 border-violet-200/80',
    icon: 'bg-violet-500/10 text-violet-700',
    link: 'hover:bg-violet-100/80 hover:border-violet-300/50',
  },
}

export default function Topics() {
  return (
    <div className="space-y-10">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-display font-bold text-gradient mb-2">ගණිත පාඩම්</h1>
        <p className="text-ink-600 text-lg">තෝරා ගන්නා විෂය කොටසෙන් පාඩම් ආරම්භ කරන්න</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mathTopics.map((topic, i) => {
          const style = topicStyles[topic.color] || topicStyles.sipyaya
          return (
            <div
              key={topic.id}
              className={`rounded-3xl border-2 bg-gradient-to-br p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up ${style.card}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${style.icon}`}>
                {topic.icon}
              </div>
              <h2 className="text-xl font-bold text-ink-900 mb-2">{topic.title}</h2>
              <p className="text-sm text-ink-600 mb-5 leading-relaxed">{topic.description}</p>
              <div className="space-y-2">
                {topic.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${topic.id}/${lesson.id}`}
                    className={`block py-2.5 px-4 rounded-xl border border-transparent bg-white/70 font-medium text-sm transition-all ${style.link}`}
                  >
                    {lesson.title}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
