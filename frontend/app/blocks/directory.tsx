import React from 'react'
import Image from 'next/image'
import { links } from "../../data/index"

interface DirectoryProps {
  activeLink: string;
}

function Directory({ activeLink }: DirectoryProps) {
  const activeLinkData = links.find(link => link.href === activeLink);

  return (
    <div className='text-black'>
      {activeLinkData && (
        <div className='flex items-center'>
          <Image src="/folder.svg" alt="system" className="text-white h-6 w-6 flex-shrink-0" width={24} height={24} />
          <h1 className='ml-1'>{activeLinkData.href}</h1>
        </div>
      )}
    </div>
  )
}

export default Directory