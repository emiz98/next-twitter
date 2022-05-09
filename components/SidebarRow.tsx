import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  selected?: boolean
  onClick?: () => {}
}

const SidebarRow = ({ Icon, title, selected, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className={`group flex w-full cursor-pointer items-center rounded-full px-3 py-3 transition-all
    ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 md:space-x-2 md:px-4 ${
      selected && 'bg-gray-100 dark:bg-gray-800'
    }`}
    >
      <Icon
        className={`h-6 w-6 dark:text-gray-300 ${
          selected && 'text-twitter dark:text-twitter'
        }`}
      />
      <p
        className={`hidden group-hover:text-twitter dark:text-gray-300 md:inline-flex ${
          selected && 'font-bold !text-twitter'
        }`}
      >
        {title}
      </p>
    </div>
  )
}

export default SidebarRow
