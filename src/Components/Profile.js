import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'

export default function Profile() {
  const auth= getAuth();
  const [formData, setFormData]= useState({
    name: auth.currentUser.displayName,
    email:auth.currentUser.email
  });

  const{name, email}= formData
  return (
    <div>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>

        <div className='w-full md:w-[50%] mt-8 px-3'>
          <form>

            {/* {Name Input} */}
            <input type="text" id="name" value={name} disabled className='mb-8 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' />

            {/* {Email} */}
            <input type="email" id="email" value={email} disabled className='mb-8 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' />
          
          <div className='flex justify-between whitespace-nowrap text-sm mb-6'>
            <p className='flex items-center'>Change Name? 
            <span className='text-red-500 hover:text-red-600 transition ease-in-out ml-1 cursor-pointer'>Edit</span>
            </p>

            <p className='text-blue-600 hover:text-blue-700 cursor-pointer transition ease-in-out'>Sign Out</p>
          </div>
          </form>
        </div>
      </section>
    </div>
  )
}
