import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { ApolloProvider } from '@apollo/client'
import Layout from 'components/Layout'
import apolloClient from 'lib/apolloClient'
import TempoProvider from 'lib/TempoContext'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <TempoProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TempoProvider>
      <ToastContainer position="bottom-left" />
    </ApolloProvider>
  )
}
export default MyApp
