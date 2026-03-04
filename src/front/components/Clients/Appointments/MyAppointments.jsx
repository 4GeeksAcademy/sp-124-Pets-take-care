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
        <div className="container my-5">
            <div className="appointments-section p-4 p-md-5">
                <div className="row align-items-center mb-4">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                        <h1 className="mb-0">My Appointments</h1>
                    </div>
                    <div className="col-12 col-md-6 text-md-end">
                        <button
                            className="btn btn-warm"
                            onClick={() => navigate("/clients/appointments/new")}
                        >
                            New Appointment
                        </button>
                    </div>
                </div>

                {appointments.length === 0 ? (
                    <div className="empty-state text-center py-5">
                        <p className="mb-3">You don’t have any appointments yet.</p>
                        <button
                            className="btn btn-warm"
                            onClick={() => navigate("/clients/appointments/new")}
                        >
                            Book your first appointment
                        </button>
                    </div>
                ) : (
                    <div className="row">
                        {appointments.map(el => (
                            <div key={el.id} className="col-12 mb-4">
                                <div className="appointment-card p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="section-label">Appointment Status</span>

                                        <span
                                            className={`status-badge ${el.status === "selected"
                                                    ? "badge-confirmed"
                                                    : el.status === "pending"
                                                        ? "badge-pending"
                                                        : el.status === "cancelled"
                                                            ? "badge-cancelled"
                                                            : "badge-completed"
                                                }`}
                                        >
                                            {el.status}
                                        </span>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-8">
                                            <div className="row">
                                                <div className="col-6 col-md-3 mb-3 mb-md-0">
                                                    <span className="section-label">Client</span>
                                                    <p className="mb-0">{el.user_name}</p>
                                                </div>
                                                <div className="col-6 col-md-3 mb-3 mb-md-0">
                                                    <span className="section-label">When</span>
                                                    <p className="mb-0">
                                                        {el.appointment_date} · {el.appointment_time}
                                                    </p>
                                                </div>
                                                <div className="col-6 col-md-3 mb-3 mb-md-0">
                                                    <span className="section-label">Pet</span>
                                                    <p className="mb-0">{el.pet_name}</p>
                                                </div>
                                                <div className="col-6 col-md-3">
                                                    <span className="section-label">Service</span>
                                                    <p className="mb-0">{el.service_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
                                            <div className="d-flex flex-wrap justify-content-md-end gap-2">
                                                <button
                                                    className="btn btn-outline-warm btn-sm"
                                                    onClick={() => navigate(`/clients/appointments/edit/${el.id}`)}
                                                >
                                                    Edit
                                                </button>
                                                {el.status !== "selected" && (
                                                    <button
                                                        className="btn btn-warm btn-sm"
                                                        onClick={() => navigate(`/clients/appointments/requests/${el.id}`)}
                                                    >
                                                        Requests
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-danger-soft btn-sm"
                                                    onClick={() => deleteApp(el.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyAppointments