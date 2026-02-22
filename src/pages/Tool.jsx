import ImageResizer from '../components/ImageResizer'
import SEO from '../components/SEO'

export default function Tool() {
  return (
    <>
      <SEO
        title="Free Image Resizer for Social Media — Reframe"
        description="Resize images for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, Pinterest. Upload once, download all sizes. Free, instant, no signup required."
        path="/tool"
      />
      <ImageResizer />
    </>
  )
}
