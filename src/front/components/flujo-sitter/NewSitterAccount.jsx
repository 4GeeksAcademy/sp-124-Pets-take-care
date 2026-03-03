import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../main";

const NewSitterAccount = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const newSitter = async () => {

    const prueba = {
      "name": name,
      "last_name": lastName,
      "email": email,
      "password": password,

    }


    const response = await fetch(
      BACKEND_URL + "api/signup/sitters",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "name": name,
          "last_name": lastName,
          "email": email,
          "password": password,
        })
      }
    );

    if (!response.ok) {
      throw new Error("Error creating sitter");
    }

    const data = await response.json()
    localStorage.setItem("sitterToken", data.access_token)


    localStorage.removeItem("clientToken");

    navigate("/sitters/home");

  }


  return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="text-center mb-4">Create Sitter Account</h1>
          <form className="appointment-form">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-warm w-100"
              type="button"
              onClick={newSitter}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default NewSitterAccount;