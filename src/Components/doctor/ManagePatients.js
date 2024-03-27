'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'
import { toast } from 'react-hot-toast';

const ManagePatients = () => {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }
  const handleSearch = async () => {
    if (!patientId) return;
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/doctor/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
  
      if (data.patient && data.apointment && data.doctorDetail) {
        console.log(data);
        setError(null);
        setLoading(false);
        router.push(`/doctor/diagnos-medicine/${patientId}`);
      } else if (data.message === "Patient not found") {
        showNotification('Failed to update nurse status', 'error');
        setError("Patient not found");
        setLoading(false);
        setPatientId("");
      } else if (data.message === "apointment not found") {
        showNotification('This customer does not have active vital sign assigned please check with nurse first', 'error');
        setError("Customer does not have active vital sign assigned please check with nurse first");
        setLoading(false);
        setPatientId("");
      } else {
        console.log("Unknown error:", data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching patient:", error);
    }
  };
  

  const openCreatePrescription = (patientId) => {
    // Handle creating prescription for the patient
    console.log('Creating prescription for patient:', patientId);
    router.push(
      `/doctor/${patientId}`,
      );
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

export default ManagePatients;