import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../../main"
import { useNavigate, useParams } from "react-router-dom"

const NewAppointmentSitter = () => {

    const [appointmentsList, setAppointmentList] = useState([])
    const [sittersList, setSitterList] = useState([])
    const [appointmentEscogido, setAppointmentEscogido] = useState()
    const [sitterEscogido, setSitterEscogido] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    
    const getAppointments = () => {
        fetch(BACKEND_URL + "api/appointments")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => setAppointmentList(data))
            .catch(err => console.log(err))
    }
    const getSitters = () => {
        fetch(BACKEND_URL + "api/sitters")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => setSitterList(data))
            .catch(err => console.log(err))
    }

    const postAS = () => {
        fetch(BACKEND_URL + `api/appointments/sitters/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "appointment_id": appointmentEscogido,
                "sitter_id": sitterEscogido
            }),
            redirect: "follow"
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => {
                console.log(data)
                navigate(-1)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAppointments()
        getSitters()
    }, [])

    const handleSelect1 = (event) => {
        setAppointmentEscogido(event.target.value)
    }
    const handleSelect2 = (event) => {
        setSitterEscogido(event.target.value)
    }

    return (

        <div className="d-flex flex-column align-items-center my-5">
            <div className="w-50">

                <p>Appointment Escogido: {appointmentEscogido}</p>
                <select onChange={handleSelect1} className="form-select">
                    <option selected value="Ninguno ha sido seleccionado">Elige un appointment</option>

                    {appointmentsList?.map((appointment, indice) => {
                        return <option value={appointment.id} key={indice}>
                            {appointment.user_name}, necesita {appointment.service_name} a {appointment.pet_name}</option>
                    })}

                </select>

                <p>Sitter Escogido: {sitterEscogido}</p>
                <select onChange={handleSelect2} className="form-select">
                    <option selected value="Ninguno ha sido seleccionado">Elige un sitter</option>

                    {sittersList?.map((sitter, indice) => {
                        return <option value={sitter.id} key={indice}>{sitter.name}</option>
                    })}

                </select>

                <button className="btn btn-primary mt-5" onClick={postAS}>Crear Appointment Sitter</button>
            </div>
        </div>
    )
}

export default NewAppointmentSitter