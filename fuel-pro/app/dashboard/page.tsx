'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';


const Dashboard = () => {
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
            <Image className=' h-screen flex items-center justify-center bg-cover bg-center -z-50 ' src='/dashboard_image.avif' alt={''} width={dynamicWidth}
                height={dynamicHeight} layout={{type: "responsive"}} ></Image>
            <div className=' absolute left-1 top-1 z-10 text-3xl'>this is dashboard</div>
        </div>
    )
}

export default Dashboard
