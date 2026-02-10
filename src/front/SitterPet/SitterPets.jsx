import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../main";



const SitterPets = () => {

    const [sitterPets, setSitterPets] = useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        readSitterPets()

    }, [])


    const readSitterPets = () => {
        fetch( BACKEND_URL + "api/sitterpets")
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

    

    return (
        <div className="container">
            <h1>Get relation sitter & pet</h1>
            {sitterPets.map(el => (
                <div
                    key={el.id}
                    className="container border p-2 bg-secondary-subtle d-flex justify-content-between align-items-center">
                    <span>
                        👤{el.sitter_name}➤{el.pet_name}🐾
                        </span>
                    <div>
                    <button className="btn btn-primary" onClick={() => navigate(`/sitters/${el.id}/pets`)}>info
                    </button>
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/sitters/edit/${el.id}`)}>add pet
                    </button>
                    <button className="btn btn-danger ms-2"  onClick={() => deleteSitterPet(el.sitter_id, el.pet_id)}>Delete
                    </button>
                    </div>
                </div>
            ))}
        </div>

    )
}
export default SitterPets