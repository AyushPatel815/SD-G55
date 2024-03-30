"use client"
import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
import NavBar from '../components/NavBar'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import Background_img from "../../public/dashboard-img.png"
// import State from '../components/StateDropdown';

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


  const inputcss = 'border-2 border-gray-500 p-1  text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full sm:p-3'

  /* // state for inputs
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   state: '',
  //   zip: ''
  // });

  // // state for errors in input
  // const [errors, setErrors] = useState({
  //   firstName: '',
  //   lastName: '',
  //   address1: '',
  //   city: '',
  //   state: '',
  //   zip: ''
  // }); */

  // Define types for form data and errors
type FormData = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
};

type FormErrors = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
};

// Initialize state with explicit types
const [formData, setFormData] = useState<FormData>({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: ''
});

const [errors, setErrors] = useState<FormErrors>({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: ''
});

  /* const handleChangeError = (e:React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate the input and update errors state
    setErrors({
      ...errors,
      [name]: validateInput(name, value)
    });
  }; */

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
      case 'zip':
        return /^\d{5,9}$/.test(value) ? '' : 'Invalid zip code (5-9 characters)';
      default:
        return '';
    }
  };

 /*  const handleSelectStateError = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      state: value
    });

    // Validate the state selection and update errors state
    setErrors({
      ...errors,
      state: validateInput('state', value)
    });
  }; 

  // handel submit
  // const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Validate all fields before submitting
  //   const formErrors = {};
  //   Object.keys(formData).forEach((key) => {
  //     formErrors[key] = validateInput(key, formData[key]);
  //   });
  //   setErrors(formErrors);

  //   // Check if there are any errors
  //   const isValid = Object.values(formErrors).every((error) => !error.trim());

  //   if (isValid) {
  //     console.log('Form submitted:', formData);
  //     // Send the updated answer to the backend
  //   } else {
  //     console.log('Form contains errors. Please fix them before submitting.');
  //   }
  // }; */
  
  // states
  // const [selectedState, setSelectedState] = useState<string>('');
  
  const handleSelectState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(`Selected state: ${newState}`);
    // You can perform any additional actions with the selected state here
  };
  
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
  
  
  // handel changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
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

    } else {
      console.log('Form contains errors. Please fix them before submitting.');
    }
  };
  
  
  
  
 /*  // const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // input validation 
  //   console.log(formData)
  //   // send the updated answer to the backend

  // } */

  return (
    <div>

      <NavBar />

      <div className='relative'>
        <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] brightness-[65%]'
          src={Background_img}
          alt={''} width={600} height={600}></Image>
      </div>

      {/* <main className='h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 '> */}

      {/* <form className='bg-orange-100 flex justify-center ml-[35%] mt-[7%] items-center backdrop-blur-md rounded-lg w-[60%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] border bg-transparent border-yellow-50 shadow-lg' action=""> */}
      <div className='flex justify-center  items-center'>
        <form className=' border backdrop-blur-md rounded-2xl text-yellow-50 text-base font-semibold p-4 mt-10 sm:w-[400px] sm:p-8 ' onSubmit={handleSubmit} action={'/'}>
          <h1 className=' text-2xl sm:text-3xl font-bold mb-4'>Profile</h1>
          <p className=' mb-6 text-sm sm:text-xl'>Edit your profile</p>
          <div className='text-base'>
            {/* Full Name */}
            <div className='pb-4 text-sm'>
              <label htmlFor="firstName" className='block text-sm pb-2'>First Name</label>
              {/* <input className='border-2 border-gray-500 p-1  text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full sm:p-3' */}
              <input className={inputcss}
                required
                type="text"
                name='firstName'
                id='firstName'
                placeholder='Enter First Name'
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className=' text-red-500'>{errors.firstName}</p>}

              {/* last name */}
              <label htmlFor="lastName" className='block text-sm pb-2 mt-3'>Last Name</label>
              <input className={inputcss}
                type="text"
                required
                name='lastName'
                id='lastName'
                placeholder='Enter Last Name'
                value={formData.lastName}
                onChange={handleChange}
              />
               {errors.lastName && <p className=' text-red-500'>{errors.lastName}</p>}

            </div>
            {/* Address1 */}
            <div className='pb-4'>
              <label htmlFor="address1" className='block text-sm pb-2'>Address1</label>

              <input className={inputcss}
                type="text"
                required
                name='address1'
                id='address1'
                placeholder='Enter Address 1'
                value={formData.address1}
                onChange={handleChange}
              />
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
                {errors.address1 && <p className=' text-red-500'>{errors.address2}</p>}
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
            {/* Zip code */}
            <div className='pb-4'>
              <label htmlFor="zip" className='block text-sm pb-2'>Zip Code</label>

              <input className={inputcss}
                type="text"
                name='zip'
                required
                id='zip'
                placeholder='Enter Zip Code'
                value={formData.zip}
                onChange={handleChange} />
                {errors.zip && <p className=' text-red-500'>{errors.zip}</p>}
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
