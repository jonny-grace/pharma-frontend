"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { toast } from "react-hot-toast";

function page() {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const socket = io(`${api_url}`);
    const router = useRouter();
    const path = usePathname();
    const doctorIndex = path.indexOf("pharmacy/");
    const prescriptionId =
      doctorIndex !== -1 ? path.slice(doctorIndex + "pharmacy/".length) : "";
  
    const [prescription, setPrescription] = useState({});

  
  return (
    <div className=" mt-[110px]">page</div>
  )
}

export default page