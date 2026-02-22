import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen font-sinhala bg-gradient-to-br from-sipyaya-50/80 via-white to-emerald-50/50 bg-math-pattern">
      <header className="sticky top-0 z-50 glass border-b border-ink-200/60 shadow-sm shadow-ink-900/5">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/favicon.png" alt="ZShool" className="w-10 h-10 group-hover:scale-105 transition-transform object-contain" />
              <div>
                <span className="text-xl font-bold text-gradient block">ZShool</span>
                <span className="text-xs text-ink-500 hidden sm:block">ගණිත ඉගෙනුම්</span>
              </div>
            </Link>
            <div className="flex gap-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/' 
                    ? 'bg-sipyaya-100 text-sipyaya-700' 
                    : 'text-ink-600 hover:bg-ink-100 hover:text-sipyaya-600'
                }`}
              >
                මුල් පිටුව
              </Link>
              <Link
                to="/chapters"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname.startsWith('/chapters') || location.pathname.startsWith('/chapter/') 
                    ? 'bg-sipyaya-100 text-sipyaya-700' 
                    : 'text-ink-600 hover:bg-ink-100 hover:text-sipyaya-600'
                }`}
              >
                පාඩම්
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-ink-200/60 glass">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-ink-500">
          <span>© 2025 ZShool — ගණිතය පහසුවෙන් ඉගෙන ගන්න</span>
          <span className="text-sipyaya-500">∑ × ÷ + −</span>
        </div>
      </footer>
    </div>
  )
}
