import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../main";

const MyAppointments = () => { 

    const [appointments, setAppointments] = useState([])


    useEffect(() => {

        readAppointments()

    }, [])

    const readAppointments = () => {
        fetch(BACKEND_URL + "api/clients/appointments", {
            methods: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem("clientToken")}`
            }
        })
        .then(response => {
            if (!response.ok) {
                    throw new Error("something went wrong")
                }
                return response.json()
        })

        .then(data => 
            setAppointments(data)
        )
        .catch(err=> console.log(err))
    }




    return(
         <div className="container">
            <h1>My Appointments</h1>
            {appointments.map(el => (
                <div 
                    key={el.id}
                    className="container border p-2 bg-secondary-subtle d-flex justify-content-between align-items-center mb-3">
                        <div className="container">
                            <div className="row">
                            <div className="container"> 
                                <h5>Client</h5>
                    <span>{el.user_name}</span>
                    </div>
                         <div className="container"> 
                            <h5>When</h5>
                    <span>{el.appointment_date}📅 {el.appointment_time}⏰</span> 
                    </div>
                    <div className="container"> 
                        <h5>Pet</h5>
                    <span>{el.pet_name}🐾</span> 
                    </div>
                    <div className="container"> 
                        <h5>Service</h5>
                    <span>{el.service_name}📋</span> 
                    </div>
                    </div>
                    <div className="container mt-3">
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/appointments/edit/${el.id}`)}>Edit
                    </button>
                    {/* <button className="btn btn-danger ms-2"  onClick={() => deleteAppointment(el.id)}>Delete
                    </button> */}
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
        
export default MyAppointments