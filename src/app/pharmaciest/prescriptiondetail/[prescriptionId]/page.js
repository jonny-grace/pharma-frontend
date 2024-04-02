"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import moment from "moment";
import Image from "next/image";
import { set } from "react-hook-form";
function page() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const socket = io(`${api_url}`);
  const router = useRouter();
  const path = usePathname();
  const prescriptionIndex = path.indexOf("pharmaciest/prescriptiondetail/");
  const prescriptionId =
    prescriptionIndex !== -1
      ? path.slice(prescriptionIndex + "pharmaciest/prescriptiondetail/".length)
      : "";

  console.log(prescriptionId);
  const [medicines, setMedicines] = useState([]);
   const [prescription, setPrescription] = useState({});
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/pharmaciest/patient/prescription/${prescriptionId}/medicine`
        );
        const data = response.data;

        if (response.data === null || response.data === undefined) {
          console.log("null");
        } else {
          setMedicines(data.medicines);
          setPrescription(data.prescription);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicines();
  }, []);
  console.log(prescription);

  return (
    <div className=" mt-[110px]">
      <div className=" flex w-full gap-2">
        <div className="  w-1/2 ml-5">
          <div className="flex justify-between items-center mb-32  h-full w-full">
            <div className=" bg-red-400 mx-10 my-5 rounded-md px-16 py-3 text-2xl">
              <button className=" ">Print</button>
            </div>
            <div>
              <button className=" bg-green-300 mx-10 my-5 rounded-md px-16 py-3 text-2xl">
                Order
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mr-16 pr-3 pt-3 px-4 border-blue-400 mb-10  border">
          <div className=" flex justify-between">
            <div className=" flex flex-col justify-end items-center w-full ">
              <h1 className=" text-xl max-w-72 ml-20 text-center  ">
                Maldo Internal Medicine Speciality Clinic
              </h1>
              <div className=" flex justify-start w-full mt-2">
                <hr className=" w-[70%] border-2 ml-[-16px] border-blue-400" />
              </div>
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
              To: <span className=" underline">{prescription.pharmacyName}</span>
            </div>
            <div className=" ">
              <h3 className=" text-center">
                Ref.No: <span className=" underline">{prescription.prescriptionionReference}</span>
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
              Customer Name: <span className=" ">{prescription.patientFullName}</span>
            </h1>
            <h1 className=" ">
              Age: <span className=" ">{prescription.patientAge}</span>
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
                  <th class="border border-gray-500 px-2  py-2 text-sm">
                    S.NO
                  </th>
                  <th class="border border-gray-500 px-6 py-2 text-sm">Drug</th>
                  <th class="border border-gray-500 px-6 py-2 text-sm">
                    Description
                  </th>
                  <th class="border border-gray-500 px-6 py-2 text-sm">
                    Quantity
                  </th>
                  <th class="border border-gray-500 px-6 py-2 text-sm">
                    Price
                  </th>
                  <th class="border border-gray-500 px-6 py-2 text-sm">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine, index) => (
                  <tr index={index}>
                    <td class="border border-gray-500 px-2 py-2 text-sm">1</td>
                    <td class="border border-gray-500 px-6 py-2 text-sm">
                      {medicine.name}
                    </td>
                    <td class="border border-gray-500 px-6 py-2 text-sm">
                      {medicine.description}
                    </td>
                    <td class="border border-gray-500 px-6 py-2 text-sm">
                      {medicine.quantity}
                    </td>
                    <td class="border border-gray-500 px-6 py-2 text-sm">
                      {medicine.price}
                    </td>
                    <td class="border border-gray-500 px-6 py-2 text-sm">
                      {medicine.countryOfOrigin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex  justify-between mx-5 my-16">
            <div>
              <h1 className="  ">{prescription.doctorFullName} </h1>
              <div className=" flex mt-4">
                <span>Signature</span>
                <Image
                  src={"/assets/sign.png"}
                  // src={prescription.doctorImage}

                  width={1000}
                  height={1000}
                  className=" w-24 h-12 object-cover"
                />
              </div>
            </div>
            <div className=" mr-10">
              <h1 className="  "> Pharmacist ___________</h1>
              <div className=" flex mt-4">
                <span>Signature</span>
                <Image
                  src={"/assets/sign.png"}
                  width={1000}
                  height={1000}
                  className=" w-20 h-8 object-cover"
                />
              </div>
            </div>
          </div>
          <div className=" flex justify-start w-full my-3">
              <hr className=" w-full border-2 ml-[-16px] mr-[-16px] border-blue-400" /></div>
              <div>
                <p className=" text-sm xxl:text-xl">Addis Ababa, Kirkos sub-city, Kazanchis UNECA Gate 3, Infront of IOM Shibire Bldg.</p>
                
                <div className=" flex gap-4 text-sm xxl:text-xl mb-4"><p className="">Tel: +251911234567</p>
                <p className="">Contact Center 6061</p>
                <p className="">www.maldohealth.com</p></div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default page;
