import Image from "next/image";
import Link from "next/link";
import React from "react";

function StartUpPage() {
  return (
    <div>
        <div className="relative w-screen h-screen flex items-center justify-center" style={{backgroundColor:"#00A9F4"}}>
        <Image
          src="/assets/loginImage.jpg"
          alt="Background"
          width={1000}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black opacity-50" /> */}
        <div className="absolute  inset-0 flex flex-col h-full justify-center gap-10 items-center w-[650px] ">
          <div className=" ml-28">
            <Image
              src="/assets/logo.png"
              alt="Background"
              width={1000}
              height={1000}
              className="w-44 h-36 object-cover "
            />
          </div>

          <div className="w-full  p-8">
            <div className=" mx-8 mr-16">
            <div className="flex flex-col gap-6">
              <Link href={'/login'} className=" hover:bg-blue-700 border border-sky-100 text-white text-center font-bold py-2 px-4 rounded-lg">
                Login
              </Link>
              <Link href={'/register'} className="bg-blue-900 hover:bg-blue-900 text-white text-center font-bold py-2 px-4 rounded">
                Register
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartUpPage;
