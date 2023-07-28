import React, { useState } from "react";
import logo from "../../assets/png/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch} from "react-redux";
import {
  LoginAction
} from "../../Redux/Actions/ActionCreators";
import { LoaderIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();



  const handleSubmit = () => {
    const payload = {
      email,
      password,
    };

    for (let i in payload) {
      if (payload[i] === "") {
        toast(`${i} is required`);
        return;
      }
    }
    dispatch(LoginAction(payload, navigate, setLoading));
  };
  return (
    <div className="w-full h-full inset-0 fixed bg-white">
      <div className="absolute m-auto inset-0 w-[95%] sm:w-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="sm:w-[64px] sm:h-[64px] h-[40px] w-[40px]">
          <img src={logo} alt="" className="w-full h-full" />
        </div>
        <div className="text-lg font-semibold sm:text-2xl">Welcome Back!</div>
        <div className="font-light text-center px-4">
          To keep connected with us please login with your personal info
        </div>

        <div className="form-group space-y-4 w-full">
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
        <div className="form-group space-y-4 w-full">
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
        <div className="w-full flex justify-between items-center">
          <div className="space-x-2 flex items-center">
            <input type="checkbox" />
            <label htmlFor="subscribeNews">Remember me</label>
          </div>
          <button
            onClick={() => {
              navigate("/forgot-password");
            }}
            className="text-[#005ABC] font-semibold"
          >
            Forgot Password?
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full h-[45px] bg-[#005ABC] font-semibold rounded-lg text-white flex justify-center items-center space-x-2"
        >
          {loading ? (
            <LoaderIcon className="text-base animate-spin" />
          ) : (
            "Log in"
          )}
        </button>

        <div>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="text-[#005ABC] font-semibold cursor-pointer"
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
