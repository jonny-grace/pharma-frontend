
"use client";
import React, { useEffect, useState } from "react";
import ManagePatients from '@/Components/doctor/ManagePatients'

import io from 'socket.io-client';
import DoctorsPage from "@/Components/doctor/ChangePassword";
import { useRouter } from 'next/navigation'
import axios from "axios";
import FindPatient from "@/Components/Nurse/FindPatient";

function page() {
  const router = useRouter();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const [doctor, setDoctor] = useState(null);
  let userData;
  let userId;
  let token;
  if (typeof window !== 'undefined') {
   userData = JSON.parse(localStorage.getItem('userData'));
   userId = userData && userData.userId;
   token = localStorage.getItem('token');
  //  console.log(userData)
  }

  useEffect(() => {
    axios.get(`${api_url}/doctor/getdoctorname/${userId}`)
      .then(response => {
      
        setDoctor(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className=" max-w-6xl mx-auto  mt-[190px]"> 
        {/* <DoctorsPage doctor={doctor}/> */}
       <div className='mx-10 my-10 min-h-screen  '><FindPatient/></div> 
    </div>
  )
}

export default page