import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ApolloProvider } from '@apollo/client'
import Layout from 'components/Layout'
import apolloClient from 'lib/apolloClient'
import InfotainmentProvider from 'lib/InfotainmentContext'
import SidebarProvider from 'lib/SidebarContext'
import TempoProvider from 'lib/TempoContext'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SidebarProvider>
        <InfotainmentProvider>
          <TempoProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </TempoProvider>
        </InfotainmentProvider>
      </SidebarProvider>
      <ToastContainer position="bottom-left" />
    </ApolloProvider>
  )
}
export default MyApp
