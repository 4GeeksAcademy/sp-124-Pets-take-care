import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";



const SitterPets = () => {

    const [sitterPets, setSitterPets] = useState([])
    
    const [sitters, setSitters] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        ReadSitterPets()
        ReadSitters()

    }, [])


    const ReadSitters = () => {
        fetch(BACKEND_URL + "api/sitters")
            .then(r => r.json())
            .then(data => setSitters(data));
    }

    const ReadSitterPets = () => {
        fetch(BACKEND_URL + "api/sitterpets")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setSitterPets(data)
            )
            .catch(err => console.log(err))
    }

    const deleteSitterPet = async (sitter_id, pet_id) => {

        const response = await fetch(
            BACKEND_URL + `api/sitters/${sitter_id}/pets/${pet_id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Error deleting pet from sitter");
        }


        ReadSitterPets()
        ReadSitters()
         
    };

    const petsList = {};

    sitters.forEach(sitter => {
        petsList[sitter.id] = {
            sitter_name: sitter.name,
            pets: []
        };
    });

   sitterPets.forEach(rel => {
    if (petsList[rel.sitter_id]) {
        petsList[rel.sitter_id].pets.push({
            pet_name: rel.pet_name,
            pet_id: rel.pet_id
        });
    }
});

return (

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Sitter & Pet Relations</h2>
    </div>

    {Object.entries(petsList).length === 0 ? (

      <div className="text-muted">
        No relations found.
      </div>

    ) : (
      Object.entries(petsList).map(([sitterId, sitter]) => (

        <div key={sitterId} className="mb-5">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{sitter.sitter_name}</h5>
            <button
              className="btn btn-sm btn-dark"
              onClick={() => navigate(`/sitters/${sitterId}/add-pet`)}
            >
              + Add Pet
            </button>
          </div>

          {sitter.pets.length === 0 ? (
            <div className="text-muted mb-3">
              No pets assigned.
            </div>

          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">

                <thead className="table-light">
                  <tr>
                    <th>Pet Name</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sitter.pets.map(pet => (
                    <tr key={pet.pet_id}>

                      <td>{pet.pet_name}</td>

                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteSitterPet(sitterId, pet.pet_id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <hr />

        </div>
      ))
    )}
  </div>
);
}
export default SitterPets