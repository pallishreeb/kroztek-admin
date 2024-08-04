/** @format */

import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import {
  userRegister,
  userLogin,
  getUser,
  getUsers,
  removeUser,
  userVerify,
  resendOTP,
} from "../../apis/user";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  let authToken = JSON.parse(localStorage.getItem("token"));
  let userInfo = localStorage.getItem("user");
  const initialState = {
    token: authToken || null,
    isAuthenticated: authToken ? true : false,
    loading: false,
  };
  const [info, setInfo] = useState(initialState);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userloading, setUserloading] = useState(false);
  useEffect(() => {
    authToken &&
      setInfo((info) => ({
        token: authToken,
        isAuthenticated: authToken ? true : false,
        loading: authToken ? true : false,
      }));
  }, [authToken, info?.token]);

  useEffect(() => {
    if (!userInfo) {
      info.token && loadUser();
    } else {
      setUser(userInfo);
    }
  }, [user, info.token]);

  // Load User
  const loadUser = async () => {
    try {
      const res = await getUser(info.token);
      const userData = JSON.stringify(res.data.response);
      setUser(userData);
      localStorage.setItem("user", userData);
    } catch (error) {
      console.log(error);
      setError(error);
      toast.error("Error in Fetching User");
    }
  };
  // Login User
  const login = async (formData, navigate) => {
    userLogin(formData)
      .then((res) => {
        setInfo({
          token: res.data.token,
          isAuthenticated: true,
          loading: false,
        });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        info.token && loadUser();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Error in Login");
        setError(error?.response?.data?.message);
      });
  };
  // register User
  const register = async (formData, navigate) => {
    userRegister(formData)
      .then((res) => {
        navigate(`/verify/${formData.email}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Error in Register");
        setError(error?.response?.data?.message);
      });
  };
  // verify User
  const verify = async (data, navigate) => {
    userVerify(data)
      .then((res) => {
        navigate(`/users`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Error in Verifying Email");
        setError(error?.response?.data?.message);
      });
  };
  // resend otp User
  const resendOtp = async (data) => {
    resendOTP(data)
      .then((res) => {
        toast.success("OTP Sent to your Email");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Error in SendOTP");
        setError(error?.response?.data?.message);
      });
  };
  // get all users
  const getAllUsers = (token) => {
    setUserloading(true);
    getUsers(token)
      .then((res) => {
        setUsers(res.data.response);
        setUserloading(false);
      })
      .catch((err) => {
        console.log(err);
        setUserloading(false);
        toast.error(err?.response?.data?.message || "Error in fetching Users");
      });
  };
  // delete a user
  const deleteUser = (id, token) => {
    try {
      removeUser(id, token);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error in deleting User");
    }
  };
  //Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setInfo({
      token: null,
      isAuthenticated: false,
      loading: false,
    });
    setUser(null);
    setError("");
  };

  // Clear Errors
  const clearErrors = () => setError("");

  return (
    <AuthContext.Provider
      value={{
        token: info.token,
        isAuthenticated: info.isAuthenticated,
        loading: info.loading,
        user: user,
        error: error,
        loadUser,
        login,
        register,
        logout,
        verify,
        resendOtp,
        clearErrors,
        getAllUsers,
        users,
        setUsers,
        deleteUser,
        userloading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const AuthApiProvider = () => useContext(AuthContext);
