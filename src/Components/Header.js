import React, { useEffect, useState } from 'react';
import Logo from '../Homely Logo.png';
import { useLocation, useNavigate } from 'react-router';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export default function Header() {
  const [pageState, setPageState]= useState("Sign In")
  const location= useLocation();
  const auth= getAuth();
  useEffect(()=> {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setPageState("Profile")
      }else {
        setPageState("Sign In")
      }
    })
  },[auth])
  const navigate= useNavigate();
  function pathMatchRoute(route){
    if(route === location.pathname){
      return true
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
      <header className="flex justify-between items-center padding px-3 max-w-6xl mx-auto">
        <div>
          <img 
          src={Logo} alt="logo" 
          className="h-20 cursor-pointer" 
          onClick={()=>navigate("/")}/>
        </div>

        <div>
          <ul className='flex space-x-10'>
            <li 
            className={`cursor-pointer hover:bg-red-500 text-base font-sans px-4 py-2 ${pathMatchRoute("/") && "text-black border-b-red-500"}`}
            onClick={()=>navigate("/")}
            >Home</li>
            <li
            className= {`cursor-pointer hover:bg-red-500 text-base font-sans px-4 py-2 ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`}
            onClick={()=>navigate("/offers")}
            >Offers</li>
            <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
              "text-black border-b-red-500"
            }`}
            onClick={() => navigate("/profile")}
            >{pageState}</li>
          </ul>
        </div>

      </header>
    </div>
  )
}