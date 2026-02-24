import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../../../main"

const EditAppointmentSitter = () => {
    
    const [individualAS, setIndividualAS] = useState({})
    const [statusSelected, setStatusSelected] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getIndividualAS()
    },[])

    const getIndividualAS = () => {
        fetch(BACKEND_URL + `api/appointments/sitters/${id}`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Something went wrong")
                }
                return resp.json()
            })
            .then(data => {
                setIndividualAS(data)
                setStatusSelected(data.state)
            })
            .catch(err => console.log(err))
    }

    const putAS = () => {
        fetch(BACKEND_URL + `api/appointments/sitters/edit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "state": statusSelected,
            }),
            redirect: "follow"
        })
        .then(resp =>{
            if (!resp.ok){
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

    return (
        <div className="d-flex flex-column align-items-center my-5">
            <h2>Edit {individualAS?.sitter?.name }'s Application</h2>
            <p>Current status: <strong>{individualAS.state}</strong></p>

            <select className="form-select w-50"
                value={statusSelected}
                onChange={(e) => setStatusSelected(e.target.value)}
            >
                <option value="applied">Applied</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
            </select>

            <br /><br />

            <button onClick={putAS}>
                Update State
            </button>
        </div>
        
    )
}

export default EditAppointmentSitter