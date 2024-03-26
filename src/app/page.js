'use client'
import Login from "@/Components/auth/Login";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react';
import GeoLocationComponent from "@/Components/GeoLocationComponent";
import io from 'socket.io-client';
import StartUpPage from "@/Components/commons/StartUpPage";

 

  function Home() {
    
    
  return (
    <main className="flex max-h-screen overflow-hidden">
      
   {/* <Login /> */}
   <StartUpPage />
   <ToastContainer />
   {/* <GeoLocationComponent /> */}
    </main>
  );
}

export default Home
