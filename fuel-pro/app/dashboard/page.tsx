'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import Link from 'next/link';
import InstagramLogo from "../../public/instagram-icon.png";
import FacebookLogo from "../../public/facebook-logo.png"


interface TypewriterTextProps {
    text: string;
    delay: number;
}


function Dashboard() {



    const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay }) => {
        const [visibleText, setVisibleText] = useState('');

        useEffect(() => {
            let index = 0;
            const interval = setInterval(() => {
                setVisibleText((prevText) => prevText + text[index]);
                index += 1;
                if (index === text.length - 1) {
                    clearInterval(interval);
                }
            }, delay);

            return () => clearInterval(interval);
        }, [text, delay]);

        return <span className="text-4xl font-bold pt-[10%] text-yellow-200">{visibleText}</span>;
    };


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
                    className='w-screen h-screen object-cover object-center brightness-50 md:bg-transparent'
                    src='/dashboard-img.png'
                    alt={''}

                    width={dynamicWidth}
                    height={dynamicHeight}
                    layout='responsive'
                />
            </Link>

            <div className=' border bg-blue/70 rounded-lg '>
                <div className=' border bg-blue/70 rounded-lg ml-auto items-center pt-[1%] justify-center px-[10%] pb-[3%] left-1/2 bg-blue-400 bg-opacity-40 absolute mt-[10%] top-[26%] transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent backdrop-blur-md'>


                    <TypewriterText delay={200} text="  Get your fuel quote whenever and wherever!!!" />

                    <br />
                    <br />

                    <h1 className=' text-green-800 text-4xl font-bold font-mono'>Save Money and Time!!</h1>

                    <br />
                    <br />
                    <h1 className=' text-white italic font-semibold'>
                        Don't want to waste time at gas station? Do not worry !! Fuel Pro has you covered !!
                        <br />
                        <br />

                        We do it cheap, easy and fast. Why bother with long queue at gas
                        stations, when the fuel can come to you?
                    </h1>
                    <br />
                    <br />
                    <a href='/fuel-quote' className=' text-black underline p-2 italic bg-white rounded-md hover:bg-gray-300 hover:text-red-400 '>
                        Get you free quote today!!


                    </a>

                    <br />
                    <br />
                    <center>
                        <h3 className=' text-white'>Follow us on:</h3>
                        <div className=' flex justify-center gap-2'>
                            <Image src={InstagramLogo} alt={''} className=' w-[6%]' />
                            <Image src={FacebookLogo} alt={''} className=' w-[6%]' />
                        </div>
                    </center>
                </div>
            </div>

        </div>
    )
}

export default Dashboard


