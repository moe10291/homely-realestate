import React from 'react'
import { useState } from 'react';

export default function CreateListing() {
  const [formData, setFormData]= useState({
    type: "rent",
    name:"",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    address:'',
    description:''
  });
  const {type, name, bedrooms, bathrooms, parking, address, description}= formData;
  function onChange(){

  }
  return (
    <main className='max-w-md px-2 mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Add a Property</h1>

      <form>
        <p className='tex-lg mt-6 font-semibold'>Sell/Rent</p>
        <div className='flex'>
        <button 
        type="button" 
        id="type" 
        value="sell" 
        onClick={onChange}
        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white" : "bg-slate-600 text-white"}`}>
        Sell</button>

        <button 
        type="button" 
        id="type" 
        value="sell" 
        onClick={onChange}
        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "sale" ? "bg-white" : "bg-slate-600 text-white"}`}>
        Rent </button>
        </div>
        <p className="text-lg mt-8 font-semibold">Name</p>
        <input 
        type="text" 
        id="name" 
        value={name} 
        onChange={onChange} 
        placeholder="Property Name" 
        maxLength="30" minLength="5" required 
        className="w-full px-4 py-3 text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white"/>
    
    
    <div className='flex justify-start space-x-8 mb-6'>
        <div>          
         <p className='text-lg font-semibold'>Beds</p>
         <input 
         type='number' 
         id="bedrooms" 
         className='w-full text-center px-3 py-2 text-xl text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white'
         value={bedrooms} 
         onChange={onChange} 
         min="1" max="20" required />
        </div>

        <div>          
         <p className='text-lg font-semibold'>Baths</p>
         <input 
         type='number' 
         id="bathrooms" 
         className='w-full text-center px-3 py-2 text-xl text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white'
         value={bathrooms} 
         onChange={onChange} 
         min="1" max="20" required />
        </div>
    </div>

    <p className='tex-lg mt-6 font-semibold'>Parking</p>
        <div className='flex'>
        <button 
        type="button" 
        id="parking" 
        value={true} 
        onClick={onChange}
        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!parking? "bg-white" : "bg-slate-600 text-white"}`}>
        Yes</button>

        <button 
        type="button" 
        id="parking" 
        value={false}
        onClick={onChange}
        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${parking? "bg-white text-black" : "bg-slate-600 text-white"}`}>
        No </button>
        </div>

        <p className="text-lg mt-8 font-semibold">Address</p>
        <textarea 
        type="text" 
        id="address" 
        value={address} 
        onChange={onChange} 
        placeholder="Property Address" 
        maxLength="100" minLength="5" required 
        className="w-full px-4 py-3 text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white"/>

        <p className="text-lg mt-2 font-semibold">Description</p>
        <textarea 
        type="text" 
        id="address" 
        value={description} 
        onChange={onChange} 
        placeholder="Property Description" 
        maxLength="300" minLength="5" required 
        className="w-full px-4 py-3 text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white"/>
      </form>

    </main>
  )
}
