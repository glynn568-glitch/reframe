import SEO from '../components/SEO'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service — Reframe"
        description="Reframe terms of service. Simple terms for a simple tool."
        path="/terms"
      />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 28px 80px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)',
          letterSpacing: '0.08em', marginBottom: 14,
        }}>TERMS OF SERVICE</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400,
          letterSpacing: '-0.03em', marginBottom: 32,
        }}>Keep it simple.</h1>

        <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p><strong style={{ color: '#fff' }}>Last updated:</strong> February 22, 2026</p>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>The service</h2>
            <p>Reframe is a browser-based image resizing tool. Free accounts get 5 exports per day. Pro accounts ($5/month) get unlimited exports and additional features. We reserve the right to change pricing or features with 30 days notice to existing subscribers.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Your content</h2>
            <p>Your images are processed locally in your browser. We never see, store, or have access to your images. You retain full ownership of everything you upload and export.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Accounts</h2>
            <p>You are responsible for keeping your login credentials secure. One account per person. Do not share Pro subscriptions across multiple users.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Payments and refunds</h2>
            <p>Pro subscriptions are billed monthly or annually through Lemon Squeezy. You can cancel anytime from your Lemon Squeezy account. We offer a full refund within 14 days of purchase. After 14 days, you keep access until the end of your billing period but no refund is issued.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Prohibited use</h2>
            <p>Do not attempt to bypass export limits, reverse-engineer the service, or use automated tools to abuse the platform. We reserve the right to terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Liability</h2>
            <p>Reframe is provided "as is." We are not liable for any damages resulting from your use of the service. Since images are processed locally, data loss from browser crashes or device issues is not our responsibility.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Contact</h2>
            <p>Questions about these terms: <a href="mailto:glynn568@gmail.com" style={{ color: '#fff' }}>glynn568@gmail.com</a></p>
          </section>
        </div>
      </div>
    </>
  )
}
