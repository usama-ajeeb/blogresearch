import { Provider } from 'react-redux'
import { store, persistor } from '../store'
import 'tailwindcss/tailwind.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as NextProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    // <NextProvider session={pageProps.session}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
    // </NextProvider>
  )
}

export default MyApp
