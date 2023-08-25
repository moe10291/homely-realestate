import { getAuth, updateCurrentUser, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../Database/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {FcHome} from "react-icons/fc"

export default function Profile() {
  const auth= getAuth();
  const navigate= useNavigate();
  const [changeDetail, setChangeDetail]= useState(false)

  const [formData, setFormData]= useState({
    name: auth.currentUser.displayName,
    email:auth.currentUser.email
  });

  const{name, email}= formData;

  function onLogout(){
    auth.signOut();
    navigate("/")
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  
  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        //update name in FS
        const docRef= doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name: name, 
        })
      }
      toast.success("Profile Updated")
    } catch (error) {
      toast.error("Could Not Updated Profile Deatils")
    }
  }
  
  return (
    <div>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>

        <div className='w-full md:w-[50%] mt-8 px-3'>
          <form>

            {/* {Name Input} */}
            <input 
            type="text" 
            id="name" 
            value={name} 
            disabled={!changeDetail}
            onChange={onChange}
            className={`mb-8 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}` }/>

            {/* {Email} */}
            <input 
            type="email" 
            id="email" 
            value={email} 
            disabled 
            className='mb-8 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' />
          
          <div className='flex justify-between whitespace-nowrap text-sm mb-6'>
            <p className='flex items-center'>Change Name? 
            <span 
            onClick={()=>{
              changeDetail && onSubmit()
              setChangeDetail((prevState)=> !prevState)
             }} 
            className='text-red-500 hover:text-red-600 transition ease-in-out ml-1 cursor-pointer'>{changeDetail ? "Apply Changes" : "Edit"}</span>
            </p>

            <p onClick={onLogout} className='text-blue-600 hover:text-blue-700 cursor-pointer transition ease-in-out'>Sign Out</p>
          </div>
          </form>

          <button type="submit"
          className='w-full bg-red-400 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-red-500 transition ease-in-out duration-200 hover:shadow-lg active:bg-red-600'>
            <Link to="/create-listing"
            className='flex justify-center items-center'>
            <FcHome className='mr-3 text-3xl bg-white rounded-full p-1'/>
            Sell or Rent Your Property            
            </Link>
          </button>
        </div>
      </section>
    </div>
  )
}
