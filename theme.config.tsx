import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Image from 'next/image'

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

// Nextra's default icon carries an SVG <title>, which site auditors count as a
// second document title.
const githubIcon = (
  <svg
    role="img"
    aria-label="GitHub"
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const config: DocsThemeConfig = {
  project: {
    link: 'https://github.com/0xSplits',
    icon: githubIcon,
  },
  docsRepositoryBase: 'https://github.com/0xSplits/docs',
  useNextSeoProps() {
    const { asPath } = useRouter()
    const { title } = useConfig()
    // The docs are reverse-proxied to splits.org/protocol/docs but the origin
    // deployment is also directly reachable, so declare the splits.org URL as
    // canonical. splits.org serves the trailing-slash form (308 otherwise), so
    // the canonical points there. asPath excludes basePath and may carry a
    // query/hash on client-side navigation.
    const path = asPath.split(/[?#]/)[0]
    const canonical = `https://splits.org/protocol/docs${
      path === '/' ? '' : path
    }/`
    // The OG route lives under basePath and scrapers need an absolute URL on
    // the public host, not the per-deploy Vercel hostname (which is noindexed).
    const ogImage = `https://splits.org/protocol/docs/api/og/?title=${encodeURIComponent(
      title,
    )}`
    const shared = {
      canonical,
      openGraph: {
        url: canonical,
        siteName: 'Splits',
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      },
      twitter: { site: '@0xsplits', cardType: 'summary_large_image' },
    }
    if (path !== '/') {
      return { ...shared, titleTemplate: '%s | Protocol' }
    }
    // The index H1 is "Docs"; keep it short on the page and in the OG image
    // but give search results a descriptive title. next-seo remembers the last
    // titleTemplate it saw across prerenders, so reset it explicitly.
    return {
      ...shared,
      title: 'Splits Protocol docs: Split, Waterfall and Swapper contracts',
      titleTemplate: '%s',
    }
  },
  logo,
  head: (
    <>
      <meta charSet="utf-8" />
      <meta name="msapplication-TileColor" content="#fff" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="apple-mobile-web-app-title" content="Protocol" />
      {/* Raw <link> tags are not basePath-prefixed automatically, so the
          '/protocol/docs' prefix is included explicitly. */}
      <link
        rel="icon"
        href="/protocol/docs/logo_compressed.svg"
        type="image/svg+xml"
      />
    </>
  ),
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
