
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../main";


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

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Add Pet to Sitter</h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
    {pets.length === 0 ? (
      <div className="text-muted">
        No pets available.
      </div>

    ) : (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Pet Name</th>
              <th>Species</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.id}>

                <td>{pet.name}</td>
                <td>{pet.species}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => addPetToSitter(pet.id)}
                  >
                    Add
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
};


export default AddSitterPets