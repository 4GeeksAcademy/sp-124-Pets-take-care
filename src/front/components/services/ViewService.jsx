import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../main";


const ViewService = () => {

    const { id } = useParams();
    const [service, setService] = useState(null)

    useEffect(() => {

        getService()

    }, [id])

    const getService = () => {
        fetch(
            BACKEND_URL+`api/services/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setService(data)
            )
            .catch(err => console.log(err))
    }

    if (!service) {
        return <p>Loading service...</p>;
    }

    return (

        <div className="container">
            <h1>Service detail</h1>

            <p><strong>Name:</strong> {service.service_name}</p>
            <p><strong>Duration:</strong> {service.duration_minutes}</p>
            <p><strong>Cost:</strong> {service.cost}</p>
        </div>
    );
}

export default ViewService