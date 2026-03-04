import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../main";
import useGlobalReducer from "../../hooks/useGlobalReducer";

const AdminLogin = () => {

    const navigate = useNavigate()
    const {store, dispatch } = useGlobalReducer(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(
            BACKEND_URL + "api/admin/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            },
        );

        if (!response.ok) {
            throw new Error("bad username or password");
        }

        const data = await response.json() 
        localStorage.setItem("adminToken", data.access_token)
        
        dispatch ({
            type:"set_auth",
            payload: true
        })

        
        navigate("/admin/home")
    }

    
return (
  <div className="container my-5">

    <div className="row justify-content-center">
      <div className="col-12 col-md-4">

        <div className="appointment-form p-4">

          <h2 className="text-center mb-4">Admin Login</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-dark w-100"
            >
              Login
            </button>

          </form>

        </div>

      </div>
    </div>

  </div>
);
}


export default AdminLogin 