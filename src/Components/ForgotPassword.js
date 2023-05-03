import React from 'react';
import { useState } from 'react';
import key from '../tingey-injury-law-firm-LJhXYHxPfEY-unsplash.jpg';
import { Link } from 'react-router-dom';
import OAuth from './OAuth';

export default function ForgotPassword() {
  
  const [email, setEmail]= useState("");


  function onChange(e){
    setEmail(e.target.value)
    console.log(setEmail)
  }
  return (
    <div>




    <section>
      <h1 className='text-3xl text-center mt-8 font-serif font'> Forgot Password </h1>
    </section>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
    <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
      <img className='w-full ' src={key} alt="key"/>
    </div>

    <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
      <form>
        <input 
        className='w-full px-4 py-2 text-md border-black rounded transition ease-linear mb-6' 
        type="email" 
        id="email" 
        value= {email} 
        onChange={onChange}
        placeholder='Email Address' />


        <div className=' flex justify-between whitespace-nowrap text-sm sm:text-lg'>
          <p className='mb-6'>Don't have an account? 
            <Link to="/sign-up"
            className='text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1 text-sm'> Register</Link>
          </p>

          <p>
            <Link to="/sign-in"
            className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out ml-1 text-sm'> Sign In</Link>
          </p>
        </div>

        <button
      className='w-full bg-blue-500 text-white px-6 py-2 font-medium uppercase rounded-md shadow-lg hover:bg-blue-600 transition ease-linear active:bg-blue-700 text-sm'
      type='submit'>Send Reset Password</button>

      <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
        <p className='text-center font-semibold margin mx-4'>OR</p>
      </div>

      <OAuth/>
      </form>
 
    </div>
    </div>

    </div>
  )
}
