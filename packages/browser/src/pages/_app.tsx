import { Provider as ReduxProvider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import '../index.css'
import 'react-toastify/dist/ReactToastify.css'
import makeStore from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ReduxProvider store={makeStore()} >
        <Component {...pageProps} />
      </ReduxProvider>
    </SessionProvider>
  )
}

export default MyApp
