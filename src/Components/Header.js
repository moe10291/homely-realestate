import React from 'react';
import Logo from '../Homely Logo.png';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
  const location= useLocation();
  console.log(location.pathname);

  const navigate= useNavigate();
  // function pathMatchRoute(route){
  //   if(route === location.pathname){
  //     return true
  //   }
  // }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
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
            className='cursor-pointer hover:bg-red-500 text-base font-sans px-4 py-2'
            onClick={()=>navigate("/")}
            >Home</li>
            <li
            className='cursor-pointer hover:bg-red-500 text-base font-sans px-4 py-2'
            onClick={()=>navigate("/offers")}
            >Offers</li>
            <li
            className='cursor-pointer hover:bg-red-500 text-base font-sans px-4 py-2'
            onClick={()=>navigate("/sign-in")}
            >Sign In</li>
          </ul>
        </div>

      </header>
    </div>
  )
}
