import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const EditPet = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editarName, setEditarName] = useState("")
    const [editarSpecies, setEditarSpecies] = useState("")
    const [editarBreed, setEditarBreed] = useState("")
    const [editarGender, setEditarGender] = useState("")
    const [editarColor, setEditarColor] = useState("")
    const [editarHasNie, setEditarHasNie] = useState(false);
    const [editarNie, setEditarNie] = useState("")
    const [editarBirthDate, setEditarBirthDate] = useState("")
    const [editarTypeFood, setEditarTypeFood] = useState("");
    const [editarSpecialCare, setEditarSpecialCare] = useState(false);
    const [editarSterilized, setEditarSterilized] = useState(false);

    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        fetch(BACKEND_URL + `api/pets/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditarName(data.name || "");
                setEditarSpecies(data.species || "");
                setEditarBreed(data.Breed || "");
                setEditarGender(data.gender);
                setEditarColor(data.color || "");
                setEditarNie(data.nie || "");
                setEditarBirthDate(data.birth_date || "");
                setEditarTypeFood(data.type_food || "");
                setEditarSpecialCare(data.special_care ?? false);
                setEditarSterilized(data.sterilized ?? false);
                setEditarHasNie(data.has_nie ?? false);
            });

        readDogBreeds()
    }, [id]);


    const readDogBreeds = async () => {

        try {
            const res = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await res.json();

            const breedList = Object.keys(data.message);
            setBreeds(breedList);
        } catch (err) {
            console.error(err);
        }
    }
        const updatePet = async () => {
            try {
                const response = await fetch(BACKEND_URL + `api/pets/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": editarName,
                            "species": editarSpecies,
                            "breed": editarBreed,
                            "gender": editarGender,
                            "color": editarColor,
                            "nie": editarNie,
                            "birth_date": editarBirthDate,
                            "type_food": editarTypeFood,
                            "special_care": editarSpecialCare,
                            "sterilized": editarSterilized
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error("Error updating pet");
                }

                navigate("/pets");

            } catch (error) {
                console.error(error);
                alert("Could not update pet");
            }
        };


        const createName = (e) => {
            setEditarName(e.target.value)
        }
        const createSpecies = (e) => {
            setEditarSpecies(e.target.value)
        }
        const createBreed = (e) => {
            setEditarBreed(e.target.value)
        }
        const createTypeFood = (e) => {
            setEditarTypeFood(e.target.value)
        }
        const createColor = (e) => {
            setEditarColor(e.target.value)
        }
        const createNie = (e) => {
            setEditarNie(e.target.value)
        }

        const createBirthDate = (e) => {
            setEditarBirthDate(e.target.value)

        }




        return (
  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Edit Pet</h2>

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

        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={editarName}
              onChange={createName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Species</label>
            <select
              className="form-select"
              value={editarSpecies}
              onChange={(e) => createSpecies(e.target.value)}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Exotic">Exotic</option>
              <option value="Bird">Bird</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Breed</label>
            <input
              type="text"
              className="form-control"
              value={editarBreed}
              onChange={createBreed}
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label d-block">Gender</label>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarGender === "male"}
                onChange={() => setEditarGender("male")}
              />
              <label className="form-check-label">Male</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarGender === "female"}
                onChange={() => setEditarGender("female")}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Color</label>
            <input
              type="text"
              className="form-control"
              value={editarColor}
              onChange={createColor}
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-block">Has NIE?</label>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarHasNie === true}
                onChange={() => setEditarHasNie(true)}
              />
              <label className="form-check-label">Yes</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarHasNie === false}
                onChange={() => setEditarHasNie(false)}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>

          {editarHasNie && (
            <div className="mb-3">
              <label className="form-label">NIE</label>
              <input
                type="text"
                className="form-control"
                value={editarNie}
                onChange={createNie}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Birth Date</label>
            <input
              type="date"
              className="form-control"
              value={editarBirthDate}
              onChange={createBirthDate}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type of Food</label>
            <input
              type="text"
              className="form-control"
              value={editarTypeFood}
              onChange={createTypeFood}
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Special Care</label>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarSpecialCare === true}
                onChange={() => setEditarSpecialCare(true)}
              />
              <label className="form-check-label">Yes</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarSpecialCare === false}
                onChange={() => setEditarSpecialCare(false)}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label d-block">Sterilized</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarSterilized === true}
                onChange={() => setEditarSterilized(true)}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarSterilized === false}
                onChange={() => setEditarSterilized(false)}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={updatePet}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={() => navigate("/pets")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
    }

    export default EditPet