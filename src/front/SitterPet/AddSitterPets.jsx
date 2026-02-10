
import {useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../main"; 


const AddSitterPets = () => {

    const { id: sitterId } = useParams();

    const [pets, setPets] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
  fetch(BACKEND_URL + "api/pets")
    .then(r => r.json())
    .then(data => setPets(data));
}, []);

    const addPetToSitter = async (petId) => {
  const response = await fetch(
    BACKEND_URL + `api/sitters/${sitterId}/pets/${petId}`,
    {
      method: "POST"
    }
  );

  if (!response.ok) {
    const data = await response.json();
    alert(data.msg);
    return;
  }

  alert("pet added");
  navigate("/sitterpets")
};

    return (
    <div className="container">
      <h2>Add pet to sitter</h2>

      {pets.map(pet => (
        <div key={pet.id} className="border p-2 mb-2">
          <span>{pet.name} <strong>{pet.species}</strong>🐾</span>

          <button
            className="btn btn-primary ms-2"
            onClick={() => addPetToSitter(pet.id)}
          >
            add
          </button>
        </div>
      ))}
    </div>
  );
};


export default AddSitterPets