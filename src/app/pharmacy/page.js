"use client";

import ManagePatients from "@/Components/pharmacy/ManagePatients";

import withAuth from "@/Components/auth/withAuth";
import Dashboard from "@/Components/reception/Dashboard";
// import ManagePatients from '@/Components/reception/ManagePatients';
import Prescriptions from "@/Components/pharmacy/Prescriptions";
import Sidebar from "@/Components/reception/SideBar";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { notify } from "@/toast";
import { showNotification } from "@/Components/BrowserNotification";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";

function page() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  // const api_url= 'http://196.189.91.115:3000'
  const [data, setData] = useState({});
  const socket = io(`${api_url}`);
  const router = useRouter();
  let userData;
  let userId;
  let token;
  if (typeof window !== "undefined") {
    userData = JSON.parse(localStorage.getItem("userData"));
    userId = userData && userData.userId;
    token = localStorage.getItem("token");
  }

  const [pharmacy, setPharmacy] = useState({});
  useEffect(() => {
    let userData = null;
    userData = localStorage.getItem("userData");
    setUser(userData);
    if (!token) {
      router.push("/");
    }
    // lets create a get route to pharmacy detail by sending the userId if the pharmacy and console.log the respnse
    // if the pharmacy id is equal to the userId then show the notification
    // if the pharmacy id is not equal to the userId then do nothing
    //write an route
    const getPharmacyDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        // Get the token from localStorage
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pharmacy/me/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setPharmacy(data);
        // Handle the received prescription data in the frontend as needed
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    getPharmacyDetail();
  }, []);

  // Listen for the newPrescription event
  socket.on("newPrescriptionn", (data) => {
    // console.log('Prescription added', data);

    // console.log('Received new prescription:', data);
    setData(data);
    console.log("userId", userId);
    console.log("userIds from backend,", data.pharmaciesId);

    const Notify = () => {
      // api call for new perscription
      showNotification(`New prescription generated to check`);
    };
    for (let i = 0; i < data.pharmaciesId.length; i++) {
      console.log(data?.pharmaciesId[i]);

      if (data && data?.pharmaciesId[i] == userId) {
        console.log("userId", userId);
        // notify('you have a new prescription to check',"success");
        Notify();
        // window.location.reload();
        // break;
        return 1;
      }
    }

    // Handle the received prescription data in the frontend as needed
  });
  socket.on("timerFinished", (data) => {
    console.log("Received new prescription:", data);
    setData(data);
    // if(data && data?.pharmaciesId?.includes(userId)){
    notify("times up for prescription", "success");
    window.location.reload();
    router.back();
    //  }

    // Handle the received prescription data in the frontend as needed
  });

  socket.on("AcceptedPharmacy", (data) => {
    if (data.pharmacyId === userId) {
      showNotification(
        `your prescription has been accepted please check the orders tab`
      );
    }
    console.log("accepted prescription:", data);
    // Handle the received prescription data in the frontend as needed
  });

  socket.on("rejectedPharmacy", (data) => {
    if (data.pharmaciesIds.includes(userId)) {
      // notify('you have a new prescription to check',"success");

      showNotification(`your prescription has been rejected`);
    }

    // Handle the received prescription data in the frontend as needed
  });

  // return () => {
  // Clean up the event listener when the component unmounts
  socket.off("newPrescription");
  // };
  const [activeOption, setActiveOption] = useState("Presciptions");

  const options = [
    {
      name: "Dashboard",
      component: <Dashboard />,
    },
    {
      name: "Presciptions",
      component: (
        <ManagePatients pharmacyName={pharmacy && pharmacy.pharmacyName} />
      ),
    },
    {
      name: "Orders",
      component: (
        <Prescriptions pharmacyName={pharmacy && pharmacy.pharmacyName} />
      ),
    },
    // {
    //   name: 'Logout',
    // }
  ];

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  // console.log(auth);
  console.log(user);

  return (
    <div className="flex min-h-screen mt-[90px]">
      <div></div>
      <Sidebar
        options={options}
        activeOption={activeOption}
        onOptionClick={handleOptionClick}
      />

      <MainContent>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {options.find((o) => o.name === activeOption)?.component}
      </MainContent>
    </div>
  );
}

function MainContent({ children }) {
  return <div className="flex-1 p-5">{children}</div>;
}

export default page;
