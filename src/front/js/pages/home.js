import React from "react";
import "../../styles/home.css";
import { Signup } from "../component/signup.jsx";
import { Login } from "../component/login.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => {
          navigate(`/secure`);
        }}
      >
        Restricted page
      </button>
      <div className="container d-inline-flex justify-content-between">
        <Signup />
        <Login />
      </div>
    </div>
  );
};