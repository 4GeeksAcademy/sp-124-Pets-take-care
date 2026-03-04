import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../../../main"
import Swal from "sweetalert2"

export const MyAppointMentRequests = () => {

    const { id } = useParams()
    const [requests, setRequests] = useState([])
    const navigate = useNavigate()


    const getAppointmentRequests = async () => {
        const response = await fetch(
            BACKEND_URL + "api/appointment/requests/" + id,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("clientToken")}`
                }
            })

        if (!response.ok) {
            throw new Error("Error loading requests")
            
        }
        const data = await response.json()
        setRequests(data.requests)
    }

    useEffect(() => {
        getAppointmentRequests()
    }, [id])


    const updateStatus = async (requestId, action) => {
        try {
            const response = await fetch(
                BACKEND_URL + `api/appointment-sitter/${requestId}/${action}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("clientToken")}`
                    }
                }
            )

            if (!response.ok) throw new Error()

            Swal.fire({
                title: "Appointment confirmed!",
                icon: "success",
                draggable: true
            });

            navigate("/clients/appointments");

        } catch (error) {
            console.error(error)
            alert("Could not update status")
        }
    }

    return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <h1 className="mb-4">Sitter Requests</h1>
      {requests.length === 0 ? (
        <div className="empty-state text-center py-5">
          <p>No sitters have applied yet.</p>
        </div>
      ) : (
        <div className="row">
          {requests.map(request => (
            <div key={request.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="appointment-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="mb-3">
                    {request.sitter.name} {request.sitter.last_name}
                  </h5>
                  <div className="mb-3">
                    <span className="section-label">Status</span>
                    <span
                      className={`status-badge ${
                        request.status === "pending"
                          ? "badge-pending"
                          : request.status === "selected"
                          ? "badge-confirmed"
                          : "badge-cancelled"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <button
                    className="btn btn-outline-warm btn-sm"
                    onClick={() =>
                      navigate(`/clients/appointments/${id}/sitters/${request.sitter.id}`)
                    }
                  >
                    View Profile
                  </button>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warm btn-sm w-100"
                      onClick={() => updateStatus(request.id, "select")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger-soft btn-sm w-100"
                      onClick={() => updateStatus(request.id, "reject")}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <button
          className="btn btn-outline-warm"
          onClick={() => navigate("/clients/appointments")}
        >
          Back
        </button>
      </div>
    </div>
  </div>
);
}

export default MyAppointMentRequests