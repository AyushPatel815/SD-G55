import React from 'react'
import logo from "../../public/fuel-pro-logo.png"
import Image from 'next/image'

function NavBar() {
  return (
    <div className="bg-gray-800 text-gray-300 py-7 w-full max-h-20 flex justify-between items-center gap-10 absolute z-10">
      <Image src={logo} alt='logo' className='max-w-[10%] ml-10 z-10 max-h-20' priority />
      <ul className=' flex mr-36 text-3xl gap-20'>
        <li className=' hover:text-gray-500'><a href="/fuel-quote">Quote</a></li>
        <li className='hover:text-gray-500 '><a href="/fuel-history">History</a></li>
        <li className='hover:text-gray-500'><a href="/">Profile</a></li>
      </ul>
    </div>
  )
}

export default NavBar
