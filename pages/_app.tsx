import '../styles/globals.css'
import Layout from 'components/Layout'
import { ToastContainer } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import apolloClient from 'lib/apolloClient'
import type { AppProps } from 'next/app'
import TempoProvider from 'lib/tempo'

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
