import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PLATFORMS, CATEGORIES } from '../data/platforms'
import { useAuth } from '../context/AuthContext'

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b) }

function cropAndResize(img, targetW, targetH) {
  const canvas = document.createElement('canvas')
  canvas.width = targetW; canvas.height = targetH
  const ctx = canvas.getContext('2d')
  const imgRatio = img.naturalWidth / img.naturalHeight
  const targetRatio = targetW / targetH
  let sx, sy, sw, sh
  if (imgRatio > targetRatio) { sh = img.naturalHeight; sw = sh * targetRatio; sx = (img.naturalWidth - sw) / 2; sy = 0 }
  else { sw = img.naturalWidth; sh = sw / targetRatio; sx = 0; sy = (img.naturalHeight - sh) / 2 }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH)
  return canvas
}

function RatioBox({ w, h, color }) {
  const maxW = 28, maxH = 18, r = w / h
  let rw, rh
  if (r > maxW / maxH) { rw = maxW; rh = maxW / r } else { rh = maxH; rw = maxH * r }
  return (
    <div style={{ width: maxW, height: maxH, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: rw, height: rh, borderRadius: 2, border: `1.5px solid ${color}`, opacity: 0.5 }} />
    </div>
  )
}

function PreviewCard({ platform, img, selected, onToggle, onDownload, exported }) {
  const [preview, setPreview] = useState(null)
  useEffect(() => {
    if (!img) return
    const pw = 280, ph = (platform.h / platform.w) * pw
    const canvas = cropAndResize(img, platform.w, platform.h)
    const sc = document.createElement('canvas'); sc.width = pw; sc.height = ph
    sc.getContext('2d').drawImage(canvas, 0, 0, pw, ph)
    setPreview(sc.toDataURL('image/png'))
  }, [img, platform])

  const previewH = Math.min((platform.h / platform.w) * 200, 280)

  return (
    <div onClick={onToggle} style={{
      background: selected ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.015)',
      border: selected ? `2px solid ${platform.color}44` : '2px solid rgba(255,255,255,0.04)',
      borderRadius: 16, padding: 12, cursor: 'pointer',
      transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden',
    }}>
      {selected && (
        <div style={{
          position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: 11,
          background: platform.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff', zIndex: 2,
        }}>✓</div>
      )}
      <div style={{
        width: '100%', height: previewH, borderRadius: 10, overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)', marginBottom: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {preview ? (
          <img src={preview} alt={platform.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.08)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{platform.w}×{platform.h}</div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <RatioBox w={platform.w} h={platform.h} color={platform.color} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{platform.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)' }}>{platform.w}×{platform.h}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, color: platform.color, opacity: 0.7,
              background: `${platform.color}15`, padding: '1px 5px', borderRadius: 4,
            }}>{platform.ratio}</span>
          </div>
        </div>
      </div>
      {selected && img && (
        <button onClick={(e) => { e.stopPropagation(); onDownload(platform) }} style={{
          width: '100%', marginTop: 8, padding: '7px 0',
          background: exported ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
          border: 'none', borderRadius: 8,
          color: exported ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.6)',
          cursor: 'pointer', fontSize: 11, fontWeight: 500, transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.color = '#fff' }}
        onMouseLeave={e => { e.target.style.background = exported ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)'; e.target.style.color = exported ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.6)' }}
        >{exported ? 'Downloaded ✓' : 'Download ↓'}</button>
      )}
    </div>
  )
}

export default function ImageResizer() {
  const { user, isPro, tryExport, getDailyCount, FREE_LIMIT, loading: authLoading } = useAuth()
  const [img, setImg] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [fileName, setFileName] = useState('')
  const [selected, setSelected] = useState(new Set(PLATFORMS.map(p => p.id)))
  const [isDragging, setIsDragging] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(new Set())
  const [activeFilter, setActiveFilter] = useState('all')
  const [showUpgrade, setShowUpgrade] = useState(false)
  const fileRef = useRef(null)

  const dailyCount = getDailyCount()

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    setFileName(file.name.replace(/\.[^.]+$/, ''))
    setExported(new Set())
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = new Image()
      image.onload = () => { setImg(image); setImgSrc(e.target.result) }
      image.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

  const togglePlatform = (id) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const filteredPlatforms = activeFilter === 'all' ? PLATFORMS : PLATFORMS.filter(p => p.cat === activeFilter)

  const selectAll = () => setSelected(prev => { const n = new Set(prev); filteredPlatforms.forEach(p => n.add(p.id)); return n })
  const selectNone = () => setSelected(prev => { const n = new Set(prev); filteredPlatforms.forEach(p => n.delete(p.id)); return n })

  const downloadOne = async (platform) => {
    if (!img) return
    if (!user) return
    const allowed = await tryExport()
    if (!allowed) { setShowUpgrade(true); return }
    const canvas = cropAndResize(img, platform.w, platform.h)
    const link = document.createElement('a')
    link.download = `${fileName || 'image'}-${platform.id}-${platform.w}x${platform.h}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    setExported(prev => new Set([...prev, platform.id]))
  }

  const downloadAll = async () => {
    if (!img || !user) return
    setExporting(true)
    const selectedPlatforms = PLATFORMS.filter(p => selected.has(p.id))
    for (const p of selectedPlatforms) {
      const allowed = await tryExport()
      if (!allowed) { setShowUpgrade(true); setExporting(false); return }
      await new Promise(r => setTimeout(r, 150))
      const canvas = cropAndResize(img, p.w, p.h)
      const link = document.createElement('a')
      link.download = `${fileName || 'image'}-${p.id}-${p.w}x${p.h}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setExported(prev => new Set([...prev, p.id]))
    }
    setExporting(false)
  }

  const reset = () => { setImg(null); setImgSrc(null); setFileName(''); setExported(new Set()) }
  const selectedCount = PLATFORMS.filter(p => selected.has(p.id)).length

  // Not logged in: show login prompt
  if (!authLoading && !user) {
    return (
      <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 28px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400,
          letterSpacing: '-0.03em', marginBottom: 12,
        }}>Sign in to resize</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
          Create a free account to get {FREE_LIMIT} exports per day. Upgrade to Pro for unlimited.
        </p>
        <Link to="/login" style={{
          display: 'inline-block', background: '#fff', color: '#09090B',
          padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15,
          textDecoration: 'none',
        }}>Log In or Sign Up</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 28px 100px' }}>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowUpgrade(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#151517', borderRadius: 20, padding: 40, maxWidth: 440, width: '90%',
            border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, marginBottom: 12 }}>
              You've hit the free limit
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              Free accounts get {FREE_LIMIT} exports per day. Upgrade to Pro for unlimited exports, custom crop positions, batch uploads, and no watermarks.
            </p>
            <Link to="/pricing" style={{
              display: 'inline-block', background: '#fff', color: '#09090B',
              padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15,
              marginBottom: 12, textDecoration: 'none',
            }}>Upgrade to Pro — $5/mo</Link>
            <div>
              <button onClick={() => setShowUpgrade(false)} style={{
                background: 'none', border: 'none', color: 'var(--text-faint)',
                cursor: 'pointer', fontSize: 13, marginTop: 8,
              }}>Maybe later</button>
            </div>
          </div>
        </div>
      )}

      {/* Usage counter */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', marginBottom: 16,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)',
          background: 'var(--bg-subtle)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '5px 12px',
        }}>
          {isPro ? (
            <span style={{ color: '#4ade80' }}>Pro — Unlimited exports</span>
          ) : (
            <>
              {dailyCount}/{FREE_LIMIT} free exports today
              {dailyCount >= FREE_LIMIT - 1 && (
                <Link to="/pricing" style={{ color: '#fff', marginLeft: 8, fontWeight: 600 }}>Upgrade</Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Upload Zone */}
      {!img && (
        <div style={{ maxWidth: 580, margin: '40px auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400,
              letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10,
            }}>Drop an image to start.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
              We'll generate {PLATFORMS.length} perfectly sized versions instantly.
            </p>
          </div>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 20, padding: '56px 40px', textAlign: 'center', cursor: 'pointer',
              transition: 'all 0.3s ease', background: isDragging ? 'rgba(255,255,255,0.02)' : 'transparent',
            }}
          >
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: 18, color: 'rgba(255,255,255,0.3)',
            }}>↑</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Drop your image here</div>
            <div style={{ color: 'var(--text-faint)', fontSize: 13 }}>or click to browse · PNG, JPG, WebP</div>
          </div>
        </div>
      )}

      {/* Active state */}
      {img && (
        <>
          {/* Source info */}
          <div style={{
            display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24,
            padding: '14px 18px', background: 'var(--bg-subtle)',
            borderRadius: 14, border: '1px solid var(--border)',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', flexShrink: 0 }}>
              <img src={imgSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{fileName || 'Untitled'}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', marginTop: 2 }}>
                {img.naturalWidth} × {img.naturalHeight}px
                <span style={{ margin: '0 6px', opacity: 0.3 }}>·</span>
                {(() => { const g = gcd(img.naturalWidth, img.naturalHeight); return `${img.naturalWidth/g}:${img.naturalHeight/g}` })()} ratio
              </div>
            </div>
            <button onClick={() => fileRef.current?.click()} style={{
              background: 'var(--bg-hover)', border: 'none', color: 'var(--text-muted)',
              padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12,
            }}>Change</button>
            <button onClick={reset} style={{
              background: 'var(--bg-hover)', border: 'none', color: 'var(--text-muted)',
              padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12,
            }}>Reset</button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
          </div>

          {/* Filter tabs */}
          <div style={{
            display: 'flex', gap: 3, marginBottom: 16, flexWrap: 'wrap',
            padding: 3, background: 'var(--bg-subtle)', borderRadius: 10, width: 'fit-content',
          }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveFilter(cat.id)} style={{
                background: activeFilter === cat.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none', borderRadius: 7, padding: '5px 12px',
                color: activeFilter === cat.id ? '#fff' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.15s ease',
              }}>{cat.label}</button>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', letterSpacing: '0.05em' }}>
              {filteredPlatforms.length} FORMAT{filteredPlatforms.length !== 1 ? 'S' : ''}
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Select all', 'Clear'].map(l => (
                <button key={l} onClick={l === 'Select all' ? selectAll : selectNone} style={{
                  background: 'none', border: 'none', color: 'var(--text-faint)',
                  cursor: 'pointer', fontSize: 11, padding: '4px 8px',
                }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'var(--text-faint)'}
                >{l}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))',
            gap: 12, marginBottom: 32,
          }}>
            {filteredPlatforms.map(p => (
              <PreviewCard key={p.id} platform={p} img={img}
                selected={selected.has(p.id)} onToggle={() => togglePlatform(p.id)}
                onDownload={downloadOne} exported={exported.has(p.id)} />
            ))}
          </div>

          {/* Sticky export bar */}
          <div style={{
            position: 'sticky', bottom: 16, background: 'rgba(9,9,11,0.9)',
            backdropFilter: 'blur(16px)', borderRadius: 16, padding: 5,
            border: '1px solid var(--border)',
          }}>
            <button onClick={downloadAll} disabled={selectedCount === 0 || exporting} style={{
              width: '100%', padding: '16px 32px',
              background: selectedCount === 0 ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, #fff 0%, #d4d4d8 100%)',
              color: selectedCount === 0 ? 'rgba(255,255,255,0.1)' : '#09090B',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
              cursor: selectedCount === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.25s ease',
            }}>
              {exporting ? 'Exporting...' : selectedCount === 0 ? 'Select formats to export' : `Download ${selectedCount} format${selectedCount !== 1 ? 's' : ''} ↓`}
            </button>
          </div>
          <p style={{ textAlign: 'center', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)' }}>
            100% client-side · nothing uploaded · your images stay on your device
          </p>
        </>
      )}
    </div>
  )
}
