import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

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

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Create Service</h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/services")}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Service Name</label>
            <input
              type="text"
              className="form-control"
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Duration (minutes)</label>
            <input
              type="number"
              className="form-control"
              value={durationMinutes}
              onChange={e => setDurationMinutes(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Cost</label>
            <input
              type="number"
              className="form-control"
              value={cost}
              onChange={e => setCost(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={postService}
          >
            Create Service
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default NewService;