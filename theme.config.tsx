import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const logo = (
  <>
    <img src="/logo.svg" className="mr-2 rounded-lg" style={{ width: 20 }} />
    <span className="mr-2 font-bold hidden md:inline">Splits</span>
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
  primaryHue: 215,
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
