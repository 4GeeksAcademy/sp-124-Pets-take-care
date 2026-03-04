import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import { useParams } from "react-router-dom";

const PutAppointment = () => {

    const navigate = useNavigate();
        
    const { id } = useParams();

    const [editarDate, setEditarDate] = useState("")
    const [editarTime, setEditarTime] = useState("")
    const [editarPet, setEditarPet] = useState(null)
    const [editarService, setEditarService] = useState(null)
    const [editarState, setEditarState] = useState("")
    const [editarUser, setEditarUser] = useState(null)

    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        readServices()
        readPets()
        readUsers()

            fetch(
                BACKEND_URL + `api/appointments/${id}`)
                .then(res => res.json())
                .then(data => {

                    setEditarDate(data.appointment_date || "");
                    setEditarTime(data.appointment_time ? data.appointment_time.slice(0,5) : "");
                    setEditarState(data.state || "");
                    setEditarService(data.service_id ?? null);
                    setEditarPet(data.pet_id ?? null);
                    setEditarUser(data.user_id ?? null);
                
                });
        }, [id]);

    const readServices = async () => {
    
         const response = await fetch(
          BACKEND_URL + "api/services")
          .then(resp => {
            if(!resp.ok) {
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
        } )
            .then(resp => {
              if(!resp.ok) {
                throw new Error("something went wrong")
              }
              return resp.json()
            })
            .then(data => 
                            setPets(data)
                            
                          )
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
              .then(data => 
                             setUsers(data)
                                         
                            )
              .catch(err => console.log(err))
              
          }

    const updateAppointment = async (e) => {
        e.preventDefault() 
            try {
                const response = await fetch(
                    BACKEND_URL + `api/appointments/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "appointment_date": editarDate,
                            "appointment_time": editarTime,
                            "pet_id": editarPet,
                            "service_id": editarService,
                            "state": editarState,
                            "user_id": editarUser
                        })
                    }
                );
                if (!response.ok) {
                throw new Error("Error updating appointment");
            }
            navigate("/appointments");

            } catch (error) {
            console.error(error);
            alert("Could not update appointment");
        }
        };

    return (
  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Edit Appointment</h2>

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

        <form onSubmit={updateAppointment}>

      
          <div className="mb-3">
            <label className="form-label">Client</label>
            <select
              className="form-select"
              value={editarUser}
              onChange={e => setEditarUser(Number(e.target.value))}
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
              value={editarService}
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
            <button
              type="submit"
              className="btn btn-dark w-100"
            >
              Save Changes
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
);}


export default PutAppointment