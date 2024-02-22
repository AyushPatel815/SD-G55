import React, { useState } from 'react'
import logo from "../../public/fuel-pro-logo.png"
import Image from 'next/image'

// import {Link} from 'react-router-dom'
function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (

    /* This works  */
    // change the bg color
    <div className="bg-gray-800 text-gray-300 py-7 w-full max-h-20 flex flex-col sm:flex-row justify-between items-center gap-10">
      <Image src={logo} alt='logo' className='max-w-[10%] ml-10 max-h-20' priority />

      {/* Hamburger menu button (only visible on small screens) */}
      <div className="sm:hidden cursor-pointer" onClick={toggleMenu}>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </div>

      {/* Menu items (visible on larger screens) */}
      <ul className={`flex flex-col sm:flex-row sm:mr-36 text-2xl gap-4 sm:gap-20 mt-4 sm:mt-0 ${isMenuOpen ? 'block' : 'hidden sm:flex'}`}>
        <li className='hover:text-gray-500'><a href="/fuel-quote" className='p-2 hover:bg-white rounded-lg'>Quote</a></li>
        <li className='hover:text-gray-500'><a href="/fuel-history">History</a></li>
        <li className='hover:text-gray-500'><a href="/profile">Profile</a></li>
      </ul>
    </div>
  )
}

export default NavBar
