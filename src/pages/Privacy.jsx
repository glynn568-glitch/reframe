import SEO from '../components/SEO'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy — Reframe"
        description="Reframe privacy policy. Your images never leave your device. No tracking, no data collection, no cookies."
        path="/privacy"
      />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 28px 80px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)',
          letterSpacing: '0.08em', marginBottom: 14,
        }}>PRIVACY POLICY</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400,
          letterSpacing: '-0.03em', marginBottom: 32,
        }}>Your images stay on your device.</h1>

        <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p><strong style={{ color: '#fff' }}>Last updated:</strong> February 22, 2026</p>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>What Reframe does</h2>
            <p>Reframe is an image resizing tool that runs entirely in your browser. When you upload an image, it is processed locally using your device's hardware. Your images are never sent to our servers or any third party.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Data we collect</h2>
            <p>If you create an account, we store your email address and subscription status in our database (hosted on Supabase). Free users' daily export counts are tracked to enforce the 5/day limit. We do not store your images, export history, or any metadata about the images you process.</p>
            <p>If you use Reframe without an account, we store a daily export counter in your browser's local storage. No data leaves your device.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Payments</h2>
            <p>Pro subscriptions are processed by Lemon Squeezy. We do not see or store your payment details. Lemon Squeezy's privacy policy applies to all payment transactions.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Authentication</h2>
            <p>We offer Google sign-in and email/password authentication through Supabase Auth. If you sign in with Google, we receive your email address and profile name. We do not access your Google contacts, files, or any other data.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Chrome extension</h2>
            <p>The Reframe Chrome extension processes images locally in the extension popup. It connects to our authentication service to verify your account and track daily export counts. No image data is transmitted. The extension uses chrome.storage.local to persist your login session.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Cookies and tracking</h2>
            <p>Reframe does not use analytics cookies, tracking pixels, or any third-party tracking scripts. We do not run Google Analytics, Facebook Pixel, or similar services.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Data deletion</h2>
            <p>To delete your account and all associated data, email glynn568@gmail.com. We will remove your profile and authentication records within 7 days.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Contact</h2>
            <p>Questions about this policy: <a href="mailto:glynn568@gmail.com" style={{ color: '#fff' }}>glynn568@gmail.com</a></p>
          </section>
        </div>
      </div>
    </>
  )
}
