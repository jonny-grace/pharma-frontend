"use client";
import React, { useState } from "react";

const Page = () => {
  const [accept, setAccept] = useState(false);

  const handleChange = () => {
    setAccept(true);
  };

  return (
    <div className="container mx-auto px-5 pb-16">
      <div className="max-w-6xl mx-auto  xll:max-w-7xl xll:mx-auto my-16 overflow-x-auto">
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
            {[1, 2].map((item, index) => (
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
                <td className="border-2 border-white text-center">PROXIMI</td>
                <td className="border-2 border-white text-center">
                  description
                </td>
                <td className="border-2 border-white text-center">Mandatory</td>
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
      <div className="container px-5 flex justify-between ">
        <div className="w-full hidden md:flex"></div>
        <div className="w-full flex justify-end">
          <button
            className="bg-secondary px-5 py-3 text-white"
            onClick={handleChange}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
