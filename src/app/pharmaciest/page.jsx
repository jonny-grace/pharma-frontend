
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import FindPatient from "@/Components/Pharmaciest/FindPatient";

function page() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  let userData;
  let userId;
  let token;
  if (typeof window !== 'undefined') {
   userData = JSON.parse(localStorage.getItem('userData'));
   userId = userData && userData.userId;
   token = localStorage.getItem('token');
  //  console.log(userData)
  }

  useEffect(()=>{
    

const options = {
  method: 'GET',
  url: 'https://scrapesoft-music-lyrics.p.rapidapi.com/api/lyrics',
  params: {
    access_token: '{accessToken}'
  },
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'scrapesoft-music-lyrics.p.rapidapi.com'
  },
  data: {
    songName: 'ENTER_SONG_NAME',
    artistName: 'ENTER_ARTIST_NAME'
  }
};

const fetchPharmacies = async () => {
try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
fetchPharmacies()
  },[])
 
  return (
    <div className=" max-w-6xl mx-auto  mt-[190px]"> 
        {/* <DoctorsPage doctor={doctor}/> */}
       <div className='mx-10 my-10 min-h-screen  '><FindPatient/></div> 
    </div>
  )
}

export default page