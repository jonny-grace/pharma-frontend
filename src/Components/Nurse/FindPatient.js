'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'

const FindPatient = () => {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSearch = async () => {
    if (!patientId) return;

    setLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/nurse/patient/${patientId}`);
      const data = response.data.patient;
      console.log(response.data.patient)
        if(response.data===null){
          setError('Patient not found');
          setLoading(false);
          setPatientId('');
          
        }else{
       
          setError(null);
          setLoading(false);
          router.push(
            `/nurse/vital-signs/${data.patientId}`,
            );
        }
      ;
    } catch (error) {

      if (error.response && error.response.status === 404 && error.response.data.message === 'Patient have a today active appointment') {
        // alert('vital signs already assigned ');
        setError("Vital signs already assigned  for this patient"); 
      }else{
        alert('Patient not found');
      }
        setLoading(false);
      console.error('Error fetching patient:', error);
    }

   
  };

  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center  h-screen">
      <div className="mb-4 flex flex-col gap-16">
        <input
          type="text"
          className="w-72 px-4 py-5 rounded-lg  bg-gray-900 text-white font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Customer ID..."
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className='flex justify-center'>
        <button
          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold w-28 py-2  rounded-lg"
          onClick={handleSearch}
          disabled={loading}
        >
          submit
        </button></div>
      </div>

      {loading && (
        <p>Loading...</p>
      )  }
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FindPatient;