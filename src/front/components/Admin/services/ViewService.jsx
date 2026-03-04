import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import { useNavigate } from "react-router-dom";

const ViewService = () => {

    const { id } = useParams();
    const [service, setService] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {

        getService()

    }, [id])

    const getService = () => {
        fetch(
            BACKEND_URL+`api/services/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setService(data)
            )
            .catch(err => console.log(err))
    }

    if (!service) {
        return <p>Loading service...</p>;
    }

    return (

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Service Details</h2>

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

        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Service Name</strong>
            <div>{service.service_name}</div>
          </div>

          <div className="col-md-6">
            <strong>Duration (minutes)</strong>
            <div>{service.duration_minutes}</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <strong>Cost</strong>
            <div>${service.cost}</div>
          </div>
        </div>

      </div>
    </div>

  </div>
);
}

export default ViewService