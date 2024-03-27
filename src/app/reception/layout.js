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
  const routs = [
    
    {
      name: "Manage Customer",
      Link: "/reception/manage-customer",
    },
    {
      name: "Payment Settlement",
      Link: "/reception/payment-settlement",
    },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex gap-5">
          <div className="min-w-56 max-w-56 border-r bg-gray-50 mt-36 pb-5 min-h-screen overflow-y-auto grid pt-5">
            <div className="grid h-max mx-auto  gap-y-1 w-full mt-16 px-3">
              {routs.map((item) => (
                <Link
                  href={item.Link}
                  className={
                    pathname === item.Link
                      ? "h-min  bg-white pl-5 py-2 capitalize  border-4 border-dotted border-gray-600"
                      : "h-min  bg-white pl-5 py-2 capitalize border-2"
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
         
          {children}
        </div>
      
      </body>
    </html>
  );
}
