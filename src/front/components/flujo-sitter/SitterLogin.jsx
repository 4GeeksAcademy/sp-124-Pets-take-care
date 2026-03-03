import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../main";
import useGlobalReducer, { StoreProvider } from "../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const SitterLogin = () => {

    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()


        const response = await fetch(
            BACKEND_URL + "api/sitters/login",
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
        localStorage.setItem("sitterToken", data.sitter_token)


        localStorage.removeItem("clientToken"); 

        navigate("/sitters/home")
    }
    


    return (
        <div className="container bg-secondary-subtle p-5 mt-5">
            <h1 className="text-center mb-3">Loggin</h1>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row d-grid gap-0 row-gap-3">
                        <div className="col-12">
                            <input type="text"
                                className="form-control text-center"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="col-12">
                            <input type="password"
                                className="form-control text-center"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        <button type="submit"
                            className="btn btn-success ">
                            Login
                        </button>
                        <a className="icon-link icon-link-hover" onClick={()=> navigate("/sitters/newaccount")}>
                            Signup
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </form>

        </div>
    )
}


export default SitterLogin 