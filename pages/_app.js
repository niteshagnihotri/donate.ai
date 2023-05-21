import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Bars } from "react-loader-spinner";
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
  }, [router.events]);

  return (
    <>
    {
        <Head>
            <meta name="author" content="Nitesh Agnihotri"/>
            <title>Donate.ai - Most Trusted Crowdfunding Platform</title>
        </Head>
    }
      {
        loading ?
          <div className='bg-gray-900 w-100 h-[100vh] flex justify-center items-center'>
            <Bars
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div> :
          <Layout>
            <Component {...pageProps} />
          </Layout>
      }
    </>
  )
}
