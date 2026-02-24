import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isLogin && password !== confirmPassword) {
      setError('මුරපද දෙක ගැලපෙන්නේ නැත')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('මුරපදය අවම වශයෙන් අක්ෂර 6ක් විය යුතුය')
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        if (!displayName.trim()) {
          setError('ඔබේ නම ඇතුළත් කරන්න')
          setLoading(false)
          return
        }
        await register(email, password, displayName)
      }
      navigate('/')
    } catch (err) {
      const msg = err.code === 'auth/popup-closed-by-user'
        ? ''
        : err.code === 'auth/email-already-in-use'
        ? 'මෙම ඊමේල් ලිපිනය දැනටමත් භාවිතයේ ය'
        : err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
          ? 'ඊමේල් හෝ මුරපදය වැරදියි'
          : err.code === 'auth/invalid-email'
            ? 'වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න'
            : err.message || 'දෝෂයක් ඇති විය'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto animate-fade-in-up">
      <div className="glass rounded-3xl border border-ink-200/60 dark:border-ink-700/60 shadow-xl shadow-ink-900/5 dark:shadow-black/20 overflow-hidden">
        <header className="bg-gradient-to-br from-sipyaya-50 to-emerald-50/80 dark:from-sipyaya-900/30 dark:to-emerald-900/20 border-b border-sipyaya-200/60 dark:border-ink-700/60 px-8 py-8 text-center">
          <span className="inline-block px-3 py-1 rounded-lg bg-sipyaya-100 dark:bg-sipyaya-900/50 text-sipyaya-700 dark:text-sipyaya-300 text-sm font-medium mb-2">
            {isLogin ? 'පිවිසීම' : 'ලියාපදිංචි වන්න'}
          </span>
          <h1 className="text-2xl font-bold text-ink-900 dark:text-ink-100">
            {isLogin ? 'ගිණුමට පිවිසෙන්න' : 'නව ගිණුමක් සාදන්න'}
          </h1>
          <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm">
            {isLogin ? 'ඔබේ ලකුණු සුරකිනු පිණිස පිවිසෙන්න' : 'ලකුණු ගබඩා කිරීමට ලියාපදිංචි වන්න'}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 text-amber-800 dark:text-amber-200 text-sm">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">
                ඔබේ නම <span className="text-amber-600 dark:text-amber-400">*</span>
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="උදාහරණ: කුමාර"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-600 dark:bg-ink-900/50 dark:text-ink-100 focus:border-sipyaya-500 focus:ring-2 focus:ring-sipyaya-200 dark:focus:border-sipyaya-400 outline-none transition-all"
              />
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">
                ලැයිස්තුවේ ඔබව මෙම නමින් පෙන්වයි
              </p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">
              ඊමේල් ලිපිනය
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-600 dark:bg-ink-900/50 dark:text-ink-100 focus:border-sipyaya-500 focus:ring-2 focus:ring-sipyaya-200 dark:focus:border-sipyaya-400 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">
              මුරපදය
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-600 dark:bg-ink-900/50 dark:text-ink-100 focus:border-sipyaya-500 focus:ring-2 focus:ring-sipyaya-200 dark:focus:border-sipyaya-400 outline-none transition-all"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">
                මුරපදය තව වරක්
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required={!isLogin}
                className="w-full px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-600 dark:bg-ink-900/50 dark:text-ink-100 focus:border-sipyaya-500 focus:ring-2 focus:ring-sipyaya-200 dark:focus:border-sipyaya-400 outline-none transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sipyaya-600 to-sipyaya-500 hover:from-sipyaya-700 hover:to-sipyaya-600 text-white font-semibold shadow-lg shadow-sipyaya-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'කරගෙන යමින්...' : isLogin ? 'පිවිසෙන්න' : 'ලියාපදිංචි වන්න'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ink-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-ink-900/80 text-ink-500 dark:text-ink-300">හෝ</span>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              setError('')
              setLoading(true)
              try {
                await loginWithGoogle()
                navigate('/')
              } catch (err) {
                if (err.code !== 'auth/popup-closed-by-user') {
                  setError(err.code === 'auth/account-exists-with-different-credential'
                    ? 'මෙම ඊමේල් ලිපිනය ඊමේල්/මුරපදයෙන් ද භාවිතා වේ. එයින් පිවිසෙන්න.'
                    : err.message || 'දෝෂයක් ඇති විය')
                }
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            className="w-full py-3 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-ink-300 dark:hover:border-ink-500 hover:bg-ink-50 dark:hover:bg-ink-800/50 flex items-center justify-center gap-2 font-medium text-ink-700 dark:text-ink-300 transition-all disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google එකෙන් පිවිසෙන්න
          </button>

          <p className="text-center text-sm text-ink-600 dark:text-ink-300">
            {isLogin ? (
              <>
                ගිණුමක් නැද්ද?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false)
                    setDisplayName('')
                    setError('')
                  }}
                  className="text-sipyaya-600 dark:text-sipyaya-300 hover:text-sipyaya-700 dark:hover:text-sipyaya-300 font-medium"
                >
                  ලියාපදිංචි වන්න
                </button>
              </>
            ) : (
              <>
                දැනටමත් ගිණුමක් තිබේද?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true)
                    setError('')
                  }}
                  className="text-sipyaya-600 dark:text-sipyaya-300 hover:text-sipyaya-700 dark:hover:text-sipyaya-300 font-medium"
                >
                  පිවිසෙන්න
                </button>
              </>
            )}
          </p>
        </form>
      </div>

      <p className="text-center mt-6">
        <Link to="/" className="text-ink-500 dark:text-ink-300 hover:text-sipyaya-600 dark:hover:text-sipyaya-400 text-sm font-medium">
          ← මුල් පිටුවට ආපසු යන්න
        </Link>
      </p>
    </div>
  )
}
