import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CLIENT_ORIGIN } from './util/requests'

const logo = (
  <>
    {/* next/image does not prefix basePath here, so include it explicitly. */}
    <Image
      src="/protocol/docs/logo.svg"
      className="mr-2 rounded-lg"
      alt="splits_logo"
      width={20}
      height={20}
    />
    <span className="mr-2 font-semibold hidden md:inline">Protocol</span>
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
    // The docs are reverse-proxied to splits.org/protocol/docs but the origin
    // deployment is also directly reachable, so declare the splits.org URL as
    // canonical. splits.org serves the trailing-slash form (308 otherwise), so
    // the canonical points there. asPath excludes basePath and may carry a
    // query/hash on client-side navigation.
    const path = asPath.split(/[?#]/)[0]
    const canonical = `https://splits.org/protocol/docs${
      path === '/' ? '' : path
    }/`
    if (asPath !== '/') {
      return {
        titleTemplate: '%s | Protocol',
        canonical,
      }
    }
    return { canonical }
  },
  logo,
  head: function useHead() {
    const { title } = useConfig()
    // basePath ('/protocol/docs') moves the OG route handler under that prefix,
    // and OG scrapers need an absolute URL, so include it explicitly.
    const ogImage = `${CLIENT_ORIGIN}/protocol/docs/api/og?title=${encodeURIComponent(
      title,
    )}`

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
          content="Software to manage onchain earnings"
        />
        <meta
          name="og:description"
          content="Software to manage onchain earnings"
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@0xsplits" />
        <meta name="twitter:site:domain" content="splits.org" />
        <meta name="twitter:url" content="https://www.splits.org/" />
        <meta
          name="twitter:title"
          content={title ? title + ' | Protocol' : 'Protocol'}
        />
        <meta
          name="twitter:description"
          content="Software to manage onchain earnings"
        />
        {/* Title */}
        <meta
          name="og:title"
          content={title ? title + ' | Protocol' : 'Protocol'}
        />
        <meta name="og:image" content={ogImage} />
        {/* Open Graph */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://splits.org/protocol/docs" />
        <meta property="og:site_name" content="splits.org/protocol/docs" />
        <meta name="apple-mobile-web-app-title" content="Protocol" />
        {/* Raw <link> tags are not basePath-prefixed automatically, so the
            '/protocol/docs' prefix is included explicitly. */}
        <link
          rel="icon"
          href="/protocol/docs/logo_compressed.svg"
          type="image/svg+xml"
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
          Questions? Contact us at{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:support@splits.org"
          >
            support@splits.org
          </a>
        </div>
        <div>© {new Date().getFullYear()} Splits Protocols, Inc.</div>
      </div>
    ),
  },
}

export default config
