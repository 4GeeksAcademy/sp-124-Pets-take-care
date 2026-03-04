import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


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

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Pet Details</h2>

      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/pets")}
      >
        ← Back
      </button>
    </div>

    <div className="card shadow-sm">

      <div className="card-body">

        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Name</strong>
            <div>{pet.name}</div>
          </div>

          <div className="col-md-6">
            <strong>Species</strong>
            <div>{pet.species}</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Breed</strong>
            <div>{pet.breed}</div>
          </div>

          <div className="col-md-6">
            <strong>Color</strong>
            <div>{pet.color}</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Gender</strong>
            <div>{pet.gender}</div>
          </div>

          <div className="col-md-6">
            <strong>Birth Date</strong>
            <div>{pet.birth_date}</div>
          </div>
        </div>

        <hr />

        <div className="row mb-3">
          <div className="col-md-4">
            <strong>NIE</strong>
            <div>{pet.nie ? "Yes" : "No"}</div>
          </div>

          <div className="col-md-4">
            <strong>Special Care</strong>
            <div>{pet.special_care ? "Yes" : "No"}</div>
          </div>

          <div className="col-md-4">
            <strong>Sterilized</strong>
            <div>{pet.sterilized ? "Yes" : "No"}</div>
          </div>
        </div>

        <div className="mt-3">
          <strong>Type of Food</strong>
          <div>{pet.type_food}</div>
        </div>

      </div>

    </div>

  </div>
);
}

export default InfoPet
