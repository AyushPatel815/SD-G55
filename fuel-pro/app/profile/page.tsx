"use client"

import React, { useEffect, useState } from 'react'

import NavBar from '../components/NavBar'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import Background_img from "../../public/dashboard-img.png"
import State from '../components/StateDropdown';

import axios from 'axios'; // Import Axios


function Profile() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:4000/profile', { profile: formData });
      console.log('Profile saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };




  return (

    <div>

      <NavBar />

      <div className='relative'>
      <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] brightness-[65%]'
        src={Background_img}
        alt={''} width={600} height={600}></Image>
      </div>
      
          {/* <main className='h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 '> */}
      
      <form className='bg-orange-100 flex justify-center ml-[35%] mt-[7%] items-center backdrop-blur-md rounded-lg w-[60%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] border bg-transparent border-yellow-50 shadow-lg' action="" onSubmit={handleSubmit}>
          <div className='max-w-full border w-full rounded-2xl text-yellow-50 font-semibold text-left p-8'>
            <h1 className='text-3xl font-bold mb-4'>Profile</h1>
            <p className=' mb-6 text-xl'>Edit your profile</p>
            <div>
              {/* Full Name */}
              <div className='pb-4 text-sm'>
                <label htmlFor="fullname" className='block text-sm pb-2'>First Name</label>
                <input className='border-2 border-gray-500 p-3 text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                required
                  type="text"
                name='firstName'
                id='firstName'
                value={formData.firstName}
                onChange={handleChange}
                  placeholder='Enter First Name' />

                  <label htmlFor="fullname" className='block text-sm pb-2 mt-3'>Last Name</label>
                  <input className='border-2 border-gray-500 p-3 text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  required
                name='lastName'
                id='lastName'
                value={formData.lastName}
                onChange={handleChange}
                  placeholder='Enter Last Name' />

              </div>
              {/* Address1 */}
              <div className='pb-4'>
                <label htmlFor="address1" className='block text-sm pb-2'>Address1</label>

                <input className='border-2 border-gray-500 text-black p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  required
                  name='address1'
                  id='address1'
                value={formData.address1}
                onChange={handleChange}
                  placeholder='Enter Address1' />
              </div>
              {/* Address2 */}
              <div className='pb-4'>
                <label htmlFor="address2" className='block text-sm pb-2'>Address2</label>

                <input className='border-2 text-black border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'

                  type="text"
                  name='address2'
                  id='address2'
                value={formData.address2}
                onChange={handleChange}
                  placeholder='Enter Address2' />
              </div>
              {/* City */}
              <div className='pb-4'>
                <label htmlFor="city" className='block text-sm pb-2'>City</label>

                <input className='border-2 text-black border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  required

                  name='city'
                  id='city'
                value={formData.city}
                onChange={handleChange}
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

                <input className='border-2 text-black border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  type="text"
                  name='zip'
                  required

                  id='zip'
                value={formData.zip}
                onChange={handleChange}
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

    

      </div>

  )
}

export default Profile
function setScreenWidth(innerWidth: number) {
  throw new Error('Function not implemented.');
}

