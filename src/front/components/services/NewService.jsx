import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../main";

const NewService = () => {
    const navigate = useNavigate();

    const [serviceName, setServiceName] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [cost, setCost] = useState("");

    const postService = async () => {

        const response = await fetch(
            BACKEND_URL+"api/services",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "service_name": serviceName,
                    "duration_minutes": durationMinutes,
                    "cost": cost,
                })
            }
        );

        if (!response.ok) {
            throw new Error("Error creating service");
        }

        navigate("/services");

    }

    return (
        <div className="container">
            <h1>New Service</h1>

            <form>
                <div className="container">
                    <input placeholder="Service" value={serviceName} onChange={e => setServiceName(e.target.value)} />
                </div>
                <div className="container">
                    <input placeholder="Duration" value={durationMinutes} onChange={e => setDurationMinutes(e.target.value)} />
                </div>
                <div className="container">
                    <input placeholder="Cost" value={cost} onChange={e => setCost(e.target.value)} />
                </div>
                <button type="button" onClick={postService}>
                    New Service
                </button>
            </form>
        </div>
    );
};

export default NewService;