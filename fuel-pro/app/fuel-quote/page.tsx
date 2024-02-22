'use client'
import React from 'react'
import NavBar from '../components/NavBar'
import { redirect } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

import '@radix-ui/themes/styles.css';
import { LucideGavel } from 'lucide-react'

import Image from 'next/image'

// THIS CODE IS EXTREMELY MESSY I AM SORRY
// I will go back through before the next assignment and clean it up so it is easier to work with in the future

function page() {
  return (
    <div>
      <NavBar />
      <div className='relative'>
      <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] md:bg-transparent brightness-50'
        src='/dashboard_image.avif'
        alt={''} width={600} height={600}></Image>
      </div>

      
      <div className='flex  h-screen  w-[1200px] mt-[100] mx-20  z-[50] ml-40' >
        {/* Edit the line below to change the color for the fuel quote form */}
          <div className='mt-[90px]  border-[#1b1b5bc8] bg-[white] h-[80%] w-[100%] border-[medium] mx-80  z-[10] rounded-[30px]'>
          <form>
          <div className=' flex items-center text-3xl h-[40] ml-5'>
            <h1 >Fuel Quote:</h1>
          </div>
          <br/>
            <div>
              {/* This will affect the gallonrequested container  */}
              <label htmlFor='GallonsRequested' className='text-gray-600 text-[20px] ml-9'>Gallons Requested:</label>
              <br/>
              <input type='text' id = 'GallonsRequested' name = 'GallonsRequested' placeholder='Enter number of Gallons' className='text-black-600 text-m w-[225px] ml-9 min = 0 border-2 border-gray-500 p-2 rounded-md focus:border-red-500 focus:ring-red-500'></input>
            </div>
            <br />
            <div>
              {/* This will affect the delivery address container */}
              <label htmlFor='Delievery Address' className='text-gray-600 text-[20px] ml-9'>Delievery Address:</label>
              <p className='text-gray-600 text-m  ml-9'>Ex Address: 4300 Martin Luther King Blvd</p>
            </div>
            <br />
            <div>
              {/* Below you can edit Delievery Date */}
              <label htmlFor='DeliveryDate' className='text-gray-600 text-[20px]  ml-9'>Delivery Date:</label>
              <br/>
              <input type='date' id = 'DeliveryDate' name= 'DeliveryDate' placeholder='select a date' className='text-gray-600 text-m  ml-9 border-2 border-gray-500 p-2 rounded-md'></input>
              <br/>
              <br/>
              <p>---------------------------------------------------------------------------</p>
            </div>
            <br />
            <div>
              {/*  */}
              <label htmlFor='Suggested Price per Gallon' className='text-gray-600 text-[20px]  ml-9'>Price:</label>
                <p className='text-gray-600 text-m  ml-9'>Total Price</p>
            </div>
          </form>
          </div>
      </div>
    </div>
  )
}

export default page
