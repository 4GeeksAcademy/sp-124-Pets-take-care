import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../main";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([])

    const navigate = useNavigate();

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
            .catch(err => console.log(err))
    }

    const deleteApp = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(
                BACKEND_URL + `api/clients/appointments/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("clientToken")}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Error deleting appointment");
            }

            setAppointments(prev => prev.filter(appointment => appointment.id !== id));

            Swal.fire({
                title: "Appointment deleted!",
                icon: "success",
                draggable: true
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "couldn't delete.",
                icon: "error"
            });

        };
    }


    return (
        <div className="container">
            <h1>My Appointments</h1>
            {appointments.map(el => (
                <div
                    key={el.id}
                    className="container border p-2 bg-secondary-subtle d-flex justify-content-between align-items-center mb-3 rounded">
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
                            <div className="container">
                                <h5>Status</h5>
                                <span>{el.status.toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="container mt-3">
                            <button className="btn btn-warning me-4" onClick={() => navigate(`/clients/appointments/edit/${el.id}`)}>Edit
                            </button>
                            {el.status != "selected" &&
                            <button onClick={() => navigate(`/clients/appointments/requests/${el.id}`)} className="btn btn-primary">Requests</button>
                            }
                            <button className="btn btn-danger ms-4" onClick={() => deleteApp(el.id)}>delete</button>

                        </div>
                    </div>
                </div>
            ))}

            <div className="container">
                <button className="btn btn-primary mt-5" onClick={() => navigate("/clients/appointments/new")}>New appointment</button>
            </div>
        </div>

    )
}

export default MyAppointments