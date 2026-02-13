import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../main";

const NewClient = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);


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
                    "password": password,
                    "is_active": isActive,
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
               
                <div className="container">
                    <input type="radio" id="active-yes" name="active" checked={isActive === true}
                        onChange={() => setIsActive(true)} />
                    <label htmlFor="active-yes">Yes</label>
                </div>
                <div className="container">
                    <input type="radio" id="active-no" name="active" checked={isActive === false}
                        onChange={() => setIsActive(false)} />
                    <label htmlFor="active-no">No</label>
                </div>

                <button type="button" onClick={postClient}>
                    New Client
                </button>
            </form>
        </div>
    );
};

export default NewClient;