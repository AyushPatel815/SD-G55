"use client"
import React, { useEffect, useState } from 'react'

import NavBar from '../components/NavBar'
import Image from 'next/image'
import dynamic from 'next/dynamic';

import State from '../components/StateDropdown';

function Profile() {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    // Function to update screenWidth when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial screenWidth
    setScreenWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  // Calculate dynamic width and height based on screen size
  const dynamicWidth = Math.min(screenWidth, 2600); // You can adjust the maximum width as needed
  const dynamicHeight = (9 / 16) * dynamicWidth; // Assuming a 16:9 aspect ratio
  return (

    <div>
      <NavBar />
      {/*  <Image className=' h-screen flex items-center justify-center bg-cover bg-center -z-50 md:bg-transparent brightness-50 ' src='/dashboard_image.avif' alt={''} width={dynamicWidth}
                height={dynamicHeight} layout={{type: "responsive"}} ></Image> */}
          {/* Add the form here */}
          <main className='h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 '>
      {/* <main className='h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-purple-900 '> */}
        <form className='bg-orange-100 flex justify-center items-center rounded-lg w-[60%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%]  font-serif border border-red-100 shadow-lg' action="">
          <div className='max-w-full border w-full rounded-2xl text-gray-700 text-left p-8'>
            <h1 className='text-3xl font-bold mb-4'>Profile</h1>
            <p className='text-sm mb-6'>Edit your profile</p>
            <div>
              {/* Full Name */}
              <div className='pb-4'>
                <label htmlFor="fullname" className='block text-sm pb-2'>Full Name</label>
                <input className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  name='fullname'
                  id='fullname'
                  placeholder='Enter Full Name' />
              </div>
              {/* Address1 */}
              <div className='pb-4'>
                <label htmlFor="address1" className='block text-sm pb-2'>Address1</label>
                <input className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  name='address1'
                  id='address1'
                  placeholder='Enter Address1' />
              </div>
              {/* Address2 */}
              <div className='pb-4'>
                <label htmlFor="address2" className='block text-sm pb-2'>Address2</label>
                <input className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  name='address2'
                  id='address2'
                  placeholder='Enter Address2' />
              </div>
              {/* City */}
              <div className='pb-4'>
                <label htmlFor="city" className='block text-sm pb-2'>City</label>
                <input className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  name='city'
                  id='city'
                  placeholder='Enter City' />
              </div>
              {/* State */}
              <div className='pb-4'>
                {/* <label htmlFor="state" className='block text-sm pb-2'>State</label>
                <select name="state" id="state" className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="CA">California</option>
                </select> */}
                <State />
              </div>
              {/* Zip code */}
              <div className='pb-4'>
                <label htmlFor="zip" className='block text-sm pb-2'>Zip Code</label>
                <input className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  name='zip'
                  id='zip'
                  placeholder='Enter Zip Code' />
              </div>
              {/* Save button */}
              <div>
                <button className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 mt-4 w-full text-white bg-red-500 hover:bg-red-600 transition duration-300'>
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
      </div>

  )
}

export default Profile
