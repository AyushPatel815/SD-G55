'use client'
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
// import { redirect } from 'next/navigation'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button';
// import { LucideGavel } from 'lucide-react'
import Image from 'next/image'
import Background_img from "../../public/dashboard-img.png"
import axios from 'axios'


function page() {

  // const [formData, setFormData] = useState({
  //   gallons: '',
  //   date: ''
  // });
  // const [error, setError] = useState<string | null>(null);

    // Define types for form data and errors
    type FormData = {
      address1: string;
      address2: string;
      city: string;
      state: string;
      zip: string;
      gallons: string;
      date: string;
    };
  
  
    // Initialize state with explicit types
    const [formData, setFormData] = useState<FormData>({
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      gallons: '',
      date: ''
    });
  
  
    type FormErrors = {
      address1: string;
      address2: string;
      city: string;
      state: string;
      zip: string;
      gallons: string;
      date: string;
    };
  
    const [errors, setErrors] = useState<FormErrors>({
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      gallons: '',
      date: ''
    });
  
  
  
    const validateInput = (name: string, value: string) => {
      switch (name) {
        case 'address1':
          return value.trim().length > 1 && value.trim().length <= 100 ? '' : 'Invalid address';
        case 'city':
          return value.trim().length > 1 && value.trim().length <= 100 ? '' : 'Invalid city';
        case 'state':
          return value ? '' : 'Please select a state';
        case 'zip':
          return /^\d{5,9}$/.test(value) ? '' : 'Invalid zip code (5-9 characters)';
        case 'gallons':
          return /^\d+$/.test(value) && parseInt(value, 10) > 0 ? '' : 'Invalid gallon (must be greater than 0)';
        case 'date':
          return value.trim().length > 0 ? '' : 'Date is required';
        default:
          return '';
      }
    };
  



  // for the background image
  // const [screenWidth, setScreenWidth] = useState<number>(0);

  // useEffect(() => {
  //   // Function to update screenWidth when the window is resized
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   // Set initial screenWidth
  //   setScreenWidth(window.innerWidth);

  //   // Add event listener for window resize
  //   window.addEventListener('resize', handleResize);

  //   // Remove event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []); // Empty dependency array ensures that the effect runs only once

  // // Calculate dynamic width and height based on screen size
  // const dynamicWidth = Math.min(screenWidth, 2600); // You can adjust the maximum width as needed
  // const dynamicHeight = (9 / 16) * dynamicWidth; // Assuming a 16:9 aspect ratio


  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target as HTMLInputElement;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  // selecting states
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

  const handleGetQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    
    // Get the value of gallons from the form
    // const gallonsValue = (document.getElementById("gallon") as HTMLInputElement).value;
    const gallonsValue = formData.gallons;
    
    // Validate the gallons input
    const gallonsError = validateInput("gallons", gallonsValue);
    const formErrors: FormErrors = {} as FormErrors; 
    Object.keys(formData).forEach((key) => {
      formErrors[key as keyof FormErrors] = validateInput(key, formData[key as keyof FormData]);
    });
    setErrors(formErrors);
    // console.log(formErrors)
    
    const isValid = Object.values(formErrors).every((error) => !error.trim());
    console.log(isValid, gallonsError);
    
    if (gallonsError || !isValid) {
      setErrors(formErrors);
      return;
    }
    else{
      console.log("Temporary FormData:", formData);

    }
  };
  

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();



    try {
        // Send the request with formData
        const response = await axios.post("http://localhost:4000/fuel-quote", {
            requestedGallons: formData.gallons, // Use 'requestedGallons' as the field name
            date: formData.date
        }, { withCredentials: true });

        // Check if the response is successful
        if (response.status === 201) {
            console.log('Fuel quote created successfully:', response.data);
            // Clear the form data and error state
            
        } else {
            console.error('Unable to create fuel quote');
        }
    } catch (error: any) {
        console.error('Error creating fuel quote:', error);
    }
};

  const inputcss = 'border-2 border-gray-500 p-1  text-black rounded-md focus:border-red-500 focus:ring-red-500 w-full sm:p-3'
  const lableCss ='block pb-2 text-md'
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

      <div className='flex justify-center  items-center'>
        {/* form begins here */}
        <form className=' border backdrop-blur-md rounded-2xl text-yellow-50 text-base font-semibold p-4 mt-10 sm:w-[400px] sm:p-8 ' onSubmit={handleSubmit} action={''}>
          <h1 className='text-3xl font-bold mb-4'>Fuel Quote</h1>
          {/* gallons */}
          <div className="pb-4'">
            <label htmlFor='gallon' className={lableCss}>
              Gallons Requested:
            </label>
            <input
              className={inputcss}
              type='text'
              id='gallon'
              name='gallons'
              placeholder='Enter number of Gallons'
              value={formData.gallons}
              onChange={handleChange}

            />
            {errors.gallons && <p className=' text-red-500'>{errors.gallons}</p>}
          </div>

          {/* Delivery 
          <div className="flex flex-col mb-4">
            <label htmlFor='delivery' className='text-yellow-50 text-[20px] ml-7'>
              Delivery Address:
            </label>
            <p className='text-gray-600 text-m ml-8'>Enter delivery address</p>
          </div> */}
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

          {/* date */}
          <div className='pb-4'>
            <label htmlFor='deliveryDate' className={lableCss}>
              Delivery Date:
            </label>
            <input
              className={inputcss}
              type='date'
              id='deliveryDate'
              name='date'
              placeholder='Select a date'
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <p className=' text-red-500'>{errors.date}</p>}
          </div>
          {/* Get Quote button button  */}
          <div className=' mb-7'>
              <button className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 mt-4 w-full text-white bg-red-500 hover:bg-red-600 transition duration-300' 
              onClick={handleGetQuote} >
                Get Quote
              </button>
          </div>
          {/* price */}
          <div className="pb-4">
            <label htmlFor='Price' className={lableCss}>
              Suggested Price per Gallon:
            </label>
            <div
              className='border-2 border-gray-500 p-1  text-black rounded-md bg-white w-full sm:p-3'> Fix it</div>
          </div>
          {/* final price */}
          <div className="pb-4">
            <label htmlFor='totalAmount' className={lableCss}>
              Final Price
            </label>
            <div className='border-2 border-gray-500 p-1  text-black rounded-md bg-white w-full sm:p-3'> Fix it</div>
          </div>

          {/* submit Quote button */}
          <div>
              <button className='border-2 border-gray-500 p-3 rounded-md focus:border-red-500 focus:ring-red-500 mt-4 w-full text-white bg-red-500 hover:bg-red-600 transition duration-300' >
                Submit Quote
              </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default page

