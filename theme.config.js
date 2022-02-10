import React from 'react'

export default {
  github: 'https://github.com/0xSplits',
  docsRepositoryBase: 'https://github.com/0xSplits/docs',
  titleSuffix: ' – 0xSplits',
  logo: (
    <>
      <img src="/logo_light.svg" className="mr-2" style={{ width: 24 }} />
      <span className="mr-2 font-semibold hidden md:inline">0xSplits</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Trustlessly share onchain income
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="Trustlessly split onchain income - 0xSplits"
      />
      <meta
        name="og:description"
        content="Trustlessly split onchain income - 0xSplits"
      />
      <meta
        name="og:title"
        content="Trustlessly split onchain income - 0xSplits"
      />
      <meta name="og:image" property="og:image" content="/cover_docs.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="apple-mobile-web-app-title" content="0xSplits" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/svg"
        sizes="32x32"
        href="/logo_compressed.svg"
      />
      <link
        rel="icon"
        type="image/svg"
        sizes="96x96"
        href="/logo_compressed.svg"
      />
      <link
        rel="icon"
        type="image/svg"
        sizes="16x16"
        href="/logo_compressed.svg"
      />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    </>
  ),
  search: false,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Edit this page',
  footerText: (
    <div className="text-sm">
      Questions? Join us in <a href="https://chat.0xsplits.xyz/">Discord</a>
    </div>
  ),
  // unstable_faviconGlyph: '🔗',
}
