import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app'

import '../index.css'
import 'react-toastify/dist/ReactToastify.css'
import makeStore from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={makeStore()} >
      <Component {...pageProps} />
    </ReduxProvider>
  )
}

export default MyApp
