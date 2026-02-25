import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/tool'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
        setCheckEmail(true)
      } else {
        await signIn(email, password)
        navigate(redirectTo)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (checkEmail) {
    return (
      <>
        <Helmet><title>Check Your Email — Reframe</title></Helmet>
        <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, marginBottom: 12 }}>
            Check your email
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6 }}>
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then come back and log in.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{isSignUp ? 'Sign Up' : 'Log In'} — Reframe</title>
      </Helmet>
      <div style={{ maxWidth: 400, margin: '60px auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400,
            letterSpacing: '-0.03em', marginBottom: 8,
          }}>
            {isSignUp ? 'Create account' : 'Welcome back'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {isSignUp ? 'Start resizing for free.' : 'Log in to continue resizing.'}
          </p>
        </div>

        <button onClick={signInWithGoogle} style={{
          width: '100%', padding: '13px', background: 'var(--bg-subtle)',
          border: '1px solid var(--border)', borderRadius: 10,
          color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginBottom: 24, transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-subtle)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24,
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--text-faint)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Email</span>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '12px 14px', background: 'var(--bg-subtle)',
                border: '1px solid var(--border)', borderRadius: 10, color: '#fff',
                fontSize: 14, outline: 'none',
              }}
              placeholder="you@example.com"
            />
          </label>

          <label style={{ display: 'block', marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: 'var(--text-faint)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Password</span>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              minLength={6}
              style={{
                width: '100%', padding: '12px 14px', background: 'var(--bg-subtle)',
                border: '1px solid var(--border)', borderRadius: 10, color: '#fff',
                fontSize: 14, outline: 'none',
              }}
              placeholder={isSignUp ? 'At least 6 characters' : 'Your password'}
            />
          </label>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 16,
              color: '#f87171', fontSize: 13,
            }}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', background: '#fff', color: '#09090B',
            border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-faint)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{
            background: 'none', border: 'none', color: '#fff', cursor: 'pointer',
            fontWeight: 600, fontSize: 13,
          }}>
            {isSignUp ? 'Log in' : 'Sign up free'}
          </button>
        </p>

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 11, color: 'var(--text-ghost)' }}>
          Free accounts get 5 exports/day. <Link to="/pricing" style={{ color: 'var(--text-faint)' }}>See Pro plans</Link>
        </p>
      </div>
    </>
  )
}
