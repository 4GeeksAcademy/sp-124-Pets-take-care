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

    <div className="appointments-section p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">My Appointments</h1>
        <button
          className="btn btn-warm"
          onClick={() => navigate("/clients/appointments/new")}
        >
          New Appointment
        </button>
      </div>

      <div className="row">
        {appointments.map(el => (
          <div key={el.id} className="col-12 mb-4">
            <div className="appointment-card p-4">
              <div className="row">
                <div className="col-12 col-md-3 mb-3 mb-md-0">
                  <h6 className="section-label">Client</h6>
                  <p className="mb-0">{el.user_name}</p>
                </div>
                <div className="col-12 col-md-3 mb-3 mb-md-0">
                  <h6 className="section-label">When</h6>
                  <p className="mb-0">
                    {el.appointment_date} · {el.appointment_time}
                  </p>
                </div>
                <div className="col-12 col-md-3 mb-3 mb-md-0">
                  <h6 className="section-label">Pet</h6>
                  <p className="mb-0">{el.pet_name}</p>
                </div>
                <div className="col-12 col-md-3">
                  <h6 className="section-label">Service</h6>
                  <p className="mb-0">{el.service_name}</p>
                </div>
              </div>
              <hr className="my-4" />
              <div className="d-flex flex-wrap gap-3">
                <button
                  className="btn btn-outline-warm"
                  onClick={() => navigate(`/clients/appointments/edit/${el.id}`)}
                >
                  Edit
                </button>
                {el.status !== "selected" && (
                  <button
                    className="btn btn-warm"
                    onClick={() => navigate(`/clients/appointments/requests/${el.id}`)}
                  >
                    Requests
                  </button>
                )}
                <button
                  className="btn btn-danger-soft"
                  onClick={() => deleteApp(el.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default MyAppointments