import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import Swal from "sweetalert2";
const MyNewAppointment = () => {

  const navigate = useNavigate();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [pet, setPet] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("applied");
  const [user, setUser] = useState("");

  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);



  useEffect(() => {

    readServices(),
      readPets()
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
      BACKEND_URL + "api/clients/pets", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
      }
    })
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


  const newApp = async (e) => {
    e.preventDefault()

    const response = await fetch(
      BACKEND_URL + "api/clients/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
        },
        body: JSON.stringify({
          "appointment_date": appointmentDate,
          "appointment_time": appointmentTime,
          "pet_id": pet,
          "service_id": service
        })
      }
    );

    if (!response.ok) {
      throw new Error("Error creating new appointment");
    }
    Swal.fire({
               title: "New appointment added!",
               icon: "success",
               draggable: true
           });

    navigate("/clients/appointments");

  }

  return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">

      <div className="row justify-content-center">
        <div className="col-12 col-md-6">

          <h1 className="mb-4 text-center">New Appointment</h1>

          <form className="appointment-form">

            {/* Service */}
            <div className="mb-3">
              <label className="form-label">Service</label>
              <select
                name="service"
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

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={appointmentDate}
                onChange={e => setAppointmentDate(e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                value={appointmentTime}
                onChange={e => setAppointmentTime(e.target.value)}
              />
            </div>

            {/* Pet */}
            <div className="mb-4">
              <label className="form-label">Pet</label>
              <select
                name="pet"
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

            {/* Buttons */}
            <div className="d-flex justify-content-between gap-3">
              <button
                type="button"
                className="btn btn-warm w-100"
                onClick={newApp}
              >
                Create Appointment
              </button>

              <button
                type="button"
                className="btn btn-outline-warm w-100"
                onClick={() => navigate("/clients/appointments")}
              >
                Back
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  </div>
);

}

export default MyNewAppointment