import { Helmet } from 'react-helmet-async'
import ImageResizer from '../components/ImageResizer'

export default function Tool() {
  return (
    <>
      <Helmet>
        <title>Free Image Resizer for Social Media — Reframe</title>
        <meta name="description" content="Resize images for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, Pinterest. Upload once, download all sizes. Free, instant, no signup required." />
        <link rel="canonical" href="https://reframe.so/tool" />
      </Helmet>
      <ImageResizer />
    </>
  )
}
