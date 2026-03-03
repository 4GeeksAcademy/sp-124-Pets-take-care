import React from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
const ClientHome = () => {

    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer();




    return (
        <div className="container my-5">
  <div className="client-home-section">

    <h2 className="mb-4">Welcome back, Juan 👋</h2>

    <div className="row">

      <div className="col-12 col-md-4 mb-4">
        <div className="dashboard-card">
          <h5>Next Appointment</h5>
          <p>March 12 - 4:00 PM</p>
        </div>
      </div>

      <div className="col-12 col-md-4 mb-4">
        <div className="dashboard-card">
          <h5>Your Pets</h5>
          <p>2 registered pets</p>
        </div>
      </div>

      <div className="col-12 col-md-4 mb-4">
        <div className="dashboard-card">
          <h5>Quick Action</h5>
          <button className="btn btn-warm w-100"
          onClick={()=> navigate("/clients/appointments/new")}>
            Book New Appointment
          </button>
        </div>
      </div>

    </div>

  </div>
</div>
    )
}

export default ClientHome