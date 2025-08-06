import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'



const Login = () => {
  const [state,setState]=useState('Sign Up')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  const navigate=useNavigate();




  return (
    <div className='flex items-center justify-center min-h-screen  px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
    <img
    onClick={()=>navigate('/')}
    src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
      <h2 className='text-3xl font-semibold text-white text-center mb-3'
      >{state==='Sign Up'?'Create  account':'Login'}</h2>
      <p className='text-center mb-4 text-sm'
      >
        {state==='Sign Up'?'Create your account':'Login to your account'}

      </p>
      <form >
        {state==='Sign Up' &&  (
          <div 
          onChange={(e)=>setName(e.target.value)} value={name}
          className='flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#F3F4F6] border border-gray-300'>
          <img src={assets.person_icon} alt="" />
          <input className='outline-none w-full bg-transparent' type="text" placeholder='Full Name' required />
        </div>
        )}
        

      <div 
      onChange={(e)=>setEmail(e.target.value)} value={email}
      className='flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#F3F4F6] border border-gray-300'>
          <img src={assets.mail_icon} alt="" />
          <input className='outline-none w-full bg-transparent' type="email" placeholder='Email id ' required />

        </div>

      <div 
      onChange={(e)=>setPassword(e.target.value)} value={password}
      className='flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#F3F4F6] border border-gray-300'>
          <img src={assets.lock_icon} alt="" />
          <input className='outline-none w-full bg-transparent' type="password" placeholder='Password' required />
        </div>  

        
      <p 
      onClick={()=>navigate('/reset-password')}
      className='mb-4 text-indigo-500 cursor-pointer'>
        Forgot Password
      </p>
      <button className='rounded-full py-2.5 w-full bg-indigo-500 text-white text-center'>
        {state}
      </button>

      </form>
      {state==='Sign Up' ?(
         <p className='text-gray-400 text-center text-xs mt-4'>
        Already have an account?{' '}
        <span 
        onClick={()=>setState('Login')}
        className='text-blue-400 cursor-pointer underline'>Login Here</span>
      </p>
      ):(
        <p className='text-gray-400 text-center text-xs mt-4'>
        Dont have an account?{' '}
        <span 
        onClick={()=>setState('Sign Up')}
        className='text-blue-400 cursor-pointer underline'> Sign Up</span>
      </p>

      )
      }

     


      
    </div>
    </div>
  )
}

export default Login
