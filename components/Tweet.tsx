import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'

interface Props {
  handleRefresh: (text: string) => Promise<void>
  tweet: Tweet
}

const Tweet = ({ tweet, handleRefresh }: Props) => {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [input, setInput] = useState<string>('')
  const [commentsVisibility, setCommentsVisibility] = useState<Boolean>(false)

  useEffect(() => {
    refreshComments()
  }, [])

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (input == '') return
    console.log(input)
    postComment()
  }

  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      tweet: {
        _ref: '',
        _type: 'reference',
      },
    }

    const res = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    })

    const json = await res.json()
    setInput('')
    handleRefresh('Comment Added')
    refreshComments()
  }

  return (
    <div
      className="border-y border-gray-100 p-5 
    dark:border-gray-600"
    >
      <div className="flex items-start space-x-3 md:items-center">
        <img
          className="mt-1 w-10 rounded-full object-contain md:mt-0"
          src={tweet.profileImg}
          alt="profile"
        />
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="font-medium md:mr-2">{tweet.username}</p>
            <p className="mr-1 hidden text-sm md:inline-flex">
              @{tweet.username.replace(/\s+/g, '_').toLowerCase()} ·
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p>{tweet.text}</p>
        </div>
      </div>
      {tweet.image && (
        <img
          className="my-5 max-h-64 w-full rounded-lg
          object-cover shadow-md"
          src={tweet.image}
          alt="tweetImage"
        />
      )}
      <div className="mx-2 flex justify-between gap-x-2 text-gray-500">
        <div
          className="tweetIcon flex items-center justify-center gap-x-2"
          onClick={() => setCommentsVisibility(!commentsVisibility)}
        >
          <ChatAlt2Icon className="h-5" />
          <span>{comments.length}</span>
        </div>
        <SwitchHorizontalIcon className="tweetIcon" />
        <HeartIcon className="tweetIcon" />
        <UploadIcon className="tweetIcon" />
      </div>

      {commentsVisibility && comments.length > 0 && (
        <div
          className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll
      border-t border-gray-100 py-5 dark:border-gray-700"
        >
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <div className="absolute left-6 top-10 h-8 w-[1px] bg-twitterHover" />
              <img
                className="mt-2 h-8 w-8 rounded-full object-cover"
                src={comment.profileImg}
                alt="user_profile"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, '_').toLowerCase()} ·
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {session && (
        <div className="mt-2 flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none md:ml-3"
            type="text"
            placeholder="write a comment..."
          />
          <button
            onClick={handleSubmit}
            className="ml-4 rounded-md bg-twitter 
        px-4 py-1 text-white transition ease-out hover:bg-twitterHover"
          >
            Post
          </button>
        </div>
      )}
    </div>
  )
}

export default Tweet
