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
        <>
            <div className="container mt-3">
                <div className="row">
                    {requests.map(request => (
                        <div key={request.id} className="card me-3" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {request.sitter.name.toUpperCase()}{" "}
                                    {request.sitter.last_name.toUpperCase()}
                                </h5>

                                <button
                                    className="btn btn-warning me-2 mb-2"
                                    onClick={() => navigate(`/clients/appointments/${id}/sitters/${request.sitter.id}`)}
                                >
                                    View Profile
                                </button>

                                <div className="alert alert-info">
                                    {request.status.toUpperCase()}
                                </div>

                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => updateStatus(request.id, "select")}
                                >
                                    Accept
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => updateStatus(request.id, "reject")}
                                >
                                    Deny
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="container">
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => navigate("/clients/appointments")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </>
    );
}

export default MyAppointMentRequests