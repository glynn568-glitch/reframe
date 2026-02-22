import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PLATFORMS, SEO_DATA } from '../data/platforms'
import SEO from '../components/SEO'

function RatioBox({ w, h, color }) {
  const maxW = 40, maxH = 28, r = w / h
  let rw, rh
  if (r > maxW / maxH) { rw = maxW; rh = maxW / r } else { rh = maxH; rw = maxH * r }
  return (
    <div style={{ width: maxW, height: maxH, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: rw, height: rh, borderRadius: 3, border: `2px solid ${color}`, opacity: 0.6 }} />
    </div>
  )
}

export default function SizesPage() {
  const { platform } = useParams()
  const seo = SEO_DATA[platform]

  if (!seo) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 28px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36 }}>Page not found</h1>
        <Link to="/" style={{ color: 'var(--text-muted)', marginTop: 16, display: 'inline-block' }}>Go home</Link>
      </div>
    )
  }

  const platformSizes = PLATFORMS.filter(p => p.cat === platform)

  // Schema.org FAQ structured data for this page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": platformSizes.map(p => ({
      "@type": "Question",
      "name": `What is the recommended size for ${p.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `The recommended size for ${p.name} is ${p.w}×${p.h} pixels (${p.ratio} aspect ratio). ${p.desc}`,
      }
    }))
  }

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        path={`/sizes/${platform}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 28px 80px' }}>
        {/* Breadcrumb */}
        <nav style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-ghost)',
          marginBottom: 32, display: 'flex', gap: 8,
        }}>
          <Link to="/" style={{ color: 'var(--text-faint)' }}>Home</Link>
          <span>/</span>
          <span>Size Guides</span>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
            {platform === 'twitter' ? 'X / Twitter' : platform}
          </span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)',
            letterSpacing: '0.08em', marginBottom: 14,
          }}>UPDATED {seo.year}</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16,
          }}>{seo.h1}</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            {seo.intro}
          </p>
          <Link to="/tool" style={{
            display: 'inline-block', background: '#fff', color: '#09090B',
            padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 14,
          }}>Resize for {platform === 'twitter' ? 'X' : platform.charAt(0).toUpperCase() + platform.slice(1)} — Free →</Link>
        </div>

        {/* Size Cards */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400,
            marginBottom: 20, letterSpacing: '-0.02em',
          }}>All {platform === 'twitter' ? 'X / Twitter' : platform.charAt(0).toUpperCase() + platform.slice(1)} Image Dimensions</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {platformSizes.map(p => (
              <div key={p.id} style={{
                display: 'flex', gap: 20, alignItems: 'center',
                padding: '20px 24px',
                background: 'var(--bg-subtle)',
                borderRadius: 16,
                border: '1px solid var(--border)',
              }}>
                <RatioBox w={p.w} h={p.h} color={p.color} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600,
                  }}>{p.w} × {p.h}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 4,
                    color: p.color, opacity: 0.7,
                    background: `${p.color}15`, padding: '2px 10px', borderRadius: 6,
                    display: 'inline-block',
                  }}>{p.ratio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Table — great for SEO featured snippets */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400,
            marginBottom: 20, letterSpacing: '-0.02em',
          }}>Quick Reference Table</h2>

          <div style={{
            overflow: 'hidden', borderRadius: 12,
            border: '1px solid var(--border)',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', fontWeight: 500, letterSpacing: '0.05em' }}>FORMAT</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', fontWeight: 500, letterSpacing: '0.05em' }}>WIDTH</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', fontWeight: 500, letterSpacing: '0.05em' }}>HEIGHT</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', fontWeight: 500, letterSpacing: '0.05em' }}>RATIO</th>
                </tr>
              </thead>
              <tbody>
                {platformSizes.map((p, i) => (
                  <tr key={p.id} style={{
                    borderBottom: i < platformSizes.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}>
                    <td style={{ padding: '10px 16px', color: 'rgba(255,255,255,0.7)' }}>{p.name}</td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{p.w}px</td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{p.h}px</td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: p.color, opacity: 0.7 }}>{p.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips — unique content for SEO */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400,
            marginBottom: 20, letterSpacing: '-0.02em',
          }}>Tips for Best Results</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {seo.tips.map((tip, i) => (
              <div key={i} style={{
                padding: '16px 20px', background: 'var(--bg-subtle)',
                borderRadius: 12, border: '1px solid var(--border)',
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)',
                  marginTop: 2, flexShrink: 0,
                }}>0{i + 1}</span>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center', padding: 40,
          background: 'var(--bg-subtle)', borderRadius: 20,
          border: '1px solid var(--border)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400,
            letterSpacing: '-0.02em', marginBottom: 12,
          }}>Ready to resize?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 24 }}>
            Upload your image and get all {platform === 'twitter' ? 'X / Twitter' : platform.charAt(0).toUpperCase() + platform.slice(1)} sizes in seconds.
          </p>
          <Link to="/tool" style={{
            display: 'inline-block', background: '#fff', color: '#09090B',
            padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15,
          }}>Open Reframe — It's Free →</Link>
        </div>

        {/* Internal links to other platforms — SEO interlinking */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)',
            letterSpacing: '0.08em', marginBottom: 14,
          }}>OTHER SIZE GUIDES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok', 'pinterest']
              .filter(p => p !== platform)
              .map(p => (
                <Link key={p} to={`/sizes/${p}`} style={{
                  padding: '8px 16px', background: 'var(--bg-hover)',
                  borderRadius: 8, fontSize: 13, color: 'var(--text-muted)',
                  textTransform: 'capitalize', transition: 'background 0.15s',
                }}>{p === 'twitter' ? 'X / Twitter' : p} Sizes</Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
