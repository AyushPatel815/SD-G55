'use client'
import React, { useState,useEffect } from 'react'
import NavBar from '../components/NavBar'
// import { redirect } from 'next/navigation'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button';
// import { LucideGavel } from 'lucide-react'
import Image from 'next/image'
import Background_img from "../../public/dashboard-img.png"


function page() {

  // for the background image
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

  const [gallons, setGallons] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNaN(Number(gallons)) || Number(gallons) <= 0) {
      setError("Invalid Input")
      return
    } else {

      setError("")
      // send to backend
      console.log(gallons, date)
    }
  }
  return (
    <div>

      <div>
        <NavBar />
      </div>

      {/* <Image
        className='absolute inset-0 object-cover object-center z-[-1]' // Changed z-index to -1 to ensure it's behind the form
        src='/dashboard-img.png'
        alt='Dashboard background'
        layout="fill" // Image should fill the parent div
      /> */}
      <div className='relative'>
        <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] brightness-[65%]'
          src={Background_img}
          alt={''} width={600} height={600}></Image>
      </div>

      <div className='flex items-center justify-center h-screen w-screen]'>
        {/* form begins here */}
        <form className=' border-yellow-50 bg-yellow/80 h-[70%] w-[34%] bg-transparent backdrop-blur-md  mb-20 border-[medium]  z-[10] rounded-[30px] ' onSubmit={handleSubmit} action={'/'}>
          <div className='flex text-yellow-50 items-center text-3xl h-[40]  font-bold ml-4'>
            <h1>Fuel Quote</h1>
          </div>

          <div className=' h-4'>

          </div>
          {/* gallons */}
          <div className="flex flex-col mb-4">
            <label htmlFor='gallon' className='text-yellow-50 text-[20px] ml-7'>
              Gallons Requested:
            </label>
            <input
              className='text-black-600 text-m min=0 border-2 border-gray-500 p-2 rounded-md focus:border-red-500 focus:ring-red-500 w-1/2 ml-7 mt-2'
              type='text'
              id='gallon'
              name='gallon'
              placeholder='Enter number of Gallons'
              value={gallons}
              onChange={(event) => setGallons(event.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-2 ml-7">{error}</p>}
          </div>

          {/*Delivery  */}
          <div className="flex flex-col mb-4">
            <label htmlFor='delivery' className='text-yellow-50 text-[20px] ml-7'>
              Delivery Address:
            </label>
            <p className='text-gray-600 text-m ml-8'>Enter delivery address</p>
          </div>

          {/* date */}
          <div className="flex flex-col mb-4">
            <label htmlFor='deliveryDate' className='text-yellow-50 text-[20px] ml-7'>
              Delivery Date:
            </label>
            <input
              className='text-gray-600 text-m border-2  border-gray-500 p-2 rounded-md w-1/2 ml-7 mt-2'
              type='date'
              id='deliveryDate'
              name='deliveryDate'
              placeholder='Select a date'
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          {/* price */}
          <div className="flex flex-col mb-4">
            <label htmlFor='Price' className='text-yellow-50 text-[20px] ml-7'>
              Suggested Price per Gallon:
            </label>
            <div
              className='text-black-600 text-m min=0 border-2 border-gray-500 p-2 rounded-md focus:border-red-500 focus:ring-red-500 w-1/2 ml-7 mt-2'
            > Price
            </div>
          </div>

          {/*submit button  */}
          <div>
            <button className='border-2 border-gray-500 p-3 rounded-md focus:border-blue-500 focus:ring-blue-500 mt-4 ml-4 w-[90%] text-white bg-blue-500 hover:bg-blue-600 transition duration-300'>
              Save
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default page

