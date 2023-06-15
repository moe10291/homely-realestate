import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../Database/firebase';
import { useNavigate } from 'react-router';


export default function OAuth() {
const navigate= useNavigate();
  async function onGoogleClick(){
    try {
      const auth= getAuth();
      const provider= new GoogleAuthProvider();
      const result= await signInWithPopup (auth, provider)
      const user= result.user

      // check for the user
      const docRef= doc(db, "users", user.uid)
      const docSnap= await getDoc(docRef)

      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate("/")

    } catch (error) {
      toast.error("Could Not Authorize")
      
    }
  }
  return (
    <button 
    type="button"
    onClick={onGoogleClick}
    className='flex items-center justify-center w-full bg-red-600 text-white px-6 py-2 rounded-md uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 transition ease-linear shadow-lg'>
        <FcGoogle 
        className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
    </button>
  )
}
