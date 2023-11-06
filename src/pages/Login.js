import React, { useState, useEffect, useContext } from 'react'
import { Avatar, } from '@mui/material'
import { Person, VisibilityOff, Visibility } from "@mui/icons-material"
import { AuthContext } from '../context/auth/AuthProvider';
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import userlockImg from "../img/user-lock.png"
const Login = () => {
  const [type, setType] = useState(false);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { login, isAuthenticated } = authContext;


  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;


  useEffect(() => {
    isAuthenticated === true && navigate("/");
  }, [isAuthenticated])

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Email and password are required Fields.")
    } else {
      login({
        email, password
      }, navigate);
    }
  };
  return (


    <div className='login'>

      <form className='form' onSubmit={(e) => onSubmit(e)} >
        <h1 className='heading-login'>Sign In</h1>
        <Avatar src={userlockImg}
          sx={{ width: 90, height: 90 }}

        />
        <div className='form-group mt-4'>
          <input
            type={"text"}
            name="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => onChange(e)}
          />
          <Person />
        </div>
        <div className='form-group mt-4'>
          <input
            type={type ? "password" : "text"}
            placeholder="Password..."
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
          {
            type ? <VisibilityOff onClick={() => setType(!type)} /> : <Visibility onClick={() => setType(!type)} />
          }



        </div>
        <button type='submit' className='btn-login'>Sign In</button>

      </form>

    </div>


  )
}

export default Login