import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

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
        navigate('/tool')
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
