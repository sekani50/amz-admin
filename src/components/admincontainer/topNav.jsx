import React from "react";
import {FiMenu} from 'react-icons/fi'

const TopNav = ({setisNav, isNav}) => {
 
  return (
    <>
    <div
   
    className={`right min-[1024px]:float-right bg-white border-b border-gray-200 px-3 py-3 sm:py-8 sm:px-6 flex justify-between items-center `}>
        <div
        onClick={() => {
            setisNav(!isNav)
        }}
        className="min-[1024px]:hidden ">
            <FiMenu className="text-[25px] text-gray-400"/>
        </div>
     
    </div>

   
    </>
  );
};

export default TopNav;
