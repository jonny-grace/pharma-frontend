import React from "react";

function CustomerProfile({vitals,patient}) {
  // console.log(vitals);
  return (
    <div className=" flex  min-w-3xl my-10 mx-10 flex-col  gap-6 ">
      <div>
        <h1 className=" bg-yellow-500 text-xl xxl:text-3xl text-center rounded-md px-5 py-5 text-white">
          Customer Profile
        </h1>
      </div>
     
     <h2 className=" text-xl  xxl:text-3xl">fullName: {patient.firstname} {patient.lastname}</h2>
      <div className="flex flex-row justify-between">     
          <div className="grid grid-cols-3  w-full gap-3">
          <h3 className="bg-blue-500 col-span-2 text-xl md:text-2xl xxl:text-3xl text-center rounded-md xxl:px-4  text-white">
          Age{" "}
          </h3>

          <h3 className="bg-blue-500 text-xl xxl:text-3xl text-center rounded-md col-span-1 xxl:px-4 text-white">
            {patient.age}
          </h3>
        </div>   
      </div>
      <div className="flex flex-row justify-between">     
          <div className="grid grid-cols-3  w-full gap-3">
          <h3 className="bg-blue-500 col-span-2 text-xl md:text-2xl xxl:text-3xl text-center rounded-md xxl:px-4  text-white">
          height{" "}
          </h3>

          <h3 className="bg-blue-500 text-xl xxl:text-3xl text-center rounded-md col-span-1 xxl:px-4 text-white">
            {vitals.height}
          </h3>
        </div>   
      </div>
      <div className="flex flex-row justify-between">     
          <div className="grid grid-cols-3  w-full gap-3">
          <h3 className="bg-blue-500 col-span-2 text-xl md:text-2xl xxl:text-3xl text-center rounded-md xxl:px-4  text-white">
          weight{" "}
          </h3>

          <h3 className="bg-blue-500 text-xl xxl:text-3xl text-center rounded-md col-span-1 xxl:px-4 text-white">
            {vitals.weight}
          </h3>
        </div>   
      </div>
      <div className="flex flex-row justify-between">     
          <div className="grid grid-cols-3  w-full gap-3">
          <h3 className="bg-blue-500 col-span-2 text-xl md:text-2xl xxl:text-3xl text-center rounded-md xxl:px-4  text-white">
          BMI{" "}
          </h3>

          <h3 className="bg-blue-500 text-xl xxl:text-3xl text-center rounded-md col-span-1 xxl:px-4 text-white">
            {vitals.bmi}
          </h3>
        </div>   
      </div>
      <div className="flex flex-row justify-between">     
          <div className="grid grid-cols-3  w-full gap-3">
          <h3 className="bg-blue-500 col-span-2 text-xl md:text-2xl xxl:text-3xl text-center rounded-md xxl:px-4  text-white">
          pulse Rate{" "}
          </h3>

          <h3 className="bg-blue-500 text-xl xxl:text-3xl text-center rounded-md col-span-1 xxl:px-4 text-white">
            {vitals.pulse_rate}
          </h3>
        </div>   
      </div>
      <div className="flex flex-row justify-between">     
          <div className="grid grid-cols-3  w-full gap-3">
          <h3 className="bg-blue-500 col-span-2 text-xl md:text-2xl xxl:text-3xl text-center rounded-md xxl:px-4  text-white">
          respiratory Rate{" "}
          </h3>

          <h3 className="bg-blue-500 text-xl xxl:text-3xl text-center rounded-md col-span-1 xxl:px-4 text-white">
            {vitals.respiratory_rate}
          </h3>
        </div>   
      </div>
      <div className="flex flex-row justify-between">     
          <div className="grid grid-cols-3  w-full gap-3">
          <h3 className="bg-blue-500 col-span-2 text-xl md:text-2xl xxl:text-3xl text-center rounded-md xxl:px-4  text-white">
          blood Pressure{" "}
          </h3>

          <h3 className="bg-blue-500 text-xl xxl:text-3xl text-center rounded-md col-span-1 xxl:px-4 text-white">
            {vitals.bloodPresure}
          </h3>
        </div>   
      </div>
      
    </div>
  );
}

export default CustomerProfile;
