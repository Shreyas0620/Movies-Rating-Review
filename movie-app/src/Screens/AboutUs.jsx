import React from 'react'
import Layout from './../Layout/Layout'
import Head from '../Components/Head'
function AboutUs() {
  return (
   <Layout>
   <div className='min-height-screen container mx-auto px-2 my-6'>
   <Head title='About Us'/>
   <div className='xl:py-20 py-10 px-4'>
    <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-4 items-center'>
      <div>
        <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
          Welcome to Soul-Movies Community
        </h3> 
        <div className='mt-3 text-sm leading-8 text-text'>
        <p>
        At Soul Movies, our community is the heart and soul of everything we do. We believe in the power of shared experiences and the magic of cinema to bring people together. Whether you're a passionate film enthusiast, a casual moviegoer, or someone simply looking for recommendations, our platform is designed to foster connections and conversations around the films that move us, inspire us, and shape our perspectives. Join us in celebrating the art of storytelling, exploring diverse narratives, and discovering hidden gems as we embark on a journey through the boundless world of cinema, united by our love for the silver screen.
        </p>
        <p>
        Our community at Soul Movies thrives on shared passion for cinema, welcoming enthusiasts from diverse backgrounds. We value every voice and encourage vibrant discussions on our platform. Through events and collaborative projects, we foster unity and camaraderie among members. Join us in celebrating the magic of storytelling and the power of cinema to inspire and unite
        </p>
      </div>
      <div className='grid md:grid-cols-2 gap-6 mt-8 '>
        <div className='p-8 bg-dry rounded-lg'>
          <span className='text-3xl block font-extrabold'>
            10K
          </span>
          <h4 className='text-lg font-semibold my-2'>Listed Movies</h4>
          <p className='mb-0 text-text leading-7 text-sm'>Discover our vast collection of listed movies, from classics to contemporary favorites. Your next cinematic adventure awaits!</p>
        </div>

        <div className='p-8 bg-dry rounded-lg'>
          <span className='text-3xl block font-extrabold'>
           5k
          </span>
          <h4 className='text-lg font-semibold my-2'>Great User</h4>
          <p className='mb-0 text-text leading-7 text-sm'>Join fellow movie lovers and discover a world of cinematic delights in our curated collection. Your next favorite film awaits!</p>
        </div>

      </div>
      </div>
      <div className='mt-10 lg:mt-0'>
        <img src="/images/a.jpg" alt="aboutus" className='w-full xl:block  hidden h-header rounded-lg object-cover' />
      </div>
    </div>
   </div>
   </div>
   </Layout>
  )
}

export default AboutUs