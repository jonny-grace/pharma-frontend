"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function RegisterPatient() {
    const router = useRouter();
  const [patients, setPatients] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",

    username: "",
    age: "",
    gender: "male",
    weight: "",
    region: "",
    town: "",
    subCity: "",
    woreda: "",
    houseNumber: "",
    allergies: "",
  });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatients((prevPatients) => ({
          ...prevPatients,
          [name]: value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(patients);
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/reception/register/patient/`,
              patients,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              // console.log(response.data);
              alert("Patient registered successfully");
              router.push("/reception");
              // Handle the response data here
            })
            .catch((error) => {
              if (error.response) {
                const { status, data } = error.response;
                // Check if the error is due to duplicate username or email
                if (status === 400) {
                  if (data.message === "Username is already taken") {
                    // Display an alert for duplicate username
                    alert("Username is already taken");
                  } else if (data.message === "Email is already taken") {
                    // Display an alert for duplicate email
                    alert("Email is already taken");
                  }
                } else {
                  // Display a generic error message for other errors
                  alert("An error occurred during registration");
                }
              } else {
                // Display a generic error message for network or other errors
                alert("An error occurred during registration");
              }
            });
    
          // Perform further actions with the patients' data
        }
    
       
      };

    return (

        <div className="flex  justify-center p-4 overflow-hidden">
          
          <div className="mx-auto w-full max-w-7xl bg-white">
            <h2 className="text-2xl font-semibold text-gray-700 text-center my-5">
              Customer Registration
              
            </h2>
            <hr className="  bg-blue-500 mx-10 mb-5" />
            <form
              className="flex flex-col  w-full max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <div className=" flex gap-24">
                <div className="mb-5">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={patients.firstname}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-700 rounded-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={patients.lastname}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={patients.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
  
              <div className=" flex gap-24">
              <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={patients.email}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    UserName
                  </label>
                  <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    value={patients.username}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
  
                <div className="mb-5">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <input
                    required
                    type="number"
                    name="age"
                    id="age"
                    value={patients.age}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
  
              <div className=" flex gap-24">
                <div className="mb-5">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={patients.gender}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md 
                  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Weight
                  </label>
                  <input
                    required
                    type="number"
                    name="weight"
                    id="weight"
                    value={patients.weight}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className=" flex gap-24">
                <div className="mb-5">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Region
                  </label>
                  <input
                    required
                    type="text"
                    name="region"
                    id="region"
                    value={patients.region}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
  
                <div className="mb-5">
                  <label
                    htmlFor="town"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Town
                  </label>
                  <input
                    required
                    type="text"
                    name="town"
                    id="town"
                    value={patients.town}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="subCity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub City
                  </label>
                  <input
                    required
                    type="text"
                    name="subCity"
                    id="subCity"
                    value={patients.subCity}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className=" flex gap-24">
              <div className="mb-5">
                  <label
                    htmlFor="woreda"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Woreda
                  </label>
                  <input
                    required
                    type="text"
                    name="woreda"
                    id="woreda"
                    value={patients.woreda}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="houseNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    House Number
                  </label>
                  <input
                    required
                    type="text"
                    name="houseNumber"
                    id="houseNumber"
                    value={patients.houseNumber}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
  
                <div className="mb-5">
                  <label
                    htmlFor="allergies"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Allergies
                  </label>
                  <input
                    required
                    type="text"
                    name="allergies"
                    id="allergies"
                    value={patients.allergies}
                    onChange={handleInputChange}
                    className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default RegisterPatient