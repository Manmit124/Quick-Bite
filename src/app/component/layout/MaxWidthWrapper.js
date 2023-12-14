import { cn } from '@/app/utils/app'
import React, { Children } from 'react'

const MaxWidthWrapper = ({children}) => {
  return (
    <div className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20'
    )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
