"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import moment from "moment";
import Image from "next/image";
function page() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const socket = io(`${api_url}`);
  const router = useRouter();
  const path = usePathname();
  const prescriptionIndex = path.indexOf("pharmaciest/prescriptiondetail/");
  const prescriptionId =
    prescriptionIndex !== -1 ? path.slice(prescriptionIndex + "pharmaciest/prescriptiondetail/".length) : "";

    console.log(prescriptionId);
const [medicines, setMedicines] = useState([]);

useEffect(()=>{
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pharmaciest/patient/prescription/${prescriptionId}/medicine`
      );
      const data = response.data.medicines;
            if (response.data === null || response.data === undefined) {
        console.log("null");
      } else {
        setMedicines(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchMedicines();
},[])
console.log(medicines);

  return (
    <div className=" mt-[110px]">
      <div className=" flex w-full gap-2">
        <div className="  w-full ml-5">
          <div className="flex justify-between items-center mb-32  h-full w-full">
          <div className=" bg-red-400 mx-10 my-5 rounded-md px-16 py-3 text-2xl">
            <button className=" ">Print</button>
          </div>
          <div>
            <button className=" bg-green-300 mx-10 my-5 rounded-md px-16 py-3 text-2xl">Order</button>
          </div>
          </div>

        </div>

        <div className="  w-full mr-16 pr-3 pt-3 border-gray-800 mb-10  border">
          <div className=" flex justify-between">
            <div className=" border-b-4 flex flex-col justify-end bg-green-300  border-blue-400">
              <h1 className=" text-xl max-w-72 ml-20 text-center  ">
                Maldo Internal Medicine Speciality Clinic
              </h1>
            </div>
            <Image
              className=" my-2"
              src="/assets/logo.png"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <div className="flex justify-between mt-4">
            <div className="  text-center">
              To: <span className=" underline">Pharmacy Name</span>
            </div>
            <div className=" ">
              <h3 className=" text-center">
                Ref.No:<span className=" underline">___________</span>
              </h3>
              <h3 className=" text-center">
                Date: <span className=" underline">___________</span>
              </h3>
            </div>
          </div>

          <div className=" w-full text-center text-black text-xl my-2">
            <h2>Medical Prescription</h2>
          </div>
          <div className="flex  justify-between mx-4">
            
              <h1 className=" ">
                Customer Name: <span className=" ">___________</span>
              </h1>
              <h1 className=" ">
                Age: <span className=" ">___________</span>
              </h1>
              <h1 className=" ">
                Gender: <span className=" ">___________</span>
              </h1>
           
          </div>

          {/* here i want to show the medicines and their dosages and the price in table  */}
         <div className=" my-4 mx-5">
         <table class="min-w-full border border-gray-500 divide-y divide-gray-500">
  <thead>
    <tr>
      <th class="border border-gray-500 px-2  py-2 text-sm">S.NO</th>
      <th class="border border-gray-500 px-6 py-2 text-sm">Drug</th>
      <th class="border border-gray-500 px-6 py-2 text-sm">Description</th>
      <th class="border border-gray-500 px-6 py-2 text-sm">Quantity</th>
      <th class="border border-gray-500 px-6 py-2 text-sm">Price</th>
      <th class="border border-gray-500 px-6 py-2 text-sm">Country</th>
    </tr>
  </thead>
  <tbody>
    {medicines.map((medicine,index)=>(
      
    <tr index={index}>
      <td class="border border-gray-500 px-2 py-2 text-sm">1</td>
      <td class="border border-gray-500 px-6 py-2 text-sm">{medicine.name}</td>
      <td class="border border-gray-500 px-6 py-2 text-sm">{medicine.description}</td>
      <td class="border border-gray-500 px-6 py-2 text-sm">{medicine.quantity}</td>
      <td class="border border-gray-500 px-6 py-2 text-sm">{medicine.price}</td>
      <td class="border border-gray-500 px-6 py-2 text-sm">{medicine.countryOfOrigin}</td>
    </tr>
    ))}
  </tbody>
</table>

         </div>
        </div>

        
      </div>
    </div>
  );
}

export default page;
