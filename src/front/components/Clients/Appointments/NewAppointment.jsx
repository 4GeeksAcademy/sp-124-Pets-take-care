import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const NewAppointment  = () => {

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
      BACKEND_URL + "api/pets", {
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
      .then(data => {
        setPets(data)
        setPet(data[0].id)
      })
      .catch(err => console.log(err))

  }


  const newApp = async (e) => {
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
  
  return (<h1>holaaaaaa</h1>) 

}

export default NewAppointment