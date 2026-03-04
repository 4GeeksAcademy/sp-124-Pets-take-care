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
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Appointment Sitter Detail</h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Assignment ID</strong>
            <div>{aS?.id}</div>
          </div>
        </div>
        <hr />
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Sitter ID</strong>
            <div>{aS?.sitter?.id}</div>
          </div>
          <div className="col-md-6">
            <strong>Sitter Email</strong>
            <div>{aS?.sitter?.email}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <strong>Appointment ID</strong>
            <div>{aS?.appointment?.id}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ViewAppointmentSitter