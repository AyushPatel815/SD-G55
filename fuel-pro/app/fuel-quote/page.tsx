'use client'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { redirect } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

import { LucideGavel } from 'lucide-react'

import Image from 'next/image'

// THIS CODE IS EXTREMELY MESSY I AM SORRY
// I will go back through before the next assignment and clean it up so it is easier to work with in the future

function page() {

  const [formFields, setFormFields] = useState([
    { id: 'GallonsRequested', label: 'Gallons Requested', type: 'text', placeholder: 'Enter number of Gallons' },
    { id: 'DeliveryAddress', label: 'Delivery Address', type: 'text', placeholder: 'Enter delivery address' },
    { id: 'DeliveryDate', label: 'Delivery Date', type: 'date', placeholder: 'Select a date' },
    { id: 'Price', label: 'Suggested Price per Gallon', type: 'text', placeholder: 'Enter suggested price per gallon' },
  ]);



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
        <form className=' border-yellow-50 bg-yellow/80 h-[70%] w-[34%] bg-transparent backdrop-blur-md  mb-20 border-[medium]  z-[10] rounded-[30px]'>
          <div className='flex text-yellow-50 items-center text-3xl h-[40]  font-bold ml-4'>
            <h1>Fuel Quote</h1>
          </div>

          <div className=' h-4'>

          </div>

          {formFields.map((field) => (
            <div key={field.id} className="flex flex-col mb-4">
               {field.id === 'Price' && <p className=' text-yellow-50'>-------------------------------------------------------------------</p>} {/* Render only for Price field */}
              <label htmlFor={field.id} className=' text-yellow-50 text-[20px] ml-7'>
                {field.label}:
              </label>
              {field.type === 'text' ? (
                <input
                  type='text'
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  className='text-black-600 text-m min=0 border-2 border-gray-500 p-2 rounded-md focus:border-red-500 focus:ring-red-500 w-1/2 ml-7 mt-2'
                />
              ) : field.type === 'date' ? (
                <input
                  type='date'
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  className='text-gray-600 text-m  border-2  border-gray-500 p-2 rounded-md w-1/2 ml-7 mt-2'
                />
              ) : (
                <p className='text-gray-600 text-m'>{field.placeholder}</p>
              )}
            </div>
          ))}
        </form>
      </div>

    </div>
  )
}

export default page


// function page(){
//   return(
// <div>
// {/* Full Name */}
// <div className='pb-4 text-sm'>
//   <label htmlFor="fullname" className='block text-sm pb-2'>First Name</label>
//   <input className='border-2 border-gray-500 p-3 text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full'
//   required
//     type="text"
//     name='first name'
//     id='first name'
//     placeholder='Enter First Name' />

//     <label htmlFor="fullname" className='block text-sm pb-2 mt-3'>Last Name</label>
//     <input className='border-2 border-gray-500 p-3 text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full'
//     type="text"
//     required
//     name='lastname'
//     id='last name'
//     placeholder='Enter Last Name' />

// </div>
// {/* Address1 */}
// <div className='pb-4'>
//   <label htmlFor="address1" className='block text-sm pb-2'>Address1</label>

//   <input className='border-2 border-gray-500 text-black p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
//     type="text"
//     required
//     name='address1'
//     id='address1'
//     placeholder='Enter Address1' />
// </div>
// {/* Save button */}
// <div>
//   <button className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 mt-4 w-full text-white bg-red-500 hover:bg-red-600 transition duration-300'>
//     Save
//   </button>
// </div>
// </div>
// )
// }

// export default page


// function page() {

//   const [formFields, setFormFields] = useState([
//     { id: 'GallonsRequested', label: 'Gallons Requested', type: 'text', placeholder: 'Enter number of Gallons' },
//     { id: 'DeliveryAddress', label: 'Delivery Address', type: 'text', placeholder: 'Enter delivery address' },
//     { id: 'DeliveryDate', label: 'Delivery Date', type: 'date', placeholder: 'Select a date' },
//     { id: 'Price', label: 'Suggested Price per Gallon', type: 'text', placeholder: 'Enter suggested price per gallon' },
//   ]);



//   return (
//     <div>
//       <NavBar />
//       <div className='relative'>
//       <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] brightness-[65%]'
//         src='/dashboard-img.png'
//         alt={''} width={600} height={600}></Image>
//       </div>
//       <div className='flex h-screen w-[50%] mt-[100] ml-[25%] mx-20  z-[50] justify-center'>
//       <div className='mt-[8%] border-yellow-50 bg-yellow/80 h-[60%] w-[100%] bg-transparent backdrop-blur-md  border-[medium] mx-80 z-[10] rounded-[30px]'>
//         <form>
//           <div className='flex text-yellow-50 items-center text-3xl h-[40] mt-[5%] font-bold ml-5'>
//             <h1>Fuel Quote:</h1>
//           </div>
//           <br />
//           {formFields.map((field) => (
//             <div key={field.id}>
//               <label htmlFor={field.id} className=' text-yellow-50 mt-[5%] text-[20px] ml-9'>
//                 {field.label}:
//               </label>
//               {field.type === 'text' ? (
//                 <input
//                   type='text'
//                   id={field.id}
//                   name={field.id}
//                   placeholder={field.placeholder}
//                   className='text-black-600 text-m w-[225px] ml-9 min=0 mt-[5%] border-2 border-gray-500 p-2 rounded-md focus:border-red-500 focus:ring-red-500'
//                 />
//               ) : field.type === 'date' ? (
//                 <input
//                   type='date'
//                   id={field.id}
//                   name={field.id}
//                   placeholder={field.placeholder}
//                   className='text-gray-600 text-m ml-9 border-2 mt-[5%] border-gray-500 p-2 rounded-md'
//                 />
//               ) : (
//                 <p className='text-gray-600 text-m ml-9'>{field.placeholder}</p>
//               )}
//               <br />
//               <br />
//               <br />
//               {field.id !== 'Price' && <p className=' text-yellow-50'>---------------------------------------------------------------------------</p>}
//             </div>
//           ))}
//         </form>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default page