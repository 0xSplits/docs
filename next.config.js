const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
})
module.exports = withNextra({
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevents the page from being loaded in an iframe (clickjacking prevention)
          { key: 'Content-Security-Policy', value: `frame-ancestors 'none';`}
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/sdk-info',
        destination: '/sdk',
        permanent: false,
      },
      // Just redirect any slug to the main page for now, not sure if they map
      // the same
      {
        source: '/sdk-info/:slug*',
        destination: '/sdk',
        permanent: false,
      },
    ]
  },
})
