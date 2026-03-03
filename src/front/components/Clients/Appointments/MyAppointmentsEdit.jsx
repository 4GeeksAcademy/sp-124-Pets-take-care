import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../main";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MyAppointmentsEdit = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [editarDate, setEditarDate] = useState("")
  const [editarTime, setEditarTime] = useState("")
  const [editarPet, setEditarPet] = useState(null)
  const [editarService, setEditarService] = useState(null)
  const [editarStatus, setEditarStatus] = useState("")
  const [editarUser, setEditarUser] = useState(null)

  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  


  useEffect(() => {
    readServices()
    readPets()
    

    fetch(BACKEND_URL + `api/clients/appointments/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("clientToken")}`
      }
    })
      .then(res => res.json())
      .then(data => {

        setEditarDate(data.appointment_date || "");
        setEditarTime(data.appointment_time ? data.appointment_time.slice(0, 5) : "");
        setEditarStatus(data.status || "");
        setEditarService(data.service_id ?? null);
        setEditarPet(data.pet_id ?? null);
      });
  }, [id]);

  const readServices = async () => {

    const response = await fetch(
      BACKEND_URL + "api/services")
      .then(resp => {
        if (!resp.ok) {
          throw new Error("something went wrong")
        }
        return resp.json()
      })
      .then(data =>
        setServices(data)

      )
      .catch(err => console.log(err))

  }

  const readPets = async () => {

    const response = await fetch(
      BACKEND_URL + "api/clients/pets", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
      }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error("something went wrong")
        }
        return resp.json()
      })
      .then(data =>
        setPets(data)

      )
      .catch(err => console.log(err))

  }

  const updateAppointment = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        BACKEND_URL + `api/clients/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${localStorage.getItem("clientToken")}`
          },
          body: JSON.stringify({
            "appointment_date": editarDate,
            "appointment_time": editarTime,
            "pet_id": editarPet,
            "service_id": editarService,
            "status": editarStatus,
            "user_id": editarUser
          })
        }
      );
      if (!response.ok) {
        throw new Error("Error updating appointment");
      }
      Swal.fire({
        title: "Appointment Edited",
        icon: "success",
        draggable: true
      });

      navigate("/clients/appointments");

    } catch (error) {
      console.error(error);
      alert("Could not update appointment");
    }
  };

  


  return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="mb-4 text-center">Edit Appointment</h1>
          <form onSubmit={updateAppointment} className="appointment-form">
            <div className="mb-3">
              <label className="form-label">Service</label>
              <select
                name="service"
                value={editarService}
                className="form-select"
                onChange={e => setEditarService(Number(e.target.value))}
              >
                {services.map(el => (
                  <option key={el.id} value={el.id}>
                    {el.service_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={editarDate}
                onChange={e => setEditarDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                value={editarTime}
                onChange={e => setEditarTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Pet</label>
              <select
                name="pet"
                className="form-select"
                value={editarPet}
                onChange={e => setEditarPet(Number(e.target.value))}
              >
                {pets.map(el => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-warm w-100">
                Save Changes
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

export default MyAppointmentsEdit