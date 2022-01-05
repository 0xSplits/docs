export default {
  github: 'https://github.com/0xSplits/splits',
  docsRepositoryBase: 'https://github.com/0xSplits/splits',
  titleSuffix: ' – 0xSplits',
  logo: (
    <>
      <img src="/logo.png" width="30" height="30" />
      <span className="ml-2 mr-2 font-semibold hidden md:inline">0xSplits</span>
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
      <meta name="og:image" content="/cover_docs.jpg" />
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
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    </>
  ),
  search: false,
  prevLinks: true,
  nextLinks: true,
  footer: false,
  footerEditLink: 'Edit this page on GitHub',
  footerText: <>MIT {new Date().getFullYear()} © Splits Protocols, Inc.</>,
  unstable_faviconGlyph: '🔗',
}
