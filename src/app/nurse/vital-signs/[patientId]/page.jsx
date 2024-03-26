"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
 
const Page = () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
    const router=useRouter()
  const path = usePathname();
  const patientIndex = path.indexOf("nurse/vital-signs/");
  const patientId =
    patientIndex !== -1 ? path.slice(patientIndex + "nurse/vital-signs/".length) : "";
    console.log(patientId)
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [error, setError] = useState("");
  const [patient, setPatient] = useState({});
  const [today, setToday] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/nurse/patient/${patientId}/appointment`,data);
  
      console.log('Appointment created:', response.data);
      alert('vital signs assigned');
      push('/nurse/');
    } catch (error) {
      console.error('Error creating appointment:', error);
      setError('Failed to create appointment. Please try again.');
      setLoading(false);
    }
  };
  
  

  useEffect(()=>{

    const FindPatient= async() => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/nurse/patient/${patientId}`);
        const data = response.data;
        setPatient(data.patient);
        setToday(data.date)
        console.log(data.date);
        
      } catch (error) {
          alert ('patient not found');
      
        console.log('Patient not foind');
      }
  
    }
    FindPatient()
  },[])
  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="container mx-auto  mt-[100px] ">

      <div className=" flex flex-col mx-auto max-w-4xl mb-6 mt-32 items-end text-left "> 
          <h3 className="  pr-7 min-w-72">Date: <span className=" underline">{today}</span></h3>
          <h3 className=" min-w-72">Customer Name: <span className=" underline">{patient.firstname }  {patient.lastname}</span></h3>

         </div>
        <div className="max-w-4xl mx-auto pb-7 shadow-lg mt-5 px-10">
         
         <div className="flex flex-col md:flex-row  w-full gap-7">


         <div>
          <h3 className=" min-w-40">capture vital Signs</h3>
         </div>
          <form
            className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 mb-10  w-full gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid">
             
              <input className=" w-full text-center bg-blue-800 rounded-md text-white  placeholder-white py-3 "
                type="text"
                placeholder="Blood Pressure"
                {...register("bloodPresure", {
                  required: "Blood Pressure is required ",
                })}
              />
              <small className="text-red-500">{errors.bloodPresure?.message}</small>
            </div>
            <div className="grid">
             
              <input className=" w-full text-center bg-blue-800 rounded-md text-white  placeholder-white py-3 "
                type="text"
                placeholder="Respiratory Rate"
                {...register("respiratory_rate", {
                  required: "Respiratory Rate is required",
                })}
              />
              <small className="text-red-500">
                {errors.respiratory_rate?.message}
              </small>
            </div>
            <div className="grid">
             
              <input className=" w-full text-center bg-blue-800 rounded-md text-white  placeholder-white py-3 "
                type="text"
                placeholder="Pulse Rate"
                {...register("pulse_rate", {
                  required: "Pulse Rate is required",
                })}
              />
              <small className="text-red-500">
                {errors.pulse_rate?.message}
              </small>
            </div>
            <div className="grid">
           
              <input className=" w-full text-center bg-blue-800 rounded-md text-white  placeholder-white py-3 "
                type="text"
                placeholder="Weight"
                {...register("weight", {
                  required: "Weight is required",
                })}
              />
              <small className="text-red-500">{errors.weight?.message}</small>
            </div>
            <div className="grid">
            
              <input className=" w-full text-center bg-blue-800 rounded-md text-white  placeholder-white py-3 "
                type="text"
                placeholder="Height"
                {...register("height", {
                  required: "Height is required",
                })}
              />
              <small className="text-red-500">{errors.height?.message}</small>
            </div>

            <div className="grid">
              
              <input className=" w-full text-center bg-blue-800 rounded-md text-white  placeholder-white py-3 "
                type="text"
                placeholder="BMI"
                {...register("bmi", {
                  required: "BMI is required",
                })}
              />
              <small className="text-red-500">{errors.bmi?.message}</small>
            </div>
            <div className="grid">
            
              <input className=" w-full text-center bg-blue-800 rounded-md text-white  placeholder-white py-3 "
                type="text"
                placeholder="O2 Saturation"
                {...register("o2_saturation", {
                  required: "O2 Saturation is required",
                })}
              />
              <small className="text-red-500">
                {errors.o2_saturation?.message}
              </small>
            </div>
            <div className="invisible"></div>
            <div className="invisible"></div>
            <div className="">
              <button className="bg-red-500 text-white px-6 py-3 mt-4 w-full  flex justify-center items-center justify-self-center rounded-full hover:-translate-y-px">
                <span className="ml-1 font-medium">Submit</span>
              </button>
            </div>
          </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
export default Page;
