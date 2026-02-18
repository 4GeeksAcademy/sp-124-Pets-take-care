import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../../main"

const AppointmentSitterList = () => {

    const [appointmentSitter, setAppointmentSitter] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
            getAppointmentSitter()
    }, [])

    const getAppointmentSitter = () => {
        fetch( BACKEND_URL + "api/appointments/sitters")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("somethin went wrong")
                }
                return resp.json()
            })
            .then(data => setAppointmentSitter(data))
            .catch(err => console.log(err))
    }

    const deleteAppointmentSitter = async (id) => {
        const response = await fetch(
            BACKEND_URL + `api/appointments/${id}`,
            {
                method: "DELETE"
            }
        )
        if (!response.ok) {
            throw new Error("Error deleting sitter's appointment")
        }
        if (response.ok) {
            alert("sitter's appointment deleted")
            getAppointmentSitter()
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-end my-3">
                    <Link to={`/appointments/${id}/sitters/${id}`} className="btn btn-primary">New sitter's appointment</Link>
                </div>
                {
                    appointmentSitter?.map(el =>
                        <div className="col-lg-12" key={el.id}>
                            <div className="card flex-row d-flex justify-content-evenly">
                                <div className="card col-lg-3 border-0 py-3">
                                    <img className="rounded-circle w-50 ms-5" src="https://picsum.photos/200" alt="" />
                                </div>
                                <div className="card-body col-lg-6">
                                    <h4 className="card-text">Sitter: {el.sitter.name} {el.sitter.last_name}</h4>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">Client: {el.appointment.user_name}</li>
                                        <li className="mb-2">Date: {el.appointment.appointment_date || "unavailable"}</li>
                                        <li className="mb-2">Pick up: {el.appointment.appointment_time || "unavailable"}</li>
                                        <li className="mb-2">Pet: {el.appointment.pet_name || "unavailable"}</li>
                                    </ul>
                                </div>
                                <div className="card-footer col-lg-3 border-top-0 bg-transparent">
                                    <div className="d-flex justify-content-end flex-wrap gap-4">
                                        <i onClick={() => navigate("/appointments/" + el.id + "/sitters/")} className="fa-solid fa-info fs-3"></i>
                                        <i onClick={() => {deleteAppointmentSitter(el.id) }} className="fa-regular fa-trash-can fs-3"></i>
                                        <i onClick={() => navigate("/appointments/" + el.id + "/sitters/" + el.id)} className="fa-regular fa-pen-to-square fs-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}

export default AppointmentSitterList