import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Privated = () => {
  const [protect, setProtect] = useState();
  let navigate = useNavigate();

  async function isPrivate() {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const data = await fetch(
        process.env.BACKEND_URL + "/api/protected",
        requestOptions
      );
      setProtect(data.status);
    } catch (error) {
      let details = { Error: error };
      console.log("Error en fetch private", details);
    }
  }

  if (protect == undefined) isPrivate();
  if (protect != undefined && protect != 200) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Restricted area</h1>
      <button
        type="button"
        className="btn btn-success mx-1"
        onClick={() => {
          navigate(`/`);
        }}
      >
        Home
      </button>
      <button
        type="button"
        className="btn btn-danger mx-1"
        onClick={() => {
          localStorage.removeItem("token"), navigate(`/`);
        }}
      >
        Logout
      </button>
    </div>
  );
};