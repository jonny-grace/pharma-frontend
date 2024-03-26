"use client";
import React, { useState, useEffect } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import AdminDrawer from "./AdminDrawer";
import Image from "next/image";
import axios from "axios";
import useStore from "../../store/useStore";

const Navbar = () => {
  const router = useRouter();
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [isLoggedIn, setIsLoggedIn] = useState(token);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token")); // Update logged-in status on component mount
  }, []);

  const logout = () => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(null);
    // console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    setIsLoggedIn(false); // Update logged-in status
    router.push("/");
  };
  console.log(user);
  return (
    <>
      {user && (
        <nav className="flex justify-between px-24 items-center fixed top-0 w-screen bg-primary text-black py-3">
          <div className="flex gap-x-3 items-center">
            {/* <AdminDrawer /> */}
            <h1 className="text-white text-2xl font-bold">MaldoMed</h1>
          </div>
          <div className="flex gap-x-3 items-center gap-16">
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="h-20 w-full object-contain"
            />
            <button
              className="flex items-center gap-2 px-5 py-2 border-2 border-white rounded-full text-sm"
              onClick={logout}
            >
              <span>Logout</span>
              <span>
                <LogoutIcon fontSize="small" />
              </span>
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
