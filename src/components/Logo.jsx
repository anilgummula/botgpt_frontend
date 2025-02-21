import React from 'react';
import { BsRobot } from "react-icons/bs";

const Logo = () => {
  return (
    <div className='bg-gray-700 min-h-20 flex p-2 md:px-10 text-xl font-bold text-white'>  
        {/* <h1 className='flex border-2 w-16 h-16 rounded-full p-4 justify-center items-center'>LOGO</h1> */}
        <h1 className='flex border-2 bg-slate-800 rounded-full p-2 justify-center items-center'>
            <BsRobot size={48} />
        </h1>
        <p className='flex items-center justify-center mx-auto'>Just ask what ever you want!</p>
    </div>
  )
}

export default Logo;