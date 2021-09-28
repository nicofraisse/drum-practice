import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import Layout from 'components/Layout'
import apolloClient from 'lib/apolloClient'
import TempoProvider from 'lib/tempo'
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
      <ToastContainer />
    </ApolloProvider>
  )
}
export default MyApp
