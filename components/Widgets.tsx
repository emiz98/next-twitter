import { SearchIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

interface Props {
  isDark: boolean
}

const Widgets = ({ isDark }: Props) => {
  const [input, setInput] = useState('')
  return (
    <div className="col-span-3 mt-2 hidden px-2 lg:inline-block">
      <div
        className="mx-10 mt-2 flex items-center
       space-x-2 rounded-full bg-gray-100 px-4 py-3 dark:bg-gray-700 dark:text-white"
      >
        <SearchIcon className="h-6 w-6 text-gray-400" />

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search Twitter"
        />
      </div>

      <div className="mt-3 flex justify-center">
        {isDark ? (
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={input != '' ? input : 'sonnysangha'}
            options={{ height: 1000 }}
            theme="dark"
            noBorders={true}
            noFooter={true}
          />
        ) : (
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={input != '' ? input : 'sonnysangha'}
            options={{ height: 1000 }}
            theme="light"
            noBorders={true}
            noFooter={true}
          />
        )}
      </div>
    </div>
  )
}

export default Widgets
