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
    <div className="container">
      <h1>Edit Appointment</h1>

      <form onSubmit={updateAppointment}>
        <div className="container mb-3">
          <div className="container mb-3">
            <select name="service" value={editarService} className="form-control" onChange={e => setEditarService(Number(e.target.value))}>
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
            <input type="date" className="form-control" placeholder="date" value={editarDate} onChange={e => setEditarDate(e.target.value)} />
          </div>
          <div className="container mb-3">
            <input type="time" className="form-control" placeholder="time" value={editarTime} onChange={e => setEditarTime(e.target.value)} />
          </div>
          <div className="container mb-3">
            <select name="pet" className="form-control" value={editarPet} onChange={e => setEditarPet(Number(e.target.value))}>
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
          <button type="submit" className="btn btn-success" >save Appointment</button>
          <button className="btn btn-primary ms-3" onClick={() => navigate("/clients/appointments")}>Back</button>
        </div>
      </form>
    </div>
  )

}

export default MyAppointmentsEdit