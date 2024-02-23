import React, { ReactNode } from 'react'
import loginImg from '../../public/login_image.png'
import Image from 'next/image'
import logo from '../../public/fuel-pro-logo.png'

async function AuthLayout({ children }: { children: ReactNode }) {
    return (

        <div className=' relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent '>
            <Image src={loginImg} alt='login background image' className=' hidden sm:flex sm:object-cover -z-10 h-full w-full brightness-50' priority fill ></Image>
            <Image src={logo} alt='logo' className=' absolute left-10 top-4 object-contain max-w-[10%] max-h-20' priority />
            {children}
        </div>


    )
}

export default AuthLayout
