import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../../../main"

const ViewAppointmentSitter = () => {

    const [aS, setAS] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    const getIndividualAS = () => {
        fetch(BACKEND_URL + `api/appointments/sitters/${id}`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => setAS(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getIndividualAS()
    }, [])

    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Appointment Sitter id: {aS?.id}</h5>
                <p className="card-text">Sitter email: {aS?.sitter?.email}</p>
                <p className="card-text">Sitter id: {aS?.sitter?.id}</p>
                <p className="card-text">Appointment id: {aS?.appointment?.id}</p>
                <button onClick={()=>navigate(-1)} className="btn btn-primary">Go Back</button>
            </div>
        </div>
    )
}

export default ViewAppointmentSitter