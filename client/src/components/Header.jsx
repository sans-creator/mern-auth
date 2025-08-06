import React from 'react'
import {assets} from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
    <img
      src={assets.header_img}
      alt="Header"
      className="w-36 h-36 rounded-full mb-6"
    />
    <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
      Hey Developer
      <img
        src={assets.hand_wave}
        alt="Hand wave"
        className="w-8 h-8"
      />
    </h1>
    <h2 className="text-3xl font-semibold mb-4">Welcome to our app</h2>
    <p className="text-base mb-8 max-w-md">
      Let's start with a quick product tour and we will have you up and running
      in no time!
    </p>
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
      Get Started
    </button>
  </div>
  )
}

export default Header
