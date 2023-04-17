import React, { useState } from "react";
import "../../styles/home.css";

export const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState("");

  async function signup() {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(form),
      };
      const data = await fetch(
        process.env.BACKEND_URL + "/api/signup",
        requestOptions
      );
      let response = await data.json();
      console.log(response);
    } catch (error) {
      let details = { Error: error };
      console.log("Error en fetch private", details);
    }
  }

  function handleinfo(e) {
    setForm({
      ...form,
      [e.target.getAttribute("objkey")]: e.target.value,
    });
  }

  function submitform(e) {
    e.preventDefault();
    signemail.value = "";
    signpass.value = "";
    setUser(form.email);
    signup();
  }

  return (
    <div>
      <form>
        <h3>Create new user</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            objkey="email"
            id="signemail"
            aria-describedby="emailHelp"
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
            objkey="password"
            id="signpass"
            onChange={handleinfo}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitform}>
          Submit
        </button>
      </form>
      {user != "" ? <h3>{user} created</h3> : ""}
    </div>
  );
};