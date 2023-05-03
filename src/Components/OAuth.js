import React from 'react';
import {FcGoogle} from 'react-icons/fc'

export default function OAuth() {
  return (
    <button className='flex items-center justify-center w-full bg-red-600 text-white px-6 py-2 rounded-md uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 transition ease-linear shadow-lg'>
        <FcGoogle 
        className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
    </button>
  )
}
