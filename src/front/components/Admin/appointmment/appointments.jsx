import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


const Appointments = () => {

    const [appointments, setAppointments] = useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        readAppointments()

    }, [])


    const readAppointments = () => {
        fetch( BACKEND_URL + "api/appointments")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setAppointments(data)
            )
            .catch(err => console.log(err))
    }

    const deleteAppointment = async (id) => {
  
    const response = await fetch(
      BACKEND_URL +  `api/appointments/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Error deleting appointment");
    }

    if(response.ok) {
        alert("appointment deleted")
        window.location.reload();
    }

};

    

    return (
        <div className="container">
            <h1>Get Appointments</h1>
            {appointments.map(el => (
                <div 
                    key={el.id}
                    className="container border p-2 bg-secondary-subtle d-flex justify-content-between align-items-center mb-3">
                        <div className="container">
                            <div className="row">
                            <div className="container"> 
                                <h5>Nombre cliente</h5>
                    <span>{el.user_name}</span>
                    </div>
                         <div className="container"> 
                            <h5>Fecha y a que hora</h5>
                    <span>{el.appointment_date}📅 {el.appointment_time}⏰</span> 
                    </div>
                    <div className="container"> 
                        <h5>Nombre mascota</h5>
                    <span>{el.pet_name}🐾</span> 
                    </div>
                    <div className="container"> 
                        <h5>Servicio</h5>
                    <span>{el.service_name}📋</span> 
                    </div>
                    </div>
                    <div className="container mt-3">
                    <button className="btn btn-primary" onClick={() => navigate(`/appointments/${el.id}`)}>info
                    </button>
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/appointments/edit/${el.id}`)}>Edit
                    </button>
                    <button className="btn btn-danger ms-2"  onClick={() => deleteAppointment(el.id)}>Delete
                    </button>
                    </div>
                </div>
                </div>
            ))}
            
            <div className="container">
                <button className="btn btn-primary mt-5" onClick={() => navigate("/appointments/new")}>New appointment</button>
            </div>
        </div>

    )
}
export default Appointments