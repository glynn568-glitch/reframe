import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://reframe-mauve.vercel.app'

export default function SEO({ title, description, path = '/', image }) {
      const url = `${BASE_URL}${path}`
      const ogImage = image || `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`

  return (
          <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={url} />
          
              {/* Open Graph */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Reframe" />
                <meta property="og:locale" content="en_US" />
          
              {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImage} />
          </Helmet>
        )
}
