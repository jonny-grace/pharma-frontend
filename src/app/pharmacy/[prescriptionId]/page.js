"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import Link from "next/link";

function PrescriptionDetail() {
  const [accept, setAccept] = useState(false);

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const socket = io(`${api_url}`);
  const router = useRouter();
  const path = usePathname();
  const doctorIndex = path.indexOf("pharmacy/");
  const prescriptionId =
    doctorIndex !== -1 ? path.slice(doctorIndex + "pharmacy/".length) : "";

  const [prescription, setPrescription] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [priceVisible, setPriceVisible] = useState(false);

  useEffect(() => {
    const fetchPrescription = async () => {
      if (typeof window !== "undefined") {
        try {
          if (prescriptionId) {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/pharmacy/prescription/${prescriptionId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = response.data;
            console.log(data);
            setPrescription(data);
            const datafound = data.isDataFound;
            const counter = data.counter;
            setMedicines(
              data.medicines.map((medicine) => ({
                ...medicine,
                price: "",
                availablity: false,
              }))
            );
            if (datafound) {
              setPriceVisible(true);
            }
          }
        } catch (error) {
          console.error("Error fetching prescription:", error);
        }
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

  const handleConfirm = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/pharmacy/response/${prescriptionId}`,
          medicines,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          router.push("/pharmacy");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handlePrint = () => {
    console.log("Placing order for prescription:", prescriptionId);
    console.log("Medicines:", medicines);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/reception/response/${prescriptionId}`
      )
      .then((response) => {
        console.log(response.data);
        router.push("/pharmacy");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const PrintPrescription = () => {
    router.push(`/print/${prescriptionId}`);
  };

  const handlePriceChange = (index, event) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].price = event.target.value;
    setMedicines(updatedMedicines);
  };

  const handleavailablityChange = (index, event) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].availablity = !event.target.checked;
    setMedicines(updatedMedicines);
  };

  const handleAccept = async () => {
    setAccept(true);

    if (typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("token");

        socket.emit("acceptPharmacy", { prescriptionId, token });
      } catch (err) {
        console.error(err);
      }
    }
  };
  socket.on("prescriptionAccepted", ({ numberleft }) => {
    // showNotification(`new accept is responded from other phamacy only ${numberleft} is left to accept `,"success");

    // Reload the page
    window.location.reload();
  });
  socket.on("acceptPharmacyResponse", (response) => {
    if (response.success) {
      // Handle success
      console.log(response.message);
      // Show success message to the user or perform any other action
    } else {
      // Handle error
      // showNotification(`${response.message}`, "error");
      window.location.href = "/pharmacy";
      // Show error message to the user or perform any other action
    }
  });
  const handleReject = async () => {
    if (typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          `/pharmacy/reject/${prescriptionId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        router.push("/pharmacy");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="container mx-auto min-h-screen mt-28">
      <div>
        <Link href="/pharmacy">back</Link>
      </div>
      <div className="bg-white max-w-6xl mx-auto my-6 border border-black border-opacity-30 rounded shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Prescription</h2>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="mb-6">
            <p className="font-bold">Patient Name:</p>
            <p>{prescription.patientFullName}</p>
          </div>
          <div className="mb-6">
            <p className="font-bold">Patient ID:</p>
            <p>{prescription.patientId}</p>
          </div>
          <div className="mb-6">
            <p className="font-bold">Patient Age:</p>
            <p>{prescription.patientAge}</p>
          </div>

          {!priceVisible && (
            <div className=" flex gap-3">
              <button className=" text-green-600 px-5 " onClick={handleAccept}>
                Accept
              </button>
              <button className=" text-red-600 px-5" onClick={handleReject}>
                Reject
              </button>
            </div>
          )}
        </div>
        <div className="mb-6">
          <p className="font-bold">Doctor Name:</p>
          <p>{prescription.doctorFullName}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">
            List of Medicines with Description
          </h3>
          <div className="flex justify-between mx-8">
            <h2 className="underline pb-3">Medicine Name</h2>
            <h2></h2>
            <h2 className="underline pb-3">Price</h2>
          </div>
          <table className="text-center w-full mt-8 overflow-x-auto">
            <thead className="bg-secondary h-10">
              <tr className="text-white">
                <th
                  className="border-r-2 border-gray-50 whitespace-nowrap"
                  rowSpan="2"
                >
                  S.No
                </th>
                <th
                  className="border-r-2 border-gray-50 whitespace-nowrap"
                  rowSpan="2"
                >
                  Drug Name
                </th>
                <th
                  className="border-r-2 border-gray-50 whitespace-nowrap"
                  rowSpan="2"
                >
                  Description
                </th>
                <th
                  className="border-r-2 border-gray-50 whitespace-nowrap"
                  colSpan="3"
                >
                  Essential
                </th>
                {accept && (
                  <>
                    <th
                      className="border-r-2 border-gray-50 whitespace-nowrap w-10"
                      rowSpan="2"
                    >
                      Price
                    </th>
                    <th
                      className="border-r-2 border-gray-50 whitespace-nowrap w-10"
                      rowSpan="2"
                    >
                      Country of Origin
                    </th>
                  </>
                )}
              </tr>
              <tr className="text-white">
                <th className="border-r-2 border-gray-50 whitespace-nowrap">
                  Mandatory
                </th>
                <th className="border-r-2 border-gray-50 whitespace-nowrap">
                  Supplementary
                </th>
                <th className="border-r-2 border-gray-50 whitespace-nowrap">
                  Availability
                </th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((item, index) => (
                <tr
                  key={index}
                  className={
                    (index + 1) % 2 == 0
                      ? "bg-[#F3F3F3] h-10 text-[#595959] text-base xll:text-xl"
                      : "bg-[#E7E7E7] h-10 text-[#595959] text-base xll:text-xl"
                  }
                >
                  <td className="border-2 border-white text-center">
                    {index + 1}
                  </td>
                  <td className="border-2 border-white text-center">
                    {item.name}
                  </td>
                  <td className="border-2 border-white text-center">
                    {item.description}
                  </td>
                  <td className="border-2 border-white text-center">
                    Mandatory
                  </td>
                  <td className="border-2 border-white h-full">Yes</td>
                  <td className="border-2 border-white w-10">Available</td>
                  {accept && (
                    <>
                      <td className="border-2 border-white w-10">
                        <input type="number" />
                      </td>
                      <td className="border-2 border-white h-full">
                        <input type="text" />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          {accept ? (
            <button
              onClick={handleConfirm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={handleAccept}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Accept
            </button>
          )}

          {prescription.status === "assigned" && (
            <button
              onClick={PrintPrescription}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Print
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrescriptionDetail;
