import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate=useNavigate();

  return (
    <div className="w-full sm:px-24 absolute top-0 flex items-center justify-between p-4">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" />

      {/* Login Button */}
      <button 
      onClick={()=>navigate('/login')}
      className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all">
        Login
        <img src={assets.arrow_icon} alt="Arrow Icon" />
      </button>
    </div>
  )
}

export default Navbar
