// Action Creators
import * as type from "./Types";
import axios from "../../Utils/useAxios";
import toast from "react-hot-toast";

const GetUsersSuccess = (data) => {
  return {
    type: type.FETCH_USER_SUCCESS,
    payload: data,
  };
};

const loginSuccess = (data) => {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data,
  };
};
const logout = () => {
  return {
    type: type.LOGOUT,
  };
};


const getUser = (token) => {
  return axios.get("/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const LoginAction = (loginParams, navigate, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    await axios
      .post("/login", loginParams)
      .then(async (res) => {
        console.log(res.data);
      
        const { token } = res.data;
        dispatch(loginSuccess(token));

        await getUser(token)
          .then((res) => {
            console.log(res.data);
            dispatch(GetUsersSuccess(res.data));
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(token);
        //console.log(admin);
        navigate("/dashboard");
        setLoading(false);
        toast.success("Login successful");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
        const { message } = error.response.data.response;
        toast.error(message);
      });
  };
};

const registration = (registrationParams, navigate, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    await axios
      .post("/register", registrationParams, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(GetUsersSuccess(res.data));
        dispatch(loginSuccess(res.data.token));
        toast.success("Registration Successful");
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        //console.log(error.response.data.error.message);
        const { message } = error.response.data.response;
        toast.error(message);
      });
  };
};

export {
  LoginAction,
  registration,
  loginSuccess,
  logout,

};
