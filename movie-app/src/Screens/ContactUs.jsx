import React from 'react'
import Layout from './../Layout/Layout'
import Head from '../Components/Head'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

function ContactUs() {
  const ContactData = [
    {
        id:1,
        title:"Email Us",
        info:"",
        icon:FiMail,
        contact:'SoulMovies@gmail.com'

    },
    {
        id:2,
        title:"Call Us",
        info:"",
        icon:FiPhone,
        contact:'+91 123 456 7890'

    }
    ,
    {
        id:3,
        title:"Location",
        info:"Pune , Maharashtra , INDIA ",
        icon:FiMapPin,
        contact:''

    }
  ]
  return (
    <Layout>
   <div className='min-height-screen container mx-auto px-2 my-6'>
   <Head title='Contact Us'/>
   <div className='grid mg:grid-cols-2 gap-6 lg-my-20 mt-10 lg:grid-cols-3 xl:gap-8'>
    
      {
        ContactData.map((item)=>(
            <div key={item.id} className='border border-border flex-colo p-10 bg-dry rounded-lg text-center'>
                <span className='flex-colo w-20  mb-4 h-20 rounded-full bg-main text-subMain text-2xl'>
                        <item.icon/>
                </span>
                <h5 className='text-xl font-semibold mb-2'>{item.title}</h5>
                <p className='mb-0 text-sm text-text leading-7'>
                    <a href={`mailto:${item.contact}`} className='text-grey-600'>{item.contact}</a>
                </p>
                {item.info}
            </div>
        ))}
      
    
   </div>
   </div>
   </Layout>
  )
}

export default ContactUs