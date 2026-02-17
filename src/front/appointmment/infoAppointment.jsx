import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../main";



const InfoAppointment = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [appointment, setAppointment] = useState({})

    const [pets, setPets] = useState({})

    useEffect(() => {

        readAppointment()

    }, [id])

    
    const readPet = (id_pet) => {
        fetch(
             BACKEND_URL + `api/pets/${id_pet}`
        )
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



    const readAppointment = () => {
        fetch(
             BACKEND_URL + `api/appointments/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data => {
                            setAppointment(data)
                            readPet(data.pet_id) 
                           })
            .catch(err => console.log(err))      
    }
    if (!appointment) {
        return <p>Loading appointment...</p>;}
        
    return (

        <div className="container">
            <h1>appointment detail</h1>

            <p><strong>appointment id:</strong> {appointment.id}</p>
            <p><strong>Client name:</strong> {appointment.user_name}</p>
            <p><strong>Pet name:</strong> {appointment.pet_name}</p>
            <p><strong>Species:</strong> {pets.species}</p>
            <p><strong>Date:</strong> {appointment.appointment_date}</p>
            <p><strong>Time:</strong> {appointment.appointment_time}</p>
            <p><strong>Service:</strong> {appointment.service_name}</p>
            
            <button type="button" className="btn btn-primary mt-5" onClick={() => navigate("/appointments")}>go back</button>
        </div>
        
    );
}

export default InfoAppointment