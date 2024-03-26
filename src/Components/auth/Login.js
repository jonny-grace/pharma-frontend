"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "./withAuth";
import { getConfig } from "next/config";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import useStore from "@/store/useStore";
// import useStore from "../../store/useStore";
function Login() {
  const setUser = useStore((state) => state.setUser);
  // const setAuthTrue = useStore((state) => state.setAuthTrue);
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      // Make API call to login endpoint with username and password
      fetch(`${api_url}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            // notify('Invalid credentials',"error");
            showNotification(`Invalid username or password `, "error");

            // throw new Error('Invalid credentials');
          } else if (response.ok) {
            return response.json();
          } else {
           
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            showNotification(`Invalid username or password `, "error");
             throw new Error("Network response was not ok.");
          }
        })
        .then((data) => {
          // Handle successful login response

          // Store the token in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", JSON.stringify(data.userData)); // Store userData in localStorage
          setUser(data.userData);
          // setAuthTrue();

          // Assign the role value to the 'role' variable
          const role = data.userData.role;
          localStorage.setItem("role", role);
          console.log("Role:", role);

          // Navigate based on the role
          // Check if the user's role is 'pharmacy' and the status is 'active'
          if (role === "pharmacy" && data.userData.status === "active") {
            router.push("/pharmacy");
          } else if (role === "admin") {
            router.push("/admin");
          } else if (
            role === "reception" &&
            data.userData.status === "active"
          ) {
            router.push("/reception");
          } else if (role === "nurse" && data.userData.status === "active") {
            router.push("/nurse");
          } else if (
            role === "pharmaciest" &&
            data.userData.status === "active"
          ) {
            router.push("/pharmaciest");
          }
           else if (role === "doctor" && data.userData.status === "active") {
            router.push("/doctor");
          }
           else {
            showNotification(`Your account is not activated yet`, "error");
            // i want to remove the localstorage token and userdata
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);

          // showNotification(`Invalid username or password`, "error");
          localStorage.removeItem("token");
        });
    }
  };
  return (
    <>
      <div className=" w-full bg-blue-50 h-full ">
        <div
          style={{ backgroundColor: "#03a9f5" }}
          className="flex border  border-spacing-1  px-4 py-20 rounded-lg shadow-lg min-h-screen overflow-hidden  w-full"
        >
          <div className=" flex w-full  gap-10">
            <div className="w-full  flex flex-col justify-center  ml-16 p-8 lg:w-1/2">
              {/* <h2 className="text-2xl font-semibold text-gray-700 text-center">Doctor</h2> */}
              <div className=" flex flex-col mx-14">
                <p className="text-xl text-white text-center font-bold">
                  Welcome back!
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 lg:w-1/4"></span>
                  <a
                    href="#"
                    className="text-xs text-center text-white uppercase"
                  >
                    login Here
                  </a>
                  <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>
              </div>

              <form
                className="mt-8 mx-16  flex flex-col justify-center"
                onSubmit={handleSubmit}
              >
                <div className="mt-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="bg-gray-200 max-w-xl text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-white text-sm font-bold mb-2">
                      Password
                    </label>
                    {/* <a href="#" className="text-xs text-gray-500">Forget Password?</a> */}
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="bg-gray-200 max-w-xl text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-blue-900 max-w-xl text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700"
                  >
                    Login
                  </button>
                </div>
              </form>
              <h2 className=" w-full  italic text-gray-800 my-7 mx-16">
                {" "}
                you are a new pharmacy register here{" "}
                <Link
                  className=" text-blue-200 hover:text-blue-500 hover:underline font-bold"
                  href={"/register-new-pharmacy"}
                >
                  Register
                </Link>
              </h2>
            </div>
            <div className="hidden  lg:flex justify-end items-start lg:w-1/2 mr-60">
              <Image
                src={"/assets/logo.png"}
                width={250}
                height={170}
                alt="maldo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
