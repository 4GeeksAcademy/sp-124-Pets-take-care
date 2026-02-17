import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../main";

const NewClient = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const postClient = async () => {

        const response = await fetch(
            BACKEND_URL+"api/clients",
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

        navigate("/clients");

    }



    return (
        <div className="container">
            <h1>New Client</h1>

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
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="button" onClick={postClient}>
                    New Client
                </button>
            </form>
        </div>
    );
};

export default NewClient;