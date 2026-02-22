import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SEO from '../components/SEO'

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for occasional use',
    cta: 'Start Free',
    ctaLink: '/tool',
    highlight: false,
    features: [
      '5 exports per day',
      'All 16 platform formats',
      'Center-crop auto resize',
      'Individual downloads',
      'PNG export format',
      '100% client-side processing',
    ],
    limitations: [
      'No batch upload',
      'No custom crop position',
      'No JPEG quality control',
    ],
  },
  {
    name: 'Pro',
    price: '$5',
    period: '/month',
    yearlyPrice: '$39/year (save 35%)',
    desc: 'For creators who post regularly',
    cta: 'Upgrade to Pro',
    ctaLink: 'https://reframeit.lemonsqueezy.com/checkout/buy/913833c3-548f-4d01-b6d4-094fc1e984ed',
    highlight: true,
    features: [
      'Unlimited exports',
      'All 16 platform formats',
      'Custom crop positioning',
      'Batch upload (up to 50 images)',
      'JPEG + PNG + WebP export',
      'Quality slider control',
      'No watermark',
      'Priority support',
    ],
    limitations: [],
  },
]

export default function Pricing() {
  const { user } = useAuth()

  function getCheckoutUrl(tier) {
    let url = tier.ctaLink
    // Append user ID to Lemon Squeezy checkout for subscription linking
    if (user && url.includes('lemonsqueezy.com')) {
      const sep = url.includes('?') ? '&' : '?'
      url = `${url}${sep}checkout[custom][user_id]=${user.id}&checkout[email]=${encodeURIComponent(user.email)}`
    }
    return url
  }

  return (
    <>
      <SEO
        title="Pricing — Reframe Image Resizer"
        description="Reframe pricing: Free tier with 5 exports/day, Pro at $5/mo for unlimited exports, batch upload, and custom cropping."
        path="/pricing"
      />

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '60px 28px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)',
            letterSpacing: '0.08em', marginBottom: 14,
          }}>PRICING</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 400,
            letterSpacing: '-0.03em', marginBottom: 14,
          }}>Simple, honest pricing.</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Start free. Upgrade when you need more. No surprises.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
          maxWidth: 720, margin: '0 auto 60px',
        }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{
              background: tier.highlight ? 'rgba(255,255,255,0.04)' : 'var(--bg-subtle)',
              border: tier.highlight ? '2px solid rgba(255,255,255,0.15)' : '1px solid var(--border)',
              borderRadius: 20,
              padding: 32,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {tier.highlight && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: '#fff', color: '#09090B',
                  padding: '4px 16px', borderRadius: 20,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                }}>MOST POPULAR</div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-muted)' }}>{tier.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 400 }}>{tier.price}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-faint)' }}>{tier.period}</span>
                </div>
                {tier.yearlyPrice && (
                  <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 4 }}>{tier.yearlyPrice}</div>
                )}
                <p style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 8 }}>{tier.desc}</p>
              </div>

              <a href={getCheckoutUrl(tier)} style={{
                display: 'block', textAlign: 'center',
                background: tier.highlight ? '#fff' : 'var(--bg-hover)',
                color: tier.highlight ? '#09090B' : '#fff',
                padding: '12px 24px', borderRadius: 10,
                fontWeight: 600, fontSize: 14,
                marginBottom: 24,
                transition: 'opacity 0.2s',
                textDecoration: 'none',
              }}>{tier.cta}</a>

              <div style={{ flex: 1 }}>
                {tier.features.map(f => (
                  <div key={f} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    padding: '6px 0', fontSize: 13, color: 'rgba(255,255,255,0.65)',
                  }}>
                    <span style={{ color: '#4ade80', fontSize: 14, marginTop: 1 }}>✓</span>
                    {f}
                  </div>
                ))}
                {tier.limitations.map(f => (
                  <div key={f} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    padding: '6px 0', fontSize: 13, color: 'var(--text-faint)',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 14, marginTop: 1 }}>✗</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400,
            textAlign: 'center', marginBottom: 32,
          }}>Common questions</h2>
          {[
            {
              q: 'Is Reframe really free?',
              a: 'Yes. The free tier gives you 5 exports per day across all 16 formats. No account needed. No credit card required.',
            },
            {
              q: 'Do you store my images?',
              a: 'No. Reframe processes everything in your browser. Your images never leave your device. We literally cannot see them.',
            },
            {
              q: 'Can I cancel Pro anytime?',
              a: 'Yes. Cancel with one click, no questions asked. You keep Pro access until the end of your billing period.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We use Lemon Squeezy for payments. They accept all major credit cards, PayPal, and Apple Pay.',
            },
            {
              q: 'Do you offer refunds?',
              a: 'Yes, we offer a full refund within 14 days of purchase if you\'re not satisfied.',
            },
          ].map(item => (
            <div key={item.q} style={{
              borderBottom: '1px solid var(--border)', padding: '20px 0',
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.q}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
