import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Image from 'next/image'

const logo = (
  <>
    <Image
      src="/logo.svg"
      className="mr-2 rounded-lg"
      alt="splits_logo"
      width={20}
      height={20}
    />
    <span className="mr-2 font-semibold hidden md:inline">Splits</span>
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
        titleTemplate: '%s – Splits',
      }
    }
  },
  logo,
  head: function useHead() {
    const { title } = useConfig()
    const socialCard = 'https://docs.splits.org/cover_docs.png'

    return (
      <>
        {/* Basic metadata */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
        {/* Page description */}
        <meta
          name="description"
          content="Learn how Splits powers onchain payments"
        />
        <meta
          name="og:description"
          content="Learn how Splits powers onchain payments"
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site" content="@0xsplits" />
        <meta name="twitter:site:domain" content="splits.org" />
        <meta name="twitter:url" content="https://www.splits.org/" />
        <meta name="twitter:title" content="Splits" />
        {/* Title */}
        <meta
          name="og:title"
          content={title ? title + ' | Splits' : 'Splits'}
        />
        <meta name="og:image" content={socialCard} />
        {/* Open Graph */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="apple-mobile-web-app-title" content="Splits" />
        <link rel="icon" href="/logo_compressed.svg" type="image/svg+xml" />
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
