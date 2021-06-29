import React, { useRef, useState } from "react";
import { Map, Cancel } from "@material-ui/icons";
import "./register.css";
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = ({ setShowRegister }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/api/user/register", newUser);
      setShowRegister(false);
      toast.success("Successfully Registered.Please Login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Map /> Register
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="Enter Username" />
        <input type="email" ref={emailRef} placeholder="Enter Email" />
        <input type="password" ref={passwordRef} placeholder="Enter Password" />
        <button className="registerBtn" type="submit">
          Register
        </button>
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
