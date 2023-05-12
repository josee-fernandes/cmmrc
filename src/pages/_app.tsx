import type { AppProps } from 'next/app'

import '~/styles/globals.css'
import '~/styles/page3d.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
