import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const ManagePatients = () => {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reception/patients`
        );
        const data = await response.json();

        // console.log(data);
        setPatients(data.patients);
        // Log the fetched data
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reception/doctors`
        );
        const data = await response.json();

        setDoctors(data); // Update with an array of doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.firstname} ${patient.lastname} ${patient.PID} `
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  //Create an apointment

  const createAppointment = async (patientId, doctorFullName) => {
    const doctor = doctors.find(
      (doctor) => `${doctor.firstname} ${doctor.lastname}` === doctorFullName
    );

    const url = `${process.env.NEXT_PUBLIC_API_URL}/reception/create/appointment`;
    const data = {
      PID: patientId,
      doctorId: doctor.userId,
    };
    console.log(data);
    try {
      const response = await axios.post(url, data);
      // Handle success
      // console.log('Appointment created successfully');

      if (response.data.message === "successfully appointed") {
        // setHasApointment(true);
        console.log("Appointment created successfully", response.data.doctor);
      }
    } catch (error) {
      // Handle errors
      console.error("Error creating appointment:", error);
    }

    setShowAppointmentModal(false);
  };
  const openModalCreateAppointment = (patient) => {
    setSelectedPatient(patient);
    setShowAppointmentModal(true);
  };

  const handleEditPatient = (patient) => {
    // Logic to edit patient details
  };

  const handleRegisterPatient = () => {
    router.push("/reception/register-patient");
  };
  const handleSelectDoctor = (event) => {
    setSelectedDoctor(event.target.value);
  };

  return (
    <div className=" ">
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleRegisterPatient}
        >
          Register Patient
        </button>
        <div>
          <input
            type="text"
            className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="container mx-auto px-5  pb-16">
      <div className="max-w-6xl mx-auto  xll:max-w-7xl xll:mx-auto my-10 overflow-x-auto">
      <table className="text-center w-full mt-8 overflow-x-auto">
        <thead className="bg-secondary h-10">
          <tr className="text-white">
            <th className="border-r-2 border-gray-50 whitespace-nowrap">
              S.No
            </th>
            <th className="border-r-2 border-gray-50 whitespace-nowrap">PID</th>

            <th className="border-r-2 border-gray-50 whitespace-nowrap">
              First Name
            </th>
            <th className="border-r-2 border-gray-50 whitespace-nowrap">
              Last Name
            </th>
            <th className="border-r-2 border-gray-50 whitespace-nowrap">Age</th>
            <th className="border-r-2 border-gray-50 whitespace-nowrap">
              Gender
            </th>
            {/* <th className="border-r-2 border-gray-50 whitespace-nowrap">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr
              key={index}
              className={
                (index + 1) % 2 == 0
                  ? "bg-[#F3F3F3] h-10 text-[#595959] text-base xll:text-xl"
                  : "bg-[#E7E7E7] h-10 text-[#595959] text-base xll:text-xl"
              }
            >
              <td className="border-2 border-white text-center">{index + 1}</td>
              <td className="border-2 border-white text-center">
                {patient.patientId}
              </td>
              <td className="border-2 border-white text-center">
                {patient.firstname}
              </td>
              <td className="border-2 border-white text-center">
                {patient.lastname}
              </td>
              <td className="border-2 border-white text-center">
                {patient.age}
              </td>
              <td className="border-2 border-white text-center">
                {patient.gender}
              </td>
              {/* <td className="border-2 border-white text-center"> */}
              {/* <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEditPatient(patient)}
                >
                  Edit
                </button> */}

              {/* {!patient.hasAppointment && */}
              {/* <button */}
              {/* className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" */}
              {/* onClick={() => openModalCreateAppointment(patient)} */}
              {/* > */}
              {/* //   Create Appointment */}
              {/* // </button>} */}
              {/* // </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      
      {showAppointmentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8">
            <h2 className="text-lg font-bold mb-4">
              Create Appointment for {selectedPatient?.firstname}{" "}
              {selectedPatient?.lastname}
            </h2>
            <select
              className="bg-gray-200 py-2 px-4 rounded"
              value={selectedDoctor}
              onChange={handleSelectDoctor}
            >
              <option></option>
              {doctors.map((doctor) => (
                <option key={doctor._id}>
                  {doctor.firstname + " " + doctor.lastname}
                </option>
              ))}
            </select>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                createAppointment(selectedPatient.patientId, selectedDoctor);
              }}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
