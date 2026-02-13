import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../main";
import useGlobalReducer from "../../hooks/useGlobalReducer";

const ClientLogin = () => {

    const navigate = useNavigate()
    const {store, dispatch } = useGlobalReducer(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)

        const response = await fetch(
            BACKEND_URL + "api/clients/login",
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
        localStorage.setItem("clientToken", data.access_token)
        
        dispatch ({
            type:"set_auth",
            payload: true
        })

        
        navigate("/clients/home")
    }

    

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit"
                    className="btn btn-success">
                    Login
                </button>

            </form>
        </div>
    )
}


export default ClientLogin 