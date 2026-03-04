import React from "react";


const AdminHome = () => { 

    const clientsCount = 12
    const sittersCount = 8
    const openAppointmentsCount = 5
    const pendingAssignmentsCount = 2



    return (

  <div>

    <div className="mb-4">
      <h2>Dashboard</h2>
      <p className="text-muted">
        System overview and quick management access.
      </p>
    </div>

    
    <div className="row mb-4">
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h6 className="text-muted">Total Clients</h6>
            <h4>{clientsCount}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h6 className="text-muted">Total Sitters</h6>
            <h4>{sittersCount}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h6 className="text-muted">Open Appointments</h6>
            <h4>{openAppointmentsCount}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h6 className="text-muted">Pending Assignments</h6>
            <h4>{pendingAssignmentsCount}</h4>
          </div>
        </div>
      </div>

    </div>

    <div className="card shadow-sm">
      <div className="card-body">

        <h6 className="mb-3">Quick Actions</h6>

        <div className="d-flex flex-wrap gap-3">
          <button
            className="btn btn-dark"
            onClick={() => navigate("/appointments/new")}
          >
            New Appointment
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/services")}
          >
            Manage Services
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/skills")}
          >
            Manage Skills
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/clients")}
          >
            Manage Clients
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default AdminHome 