import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const logo = (
  <>
    <img
      src="/logo_dark.svg"
      className="mr-2 rounded-lg"
      style={{ width: 32 }}
    />
    <span className="mr-2 font-semibold hidden md:inline">0xSplits</span>
    <span className="text-gray-600 font-medium hidden md:inline">Docs</span>
  </>
)

const config: DocsThemeConfig = {
  project: {
    link: 'https://github.com/0xSplits',
  },
  docsRepositoryBase: 'https://github.com/0xSplits/docs',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – 0xSplits',
      }
    }
  },
  logo,
  head: function useHead() {
    const { title } = useConfig()
    const socialCard = '/cover_docs.png'

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Payment infrastructure for the onchain economy"
        />
        <meta
          name="og:description"
          content="Payment infrastructure for the onchain economy"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="0xsplits.xyz" />
        <meta name="twitter:url" content="https://www.0xsplits.xyz/" />
        <meta
          name="og:title"
          content={title ? title + ' – 0xSplits' : '0xSplits'}
        />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="0xSplits" />
        <link rel="icon" href="/logo_compressed.svg" type="image/svg+xml" />
        {/* <link rel="icon" href="/logo_compressed.png" type="image/png" /> */}
        <link
          rel="icon"
          href="/logo_compressed.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/logo_compressed.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    )
  },
  primaryHue: 224,
  editLink: {
    text: 'Edit this page on GitHub',
  },
  feedback: {
    content: 'Question? Give us feedback',
    labels: 'feedback',
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <div className="font-medium">{title}</div>
    },
    defaultMenuCollapseLevel: 2,
    toggleButton: false,
  },
  footer: {
    text: (
      <div className="flex w-full items-center justify-between sm:items-start text-sm">
        <div>
          Questions? Join us in{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://chat.0xsplits.xyz/"
          >
            Discord
          </a>
        </div>
        <div>© {new Date().getFullYear()} Splits Protocols, Inc.</div>
      </div>
    ),
  },
}

export default config

// export default {
//   projectLink: 'https://github.com/0xSplits/splits-contracts',
//   titleSuffix: ' – 0xSplits',
//   logo: (
//     <>
//       <img
//         src="/logo_dark.svg"
//         className="mr-2 rounded-lg"
//         style={{ width: 32 }}
//       />
//       <span className="mr-2 font-semibold hidden md:inline">0xSplits</span>
//       <span className="text-gray-600 font-normal hidden md:inline">Docs</span>
//     </>
//   ),
//   head: (
//     <>
//       <meta name="msapplication-TileColor" content="#ffffff" />
//       <meta name="theme-color" content="#ffffff" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <meta httpEquiv="Content-Language" content="en" />
//       <meta
//         name="description"
//         content="Trustless, composable, gas-efficient splits | 0xSplits Docs"
//       />
//       <meta
//         name="og:description"
//         content="Trustless, composable, gas-efficient splits | 0xSplits Docs"
//       />
//       <meta
//         name="og:title"
//         content="Trustless, composable, gas-efficient splits | 0xSplits Docs"
//       />
//       <meta name="og:image" property="og:image" content="/cover_docs.png" />
//       <meta property="og:image:width" content="1200" />
//       <meta property="og:image:height" content="630" />
//       <link rel="icon" href="/logo_compressed.svg" />
//       <link
//         rel="icon"
//         type="image/svg+xml"
//         sizes="32x32"
//         href="/logo_compressed.svg"
//       />
//       <link
//         rel="icon"
//         type="image/svg+xml"
//         sizes="96x96"
//         href="/logo_compressed.svg"
//       />
//       <link
//         rel="icon"
//         type="image/svg+xml"
//         sizes="16x16"
//         href="/logo_compressed.svg"
//       />
//     </>
//   ),
//   search: {
//     component: <div>search</div>,
//   },
//   // search: true,
//   flexsearch: true,
//   floatTOC: true,
//   prevLinks: true,
//   nextLinks: true,
//   footer: true,
//   footerEditLink: 'Edit this page',
//   footerText: (
//     <div className="text-sm">
//       Questions? Join us in <a href="https://chat.0xsplits.xyz/">Discord</a>
//     </div>
//   ),
//   // unstable_faviconGlyph: '🔗',
//   // i18n: [
//   //   { locale: "en-US", text: "English" }
//   // ],
// }
