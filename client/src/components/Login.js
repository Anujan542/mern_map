import React, { useRef, useState } from "react";
import { Map, Cancel } from "@material-ui/icons";
import "./login.css";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = ({ setShowLogin, setCurrentUser }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const { data } = await axios.post("/api/user/login", user);
      localStorage.setItem("user", JSON.stringify(data));
      setCurrentUser(data);

      setShowLogin(false);

      toast.success("Successfully Registered.Please Login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Map /> Login
      </div>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} placeholder="Enter Email" />
        <input type="password" ref={passwordRef} placeholder="Enter Password" />
        <button className="loginBtn" type="submit">
          Login
        </button>
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
