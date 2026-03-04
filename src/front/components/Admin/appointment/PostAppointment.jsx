import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const PostAppointment = () => {

  const navigate = useNavigate();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [pet, setPet] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("applied");
  const [user, setUser] = useState("");

  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {

    readServices(),
      readPets(),
      readUsers()


  }, [])


  const readServices = async () => {

    const response = await fetch(
      BACKEND_URL + "api/services")
      .then(resp => {
        if (!resp.ok) {
          throw new Error("something went wrong")
        }
        return resp.json()
      })
      .then(data => {
        setServices(data)
        setService(data[0].id)
      })
      .catch(err => console.log(err))

  }

  const readPets = async () => {

    const response = await fetch(
      BACKEND_URL + "api/pets")
      .then(resp => {
        if (!resp.ok) {
          throw new Error("something went wrong")
        }
        return resp.json()
      })
      .then(data => {
        setPets(data)
        setPet(data[0].id)
      })
      .catch(err => console.log(err))

  }

  const readUsers = async () => {

    const response = await fetch(
      BACKEND_URL + "api/clients")
      .then(resp => {
        if (!resp.ok) {
          throw new Error("something went wrong")
        }
        return resp.json()
      })
      .then(data => {
        setUsers(data)
        setUser(data[0].id)
      })
      .catch(err => console.log(err))

  }

  const newAppointment = async (e) => {
    e.preventDefault()

    const response = await fetch(
      BACKEND_URL + "api/appointments",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "appointment_date": appointmentDate,
          "appointment_time": appointmentTime,
          "pet_id": pet,
          "service_id": service,
          "status": status,
          "user_id": user
        })
      }
    );

    if (!response.ok) {
      throw new Error("Error creating new appointment");
    }

    navigate("/appointments");

  }


  return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Create Appointment</h2>

      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/appointments")}
      >
        ← Back
      </button>
    </div>

    <div className="card shadow-sm">
      <div className="card-body">

        <form>
          <div className="mb-3">
            <label className="form-label">Client</label>
            <select
              className="form-select"
              onChange={e => setUser(Number(e.target.value))}
            >
              {users.map(el => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Service</label>
            <select
              className="form-select"
              onChange={e => setService(Number(e.target.value))}
            >
              {services.map(el => (
                <option key={el.id} value={el.id}>
                  {el.service_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={appointmentDate}
              onChange={e => setAppointmentDate(e.target.value)}
            />
          </div>

      
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={appointmentTime}
              onChange={e => setAppointmentTime(e.target.value)}
            />
          </div>

        
          <div className="mb-4">
            <label className="form-label">Pet</label>
            <select
              className="form-select"
              onChange={e => setPet(Number(e.target.value))}
            >
              {pets.map(el => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={newAppointment}
            >
              Create Appointment
            </button>
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={() => navigate("/appointments")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default PostAppointment;