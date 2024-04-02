"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import moment from "moment";
function page() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const socket = io(`${api_url}`);
  const router = useRouter();
  const path = usePathname();
  const doctorIndex = path.indexOf("pharmaciest/");
  const patientId =
    doctorIndex !== -1 ? path.slice(doctorIndex + "pharmaciest/".length) : "";

  const [prescriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    const getPresciptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/pharmaciest/patient/prescription/${patientId}`
        );
        const data = response.data.prescription;
        console.log(response.data.patient);
        if (response.data === null || response.data === undefined) {
          console.log("null");
        } else {
          setPrescriptions(data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPresciptions();
  }, []);
  // const [prescription, setPrescription] = useState({});


  const viewPrescriptionDetail = async (prescriptionId) => {
    router.push(`/pharmaciest/prescriptiondetail/${prescriptionId}`);
  };
  return (
    <div className=" min-h-screen w-full mt-[160px]">
      {/* <pre>{JSON.stringify(filteredPrescriptions, null, 2)}</pre> */}

      <div className="flex   mb-4 w-full">
        <div>
          <div className=" px-10  text-2xl">PHARMACIST PRESCRIPTION PREVIEW 
</div>
        </div>
      
      <table className="min-w-[80%] bg-white">
        <thead>
          <tr className="gap-2">
          <th>
              <h1 className="bg-blue-800 px-6 mx-2 py-5 rounded-lg text-white text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                Num#
              </h1>
            </th>
            
            <th>
              <h1 className="bg-blue-800 px-6 mx-2 py-5 rounded-lg text-white text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                Prescription Ref#
              </h1>
            </th>
            <th>
              <h1 className="bg-blue-800 px-6 mx-2 py-5 rounded-lg text-white text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                Time
              </h1>
            </th>
            <th>
              <h1 className="bg-blue-800 px-6 mx-2 py-5 rounded-lg text-white text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                Status
              </h1>
            </th>
            <th>
              <h1 className="bg-blue-800 px-6 mx-2 py-5 rounded-lg text-white text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                View
              </h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {prescriptions &&
            prescriptions.map((prescription, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {prescription.prescriptionionReference}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {moment(prescription.currentTime, "YYYYMMDD").fromNow()}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {prescription.status}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {/* {prescription.status !== "completed" ? ( */}
                  {/* prescription.acceptStatus != "waiting" ? ( */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => viewPrescriptionDetail(prescription._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default page;
