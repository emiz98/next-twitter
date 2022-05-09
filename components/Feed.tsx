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
    })
  }

  return (
    <div className="col-span-8 max-h-screen overflow-y-scroll border-x scrollbar-hide dark:border-gray-600 dark:text-white lg:col-span-5">
      <div className="flex select-none items-center justify-between p-5">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center gap-x-5">
          {session && (
            <div
              onClick={() => signOut()}
              className="flex cursor-pointer items-center gap-x-2
             rounded-full border-2 border-twitter px-1 py-1 pr-3
             transition ease-out hover:bg-twitterHover hover:text-white"
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={session.user?.image || ''}
                alt="current_user"
              />
              <span className="text-sm font-medium">{session.user?.name}</span>
            </div>
          )}
          <RefreshIcon
            onClick={() => handleRefresh('Feed Updated!')}
            className="h-8 w-8 cursor-pointer text-twitter transition-all 
        duration-500 ease-out hover:rotate-180 active:scale-125"
          />
        </div>
      </div>

      <div>
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
