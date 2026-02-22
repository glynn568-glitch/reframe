import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  
  const isActive = (path) => location.pathname === path

  const navStyle = {
    padding: '16px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    background: 'rgba(9,9,11,0.92)',
    zIndex: 100,
    backdropFilter: 'blur(20px)',
  }

  const linkStyle = (active) => ({
    fontSize: 13,
    fontWeight: 500,
    color: active ? '#fff' : 'rgba(255,255,255,0.4)',
    transition: 'color 0.2s',
    cursor: 'pointer',
  })

  return (
    <header style={navStyle}>
      <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 12, textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: '#fff',
        }}>Reframe</span>
      </Link>

      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <Link to="/tool" style={linkStyle(isActive('/tool'))}>Tool</Link>
        <Link to="/pricing" style={linkStyle(isActive('/pricing'))}>Pricing</Link>
        
        {/* Sizes dropdown */}
        <div style={{ position: 'relative' }}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <span style={{ ...linkStyle(location.pathname.startsWith('/sizes')), cursor: 'pointer' }}>
            Size Guides ▾
          </span>
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: 8,
              background: '#151517',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 6,
              minWidth: 180,
              zIndex: 200,
            }}>
              {['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok', 'pinterest'].map(p => (
                <Link key={p} to={`/sizes/${p}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '8px 14px',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                    borderRadius: 8,
                    textTransform: 'capitalize',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.color = '#fff'; }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'rgba(255,255,255,0.6)'; }}
                >{p === 'twitter' ? 'X / Twitter' : p}</Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/tool" style={{
          background: '#fff',
          color: '#09090B',
          padding: '8px 20px',
          borderRadius: 'var(--radius-sm)',
          fontSize: 13,
          fontWeight: 600,
          transition: 'opacity 0.2s',
          textDecoration: 'none',
        }}>Resize Free →</Link>
      </nav>
    </header>
  )
}
