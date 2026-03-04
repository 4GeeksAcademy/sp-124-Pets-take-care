import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const NewClient = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const postClient = async () => {

        const response = await fetch(
            BACKEND_URL + "api/clients",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "name": name,
                    "last_name": lastName,
                    "email": email,
                    "password": password
                })
            }
        );

        if (!response.ok) {
            throw new Error("Error creating client");
        }

        navigate("/clients/login");

    }



    return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Create Client</h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/clients")}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={postClient}
            >
              Create Client
            </button>
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={() => navigate("/clients")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default NewClient;