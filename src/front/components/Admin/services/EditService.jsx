import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const EditService = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editarServiceName, setEditarServiceName] = useState("")
    const [editarDurationMinutes, setEditarDurationMinutes] = useState("")
    const [editarCost, setEditarCost] = useState("")

    useEffect(() => {
        fetch(BACKEND_URL+`api/services/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditarServiceName(data.service_name);
                setEditarDurationMinutes(data.duration_minutes);
                setEditarCost(data.cost);
            });
    }, [id]);

    const editService = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(BACKEND_URL+`api/services/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "service_name": editarServiceName,
                        "duration_minutes": editarDurationMinutes,
                        "cost": editarCost,
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error updating service");
            }

            navigate("/services");

        } catch (error) {
            console.error(error);
            alert("Could not update services");
        }
    };

    return (

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Edit Service</h2>
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
        <form onSubmit={editService}>
          <div className="mb-3">
            <label className="form-label">Service Name</label>
            <input
              type="text"
              className="form-control"
              value={editarServiceName}
              onChange={e => setEditarServiceName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Duration (minutes)</label>
            <input
              type="number"
              className="form-control"
              value={editarDurationMinutes}
              onChange={e => setEditarDurationMinutes(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Cost</label>
            <input
              type="number"
              className="form-control"
              value={editarCost}
              onChange={e => setEditarCost(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
)
}

export default EditService