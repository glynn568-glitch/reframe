import { ImageResponse } from '@vercel/og'

export const config = {
    runtime: 'edge',
}

export default function handler(req) {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title') || 'Resize once, post everywhere.'
    const subtitle = searchParams.get('subtitle') || 'Free image resizer for every social platform'

  return new ImageResponse(
        (
                <div
                          style={{
                                      width: 1200,
                                      height: 630,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      background: '#09090B',
                                      fontFamily: 'sans-serif',
                                      position: 'relative',
                                      overflow: 'hidden',
                          }}
                        >
                  {/* Subtle gradient background */}
                        <div
                                    style={{
                                                  position: 'absolute',
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 70%)',
                                    }}
                                  />
                
                  {/* Top bar accent */}
                        <div
                                    style={{
                                                  position: 'absolute',
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  height: 4,
                                                  background: 'linear-gradient(90deg, #E1306C, #1877F2, #0A66C2, #FF0000, #00F2EA, #E60023)',
                                    }}
                                  />
                
                  {/* Logo */}
                        <div
                                    style={{
                                                  fontSize: 24,
                                                  color: 'rgba(255,255,255,0.5)',
                                                  letterSpacing: '0.1em',
                                                  marginBottom: 32,
                                                  fontWeight: 600,
                                    }}
                                  >
                                  REFRAME
                        </div>div>
                
                  {/* Title */}
                        <div
                                    style={{
                                                  fontSize: 56,
                                                  color: '#FFFFFF',
                                                  fontWeight: 700,
                                                  textAlign: 'center',
                                                  lineHeight: 1.15,
                                                  maxWidth: 900,
                                                  letterSpacing: '-0.02em',
                                    }}
                                  >
                          {title}
                        </div>div>
                
                  {/* Subtitle */}
                        <div
                                    style={{
                                                  fontSize: 24,
                                                  color: 'rgba(255,255,255,0.5)',
                                                  marginTop: 20,
                                                  textAlign: 'center',
                                                  maxWidth: 700,
                                    }}
                                  >
                          {subtitle}
                        </div>div>
                
                  {/* Platform pills */}
                        <div
                                    style={{
                                                  display: 'flex',
                                                  gap: 12,
                                                  marginTop: 40,
                                    }}
                                  >
                          {[
                                    { name: 'Instagram', color: '#E1306C' },
                                    { name: 'Facebook', color: '#1877F2' },
                                    { name: 'X', color: '#A0A0A0' },
                                    { name: 'LinkedIn', color: '#0A66C2' },
                                    { name: 'TikTok', color: '#00F2EA' },
                                    { name: 'YouTube', color: '#FF0000' },
                                    { name: 'Pinterest', color: '#E60023' },
                                              ].map((p) => (
                                                            <div
                                                                            key={p.name}
                                                                            style={{
                                                                                              display: 'flex',
                                                                                              alignItems: 'center',
                                                                                              gap: 6,
                                                                                              padding: '8px 16px',
                                                                                              borderRadius: 20,
                                                                                              border: `1px solid ${p.color}40`,
                                                                                              background: `${p.color}10`,
                                                                                              fontSize: 14,
                                                                                              color: `${p.color}`,
                                                                            }}
                                                                          >
                                                                          <div
                                                                                            style={{
                                                                                                                width: 6,
                                                                                                                height: 6,
                                                                                                                borderRadius: '50%',
                                                                                                                background: p.color,
                                                                                              }}
                                                                                          />
                                                              {p.name}
                                                            </div>div>
                                                          ))}
                        </div>div>
                
                  {/* URL */}
                        <div
                                    style={{
                                                  position: 'absolute',
                                                  bottom: 28,
                                                  fontSize: 16,
                                                  color: 'rgba(255,255,255,0.25)',
                                                  letterSpacing: '0.05em',
                                    }}
                                  >
                                  reframe-mauve.vercel.app
                        </div>div>
                </div>div>
              ),
    {
            width: 1200,
            height: 630,
    }
      )
}</div>
