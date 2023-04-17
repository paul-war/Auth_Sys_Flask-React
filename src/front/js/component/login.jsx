import React, { useState } from "react";
import "../../styles/home.css";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState("");

  async function login() {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(form),
      };
      const data = await fetch(
        process.env.BACKEND_URL + "/api/login",
        requestOptions
      );
      let response = await data.json();
      localStorage.setItem("token", response.access_token);
      setUser(form.email);
    } catch (error) {
      let details = { Error: error };
      console.log("Error en fetch private", details);
    }
  }

  async function checklogin() {
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
      let aux = await data.json();
      setUser(aux.logged_in_as);
    } catch (error) {
      let details = { Error: error };
      console.log("Error en fetch private", details);
    }
  }

  if (localStorage.getItem("token")) checklogin();

  function handleinfo(e) {
    setForm({
      ...form,
      [e.target.getAttribute("objkey")]: e.target.value,
    });
  }

  function submitform(e) {
    e.preventDefault();
    logpass.value = "";
    logemail.value = "";
    login();
  }

  let logout = (
    <button
      type="button"
      className="btn btn-danger mx-1"
      onClick={() => {
        localStorage.removeItem("token"), setUser("");
      }}
    >
      Logout
    </button>
  );

  return (
    <div>
      <form>
        <h3>Login</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="logemail"
            aria-describedby="emailHelp"
            objkey="email"
            onChange={handleinfo}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="logpass"
            objkey="password"
            onChange={handleinfo}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitform}>
          Submit
        </button>
        {user != "" ? logout : ""}
      </form>
      {user == "" ? <h3>Not logged</h3> : <h3>Logged as {user}</h3>}
    </div>
  );
};