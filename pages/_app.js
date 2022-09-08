import Prism from 'prism-react-renderer/prism'
import 'nextra-theme-docs/style.css'
;(typeof global !== 'undefined' ? global : window).Prism = Prism

import '../styles.css'

require('prismjs/components/prism-solidity')

export default function Nextra({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
