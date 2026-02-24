import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../../../main";

export const AppointMentRequests = () => {

    const { id } = useParams()
    const [requests, setRequests] = useState([]);

    const getAppointmentRequests = async () => {

        const response = await fetch(BACKEND_URL + "api/appointment/requests/" + id)
        const data = await response.json()
        if (response.ok) {
            setRequests(data.requests);
            return
        }
        throw new Error("Something is wrong with appointment requests")
    };





    useEffect(() => {
        getAppointmentRequests();
    }, [])



    return (
        <div className="m-5">

            {
                requests.map((request) => {
                    return <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{request.sitter.name.toUpperCase()} {request.sitter.last_name.toUpperCase()}</h5>
                            <p className="card-text">{request.sitter.email}</p>
                            <p className="card-text">
                                <div className="alert alert-success" role="alert">
                                    {request.status.toUpperCase()}
                                </div>

                            </p>
                            <button className="btn btn-primary me-3">Accept</button>
                            <button className="btn btn-danger">Deny</button>

                        </div>
                    </div>
                })
            }
        </div>
    )
}