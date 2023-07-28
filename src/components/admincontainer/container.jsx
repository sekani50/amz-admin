import React, { useState } from "react";
import SideNav from "./sideNav";
import TopNav from "./topNav";
const Container = ({ children }) => {
  const [isNav, setisNav] = useState(false);
  return (
    <div className="w-full h-full pb-[50px]  bg-gray-50 text-zinc-700">
      <TopNav isNav={isNav} setisNav={setisNav} />

      <div className="right min-[1010px]:float-right bg-gray-50 ">
        {children}
      </div>
      <SideNav isNav={isNav} setisNav={setisNav} />
     
    </div>
  );
};

export default Container;
