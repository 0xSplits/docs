import { Inter } from 'next/font/google'

import Prism from 'prism-react-renderer/prism'
import 'nextra-theme-docs/style.css'
;(typeof global !== 'undefined' ? global : window).Prism = Prism

import '../styles.css'

require('prismjs/components/prism-solidity')

const inter = Inter({ subsets: ['latin'] })

export default function Nextra({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>,
  )
}
