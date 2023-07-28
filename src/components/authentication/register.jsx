import React, { useState } from "react";
import logo from "../../assets/png/logo.png";
//import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { registration } from "../../Redux/Actions/ActionCreators";
import { LoaderIcon } from "lucide-react";
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [confirmpassword, setConfirm] = useState('')

  const handleSubmit = () => {
     const payload = {
      first_name:name,
      last_name:lastname,
      email,
       password,
       password_confirmation:confirmpassword
   }

   for (let i in payload) {
    if (payload[i] === "") {
      toast(`${i} is required`)
      return
    }
   }

   if(password !== confirmpassword) {
    toast('Password must be the same')
    return
   }

   dispatch(registration(payload, navigate, setLoading))

  }
  return (
    <div className="w-full h-full inset-0 fixed overflow-y-auto py-8 bg-white">
      <div className="absolute m-auto inset-0 w-[95%] sm:w-[400px] flex flex-col items-center justify-center">
        <div className="mt-[10rem] sm:w-[64px] sm:h-[64px] h-[40px] w-[40px] mb-3">
          <img src={logo} alt="" className="w-full h-full" />
        </div>
        <div className="mb-3 text-lg sm:text-2xl font-semibold">Sign Up for an Account</div>
        <div className="font-light text-center px-4 mb-3">
          Let’s get you set up so that you can start creating your first
          onboarding experience.
        </div>

        <div className="form-group space-y-4 w-full mb-3">
          <label className="block font-semibold " htmlFor="name">
            First name
          </label>
          <input
            className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
            type="name"
            placeholder="Jiaha"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group space-y-4 w-full mb-3">
          <label className="block font-semibold " htmlFor="name">
            Last name
          </label>
          <input
            className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
            type="name"
            placeholder="Effiong"
            name="name"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
         <div className="form-group space-y-4 w-full mb-3">
          <label className="block font-semibold " htmlFor="email">
            Email Address
          </label>
          <input
            className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
            type="email"
            placeholder="name@company.com"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group space-y-4 w-full mb-3">
          <label className="block font-semibold " htmlFor="password">
            Password
          </label>
          <input
            className="block form__input border-gray-200 border focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
            type="password"
            placeholder="********"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group space-y-4 w-full mb-3">
          <label className="block font-semibold " htmlFor="password">
            Confirm Password
          </label>
          <input
            className="block form__input border-gray-200 border focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
            type="password"
            placeholder="********"
            name="password"
            value={confirmpassword}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#005ABC] mb-3 hover:bg-[#1670d2] rounded-lg text-white flex justify-center items-center space-x-2 font-semibold"
        >
          {loading ? <LoaderIcon  className="text-base animate-spin"/> : "Sign Up"}
        </button>

        <div className=" pb-[2rem]">Already have an account? <span onClick={() => {
          navigate("/")
        }} className="text-[#005ABC] cursor-pointer font-semibold">Log in here</span></div>
      </div>
    </div>
  );
};

export default Register;
