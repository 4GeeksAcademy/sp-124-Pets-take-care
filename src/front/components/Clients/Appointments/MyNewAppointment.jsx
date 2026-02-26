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
    <div className="container mb-3">
      <div className="container mb-3">
        <h4>Service</h4>
        <select name="service" className="form-control" onChange={e => setService(Number(e.target.value))}>
          {
            services.map(el =>
              <option
                key={el.id}
                value={el.id}>
                {el.service_name}

              </option>
            )
          }
        </select>
      </div>
      <div className="container mb-3">
        <input type="date" className="form-control" placeholder="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} />
      </div>
      <div className="container mb-3">
        <input type="time" className="form-control" placeholder="time" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
      </div>
      <div className="container mb-3">
        <select name="pet" onChange={e => setPet(Number(e.target.value))}>
          {
            pets.map(el =>
              <option
                key={el.id}
                value={el.id}
              >{el.name}

              </option>
            )
          }
        </select>
      </div>
      <div className="container">
      <button className="btn btn-success" onClick={newApp}>New Appointment</button>
      <button className="btn btn-primary ms-3" onClick={() => navigate("/clients/appointments")}>Back</button>
      </div>
    </div>

  )

}

export default MyNewAppointment