"use client";
import React, { useState } from "react"; // Import useState
import { useForm } from "react-hook-form";

const Page = () => {
  const [error, setError] = useState(""); // Define error state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    setError(""); // Reset or set error state as needed
    // Your submission logic here
  };

  return (
    <div className="h-screen  w-full flex justify-center">
      <div className="max-w-5xl mx-auto py-7  mt-5 px-10">
        <form
          className="grid grid-cols-1  mb-10  w-full gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid">
            <input
              type="text"
              placeholder="Enter Customer UID ..."
              {...register("bp", {
                required: "Blood Pressure is required ",
              })}
            />
            <small className="text-red-500">{errors.bp?.message}</small>
          </div>
          <div className="">
            <button className="bg-primary text-white px-6 py-3 mt-4 w-full  flex justify-center items-center justify-self-center rounded-full hover:-translate-y-px">
              <span className="ml-1 font-medium">Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
