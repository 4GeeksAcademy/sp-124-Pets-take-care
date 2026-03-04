import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSitter = () => { 

    const navigate = useNavigate()


    return (
  <div className="container my-5">

    <div className="appointments-section p-4 p-md-5">

      <h1 className="mb-4">
        Welcome back 👋
      </h1>

      <div className="row">

        <div className="col-12 col-md-4 mb-4">
          <div className="dashboard-card text-center">
            <h5 className="mb-3">New Requests</h5>
            <p className="display-6 mb-3">--</p>
            <button
              className="btn btn-warm w-100"
              onClick={() => navigate("/appointments/list")}
            >
              View Requests
            </button>
          </div>
        </div>

        <div className="col-12 col-md-4 mb-4">
          <div className="dashboard-card text-center">
            <h5 className="mb-3">Open</h5>
            <p className="display-6 mb-3">--</p>
            <button
              className="btn btn-outline-warm w-100"
              onClick={() => navigate("/appointments-sitters/own")}
            >
              See Open
            </button>
          </div>
        </div>

        <div className="col-12 col-md-4 mb-4">
          <div className="dashboard-card text-center">
            <h5 className="mb-3">Assigned</h5>
            <p className="display-6 mb-3">--</p>
            <button
              className="btn btn-outline-warm w-100"
              onClick={() => navigate("/appointments-sitters/asigned")}
            >
              See Assigned
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
);
}

export default HomeSitter 