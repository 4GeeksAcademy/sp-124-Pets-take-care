import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const ViewClient = () => {

    const { id } = useParams();
    const [client, setClient] = useState(null)

    useEffect(() => {

        getClient()

    }, [id])

    const getClient = () => {
        fetch(
            BACKEND_URL+`api/clients/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setClient(data)
            )
            .catch(err => console.log(err))
    }

    if (!client) {
        return <p>Loading client...</p>;
    }

    return (

        <div className="container">
            <h1>Client detail</h1>

            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Last name:</strong> {client.last_name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <p>
                <strong>Active:</strong>{" "}
                {client.is_active ? "Yes" : "No"}
            </p>
        </div>
    );
}

export default ViewClient