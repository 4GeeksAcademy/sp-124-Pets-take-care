import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../main";

const PostAppointment = () => {
  
  const navigate = useNavigate();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [pet, setPet] = useState("");
  const [service, setService] = useState("");
  const [state, setEstate] = useState("pending");
  const [user, setUser] = useState("");
  
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]); 
 

  useEffect(() => {

    readServices(),
    readPets(),
    readUsers()
    
  
  },[])


  const readServices = async () => {

     const response = await fetch(
      BACKEND_URL + "api/services")
      .then(resp => {
        if(!resp.ok) {
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
        if(!resp.ok) {
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
        if(!resp.ok) {
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
          "state": state,
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
    <div className="container">
      <h1>New Appointment</h1>

      <form>
        <div className="container mb-3">
          <div className="container mb-3">
          <select name="user" onChange={e => setUser(Number(e.target.value))}>
            {
              users.map(el =>  
              <option 
                     key={el.id}
                     value={el.id}>
                     {el.name}
                
                </option>
              )
            }
            </select>
            </div>
            <div className="container mb-3">
          <select name="service" onChange={e => setService(Number(e.target.value))}>
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
          <input type="date" placeholder="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} />
        </div>
        <div className="container mb-3">
          <input type="time" placeholder="time" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
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
        <button className="btn btn-success" onClick={newAppointment}>New Appointment</button>
        <button className="btn btn-primary ms-3" onClick={() => navigate("/appointments")}>Back</button>
        </div>
      </form>
    </div>
    
  );
};

export default PostAppointment;