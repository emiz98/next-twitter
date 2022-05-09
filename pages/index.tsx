import type { GetStaticProps, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  const [isDark, setIsDark] = useState(false)

  return (
    <div
      className={`noSelect max-h-screen overflow-hidden transition-all duration-500 ease-in-out
      ${isDark && 'dark bg-black'}`}
    >
      <Head>
        <title>Twitter 1.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-left" reverseOrder={false} />

      <main className="mx-auto grid grid-cols-10 lg:max-w-7xl">
        <Sidebar isDark={isDark} setIsDark={setIsDark} />
        <Feed tweets={tweets} />
        <Widgets isDark={isDark} />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweets()
  return {
    props: {
      tweets,
    },
  }
}
