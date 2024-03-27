"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/Components/commons/Navbar";
import { useState } from "react";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";
export default function RootLayout({ children }) {
  const pathname = usePathname();
  console.log(pathname);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
                     
          {children}
      
      </body>
    </html>
  );
}
