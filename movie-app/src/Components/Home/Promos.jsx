import React from 'react'
import {FiUser} from 'react-icons/fi'

function Promos() {
  return (

    <div className='my-20 py-10 md:px-20 px-8 bg-dry'>
      <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center'>
        <div className='flex lg:gap-10 gap-6 flex-col'>
          <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed'>
            Download Your Movies & Watch Seamlessly <br/> Appreciate on Your Gadgets
          </h1>
          <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
          Discover a world of cinematic delight at your fingertips with our cutting-edge app. Seamlessly access your favorite movies and TV shows on all your devices, whether it's your smartphone, tablet, or computer.
          </p>
          <div className='flex gap-4 md:text-lg text-sm'>
            <div className='flex-colo bg-black text-subMain px-6 py-3 rouded-md font-bold'>
              UHD 4K
            </div>
            <div className=' flex bg-black flex-row gap-4 text-subMain px-6 py-3 rouded-md font-bold'>
             <FiUser className='mt-1'/> SHD
            </div>
          </div>
        </div>
        <div>
          <img src="/images/mobile2.png" alt="mobile app" className='w-full object-contain' />
        </div>
      </div>
    </div>



    )
}

export default Promos