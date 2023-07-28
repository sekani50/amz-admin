import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHome, BiLogOutCircle } from "react-icons/bi";
import { BsCalendar2Minus } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { CiVideoOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const SideNav = ({ isNav, setisNav }) => {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();
   const dispatch = useDispatch()

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setisNav(!isNav);
      }}
      className={`fixed z-[37] inset-y-0 left-0 h-full let swipeInLeft ${
        isNav
          ? "w-full bg-black bg-opacity-50 min-[1024px]:w-[250px]"
          : "max-[1024px]:hidden w-[250px] "
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col relative items-center h-full w-[250px] cursor-pointer shadow-md bg-white"
      >
        <div className="my-1 justify-center  flex flex-col w-full ">
          <Link
            to="/"
            className="uppercase text-[#005ABC] font-medium my-3 text-[15px] sm:text-lg"
          >
            Amz
          </Link>

          <div className="grid w-full items-center my-4 gap-12 grid-cols-6">
            <div className="rounded-full h-[40px] w-[40px]">
              <div className="w-full h-full flex items-center justify-center p-2 rounded-full border ">
                <span className="text-[#005ABC] font-semibold uppercase">
                  {currentUser?.first_name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-[160px] justify-start col-span-5">
              <div className="whitespace-nowrap text-ellipsis w-full overflow-hidden">
                {currentUser?.first_name}
              </div>
              <div className="text-gray-500 whitespace-nowrap text-ellipsis w-full overflow-hidden">
                {currentUser?.email}
              </div>
            </div>
          </div>

          <Link
            to="/dashboard"
            className={` flex space-x-3 justify-start items-center font-medium px-3 my-2 py-2 ${
              pathname.toLocaleLowerCase().includes("admin/dashboard")
                ? "bg-[#005ABC]  rounded-lg text-white"
                : "text-gray-600"
            } `}
          >
            <BiHome className="text-[25px] " />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/users"
            className={`flex space-x-3 justify-start items-center font-medium px-3 my-2 py-2 ${
              pathname.toLocaleLowerCase().includes("user")
                ? "bg-[#005ABC]  rounded-lg text-white"
                : "text-gray-600"
            } `}
          >
            <AiOutlineUser className="text-[25px] " />
            <span>User Management</span>
          </Link>
          <Link
            to="/products"
            className={` flex space-x-3 justify-start items-center font-medium px-3 my-2 py-2 ${
              pathname === "/admin/products"
                ? "bg-[#005ABC]  rounded-lg text-white"
                : "text-gray-600"
            } `}
          >
            <BsCalendar2Minus className="text-[25px] " />
            <span>Product</span>
          </Link>

          <Link
            to="/videos"
            className={` flex space-x-3 justify-start items-center font-medium px-3 my-2 py-2 ${
              pathname === "/admin/videos"
                ? "bg-[#005ABC]  rounded-lg text-white"
                : "text-gray-600"
            } `}
          >
            <div className="w-[25px] ">
              <CiVideoOn className="text-[25px]" />
            </div>
            <span>Videos</span>
          </Link>

          <Link
            to="/setting"
            className={` flex space-x-3 justify-start items-center font-medium px-3 my-2 py-2 ${
              pathname === "/admin/videos"
                ? "bg-[#005ABC]  rounded-lg text-white"
                : "text-gray-600"
            } `}
          >
            <div className="w-[25px] ">
              <IoSettingsOutline className="text-[25px]" />
            </div>
            <span>Settings</span>
          </Link>

          <div
          onClick={handleLogout}
            className={`relative flex mt-[20%] space-x-3 justify-start items-center px-3 py-2 font-medium bg-red-600 bg-opacity-[0.15] rounded-lg text-red-500`}
          >
            <BiLogOutCircle className="text-[25px] " />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
