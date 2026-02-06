import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const InfoPet = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [pet, setPet] = useState(null)

    useEffect(() => {

        readPet()

    }, [id])

    
    const readPet = () => {
        fetch(
             BACKEND_URL + `api/pets/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setPet(data)
            )
            .catch(err => console.log(err))

            
    }
    if (!pet) {
        return <p>Loading pet...</p>;}
        
    return (

        <div className="container">
            <h1>pet detail</h1>

            <p><strong>Name:</strong> {pet.name}</p>
            <p><strong>Species:</strong> {pet.species}</p>
            <p><strong>Race:</strong> {pet.race}</p>
            <p><strong>Color:</strong> {pet.color}</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
             <p>
                <strong>Nie:</strong>{" "}
                {pet.nie ? "Yes" : "No"}
            </p>
            <p><strong>Birth Date:</strong> {pet.birth_date}</p>
            <p><strong>Type of food:</strong> {pet.type_food}</p>
            <p>
                <strong>Special Care:</strong>{" "}
                {pet.special_care ? "Yes" : "No"}
            </p>
             <p>
                <strong>Sterilized:</strong>{" "}
                {pet.sterilized ? "Yes" : "No"}
            </p>
            <button type="button" className="btn btn-primary mt-5" onClick={() => navigate("/pets")}>go back</button>
        </div>
        
    );
}

export default InfoPet
