"use client";
import { useForm, useFieldArray, set } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DiagnosisPreview from "@/components/Preview";
import CustomerProfile from "@/Components/doctor/CustomerProfile";
import { usePathname } from "next/navigation";
import axios from "axios";
import io from "socket.io-client";
import { notify } from "@/toast";
const Page = () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const socket = io(`${api_url}`, { transports: ["websocket"] });
  const router = useRouter();
  const path = usePathname();
  const doctorIndex = path.indexOf("doctor/diagnos-medicine/");
  const patientId =
    doctorIndex !== -1
      ? path.slice(doctorIndex + "doctor/diagnos-medicine/".length)
      : "";

  // console.log("patientId",patientId);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [vitals, setVitals] = useState({});
  const [patient, setPatient] = useState({});
 const [doctor, setDoctor] = useState({});
  useEffect(() => {
    const getPatient = async () => {
      try {

        const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/doctor/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
  
// console.log(data);
        if (data.patient) {
          setPatient(data.patient);
          setVitals(data.apointment);
          //  console.log(data);
        }
        if (data.doctorDetail) {
          setDoctor(data.doctorDetail);
        }
      } catch (error) {
        console.error("Error getting patient:", error);
        setError("Failed to get patient. Please try again.");
        setLoading(false);
      }
    };
 
    getPatient();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      druges: [
        { name: "eeee ", description: " eee", quantity: 1, essentiality: false },
      ],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "druges", // unique name for your Field Array
    }
  );

  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
   
      e.preventDefault();
      const prescriptionData = {
        patientId: patient.patientId,
        pfirstname: patient.firstname,
        plastname: patient.lastname,
        dfirstname: doctor.firstname,
        dlastname: doctor.lastname,
        doctorId: doctor.userId,
        patientAge: patient.age,
        medicines: data.druges,
      };
      console.log("prescriptionData", prescriptionData);
  
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/doctor/create/prescription`,
          prescriptionData
        );
        console.log("Prescription created:", response.data);
        socket.emit("newPrescription", response.data);
        alert("Prescription created");
  notify(
            `prescription generated for patient ${patient.firstname} ${patient.lastname}`,
            "success"
          );
        if (response.status === 200) {
          
          // notify(`prescription generated for patient ${patient.firstname} ${patient.lastname}`,"success");
          socket.on("disconnect");
          router.push("/doctor");
        } else {
          console.error("Error creating prescription:", response.data);
        }
      } catch (error) {
        console.error("Error creating prescription:", error);
      }
    };

  const handlePreview = (data) => {
    // onSubmit("preview", data);
    console.log('data',data);
    setData(data);
    setOpen(true);
  };

  // Intermediary function for submit
  const handleSubmitAction = (data) => {
    onSubmit("submit", data);
  };


 
  return (
    <>
      <DiagnosisPreview open={open} onSubmit={onSubmit} setOpen={setOpen} data={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="  grid grid-cols-8 gap-2 w-full mt-[110px] ">
        <div className=" col-span-7 md:col-span-3 xl:col-span-2">
          {" "}
          <CustomerProfile vitals={vitals} patient={patient} />{" "}
        </div>
        <div className="  bg-blue-50 py-7 min-h-screen w-full col-span-7 md:col-span-5 xl:col-span-6 mt-5 px-10">
          <h1 className="text-3xl font-medium text-center text-gray-700 ">
            DIAGNOSIS
          </h1>
          <form
            className=" bg-blue-50 mb-10   p-6  w-full gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col-reverse xl:grid xl:grid-cols-3 bg-blue-50 mb-10   p-6  w-full gap-5">
              <div className=" col-span-3">
                <h1 className="text-xl py-5 uppercase">Medications </h1>
                <div className="shadow-lg p-8">
                  <div className="grid">
                    <label htmlFor="email">DIAGNOSIS RESULT *</label>
                    <textarea
                      {...register("diagnosis_result", {
                        required: "Diagnosis result is required ",
                      })}
                      id=""
                      cols="30"
                      rows="7"
                      className="resize-none md:resize-y"
                    ></textarea>

                    <small className="text-red-500">
                      {errors.diagnosis_result?.message}
                    </small>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="  ">
                      <div key={field.id} className="  shadow-lg p-8 ">
                        <div className=" xxl:flex gap-5">
                          <div className="grid">
                            <label htmlFor={`druges-${index}-value`}>
                              Drug Name *
                            </label>
                            <input
                              className=" rounded-md"
                              required
                              id={`druges-${index}-name`}
                              type="text"
                              placeholder="Drug Name"
                              {...register(`druges.${index}.name`, {
                                required: "Drug Name is required",
                              })}
                            />

                            <small className="text-red-500">
                              {errors.druges &&
                                errors.druges[index]?.name?.message}
                            </small>
                          </div>
                          <div className="grid">
                            <label htmlFor={`druges-${index}-value`}>
                              Description *
                            </label>
                            <input
                              className=" rounded-md"
                              required
                              id={`druges-${index}-name`}
                              type="text"
                              placeholder="Description"
                              {...register(`druges.${index}.description`, {
                                required: "Description is required",
                              })}
                            />
                            <small className="text-red-500">
                              {errors.druges &&
                                errors.druges[index]?.description?.message}
                            </small>
                          </div>
                          <div className="grid">
                            <label htmlFor={`druges-${index}-value`}>
                              Quantity *
                            </label>
                            <input
                              className=" rounded-md"
                              required
                              id={`druges-${index}-name`}
                              type="number"
                              placeholder="Quantity"
                              {...register(`druges.${index}.quantity`, {
                                required: "Quantity is required",
                              })}
                            />
                            <small className="text-red-500">
                              {errors.druges &&
                                errors.druges[index]?.quantity?.message}
                            </small>
                          </div>
                          <div className="flex gap-x-2 items-center mt-2">
                            <input
                              id={`druges-${index}-name`}
                              type="checkbox"
                              {...register(`druges.${index}.essentiality`, {})}
                            />
                            <label htmlFor={`druges-${index}-value`}>
                              Essential *
                            </label>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="px-5 py-1 border-2 border-primary w-max rounded-lg text-sm mt-3 text-primary flex items-center justify-center gap-2"
                        >
                          <span>DELETE</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => append("")}
                  className="px-5 py-2 text-white bg-primary w- rounded-lg flex justify-center items-center gap-2 mt-2"
                >
                  <span>Add</span>
                </button>
              </div>
            </div>
            <div className=" col-span-2 flex gap-7 justify-end w-full">
              <button
                className="bg-primary text-white px-10 py-16 mt-4  flex justify-center items-center justify-self-center rounded-full hover:-translate-y-px"
                onClick={handleSubmit(handlePreview)}
              >
                <span className="ml-1 font-medium text-xl">preview</span>
              </button>
              {/* <button
                className="bg-primary text-white px-6 py-3 mt-4 w-full  flex justify-center items-center justify-self-center rounded-full hover:-translate-y-px"
                onClick={handleSubmit}
              >
                <span className="ml-1 font-medium ">Submit</span>
              </button> */}
            </div>
          </form>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
export default Page;
