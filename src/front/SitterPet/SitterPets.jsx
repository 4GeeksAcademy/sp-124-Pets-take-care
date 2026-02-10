import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../main";



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


        setSitterPets(prev =>
            prev.filter(el => !(el.sitter_id === sitter_id && el.pet_id === pet_id))
        );
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
    <div className="container">
        <h1>Get relation sitter & pet</h1>

        {Object.entries(petsList).map(([sitterId, sitter]) => (
            <div
                key={sitterId}
                className="container border p-2 bg-secondary-subtle mb-3"
            >
                <h4>👤 {sitter.sitter_name}</h4>

                {sitter.pets.length === 0 && (
            <p className="text-muted">No pets assigned</p>
        )}

        <ul>
            {sitter.pets.map(pet => (
                <li key={pet.pet_id}>
                    {pet.pet_name}

                    <button
                        className="btn btn-danger ms-5 btn-sm"
                        onClick={() => deleteSitterPet(sitterId, pet.pet_id)}
                    >
                        delete
                    </button>
                </li>
            ))}
        </ul>

        <button
            className="btn btn-primary ms-5 btn-sm"
            onClick={() => navigate(`/sitters/${sitterId}/add-pet`)}
        >
            add pet
        </button>
    </div>
        ))}
    </div>
);
}
export default SitterPets