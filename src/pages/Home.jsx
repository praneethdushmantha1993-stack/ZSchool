import { Link } from 'react-router-dom'

const features = [
  {
    title: 'පියවරෙන් පියවර',
    desc: 'සරල සිට දුෂ්කර දක්වා පියවරෙන් පියවර ඉගෙන ගන්න',
    icon: '📐',
    delay: '0ms',
  },
  {
    title: 'සිංහල භාෂාවෙන්',
    desc: 'සිංහල භාෂාවෙන් පැහැදිලි සහ රසවත් පාඩම්',
    icon: '📚',
    delay: '100ms',
  },
  {
    title: 'නොමිලේ',
    desc: 'සියලුම පාඩම් නොමිලේ භාවිතා කරන්න',
    icon: '✨',
    delay: '200ms',
  },
]

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="grid md:grid-cols-2 gap-8">
        <div className="p-8 md:p-10 glass rounded-3xl border border-ink-200/60 dark:border-ink-700/60 shadow-lg shadow-ink-900/5 dark:shadow-black/20 bg-gradient-to-br from-sipyaya-50/50 to-transparent dark:from-sipyaya-900/20 dark:to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">👁️</span>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">දැක්ම</h2>
          </div>
          <p className="text-ink-700 dark:text-ink-300 leading-relaxed text-lg">
            සෑම දරුවෙකුටම ගණිතය රසවත් සහ පහසුවෙන් ඉගෙන ගැනීමට හැකියාව ලැබෙන ලොවක් ගොඩනැගීම. ගණිතය බියකරු නොව රසවත් විෂයක් ලෙස දැකීමට සැමට හැකි වීම.
          </p>
        </div>
        <div className="p-8 md:p-10 glass rounded-3xl border border-ink-200/60 dark:border-ink-700/60 shadow-lg shadow-ink-900/5 dark:shadow-black/20 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/20 dark:to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎯</span>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">මෙහෙවර</h2>
          </div>
          <p className="text-ink-700 dark:text-ink-300 leading-relaxed text-lg">
            සිංහල භාෂාවෙන් පැහැදිලි සහ පියවරෙන් පියවර ගණිත පාඩම් සපයා, සියලු දෙනාට නොමිලේ ගණිත ඉගෙනුම පහසු කිරීම. සරල සිට දුෂ්කර දක්වා සියලු මට්ටම්වලට අදාළ පාඩම් ලබා දීම.
          </p>
        </div>
      </section>

      <section className="relative text-center py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src="/favicon.png" alt="" className="w-48 md:w-64 h-48 md:h-64 opacity-20 dark:opacity-10 select-none -z-10 animate-float object-contain" />
        </div>
        <div className="relative animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-4 drop-shadow-sm">
            ZShool
          </h1>
          <p className="text-xl md:text-2xl text-ink-600 dark:text-ink-400 mb-3 font-medium">
            ගණිතය පහසුවෙන් ඉගෙන ගන්න
          </p>
          <p className="text-ink-500 dark:text-ink-400 max-w-xl mx-auto mb-12 text-lg">
            පියවරෙන් පියවර ගණිතය ඉගෙන ගැනීමට සරල සහ රසවත් පාඩම්
          </p>
          <Link
            to="/chapters"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-sipyaya-600 to-sipyaya-500 hover:from-sipyaya-700 hover:to-sipyaya-600 text-white font-semibold rounded-2xl shadow-xl shadow-sipyaya-500/30 transition-all hover:shadow-2xl hover:shadow-sipyaya-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            පාඩම් ආරම්භ කරන්න
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {features.map((item, i) => (
          <div
            key={item.title}
            className="group p-8 glass rounded-3xl border border-ink-200/60 dark:border-ink-700/60 shadow-lg shadow-ink-900/5 dark:shadow-black/20 hover:shadow-xl dark:hover:shadow-sipyaya-500/10 hover:border-sipyaya-200/80 dark:hover:border-sipyaya-700/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sipyaya-100 to-sipyaya-50 dark:from-sipyaya-900/50 dark:to-sipyaya-800/50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-2 text-lg">{item.title}</h3>
            <p className="text-ink-600 dark:text-ink-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
