import React, {useState} from "react";
import Switch from "../UI/switch";
import { toast } from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { changePassword } from "../../Utils/api";
import { useSelector } from "react-redux";
const Account = () => {
    const [curpassword, setcurPassword] = useState()
    const [newpassword, setnewpassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()
    const [loading, setloading] = useState(false)
    const {token} = useSelector((state) => state.user)

    
  const handleSubmit = async() => {
    const payload = {
      old_password: curpassword,
      new_password: newpassword,
      confirm_password: confirmPassword
    }

    for (let i in payload) {
      if(payload[i] === '') {
        toast.error(`${i} is required`)
        return
      }
    }

    if(confirmPassword !== newpassword) {
      toast.error(`Password must be the same`)
      return
    }
    setloading(true)
    await changePassword(token,payload)
    .then((res) => {
      console.log(res)
      setloading(false)
      toast.success('Update successful')
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
      setloading(false)
      toast.error(err.response.data.error)
    })

  }
    return (
        <div className="w-full pb-10 let swipeIn">
        <div className="w-[95%] mx-auto sm:w-[400px] mb-4 space-y-4 flex flex-col justify-center items-center">
            <div className="sm:text-xl text-lg font-semibold"> Change Password</div>

            <div className="form-group space-y-4 w-full">
      <label className="block font-semibold " htmlFor="password">
        Current Password
      </label>
      <input
        className="block form__input border-gray-200 border focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
        type="password"
        placeholder="********"
        name="password"
        value={curpassword}
        onChange={(e) => {
          setcurPassword(e.target.value);
        }}
      />
    </div>

    <div className="form-group space-y-4 w-full">
      <label className="block font-semibold " htmlFor="password">
        New Password
      </label>
      <input
        className="block form__input border-gray-200 border focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
        type="password"
        placeholder="********"
        name="password"
        value={newpassword}
        onChange={(e) => {
          setnewpassword(e.target.value);
        }}
      />
    </div>

    <div className="form-group space-y-4 w-full">
      <label className="block font-semibold " htmlFor="password">
        Confirm New Password
      </label>
      <input
        className="block form__input border-gray-200 border focus:border-gray-500 hover:border-gray-500 rounded-md focus:outline-none w-full h-11 px-4"
        type="password"
        placeholder="********"
        name="password"
        value={confirmPassword}
        onChange={(e) => {
          setconfirmPassword(e.target.value);
        }}
      />
    </div>
    <button
      onClick={handleSubmit}
      className="w-full h-[45px] bg-[#005ABC] font-semibold rounded-lg text-white flex justify-center items-center"
    >
      {loading ? <LoaderIcon className="animate-spin" /> : "Change Password"}
    </button>

        </div>

    <div className="w-full mt-[4rem] sm:mt-[7rem]">
        <div className="py-3 px-2 border-t-2 border-gray-500 border-b-2">
            <div className="flex w-full justify-between items-center">
                <div className="space-y-2">
                    <div className="font-semibold">Notification</div>
                    <div className="text-[12px] sm:text-sm text-gray-500">Enable Notification</div>
                </div>
                <Switch/>
            </div>
        </div>
        <div className="py-3 px-2 border-gray-500 border-b-2">
            <div className="flex w-full justify-between items-center">
                <div className="space-y-2">
                    <div className="font-semibold">Email Notification</div>
                    <div className="text-[12px] sm:text-sm text-gray-500">Enable email notification</div>
                </div>
                <Switch/>
            </div>
        </div>
    </div>

    </div>
    )
}

export default Account