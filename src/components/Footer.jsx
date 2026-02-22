import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '48px 28px 32px',
      maxWidth: 1280,
      margin: '0 auto',
      width: '100%',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 8 }}>Reframe</div>
          <p style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.6 }}>
            Resize images for every social media platform. Free, instant, private.
          </p>
        </div>

        {/* Product */}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-ghost)', letterSpacing: '0.08em', marginBottom: 14 }}>PRODUCT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/tool" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Image Resizer</Link>
            <Link to="/pricing" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Pricing</Link>
            <a href="#chrome" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Chrome Extension</a>
          </div>
        </div>

        {/* Size Guides — SEO gold */}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-ghost)', letterSpacing: '0.08em', marginBottom: 14 }}>SIZE GUIDES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/sizes/instagram" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Instagram Image Sizes</Link>
            <Link to="/sizes/facebook" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Facebook Image Sizes</Link>
            <Link to="/sizes/twitter" style={{ fontSize: 13, color: 'var(--text-muted)' }}>X / Twitter Image Sizes</Link>
            <Link to="/sizes/linkedin" style={{ fontSize: 13, color: 'var(--text-muted)' }}>LinkedIn Image Sizes</Link>
            <Link to="/sizes/youtube" style={{ fontSize: 13, color: 'var(--text-muted)' }}>YouTube Image Sizes</Link>
            <Link to="/sizes/tiktok" style={{ fontSize: 13, color: 'var(--text-muted)' }}>TikTok Image Sizes</Link>
            <Link to="/sizes/pinterest" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Pinterest Image Sizes</Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-ghost)', letterSpacing: '0.08em', marginBottom: 14 }}>RESOURCES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="mailto:hello@reframe.so" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Contact</a>
            <a href="/privacy" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Privacy Policy</a>
            <a href="/terms" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Terms of Service</a>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontSize: 12, color: 'var(--text-ghost)' }}>
          © {new Date().getFullYear()} Reframe. All processing happens in your browser.
        </span>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-ghost)' }}>
          No data uploaded · No account needed · 100% private
        </span>
      </div>
    </footer>
  )
}
