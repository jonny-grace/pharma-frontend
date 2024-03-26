'use client';
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import Image from 'next/image';


function TopBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const socket = io(`wss://api.maldomed.com`);
  const socket= io("http://localhost:3000");
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      socket.emit('logout');
    // Clear token and role from local storage
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Update the logged-in status to false
    setIsLoggedIn(false);

    // Redirect to home page
     router.push('/');
    }
   
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const isLoggedIn = token && role;

    setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <div>
        <nav className="flex items-center px-5  md:px-8 lg:px-16  w-full bg-cover print:hidden"
         style={{backgroundColor:"#00A9F4"}}>
  <div className="px-3 sm:px-5 xll:px-28  justify-between flex flex-col md:flex-row   w-full">
    {/* <div className="flex justify-between bg-gray-50 gap-x-3"> */}
     
      <div className='  my-0 mt-20 items-center gap-x-3 content-end md:mr-48'>
        <h3 className="text-white text-5xl font-bold">MaldoMed</h3>
        
      </div>
      <div className=" bg  flex justify-center w-full">
              <Image
                src="/assets/logo.png"
                alt="Background"
                width={1000}
                height={1000}
                className="w-40 h-36 object-cover ml-[500px] "
              />
            </div>
      <div>
      
     
      </div> 
    {/* </div> */}
  </div>
  {isLoggedIn && (
              <button onClick={handleLogout} className=' py-2 px-3 print:hidden'>Logout</button>
            )}
</nav>
    </div>
  )
}

export default TopBar