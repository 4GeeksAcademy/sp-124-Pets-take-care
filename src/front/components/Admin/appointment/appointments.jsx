import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


const Appointments = () => {

    const [appointments, setAppointments] = useState([])
    const { id } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {

        readAppointments()

    }, [])


    const readAppointments = () => {
        fetch( BACKEND_URL + "api/appointments")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setAppointments(data)
            )
            .catch(err => console.log(err))
    }

    const deleteAppointment = async (id) => {
  
    const response = await fetch(
      BACKEND_URL +  `api/appointments/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Error deleting appointment");
    }

    if(response.ok) {
        alert("appointment deleted")
        window.location.reload();
    }

};

    

    return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Appointments</h2>
      <button
        className="btn btn-dark"
        onClick={() => navigate("/appointments/new")}
      >
        + New Appointment
      </button>
    </div>
    {appointments?.length === 0 ? (
      <div className="text-muted">
        No appointments found.
      </div>

    ) : (

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Client</th>
              <th>Date</th>
              <th>Time</th>
              <th>Pet</th>
              <th>Service</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(el => (
              <tr key={el.id}>

                <td>{el.user_name}</td>
                <td>{el.appointment_date}</td>
                <td>{el.appointment_time}</td>
                <td>{el.pet_name}</td>
                <td>{el.service_name}</td>

                <td>
                  {el.state === "confirmed" && (
                    <span className="badge bg-success">Confirmed</span>
                  )}
                  {el.state === "pending" && (
                    <span className="badge bg-warning text-dark">Pending</span>
                  )}
                  {el.state === "cancelled" && (
                    <span className="badge bg-secondary">Cancelled</span>
                  )}
                  {!["confirmed","pending","cancelled"].includes(el.state) && (
                    <span className="badge bg-dark">{el.state}</span>
                  )}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigate(`/appointments/${el.id}`)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/appointments/edit/${el.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteAppointment(el.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
         </tbody>
        </table>
      </div>
    )}
  </div>
)
}
export default Appointments