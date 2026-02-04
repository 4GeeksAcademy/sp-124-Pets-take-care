import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const InfoSitter = () => {

    const { id } = useParams();
    const [sitter, setSitter] = useState(null)

    useEffect(() => {

        readSitter()

    }, [id])

    
    const readSitter = () => {
        fetch(
            `https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/sitters/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setSitter(data)
            )
            .catch(err => console.log(err))

            
    }
    if (!sitter) {
        return <p>Loading sitter...</p>;}
        
    return (

        <div className="container">
            <h1>Sitter detail</h1>

            <p><strong>Name:</strong> {sitter.name}</p>
            <p><strong>Last name:</strong> {sitter.last_name}</p>
            <p><strong>Email:</strong> {sitter.email}</p>
            <p><strong>Phone:</strong> {sitter.phone}</p>
            <p><strong>Address:</strong> {sitter.address}</p>

            <p>
                <strong>Studies:</strong>{" "}
                {sitter.studies ? "Yes" : "No"}
            </p>

            {sitter.studies && (
                <p>
                    <strong>Studies comment:</strong>{" "}
                    {sitter.studies_comment}
                </p>
            )}

            <p>
                <strong>Active:</strong>{" "}
                {sitter.is_active ? "Yes" : "No"}
            </p>
        </div>
    );
}

export default InfoSitter
