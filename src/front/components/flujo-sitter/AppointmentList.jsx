import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../main"

const AppointmentList = () => {

    const [appointments, setAppointments] = useState([])
    useEffect(() => {
        getAppointment()
    }, [])

    const getAppointment = () => {
        fetch(BACKEND_URL + "api/sitter/appointments/false", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("sitterToken")
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>{
                setAppointments(data.appointments || [])
            }
            )
            .catch(err => setAppointments([]))
    }

    const handlePostulate = async (appointmentId) => {
        try{
            const resp = await fetch(BACKEND_URL + "api/sitter/appointment-sitter/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("sitterToken")
                },
                body: JSON.stringify({
                    appointment_id: appointmentId
                })
            })
            if(!resp.ok){
                throw new Error("Something went wrong while postulating")
            }
            getAppointment()
        } catch(err){
            console.log(err)
        }
    }



    return (
        <div className="container">
            <h1>Looking for Appointments</h1>
            {appointments.length === 0 ? (
    <p>No hay appointments disponibles</p>
) : appointments.map(el => (
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
                            <button className="btn btn-primary" onClick={() => handlePostulate(el.id)}>Postularse
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default AppointmentList