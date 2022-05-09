import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { TweetBody } from '../typings'

interface Props {
  handleRefresh: (text: string) => Promise<void>
}
const TweetBox = ({ handleRefresh }: Props) => {
  const { data: session } = useSession()
  const [input, setInput] = useState<string>('')
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [image, setImage] = useState<string>('')
  const imageInputRef = useRef<HTMLInputElement>(null)

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return
    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setIsOpen(false)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const res = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await res.json()
    setImage('')
    setInput('')
    setIsOpen(false)
    handleRefresh('Tweet Added')
  }

  if (session) {
    return (
      <div className="flex select-none space-x-2 p-5">
        <img
          className="h-14 w-14 rounded-full object-cover"
          src={session.user?.image || ''}
          alt="profile"
        />
        <div className="flex flex-grow items-center pl-2">
          <form className="flex flex-grow flex-col">
            <textarea
              className="mb-3 w-full bg-transparent outline-none"
              placeholder="What's Happening?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div className="flex items-center">
              <div className="flex flex-grow items-center space-x-2 text-twitter">
                <PhotographIcon
                  onClick={() => setIsOpen(!isOpen)}
                  className="tweetBoxIcon"
                />
                <SearchCircleIcon className="tweetBoxIcon" />
                <EmojiHappyIcon className="tweetBoxIcon" />
                <CalendarIcon className="tweetBoxIcon" />
                <LocationMarkerIcon className="tweetBoxIcon" />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!input}
                className="rounded-full bg-twitter px-8 py-2 font-bold 
              text-white hover:bg-twitterHover
               disabled:cursor-not-allowed disabled:opacity-40"
              >
                Tweet
              </button>
            </div>
            {isOpen && (
              <form
                className="mt-5 flex items-center 
              justify-between rounded-md bg-twitterHover 
              px-4 py-2"
              >
                <input
                  ref={imageInputRef}
                  className="w-3/4 bg-transparent text-white 
                  outline-none placeholder:text-gray-100"
                  type="text"
                  placeholder="Enter Image Url"
                />
                <button
                  onClick={addImageToTweet}
                  className="ml-5  text-sm font-medium text-white"
                  type="submit"
                >
                  Add Image
                </button>
              </form>
            )}
            {image && (
              <img
                className="mt-3 h-60 w-full rounded-lg object-cover"
                src={image}
              />
            )}
          </form>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default TweetBox
