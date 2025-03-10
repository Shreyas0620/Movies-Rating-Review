import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
      <img className='w-full h-96 object-contain' alt="Page not found" src='/images/4041.gif'/>
      <h1 className='lg:text-4xl font-bold'>OOPS....! Error  404 Page Not Found</h1>
      <p className='font-medium text-border italic leading-6'>The page you are looking for is does not exist. You may have type incorrect url</p>
      <Link to="/" className='bg-subMain text-white font-medium py-2 px-4 rounded-md'>
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound