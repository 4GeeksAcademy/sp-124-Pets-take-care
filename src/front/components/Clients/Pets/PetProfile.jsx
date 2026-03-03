import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


const PetProfile = () => { 


    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null); 


    useEffect(()=>{ 

        readProfile() 

    },[id])

    const readProfile = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}api/clients/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("clientToken")}`
      }
    });

    if (!response.ok) {
      throw new Error("Error reading pet");
    }

    const data = await response.json();
    setPet(data);

  } catch (err) {
    console.error(err);
  }
};

if (!pet) {
  return <div className="container mt-5">Loading pet...</div>;
}

    return (
        <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">
          {pet.name}
        </h2>

        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Bredd:</strong> {pet.breed}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        <p><strong>Color:</strong> {pet.color}</p>
        <p><strong>Sterelized:</strong> {pet.sterelized ? "Yes" : "No"}</p>
        <p><strong>About:</strong> {pet.about_pet}</p>


        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>


    )
}

export default PetProfile