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
    <div className="container">
        <h1>New Account</h1>

        <form>
            <div className="container">
                <label className="form-label mt-3">Name</label>
                <input className="form-control" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="container">
                <label className="form-label mt-3">Last Name</label>
                <input className="form-control" placeholder="last name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="container">
                <label className="form-label mt-3">Email</label>
                <input className="form-control" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="container">
                <label className="form-label mt-3">Password</label>
                <input className="form-control" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary mt-3" type="button" onClick={newSitter}>
                Create
            </button>
        </form>
    </div>
  );
};

export default NewSitterAccount;