import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import { useState } from "react";
export default function DiagnosisPreview({
  open,
  setOpen,
  data = { druges: [] },
}) {
  //   const [open, setOpen] = useState(false);
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-5 gap-10 w-full h-full bg-blue-900">
              <div className=" col-span-2 w-full h-full flex flex-col  gap-28">
                <h1 className="text-white text-4xl mt-16 text-center">
                  Doctor Prescription Preview{" "}
                </h1>
                <div className="flex  bg-slate-300  mr-4 gap-10 px=5">
                  <button className="bg-gray-600 border-4 shadow-lg hover:bg-gray-700 text-white font-bold px-10 py-16 w-40 h-40  rounded-full mb-2">
                    Edit
                  </button>
                  <button className="bg-red-500 border-4 shadow-lg hover:bg-red-700 text-white font-bold px-10 py-16 w-40 h-40  rounded-full text-center">
                    issue Prescription
                  </button>
                </div>
              </div>
              <div className="col-span-3 flex flex-col items-center">
                <div className="flex w-full bg-gray-200 justify-center">
                  <Image
                    src="/assets/logo.png"
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="h-20 w-full object-contain"
                  />
                </div>
                <h3 className="text-white text-center">
                  MALDO INTERNAL MEDICINE SPECIALITY CLINIC PRESCRIPTION
                </h3>
                <div className="flex justify-center">
                  <div>
                    {/* List of Medicines */}
                    <div className="flex gap-3 my-4">
                      <h2 className=" border-2 px-3 py-2 font-bold uppercase text-center text-white rounded-md ">
                        Drug Name
                      </h2>
                      <h2 className=" border-2 px-3 py-2 font-bold uppercase text-center text-white rounded-md ">
                        Drug Description
                      </h2>
                      <h2 className=" border-2 px-3 py-2 font-bold uppercase text-center text-white rounded-md ">
                        Quantity
                      </h2>
                      <h2 className=" border-2 px-3 py-2 font-bold uppercase text-center text-white rounded-md ">
                        Essentiality
                      </h2>
                    </div>

                    {data.druges.map((medicine, index) => (
                      <div key={index} className="flex gap-3">
                        <h2 className=" border-2 px-3 py-2  font-bold uppercase text-center text-white rounded-md min-w-[139px] ">
                          {medicine.name}
                        </h2>
                        <h2 className=" border-2 px-3 py-2 font-bold uppercase text-center text-white rounded-md min-w-[139px] ">
                          {medicine.description}
                        </h2>

                        <h2 className=" border-2 px-3 py-2 font-bold uppercase text-center text-white rounded-md min-w-[139px] ">
                          {medicine.quantity}
                        </h2>
                        <h2 className=" border-2 px-3 py-2 font-bold uppercase text-center text-white rounded-md min-w-[139px] ">
                          {medicine.essential}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>{/* <pre>{JSON.stringify(data.druges, null, 2)}</pre> */}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus></Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
