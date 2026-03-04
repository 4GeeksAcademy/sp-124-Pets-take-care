import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../../../main"

const AppointmentSitterList = () => {

    const [appointmentSitter, setAppointmentSitter] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
            getAppointmentSitter()
    }, [])

    const getAppointmentSitter = () => {
        fetch( BACKEND_URL + "api/appointments/sitters")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })
            .then(data => setAppointmentSitter(data.appointments))
            .catch(err => console.log(err))
    }

    const deleteAppointmentSitter = async (id) => {
        const response = await fetch(
            BACKEND_URL + `api/appointments/sitters/${id}`,
            {
                method: "DELETE"
            }
        )
        if (!response.ok) {
            throw new Error("Error deleting sitter's appointment")
        }
        if (response.ok) {
            alert("sitter's appointment deleted")
            getAppointmentSitter()
        }
    }
    
    return (

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Appointment Sitters</h2>

      <button
        className="btn btn-dark"
        onClick={() => navigate("/appointments/sitters/new")}
      >
        + Assign Sitter
      </button>
    </div>

    {appointmentSitter.length === 0 ? (

      <div className="text-muted">
        No sitter assignments found.
      </div>

    ) : (

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-light">
            <tr>
              <th>Sitter</th>
              <th>Client</th>
              <th>Date</th>
              <th>Time</th>
              <th>Pet</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>

            {appointmentSitter.map(el => (

              <tr key={el.id}>

                <td>
                  {el.sitter.name} {el.sitter.last_name}
                </td>

                <td>
                  {el.appointment.user_name}
                </td>

                <td>
                  {el.appointment.appointment_date || "Unavailable"}
                </td>

                <td>
                  {el.appointment.appointment_time || "Unavailable"}
                </td>

                <td>
                  {el.appointment.pet_name || "Unavailable"}
                </td>

                <td>
                  <span className="badge bg-secondary">
                    {el.state || "Unknown"}
                  </span>
                </td>

                <td className="text-end">

                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigate("/appointments/sitters/" + el.id)}
                  >
                    Info
                  </button>

                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate("/appointments/sitters/edit/" + el.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteAppointmentSitter(el.id)}
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
);
}

export default AppointmentSitterList