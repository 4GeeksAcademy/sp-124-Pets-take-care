import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";



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

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Appointment Detail</h2>
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
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>ID</strong>
            <div>{appointment.id}</div>
          </div>
          <div className="col-md-6">
            <strong>Client</strong>
            <div>{appointment.user_name}</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Pet</strong>
            <div>{appointment.pet_name}</div>
          </div>
          <div className="col-md-6">
            <strong>Species</strong>
            <div>{appointment.species}</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Date</strong>
            <div>{appointment.appointment_date}</div>
          </div>
          <div className="col-md-6">
            <strong>Time</strong>
            <div>{appointment.appointment_time}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <strong>Service</strong>
            <div>{appointment.service_name}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default InfoAppointment