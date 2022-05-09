import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

// interface Props {
//   tweets: Tweet[]
// }

const Home = () => {
  const [isDark, setIsDark] = useState(false)
  const [tweets, setTweets] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const tweets = await fetchTweets()
      setTweets(tweets)
    }
    fetchData()
  }, [])

  return (
    <div
      className={`mx-auto max-h-screen overflow-hidden transition-all duration-500 ease-in-out
      lg:max-w-7xl ${isDark && 'dark bg-[#292F33]'}`}
    >
      <Head>
        <title>Twitter 1.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-left" reverseOrder={false} />

      <main className="grid grid-cols-10">
        <Sidebar isDark={isDark} setIsDark={setIsDark} />
        <Feed tweets={tweets} />
        <Widgets isDark={isDark} />
      </main>
    </div>
  )
}

export default Home

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const tweets = await fetchTweets()
//   return {
//     props: {
//       tweets,
//     },
//   }
// }
