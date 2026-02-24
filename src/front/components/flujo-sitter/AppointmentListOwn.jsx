import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../main"

const AppointmentListOwn = () => {

    const [appointments, setAppointments] = useState([])
        console.log(appointments)

    useEffect(() => {
        getAppointment()
    }, [])

    const getAppointment = () => {
        fetch(BACKEND_URL + "api/appointments/sitters/true", {
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

            .then(data =>
                setAppointments(data.appointments)
            )
            .catch(err => console.log(err))
    }

    const handleCancel = async (id) => {
        try{
            const resp = await fetch(BACKEND_URL + `api/sitter/appointment-sitter/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("sitterToken")
                }
                })
            if(!resp.ok){
                throw new Error("Something went wrong")
            }
            getAppointment()
        } catch(err){
            console.log(err)
        }
    }




    return (
        <div className="container">
            <h1>My Appointments List</h1>
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
                            <div className="container">
                                <h5>Estado de solicitud
                                </h5>
                                <span>{el.state}📋</span>
                            </div>
                        </div>
                        <div className="container mt-3">
                            <button className="btn btn-primary" onClick={() => handleCancel(el.id)}>Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}
export default AppointmentListOwn