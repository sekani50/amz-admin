import React from "react";

import Container from "../admincontainer/container";
import { RxDoubleArrowRight } from "react-icons/rx";
import avatar from "../../assets/png/customerpic.png";
import { useLocation, useNavigate } from "react-router-dom";
function Userdetails() {
  const { state } = useLocation();
  const navigate = useNavigate()

  console.log(state);

  return (
    <Container>
      <div className="w-full h-full px-2  sm:px-6 bg-white pt-4  space-y-4 sm:space-y-6 sm:pt-16">
        <h1 className="text-xl font-bold">User details</h1>
        <div className="rounded-full h-[200px] w-[200px]">
          <img
            src={state?.image || avatar}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid items-center gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-8 w-full sm:w-[500px] ">
          <div className="flex space-x-2 col-span-4 items-center">
            <h3 className="font-semibold">Name:</h3>
            <p>{`${state?.first_name} ${state?.last_name}`}</p>
          </div>
          <div className="flex space-x-2 col-span-4 items-center">
            <h3 className="font-semibold">Email:</h3>
            <p>{`${state?.email}`}</p>
          </div>
          <div className="flex space-x-2 col-span-4 items-center">
            <h3 className="font-semibold">Status:</h3>
            <p>{`${state?.status}`}</p>
          </div>
          <div className="flex space-x-2 col-span-4 items-center">
            <h3 className="font-semibold">Role:</h3>
            <p>{`${state?.role || "User"}`}</p>
          </div>
          <button 
          onClick={() => {
            navigate(`/videos/${state?.id}`)
          }}
          className="flex items-center space-x-2 justify-center col-span-4 w-fit px-6 py-3 font-medium rounded-md text-white bg-[#0449a4]">
            <span> User Videos</span>
            <RxDoubleArrowRight className="text-[22px]" />
          </button>
          <button
           onClick={() => {
            navigate(`/products/${state?.id}`)
          }}
          className="flex items-center space-x-2 justify-center col-span-4 w-fit px-6 py-3 font-medium rounded-md text-white bg-pink-600">
            <span>User Products</span>
            <RxDoubleArrowRight className="text-[22px]" />
          </button>
        </div>
        {/**
         <div className="w-1/2 mt-6 mb-4 relative">
          <label htmlFor="Name" className="font-bold">
            Name
          </label>
          <div>
            <input
              type="text"
              className=" bg-transparent outline-none border p-4 w-full rounded-md"
              label="Sierra Ferguson"
            />
            <div className="absolute bg-blue-600 top-0 -right-3 h-8 w-8 rounded-full grid place-content-center">
              <FaPenAlt className="text-white" />
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-6 mb-4 relative">
          <label htmlFor="Name" className="font-bold">
            Email address
          </label>
          <div>
            <input
              type="text"
              className=" bg-transparent outline-none border p-4 w-full rounded-md"
              label="Sierra Ferguson"
            />
            <div className="absolute bg-blue-600 top-0 -right-3 h-8 w-8 rounded-full grid place-content-center">
              <FaPenAlt className="text-white" />
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-6 mb-4 relative">
          <label htmlFor="Name" className="font-bold">
            Phone number
          </label>
          <div>
            <input
              type="text"
              className=" bg-transparent outline-none border p-4 w-full rounded-md"
              label="+2348169542991"
            />
            <div className="absolute bg-blue-600 top-0 -right-3 h-8 w-8 rounded-full grid place-content-center">
              <FaPenAlt className="text-white" />
            </div>
          </div>
        </div>

        <button className="bg-blue-600 p-3 text-white rounded-lg">
          {" "}
          Save Changes
        </button>
        */}
      </div>
    </Container>
  );
}

export default Userdetails;
