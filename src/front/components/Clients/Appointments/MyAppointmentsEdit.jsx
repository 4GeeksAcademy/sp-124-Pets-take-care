import React, { useEffect, useState } from "react";

const MyAppointmentsEdit = () => {

    

    const [editarDate, setEditarDate] = useState("")
    const [editarTime, setEditarTime] = useState("")
    const [editarPet, setEditarPet] = useState(null)
    const [editarService, setEditarService] = useState(null)
    const [editarState, setEditarState] = useState("")
    const [editarUser, setEditarUser] = useState(null)

    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    

    useEffect(() => {
        readServices()
        readPets()
        

        fetch(
            BACKEND_URL + "api/clients/appointments",{ 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
        }
    })
            .then(res => res.json())
            .then(data => {

                setEditarDate(data.appointment_date || "");
                setEditarTime(data.appointment_time ? data.appointment_time.slice(0, 5) : "");
                setEditarState(data.state || "");
                setEditarService(data.service_id ?? null);
                setEditarPet(data.pet_id ?? null);
                setEditarUser(data.user_id ?? null);

            });
    }, []);

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
                BACKEND_URL + "api/clients/pets",{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
                    }
                })
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
        <div className="container">
      <h1>Edit Appointment</h1>

      <form onSubmit={updateAppointment}>
        <div className="container mb-3">
          <div className="container mb-3">
          <select name="user" value={editarUser} onChange={e => setEditarUser(Number(e.target.value))}>
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
          <select name="service" value={editarService} onChange={e => setEditarService(Number(e.target.value))}>
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
          <input type="date" placeholder="date" value={editarDate} onChange={e => setEditarDate(e.target.value)} />
        </div>
        <div className="container mb-3">
          <input type="time" placeholder="time" value={editarTime} onChange={e => setEditarTime(e.target.value)} />
        </div>
        <div className="container mb-3">
          <select name="pet" value={editarPet} onChange={e => setEditarPet(Number(e.target.value))}>
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
        <button className="btn btn-primary ms-3" onClick={() => navigate("/appointments")}>Back</button>
        </div>
      </form>
    </div>
    )

}

export default MyAppointmentsEdit