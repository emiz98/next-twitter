import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { signIn, useSession } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
import SidebarRow from './SidebarRow'

interface Props {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({ isDark, setIsDark }: Props) => {
  const { data: session } = useSession()
  return (
    <div className="col-span-2 flex min-h-screen select-none flex-col items-center px-3 md:items-start md:px-4">
      <div className="mb-10 flex w-full flex-col items-center justify-between md:mb-5 md:flex-row">
        <svg
          className="m-4 h-10 w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path
            fill="#03A9F4"
            d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"
          />
        </svg>
        {isDark ? (
          <SunIcon className="darkToggle" onClick={() => setIsDark(false)} />
        ) : (
          <MoonIcon className="darkToggle" onClick={() => setIsDark(true)} />
        )}
      </div>

      <SidebarRow Icon={HomeIcon} title="Home" selected={true} />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />

      <div className="border-1 my-5 w-full border-b border-gray-200 dark:border-gray-600 md:my-10" />
      {!session && (
        <SidebarRow onClick={signIn} Icon={UserIcon} title="Sign in" />
      )}
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar
