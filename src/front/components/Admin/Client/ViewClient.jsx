import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import { useNavigate } from "react-router-dom";

const ViewClient = () => {

    const { id } = useParams();
    const [client, setClient] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {

        getClient()

    }, [id])

    const getClient = () => {
        fetch(
            BACKEND_URL + `api/clients/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setClient(data)
            )
            .catch(err => console.log(err))
    }

    if (!client) {
        return <p>Loading client...</p>;
    }

    return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Client Detail</h2>
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
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Name</strong>
            <div>{client.name}</div>
          </div>

          <div className="col-md-6">
            <strong>Last Name</strong>
            <div>{client.last_name}</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Email</strong>
            <div>{client.email}</div>
          </div>
          <div className="col-md-6">
            <strong>Phone</strong>
            <div>{client.phone || "Unavailable"}</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Address</strong>
            <div>{client.address || "Unavailable"}</div>
          </div>
          <div className="col-md-6">
            <strong>Status</strong>
            <div>
              {client.is_active ? (
                <span className="badge bg-success">Active</span>
              ) : (
                <span className="badge bg-secondary">Inactive</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ViewClient