"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
function PharmacyRegistration() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [],
  });

  const router = useRouter();
  function showNotification(message, type) {
    toast[type](message, {
      duration: 3000, // 5 seconds
    });
  }

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    pharmacyName: "",
    username: "",
    city: "",
    licence_no: "",
    phoneNumber: "",
    email: "",
    password: "",
    location: {
      type: "Point",
      coordinates: [location.coordinates[0], location.coordinates[1]],
    },
  });

  useEffect(() => {
    const showPosition = (position) => {
      const { latitude, longitude } = position.coords;
      const updatedLocation = {
        ...location,
        coordinates: [latitude, longitude],
      };
      setLocation(updatedLocation);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  console.log(location.coordinates[0], location.coordinates[1]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update formData.location with coordinates from location state
    const updatedFormData = {
      ...formData,
      location: {
        ...formData.location,
        coordinates: location.coordinates,
      },
    };
    // console.log(updatedFormData)
    try {
      // const token = localStorage.getItem('token');

      const response = await fetch(`${api_url}/admin/register/pharma`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        showNotification(
          `registered wait for the admin to activate your account`,
          "success"
        );
        router.push("/");
        console.log("Registered! Please wait for approval.", data);
      } else {
        if (data.message === "Username already taken") {
          showNotification("Username already taken", "error");
        } else if (data.message === "Email already registered") {
          showNotification("Email already registered", "error");
        } else {
          showNotification(data.message, "error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className=" w-full bg-blue-50 h-screen">
      <div
        style={{ backgroundColor: "#03a9f5" }}
        className="flex border  border-spacing-1 px-4 py-20  h-screen rounded-lg shadow-lg overflow-hidden  "
      >
        <div className="w-full p-8 lg:w-1/2 mx-8">
          {/* <h2 className="text-2xl font-semibold text-gray-700 text-center">Doctor</h2> */}
          <p className="text-xl text-white text-center font-bold">
            Welcome back!
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-white uppercase">
              register Here
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="firstname"
                  className="block font-medium text-white"
                >
                  First Name
                </label>
                <input
                  required
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="lastname"
                  className="block font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white"
                >
                  UserName
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="pharmacyName"
                  className="block font-medium text-white"
                >
                  Pharmacy Name
                </label>
                <input
                  required
                  type="text"
                  name="pharmacyName"
                  id="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="city" className="block font-medium text-white">
                  City
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="licence_no"
                  className="block font-medium text-white"
                >
                  License Number
                </label>
                <input
                  required
                  type="text"
                  name="licence_no"
                  id="licence_no"
                  value={formData.licence_no}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="phoneNumber"
                  className="block font-medium text-white"
                >
                  Phone Number
                </label>
                <input
                  required
                  type="phone"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="email" className="block font-medium text-white">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="text-blue-200 hover:text-blue-500 hover:underline font-bold w-full bg-gray-800 mt-12  border border-transparent rounded-md py-3 px-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
              >
                Register
              </button>
            </div>
            
          </form>
          <h2 className=" w-full  italic text-gray-800 my-7 mx-16">
                {" "}
                already have an account Login{" "}
                <Link
                  className=" text-blue-200 hover:text-blue-500 hover:underline font-bold"
                  href={"/login"}
                >
                   here
                </Link>
              </h2>
        </div>
        <div className="hidden lg:flex justify-end items-start lg:w-1/2 mr-20">
          <Image
            src={"/assets/logo.png"}
            width={250}
            height={170}
            alt="maldo"
          />
        </div>
      </div>
    </div>
  );
}

export default PharmacyRegistration;
