import React from "react";
import { sendMail } from "../../../Utils/api";
import logo from "../../../assets/png/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { MdNavigateBefore } from "react-icons/md";
import { useSelector } from "react-redux";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  async function handleSubmit() {
    const payload = {
      email,
    };
    if (email === "") {
      toast.error("Please enter your email address");
      return;
    }
    setloading(true);
    await sendMail(token, payload)
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }
  return (
    <div className="w-full h-full inset-0 fixed bg-white">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="absolute top-3 left-3 cursor-pointer w-fit h-fit flex space-x-2 items-center"
      >
        <MdNavigateBefore className="text-[22px]" />
        Back
      </div>
      <div className="absolute m-auto inset-0 w-[95%] sm:w-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="sm:w-[64px] sm:h-[64px] h-[40px] w-[40px]">
          <img src={logo} alt="" className="w-full h-full" />
        </div>
        <div className="text-lg font-semibold sm:text-2xl">
          Enter Your Email Address
        </div>

        <div className="form-group space-y-4 w-full">
          <label className="block font-semibold " htmlFor="email">
            Get verification code
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

        <button
          onClick={handleSubmit}
          className="w-[150px] h-[45px] bg-[#005ABC] font-semibold rounded-lg text-white flex justify-center items-center space-x-2"
        >
          {loading ? (
            <LoaderIcon className="text-base animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
