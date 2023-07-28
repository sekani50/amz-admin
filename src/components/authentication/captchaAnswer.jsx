import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { MdNavigateBefore } from "react-icons/md";
import { captchaAnswer } from "../../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { credentials } from "../../Utils/api";
import { getVerificationData } from "../../Redux/Actions/ActionCreators";
const CaptchaAnswer = () => {
  
  const { token, currentUser, verificationData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isError, setError] = useState(false)
  const [regenerating,setRegenerating] = useState(false)

  const handleSubmit = async () => {
    const payload = {
      answer,
      password: verificationData?.password,
    };

    if (answer === "") {
      toast.error("Please enter the text in the picture");
      return;
    }
    setLoading(true)
    await captchaAnswer(token, payload)
      .then((res) => {
        setLoading(false)
        console.log(res.data);
        toast.success('Verfication successful')
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
        toast.error(err.message)
        if(err.response.data?.response?.captcha) {
          dispatch(getVerificationData({
              captcha: err?.response?.data?.response?.captcha,
              password:verificationData?.password
            }))
            toast.error('Try captcha again')
      }
      else {
          setError(true)
      }
 
      const {message} = err.response.data.response
      toast.error(message)
        
        
      });
  };


 async function regenerate() {
    const payload = {
      email:currentUser?.email,
      password: verificationData.password
    };

  
    setRegenerating(true)
    await credentials(token, payload)
      .then((res) => {
       // console.log(res.data);
        const {captcha} = res.data;
        dispatch(getVerificationData({
          captcha,
          password:verificationData?.password
        }))
        setRegenerating(false)
      })
      .catch((err) => {
        console.log(err);
        setRegenerating(false)
        toast.error(err.message)
        const {message} = err.response.data.response
        toast.error(message)
        //toast.error(err.response.data.error)
       
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
        <div className="sm:w-[350px] sm:h-[350px] h-[350px] w-full">
          <img src={verificationData?.captcha} alt="" className="w-full h-full object-fill" />
        </div>
       {isError && <div className="w-full items-center justify-center transition-all duration-150 flex">
            <button
            onClick={regenerate}
            className="bg-[#005ABC] font-medium text-white w-[150px] flex items-center justify-center rounded-lg px-2 h-[45px]">
              {regenerating  ? <LoaderIcon className="animate-spin" />: 'Regenerate'}
            </button>
        </div>}
        <div className="form-group space-y-4 w-full">
          <label className="block font-semibold " htmlFor="text">
            Enter the text you can see in the image above
          </label>
          <input
            className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
            type="text"
            placeholder=""
            name="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-[45px] bg-[#005ABC] font-semibold rounded-lg text-white flex justify-center items-center space-x-2"
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
export default CaptchaAnswer;

