import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../main";

const CreateSitter = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const newSitter = async () => {

    const prueba = {
          "name": name,
          "last_name": lastName,
          "email": email,
          "password": password,
          "confirm_password": confirmPassword,

        }
        console.log(prueba)

    const response = await fetch(
      BACKEND_URL+"api/signup/sitters",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "name": name,
          "last_name": lastName,
          "email": email,
          "password": password,
          "confirm_password": confirmPassword,

        })
      }
    );

    if (!response.ok) {
      throw new Error("Error creating sitter");
    }

    navigate("/sitters");

  }


  return (
    <div className="container">
      <h1>Post Sitter</h1>

      <form>
        <div className="container">
          <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="container">
          <input placeholder="last name" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <div className="container">
          <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="container">
          <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="container">
          <input placeholder="confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>

        <button type="button" onClick={newSitter}>
          New Sitter
        </button>
      </form>
    </div>
  );
};

export default CreateSitter;