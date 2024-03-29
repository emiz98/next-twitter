import { RefreshIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import TweetComponent from './Tweet'
import TweetBox from './TweetBox'

interface Props {
  tweets: Tweet[]
}
const Feed = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  const { data: session } = useSession()

  const handleRefresh = async (text: string) => {
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets()
    setTweets(tweets)
    toast.success(text, {
      id: refreshToast,
      style: {
        background: '#333',
        color: '#fff',
      },
    })
  }

  return (
    <div className="col-span-8 max-h-screen overflow-y-scroll border-x scrollbar-hide dark:border-gray-600 dark:text-white lg:col-span-5">
      <div className="fixed top-0 z-50 flex w-[19rem] select-none items-center justify-between bg-white px-5 py-4 dark:bg-black md:w-[39.9rem] md:p-5">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center gap-x-5">
          {session && (
            <div
              onClick={() => signOut()}
              className="flex cursor-pointer items-center rounded-full
             border-2 border-twitter px-1 py-1 transition ease-out
             hover:bg-twitterHover hover:text-white md:gap-x-2 md:pr-3"
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={session.user?.image || ''}
                alt="current_user"
              />
              <span className="hidden text-sm font-medium md:inline">
                {session.user?.name}
              </span>
            </div>
          )}
          <RefreshIcon
            onClick={() => handleRefresh('Feed Updated!')}
            className="h-8 w-8 cursor-pointer text-twitter transition-all 
        duration-500 ease-out hover:rotate-180 active:scale-125"
          />
        </div>
      </div>

      <div className="mt-20">
        <TweetBox handleRefresh={handleRefresh} />
      </div>

      <div>
        {tweets.map((tweet) => (
          <TweetComponent
            handleRefresh={handleRefresh}
            key={tweet._id}
            tweet={tweet}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
