import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import apolloClient from 'lib/apolloClient'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
