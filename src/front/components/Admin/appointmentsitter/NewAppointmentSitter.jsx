import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../../main"
import { useNavigate, useParams } from "react-router-dom"

const NewAppointmentSitter = () => {

    const [appointmentsList, setAppointmentList] = useState([])
    const [sittersList, setSitterList] = useState([])
    const [appointmentEscogido, setAppointmentEscogido] = useState()
    const [sitterEscogido, setSitterEscogido] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    
    const getAppointments = () => {
        fetch(BACKEND_URL + "api/appointments")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => setAppointmentList(data))
            .catch(err => console.log(err))
    }
    const getSitters = () => {
        fetch(BACKEND_URL + "api/sitters")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => setSitterList(data))
            .catch(err => console.log(err))
    }

    const postAS = () => {
        fetch(BACKEND_URL + `api/appointments/sitters/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "appointment_id": appointmentEscogido,
                "sitter_id": sitterEscogido
            }),
            redirect: "follow"
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => {
                navigate(-1)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAppointments()
        getSitters()
    }, [])

    const handleSelect1 = (event) => {
        setAppointmentEscogido(event.target.value)
    }
    const handleSelect2 = (event) => {
        setSitterEscogido(event.target.value)
    }

    return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Assign Sitter to Appointment</h2>

      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/appointments/sitters")}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label">Select Appointment</label>

          <select
            className="form-select"
            value={appointmentEscogido}
            onChange={handleSelect1}
          >
            <option value="">
              Choose an appointment
            </option>
            {appointmentsList?.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.user_name} — {appointment.service_name} ({appointment.pet_name})
              </option>
            ))}

          </select>
        </div>
        <div className="mb-4">
          <label className="form-label">Select Sitter</label>
          <select
            className="form-select"
            value={sitterEscogido}
            onChange={handleSelect2}
          >
            <option value="">
              Choose a sitter
            </option>
            {sittersList?.map((sitter) => (
              <option key={sitter.id} value={sitter.id}>
                {sitter.name}
              </option>
            ))}

          </select>
        </div>
        <div className="d-flex gap-3">
          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={postAS}
          >
            Create Assignment
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={() => navigate("/appointments/sitters")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

);
}

export default NewAppointmentSitter