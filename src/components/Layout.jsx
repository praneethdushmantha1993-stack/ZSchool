import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { getUserTotalScore } from '../services/scoreService'
import BadgeHeaderButton from './BadgeHeaderButton'

function useProfile(user) {
  return useMemo(() => {
    if (!user) return { displayName: null, photoURL: null }
    const googleProvider = user.providerData?.find((p) => p?.providerId === 'google.com')
    return {
      displayName: user.displayName || googleProvider?.displayName || null,
      photoURL: user.photoURL || googleProvider?.photoURL || null,
    }
  }, [user])
}

export default function Layout() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { displayName, photoURL } = useProfile(user)
  const [totalScore, setTotalScore] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const refreshScore = useCallback(() => {
    if (user) {
      getUserTotalScore(user.uid)
        .then(setTotalScore)
        .catch((err) => {
          console.error('ලකුණු ලබා ගැනීමට අපොහොසත් විය:', err)
          setTotalScore(0)
        })
    }
  }, [user])

  useEffect(() => {
    if (user) {
      getUserTotalScore(user.uid)
        .then(setTotalScore)
        .catch((err) => {
          console.error('ලකුණු ලබා ගැනීමට අපොහොසත් විය:', err)
          setTotalScore(0)
        })
    } else {
      setTotalScore(null)
    }
  }, [user, location.pathname])

  useEffect(() => {
    const onScoreUpdated = () => refreshScore()
    window.addEventListener('score-updated', onScoreUpdated)
    return () => window.removeEventListener('score-updated', onScoreUpdated)
  }, [refreshScore])

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen font-sinhala bg-gradient-to-br from-sipyaya-50/80 via-white to-emerald-50/50 dark:from-ink-900 dark:via-ink-800 dark:to-ink-900 bg-math-pattern dark:bg-math-pattern-dark transition-colors duration-300">
      <header className="sticky top-0 z-50 glass border-b border-ink-200/60 dark:border-ink-700/60 shadow-sm shadow-ink-900/5 dark:shadow-black/20">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/favicon.png" alt="ZShool" className="w-10 h-10 group-hover:scale-105 transition-transform object-contain" />
              <div>
                <span className="text-xl font-bold text-gradient block">ZShool</span>
                <span className="text-xs text-ink-500 dark:text-ink-400 hidden sm:block">ගණිත ඉගෙනුම්</span>
              </div>
            </Link>
            <div className="flex items-center gap-3 ml-auto">
              <BadgeHeaderButton />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-ink-500 hover:text-ink-700 hover:bg-ink-100 dark:text-ink-400 dark:hover:text-ink-200 dark:hover:bg-ink-800 transition-colors"
                aria-label={theme === 'dark' ? 'දිවා ප්‍රකාරයට මාරු වන්න' : 'රාත්‍රි ප්‍රකාරයට මාරු වන්න'}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((o) => !o)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                  >
                    {photoURL ? (
                      <img
                        src={photoURL}
                        alt={displayName || user.email}
                        className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-white dark:ring-ink-800"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="w-9 h-9 rounded-full bg-gradient-to-br from-sipyaya-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {displayName?.[0] || user.email?.[0]?.toUpperCase() || '?'}
                      </span>
                    )}
                    <span className="hidden sm:block text-ink-600 dark:text-ink-300 text-sm font-medium max-w-[120px] truncate">
                      {displayName || user.email}
                    </span>
                    <svg
                      className={`w-4 h-4 text-ink-400 dark:text-ink-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 py-2 rounded-xl glass border border-ink-200/60 dark:border-ink-700/60 shadow-xl shadow-ink-900/10 dark:shadow-black/30 animate-scale-in origin-top-right">
                      <div className="px-4 py-3 border-b border-ink-100 dark:border-ink-700">
                        {photoURL && (
                          <img
                            src={photoURL}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover mx-auto mb-2 ring-2 ring-ink-100 dark:ring-ink-700"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <p className="text-sm font-medium text-ink-900 dark:text-ink-100 truncate">{displayName || user.email}</p>
                        {displayName && <p className="text-xs text-ink-500 dark:text-ink-400 truncate">{user.email}</p>}
                        <p className="text-sm text-sipyaya-600 dark:text-sipyaya-400 mt-0.5 flex items-center gap-1">
                          <span>🏆</span> {totalScore ?? '...'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          setProfileOpen(false)
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-ink-600 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-800 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
                      >
                        ඉවත් වන්න
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === '/login'
                      ? 'bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300'
                      : 'text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-sipyaya-600 dark:hover:text-sipyaya-400'
                  }`}
                >
                  පිවිසෙන්න
                </Link>
              )}
              <div className="flex gap-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/' 
                    ? 'bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300' 
                    : 'text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-sipyaya-600 dark:hover:text-sipyaya-400'
                }`}
              >
                මුල් පිටුව
              </Link>
              <Link
                to="/chapters"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname.startsWith('/chapters') || location.pathname.startsWith('/chapter/') 
                    ? 'bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300' 
                    : 'text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-sipyaya-600 dark:hover:text-sipyaya-400'
                }`}
              >
                පාඩම්
              </Link>
              </div>
              {user && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300 text-sm font-medium">
                  <span>🏆</span> {totalScore ?? '...'}
                </span>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-ink-200/60 dark:border-ink-700/60 glass">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
          <span>© 2025 ZShool — ගණිතය පහසුවෙන් ඉගෙන ගන්න</span>
          <span className="text-sipyaya-500 dark:text-sipyaya-400">∑ × ÷ + −</span>
        </div>
      </footer>
    </div>
  )
}
