import 'nextra-theme-docs/style.css'
import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism

require('prismjs/components/prism-solidity')

export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />
}
