import React from 'react'

export default {
  projectLink: 'https://github.com/0xSplits/splits-contracts',
  docsRepositoryBase: 'https://github.com/0xSplits/docs',
  titleSuffix: ' – 0xSplits',
  logo: (
    <>
      <img
        src="/logo_dark.svg"
        className="mr-2 rounded-lg"
        style={{ width: 32 }}
      />
      <span className="mr-2 font-semibold hidden md:inline">0xSplits</span>
      <span className="text-gray-600 font-normal hidden md:inline">Docs</span>
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
        content="Trustless, composable, gas-efficient splits | 0xSplits Docs"
      />
      <meta
        name="og:description"
        content="Trustless, composable, gas-efficient splits | 0xSplits Docs"
      />
      <meta
        name="og:title"
        content="Trustless, composable, gas-efficient splits | 0xSplits Docs"
      />
      <meta name="og:image" property="og:image" content="/cover_docs.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link rel="icon" href="/logo_compressed.svg" />
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="32x32"
        href="/logo_compressed.svg"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="96x96"
        href="/logo_compressed.svg"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="16x16"
        href="/logo_compressed.svg"
      />
    </>
  ),
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
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
  // i18n: [
  //   { locale: "en-US", text: "English" }
  // ],
}
