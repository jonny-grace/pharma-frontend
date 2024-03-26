import Image from 'next/image';
import React from 'react';

const FullscreenImage = () => {
  return(
    <div className="py-8 w-full bg-blue-50 h-full">
    <div className="flex border  border-spacing-1 px-4 py-32 rounded-lg shadow-lg overflow-hidden mx-auto  max-w-sm lg:max-w-7xl">
      <div
        className="hidden lg:flex justify-center lg:w-1/2   bg-blue-400"
        // style={{ backgroundImage: "url(../assets/maldo_login.png)" }}
      >
        <Image src={'/assets/maldo_login.png'} width={1000} height={1000} alt="maldo" 
        className=" bg-cover object-cover" />
      </div>
      <div className="w-full p-8 lg:w-1/2">
        {/* <h2 className="text-2xl font-semibold text-gray-700 text-center">Doctor</h2> */}
        <p className="text-xl text-gray-600 text-center">Welcome back!</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase"
          >
            login Here
          </a>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              {/* <a href="#" className="text-xs text-gray-500">Forget Password?</a> */}
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-gray-700  text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              Login
            </button>
          </div>
        </form>
        <h2 className=" w-full mx-auto italic text-gray-800 my-7">
          {" "}
          you are a new pharmacy register here{" "}
          <Link
            className=" text-blue-200 hover:text-blue-500 hover:underline font-bold"
            href={"/register-new-pharmacy"}
          >
            Register
          </Link>
        </h2>
      </div>
    </div>
  </div>
  )
};

export default FullscreenImage;
