import { Link } from 'react-router-dom'
import { PLATFORMS } from '../data/platforms'
import SEO from '../components/SEO'

function RatioBox({ w, h, color }) {
  const maxW = 28, maxH = 20;
  const r = w / h;
  let rw, rh;
  if (r > maxW / maxH) { rw = maxW; rh = maxW / r; }
  else { rh = maxH; rw = maxH * r; }
  return (
    <div style={{ width: maxW, height: maxH, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: rw, height: rh, borderRadius: 2, border: `1.5px solid ${color}`, opacity: 0.5 }} />
    </div>
  )
}

const PLATFORM_COLORS = {
  'Instagram': '#E1306C',
  'Facebook': '#1877F2',
  'X / Twitter': '#A0A0A0',
  'LinkedIn': '#0A66C2',
  'TikTok': '#00F2EA',
  'YouTube': '#FF0000',
  'Pinterest': '#E60023',
  'Threads': '#777777',
}

const STEP_ICONS = {
  '01': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  '02': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  '03': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
}

const TRUST_ICONS = {
  'No Upload': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  'No Account': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="8.5" cy="7" r="4"/>
      <line x1="18" y1="8" x2="23" y2="13"/>
      <line x1="23" y1="8" x2="18" y2="13"/>
    </svg>
  ),
  'No Tracking': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
}

function HeroMockup() {
  const colors = ['#E1306C', '#1877F2', '#0A66C2', '#FF0000', '#00F2EA', '#E60023']
  const sizes = [
    { w: 44, h: 44, label: '1:1' },
    { w: 44, h: 56, label: '4:5' },
    { w: 56, h: 32, label: '16:9' },
    { w: 44, h: 56, label: '9:16' },
    { w: 56, h: 28, label: '3:1' },
    { w: 40, h: 56, label: '2:3' },
  ]

  return (
    <div className="hero-mockup float" style={{
      marginTop: 48,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '16px 20px 20px',
        width: 420,
        maxWidth: '100%',
      }}>
        {/* Browser dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        </div>

        {/* Upload zone */}
        <div style={{
          border: '1.5px dashed rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '14px 0',
          textAlign: 'center',
          marginBottom: 16,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 6px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', fontFamily: 'var(--font-mono)' }}>DROP IMAGE HERE</div>
        </div>

        {/* Output grid */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {sizes.map((s, i) => (
            <div key={i} style={{
              width: s.w,
              height: s.h,
              borderRadius: 6,
              border: `1px solid ${colors[i]}30`,
              background: `${colors[i]}08`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: `${colors[i]}60` }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title="Reframe — Resize Images for Every Social Platform Instantly"
        description="Free online image resizer for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, Pinterest. Upload once, download 16 perfectly sized images. No signup required."
        path="/"
      />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }}>
        {/* Hero */}
        <section className="hero-glow" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 64, position: 'relative', zIndex: 1 }}>
          <div className="fade-up" style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-faint)',
            letterSpacing: '0.1em',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: '6px 16px',
            marginBottom: 28,
          }}>FREE · NO SIGNUP · 100% PRIVATE</div>

          <h1 className="fade-up-1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            Resize once,<br />post everywhere.
          </h1>

          <p className="fade-up-2" style={{
            fontSize: 18,
            color: 'var(--text-muted)',
            maxWidth: 520,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}>
            Upload one image. Instantly get perfectly sized versions for Instagram, Facebook, X, LinkedIn, TikTok, YouTube, Pinterest, and more.
          </p>

          <div className="fade-up-3" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/tool" className="btn-primary" style={{
              background: '#fff',
              color: '#09090B',
              padding: '14px 32px',
              borderRadius: 'var(--radius-md)',
              fontSize: 16,
              fontWeight: 700,
              display: 'inline-block',
            }}>Start Resizing — It's Free →</Link>
            <a href="#how" className="btn-secondary" style={{
              background: 'var(--bg-hover)',
              color: 'var(--text-muted)',
              padding: '14px 28px',
              borderRadius: 'var(--radius-md)',
              fontSize: 15,
              fontWeight: 500,
              display: 'inline-block',
              border: '1px solid var(--border)',
            }}>See How It Works</a>
          </div>
          <div className="fade-up-3" style={{ marginTop: 16, textAlign: 'center' }}>
            <a href="https://chromewebstore.google.com/detail/reframe-%E2%80%94-social-image-re/mjjlnehhnfldlgaajacgcmoddgbhieed"
              target="_blank" rel="noopener"
              style={{ fontSize: 13, color: 'var(--text-faint)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
              Also available as a Chrome extension
            </a>
          </div>

          <HeroMockup />
        </section>

        {/* Supported Platforms Strip */}
        <section className="platform-strip" style={{
          display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
          padding: '24px 0 48px',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 64,
        }}>
          {Object.entries(PLATFORM_COLORS).map(([name, color]) => (
            <span key={name} style={{ fontSize: 13, color: 'var(--text-faint)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, opacity: 0.6, flexShrink: 0 }} />
              {name}
            </span>
          ))}
        </section>

        {/* How It Works */}
        <section id="how" style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', letterSpacing: '0.08em', marginBottom: 12 }}>HOW IT WORKS</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em' }}>Three steps. Zero friction.</h2>
          </div>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '01', title: 'Upload', desc: 'Drop any image — PNG, JPG, or WebP. No file size limit.' },
              { num: '02', title: 'Select', desc: 'Pick the platforms you need. Filter by network. Select all or pick individually.' },
              { num: '03', title: 'Download', desc: 'Export all formats at once or download them individually. Perfect dimensions every time.' },
            ].map(step => (
              <div key={step.num} className="card-hover gradient-border-top" style={{
                padding: 28,
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  {STEP_ICONS[step.num]}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-ghost)' }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* All Sizes Reference */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', letterSpacing: '0.08em', marginBottom: 12 }}>COMPLETE REFERENCE</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em' }}>Every size you need, in one place.</h2>
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '36px 1fr 90px 60px',
              gap: 12, padding: '12px 20px',
              borderBottom: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)', letterSpacing: '0.05em',
            }}>
              <span></span><span>PLATFORM</span><span style={{ textAlign: 'right' }}>PIXELS</span><span style={{ textAlign: 'center' }}>RATIO</span>
            </div>
            {PLATFORMS.map((p, i) => (
              <div key={p.id} className="table-row" style={{
                display: 'grid', gridTemplateColumns: '36px 1fr 90px 60px',
                gap: 12, padding: '10px 20px', alignItems: 'center',
                borderBottom: i < PLATFORMS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                transition: 'background 0.15s',
              }}>
                <RatioBox w={p.w} h={p.h} color={p.color} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{p.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', textAlign: 'right' }}>{p.w}×{p.h}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, textAlign: 'center',
                  color: p.color, opacity: 0.6,
                  background: `${p.color}10`, padding: '2px 6px', borderRadius: 4,
                }}>{p.ratio}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trust / Privacy */}
        <section style={{ marginBottom: 80 }}>
          <div style={{
            padding: 40,
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle gradient accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            }} />

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Your images never leave your device.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Reframe processes everything in your browser using the Canvas API. No uploads, no servers, no tracking. Your images stay on your computer.
            </p>
            <div className="trust-row" style={{ display: 'flex', justifyContent: 'center', gap: 48 }}>
              {[
                { label: 'No Upload', desc: 'Images processed locally' },
                { label: 'No Account', desc: 'Start using instantly' },
                { label: 'No Tracking', desc: 'Zero analytics on images' },
              ].map(item => (
                <div key={item.label} style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
                    {TRUST_ICONS[item.label]}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ textAlign: 'center', paddingBottom: 80 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Stop manually resizing.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 28 }}>
            Join thousands of creators who save hours every week.
          </p>
          <Link to="/tool" className="btn-primary" style={{
            background: '#fff',
            color: '#09090B',
            padding: '16px 36px',
            borderRadius: 'var(--radius-md)',
            fontSize: 16,
            fontWeight: 700,
            display: 'inline-block',
          }}>Open Reframe — Free →</Link>
        </section>
      </div>
    </>
  )
}
