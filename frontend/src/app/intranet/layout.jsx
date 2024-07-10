import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex min-h-screen w-full flex-col md:px-20 pt-20 bg-black px-10 text-white'>
        {children}
    </div>
  )
}

export default layout