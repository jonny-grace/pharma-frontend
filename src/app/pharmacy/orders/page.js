"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/axios";
import Prescriptions from "@/Components/pharmacy/Prescriptions";
const page = () => {
  let userData;
  let userId;
  let token;
  if (typeof window !== "undefined") {
    userData = JSON.parse(localStorage.getItem("userData"));
    userId = userData && userData.userId;
    token = localStorage.getItem("token");
  }
  const [pharmacy, setPharmacy] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/pharmacy/me/${userId}`);
        // console.log(res.data);
        setPharmacy(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userId]);
  return (
    <div className="container mx-auto w-full">
      <div className="pt-28 ">
        <Prescriptions pharmacyName={pharmacy && pharmacy.pharmacyName} />
      </div>
    </div>
  );
};

export default page;
