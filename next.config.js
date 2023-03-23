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
  // async redirects() {
  //   return [
  //     {
  //       source: '/sdk',
  //       destination: '/sdk-info/overview',
  //       permanent: false,
  //     },
  //   ]
  // },
})
