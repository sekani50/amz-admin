import React from "react";

import Container from "../admincontainer/container";
import { FaPenAlt } from "react-icons/fa";

function Userdetails() {
  return (
    <Container>
      <div className="w-full h-full px-2  sm:px-6 bg-white pt-4 sm:pt-16">
        <h1 className="text-xl font-bold">User details</h1>
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
      </div>
    </Container>
  );
}

export default Userdetails;
