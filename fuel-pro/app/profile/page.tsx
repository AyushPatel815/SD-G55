"use client"

import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
import NavBar from '../components/NavBar'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import Background_img from "../../public/dashboard-img.png"
// import State from '../components/StateDropdown';

import axios from 'axios'; // Import Axios


function Profile() {


  // Define types for form data and errors
  type FormData = {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
  };


  // Initialize state with explicit types
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: ''
  });


  type FormErrors = {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
  };

  const [errors, setErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: ''
  });



  const validateInput = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        return value.trim().length > 1 && value.trim().length <= 50 ? '' : 'Invalid name (maximum 50 characters)';
      case 'lastName':
        return value.trim().length > 1 && value.trim().length <= 50 ? '' : 'Invalid name (maximum 50 characters)';
      case 'address1':
        return value.trim().length > 1 && value.trim().length <= 100 ? '' : 'Invalid address';
      case 'city':
        return value.trim().length > 1 && value.trim().length <= 100 ? '' : 'Invalid city';
      // case 'state':
      //   return value ? '' : 'Please select a state';
      case 'zipcode':
        return /^\d{5,9}$/.test(value) ? '' : 'Invalid zipcode code (5-9 characters)';
      default:
        return '';
    }
  };


  

  const inputcss = 'border-2 border-gray-500 p-1  text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full sm:p-3'



  // list of objects that contains the US States
  const usStates = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];



  // handeling changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log('change', e.target.value)
  }
  // handleing state changes
  const handleSelectState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(`Selected state: ${newState}`);
  };

  // checking validation before submiting to the backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submitting
    const formErrors: FormErrors = {} as FormErrors; // Specify the type explicitly
    Object.keys(formData).forEach((key) => {
      formErrors[key as keyof FormErrors] = validateInput(key, formData[key as keyof FormData]);
    });
    setErrors(formErrors);

    // Check if there are any errors
    const isValid = Object.values(formErrors).every((error) => !error.trim());

    if (isValid) {
      console.log('Form submitted:', formData);
      // Send the updated answer to the backend
      // submiting to the backend
      try {
        const response = await axios.post('http://localhost:4000/profile', formData, { withCredentials: true });
        console.log('Profile data:', response.data);

        console.log('Profile saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving profile:', error);
      }

    } else {
      console.log('Form contains errors. Please fix them before submitting.');
    }

  }

  useEffect(() => {
    // Define a function to fetch user data
    const fetchUserProfile = async () => {
      try {
        // Make API call to fetch user profile data
        const response = await axios.get('http://localhost:4000/profile', { withCredentials: true });

        // Set form data with fetched data
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    // Call the fetchUserProfile function when component mounts
    fetchUserProfile();
  }, []);

  // Return
  return (
    <div>

      <NavBar />

      <div className='relative'>
        <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] brightness-[65%]'
          src={Background_img}
          alt={''} width={600} height={600}></Image>
      </div>


      {/* <main className='h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 '> */}

      <div className='flex justify-center  items-center'>
        <form className=' border backdrop-blur-md rounded-2xl text-yellow-50 text-base font-semibold p-4 mt-10 sm:w-[400px] sm:p-8 ' onSubmit={handleSubmit} action=''>
          <h1 className='text-3xl font-bold mb-4'>Profile</h1>
          <p className=' mb-6 text-xl'>Edit your profile</p>
          <div className='text-base'>
            {/* Full Name */}
            <div className='pb-4 text-sm'>
              <label htmlFor="firstName" className='block text-sm pb-2'>First Name</label>
              <input className='border-2 border-gray-500 p-3 text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                required
                type="text"
                name='firstName'
                id='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='Enter First Name' />
              {errors.firstName && <p className=' text-red-500'>{errors.firstName}</p>}
              {/* Last Name */}
              <label htmlFor="lastName" className='block text-sm pb-2 mt-3'>Last Name</label>
              <input className='border-2 border-gray-500 p-3 text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                type="text"
                required
                name='lastName'
                id='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Enter Last Name' />
              {errors.lastName && <p className=' text-red-500'>{errors.lastName}</p>}
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
              {errors.address1 && <p className=' text-red-500'>{errors.address1}</p>}
            </div>
            {/* Address2 */}
            <div className='pb-4'>
              <label htmlFor="address2" className='block text-sm pb-2'>Address2</label>

              <input className={inputcss}
                type="text"
                name='address2'
                id='address2'
                placeholder='Enter Address 2'
                value={formData.address2}
                onChange={handleChange}
              />
              {errors.address2 && <p className=' text-red-500'>{errors.address2}</p>}
            </div>
            {/* City */}
            <div className='pb-4'>
              <label htmlFor="city" className='block text-sm pb-2'>City</label>

              <input className={inputcss}
                type="text"
                required
                name='city'
                id='city'
                placeholder='Enter City'
                value={formData.city}
                onChange={handleChange} />
              {errors.city && <p className=' text-red-500'>{errors.city}</p>}
            </div>
            {/* State */}
            <div className='pb-4'>
              {/* value={formData.state}
                onChange={handleChange} */}
              <div>
                <label htmlFor="state" className='block text-sm pb-2'>State</label>
                <select
                  // className='border-2 border-gray-500 text-black p-3 rounded-md focus:border-red-500 focus:ring-red-500 w-full'
                  className={inputcss}
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleSelectState}
                  required
                >
                  <option value="">Select a State</option>
                  {usStates.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state && <p className=' text-red-500'>{errors.state}</p>}
              </div>
            </div>
            {/* zipcode code */}
            <div className='pb-4'>
              <label htmlFor="zipcode" className='block text-sm pb-2'>Zip Code</label>

              <input className={inputcss}
                type="text"
                name='zipcode'
                required
                id='zipcode'
                placeholder='Enter zipcode Code'
                value={formData.zipcode}
                onChange={handleChange} />
              {errors.zipcode && <p className=' text-red-500'>{errors.zipcode}</p>}
            </div>
            {/* Save button */}
            <div>
              <button className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 mt-4 w-full text-white bg-red-500 hover:bg-red-600 transition duration-300' >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Profile