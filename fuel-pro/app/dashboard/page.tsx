'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import Link from 'next/link';


function Dashboard() {
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

        <div className='relative'>
            <NavBar />

            {/* Background Image */}
            <Link href='/dashboard'>
            <Image
                className='w-full h-screen object-cover object-center brightness-50 md:bg-transparent'
                src='/dashboard_image.avif'
                alt={''}
                
                width={dynamicWidth}
                height={dynamicHeight}
                layout='responsive'
            />
            </Link>

            <div className=' border bg-blue/70 rounded-lg '>
                <div className=' border bg-blue/70 rounded-lg px-[10%] pt-[2%] pb-[5%] bg-blue-400 bg-opacity-40 absolute mt-[7%] top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-red-600'>


                    <center>
                        <h1 className='text-4xl font-bold'>Get your fuel quote whenever and wherever!!!</h1>
                    </center>
                    <br />
                    <div className='  border rounded-2xl bg-yellow-300/30 px-14 pt-7 pb-28 '>
                        <center>
                            <h1 className=' text-green-800 text-4xl font-bold font-serif'>Save Money and Time!!</h1>
                        
                        <br />
                        <br />
                        <h1 className=' text-black italic font-semibold'>
                        Don't want to waste time at gas station? Do not worry !! Fuel Go has you covered !!
                        <br />
                        
                        
                        We do it cheap, easy and fast. Why bother with long queue at gas
              stations, when the fuel can come to you?
                        </h1>
                        <br />
                        <a href='/fuel-quote' className=' text-black underline p-2 italic bg-white rounded-md hover:bg-gray-300 hover:text-red-400 '>
                            Get you free quote today!!
                            
                            
                        </a>
                        </center>
                        <br />
                        <center>
                        <h3 className=' text-black'>Follow us on:</h3>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard


