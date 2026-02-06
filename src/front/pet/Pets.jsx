import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



const Pets = () => {

    const [pets, setPets] = useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        readPets()

    }, [])


    const readPets = () => {
        fetch("https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/pets")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setPets(data)
            )
            .catch(err => console.log(err))
    }

    const deletePet = async (id) => {
  
    const response = await fetch(
      `https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/pets/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Error deleting pet");
    }

    if(response.ok) {
        alert("Pet Deleted")
        window.location.reload();
    }

};

    

    return (
        <div className="container">
            <h1>Get Pets</h1>
            {pets.map(el => (
                <div
                    key={el.id}
                    className="container border p-2 bg-secondary-subtle d-flex justify-content-between align-items-center">
                    <span>{el.name} <strong>{el.species}</strong>🐾</span>
                    <div>
                    <button className="btn btn-primary" onClick={() => navigate(`/pets/${el.id}`)}>info
                    </button>
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/pets/edit/${el.id}`)}>Edit
                    </button>
                    <button className="btn btn-danger ms-2"  onClick={() => deletePet(el.id)}>Delete
                    </button>
                    </div>
                </div>
            ))}
            <div className="container">
                <button className="btn btn-primary mt-5" onClick={() => navigate("/pets/create")}>Go Create Pet</button>
            </div>
        </div>

    )
}
export default Pets