const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_flexsearch: true,
  unstable_contentDump: true,
  unstable_staticImage: true,
})
module.exports = withNextra({
  async redirects() {
    return [
      {
        source: '/sdk',
        destination: '/sdk-info/overview',
        permanent: false,
      },
    ]
  },
})
