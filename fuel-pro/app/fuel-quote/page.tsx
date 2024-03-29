'use client'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { redirect } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { LucideGavel } from 'lucide-react'
import Image from 'next/image'


function page() {

  const [formFields, setFormFields] = useState([
    { id: 'GallonsRequested', label: 'Gallons Requested', type: 'text', placeholder: 'Enter number of Gallons' },
    { id: 'DeliveryAddress', label: 'Delivery Address', type: 'label', placeholder: 'Enter delivery address' },
    { id: 'DeliveryDate', label: 'Delivery Date', type: 'date', placeholder: 'Select a date' },
    { id: 'Price', label: 'Suggested Price per Gallon', type: 'text', placeholder: 'Enter suggested price per gallon' },
  ]);

  const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
   e.preventDefault();

   if(isNaN(Number(gallons)) || Number(gallons) <= 0)
   {
    setError("Invalid Input")
    return
   }

   setError("")
   console.log(gallons,date)
  }

  const[gallons, setGallons] = useState("");
  const[date,setDate] = useState("");
  const [error, setError] = useState("");


  return (
    <div>

      <div>
      <NavBar />
      </div>

      <Image
        className='absolute inset-0 object-cover object-center z-[-1]' // Changed z-index to -1 to ensure it's behind the form
        src='/dashboard-img.png'
        alt='Dashboard background'
        layout="fill" // Image should fill the parent div
      />

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

