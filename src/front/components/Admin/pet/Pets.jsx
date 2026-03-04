import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


const Pets = () => {

    const [pets, setPets] = useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        readPets()

    }, [])


    const readPets = () => {
        fetch(BACKEND_URL + "api/pets")
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
            BACKEND_URL + `api/pets/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Error deleting pet");
        }

        if (response.ok) {
            alert("Pet Deleted")
            window.location.reload();
        }

    };



    return (
  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Pets</h2>
      <button
        className="btn btn-dark"
        onClick={() => navigate("/pets/create")}
      >
        + New Pet
      </button>
    </div>
    {pets.length === 0 ? (
      <div className="text-muted">
        No pets found.
      </div>

    ) : (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Species</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(el => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.species}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigate(`/pets/${el.id}`)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/pets/edit/${el.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deletePet(el.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)
}
export default Pets