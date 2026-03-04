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
                setStatusSelected(data.status)
            })
            .catch(err => console.log(err))
    }

    const putAS = () => {
        fetch(BACKEND_URL + `api/appointments/sitters/edit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "status": statusSelected,
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
            navigate(-1)

        })
        .catch(err => console.log(err))
    }

    return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>
        Edit Application — {individualAS?.sitter?.name}
      </h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/appointments/sitters")}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label d-block">Current Status</label>
          <span className="badge bg-secondary">
            {individualAS?.status || "Unknown"}
          </span>
        </div>
        <div className="mb-4">
          <label className="form-label">Change Status</label>
          <select
            className="form-select"
            value={statusSelected}
            onChange={(e) => setStatusSelected(e.target.value)}
          >
            <option value="applied">Applied</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
        <div className="d-flex gap-3">

          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={putAS}
          >
            Update Status
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={() => navigate("/appointments/sitters")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default EditAppointmentSitter