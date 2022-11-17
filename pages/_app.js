import Layout from '../components/layout/Layout'
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) { //pageProps are form serversiderendering, for example return {props: {session}} from profile.js
  //we can set props to sessionprovider and then nextAuth can skip extra session check from useSession()
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
