import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
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
    const t = toast.loading('Processing Tweet')
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
    toast.remove()
    setImage('')
    setInput('')
    setIsOpen(false)
    handleRefresh('Tweet Added')
  }

  if (session) {
    return (
      <div className="flex select-none space-x-2 pr-5 pb-5 md:p-5">
        <img
          className="hidden h-14 w-14 rounded-full object-cover md:inline"
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
            <div className="flex flex-col items-center gap-y-3 md:flex-row">
              <div className="flex flex-grow items-center space-x-5 text-twitter md:space-x-4">
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
                className="w-full rounded-md bg-twitter px-8 py-2 font-bold text-white 
              hover:bg-twitterHover disabled:cursor-not-allowed disabled:opacity-40
               md:w-auto md:rounded-full"
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
                  className="w-3/5 bg-transparent text-xs text-white outline-none placeholder:text-gray-100
                  md:w-3/4 md:text-base"
                  type="text"
                  placeholder="Enter Image Url"
                />
                <button
                  onClick={addImageToTweet}
                  className="ml-5 text-xs font-medium text-white md:text-sm"
                  type="submit"
                >
                  Add Image
                </button>
              </form>
            )}
            {image && (
              <img
                className="mt-3 h-32 w-full rounded-lg object-cover md:h-60"
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
