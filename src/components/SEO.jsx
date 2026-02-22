import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://reframe-mauve.vercel.app'

export default function SEO({ title, description, path = '/' }) {
  const url = `${BASE_URL}${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${BASE_URL}/favicon.svg`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/favicon.svg`} />
    </Helmet>
  )
}
