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
        <section style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 64 }}>
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
            <Link to="/tool" style={{
              background: '#fff',
              color: '#09090B',
              padding: '14px 32px',
              borderRadius: 'var(--radius-md)',
              fontSize: 16,
              fontWeight: 700,
              display: 'inline-block',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>Start Resizing — It's Free →</Link>
            <a href="#how" style={{
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
        </section>

        {/* Supported Platforms Strip */}
        <section style={{
          display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
          padding: '24px 0 48px',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 64,
        }}>
          {['Instagram', 'Facebook', 'X / Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest', 'Threads'].map(name => (
            <span key={name} style={{ fontSize: 13, color: 'var(--text-faint)', fontWeight: 500 }}>{name}</span>
          ))}
        </section>

        {/* How It Works */}
        <section id="how" style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', letterSpacing: '0.08em', marginBottom: 12 }}>HOW IT WORKS</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em' }}>Three steps. Zero friction.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '01', title: 'Upload', desc: 'Drop any image — PNG, JPG, or WebP. No file size limit.' },
              { num: '02', title: 'Select', desc: 'Pick the platforms you need. Filter by network. Select all or pick individually.' },
              { num: '03', title: 'Download', desc: 'Export all formats at once or download them individually. Perfect dimensions every time.' },
            ].map(step => (
              <div key={step.num} style={{
                padding: 28,
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-ghost)', marginBottom: 16 }}>{step.num}</div>
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
              <div key={p.id} style={{
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
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Your images never leave your device.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.6 }}>
              Reframe processes everything in your browser using the Canvas API. No uploads, no servers, no tracking. Your images stay on your computer.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
              {[
                { label: 'No Upload', desc: 'Images processed locally' },
                { label: 'No Account', desc: 'Start using instantly' },
                { label: 'No Tracking', desc: 'Zero analytics on images' },
              ].map(item => (
                <div key={item.label} style={{ textAlign: 'center' }}>
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
          <Link to="/tool" style={{
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
