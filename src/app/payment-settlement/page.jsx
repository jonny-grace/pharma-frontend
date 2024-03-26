import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-5 pb-16">
      <div className="max-w-6xl mx-auto  xll:max-w-7xl xll:mx-auto my-16 overflow-x-auto">
        <table className="text-center w-full mt-8 overflow-x-auto">
          <thead className="bg-secondary h-10">
            <tr className="text-white">
              <th className="border-r-2 border-gray-50 whitespace-nowrap">
                S.No
              </th>
              <th className="border-r-2 border-gray-50 whitespace-nowrap">
                Description Of Medicines
              </th>
              <th className="border-r-2 border-gray-50 whitespace-nowrap">
                Quantity
              </th>
              <th className="border-r-2 border-gray-50 whitespace-nowrap">
                Unit Price
              </th>
              <th className="border-r-2 border-gray-50 whitespace-nowrap">
                Total Price
              </th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
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
                <td className="border-2 border-white text-center">name</td>
                <td className="border-2 border-white text-center">date</td>
                <td className="border-2 border-white text-center">date</td>

                <td className="border-2 border-white h-full bg-primary">
                  data
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <div className="w-full hidden md:flex"></div>
        <div className="w-full">
          <h1 className="uppercase text-gray-700">Total Medical Price : 500</h1>
          <h1 className="uppercase text-gray-700">
            Maldo med service charge : 500
          </h1>
          <h1 className="uppercase font-bold text-gray-900">
            grand total : 500
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;
