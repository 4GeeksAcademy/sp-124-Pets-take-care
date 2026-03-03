import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import Swal from "sweetalert2";

const ClientEditPet = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editarName, setEditarName] = useState("")
    const [editarSpecies, setEditarSpecies] = useState("")
    const [editarBreed, setEditarBreed] = useState("")
    const [editarGender, setEditarGender] = useState(false)
    const [editarColor, setEditarColor] = useState("")
    const [editarHasNie, setEditarHasNie] = useState(false);
    const [editarNie, setEditarNie] = useState("")
    const [editarBirthDate, setEditarBirthDate] = useState("")
    const [editarTypeFood, setEditarTypeFood] = useState("");
    const [editarSpecialCare, setEditarSpecialCare] = useState(false);
    const [editarSterilized, setEditarSterilized] = useState(false);
    const [editarAboutPet, setEditarAboutPet] = useState("");

    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        if (!id) return;
        readDogBreeds()
        readPetInfo()


    }, [id]);



    const readPetInfo = () => {
        fetch(BACKEND_URL + `api/clients/pets/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("something went wrong")
                }
                return response.json()
            })
            .then(data => {

                setEditarName(data.name || "");
                setEditarSpecies(data.species || "");
                setEditarBreed(data.breed || "");
                setEditarGender(data.gender);
                setEditarColor(data.color || "");
                setEditarNie(data.nie || "");
                setEditarBirthDate(data.birth_date || "");
                setEditarTypeFood(data.type_food || "");
                setEditarSpecialCare(data.special_care ?? false);
                setEditarSterilized(data.sterilized ?? false);
                setEditarHasNie(data.has_nie ?? false);
                setEditarAboutPet(data.about_pet || "");
                console.log("DATA GET:", data);

            }
            )
            .catch(err => console.log(err));
    }

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
    const updatePet = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch
                (BACKEND_URL + `api/clients/pets/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
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
                            "sterilized": editarSterilized,
                            "about_pet": editarAboutPet
                        })
                    }
                );

            if (!response.ok) {
                throw new Error("Error updating pet");
            }
            Swal.fire({
                title: "Pet Edited",
                icon: "success",
                draggable: true
            });

            navigate("/clients/pets");

        } catch (error) {
            console.error(error);
            alert("Could not update pet");
        }
    };

    return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="mb-4 text-center">Edit Pet</h1>
          <form onSubmit={updatePet} className="appointment-form">

            <div className="mb-3">
              <label className="form-label">Pet Name</label>
              <input
                type="text"
                className="form-control"
                value={editarName}
                onChange={(e) => setEditarName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pet Species</label>
              <select
                value={editarSpecies}
                className="form-select"
                onChange={(e) => setEditarSpecies(e.target.value)}
              >
                <option value="">Select species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Exotic">Exotic</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                {editarSpecies === "Dog" || editarSpecies === "Cat"
                  ? "Select Breed"
                  : "Select Type"}
              </label>

              {editarSpecies === "Dog" && (
                <select
                  className="form-select"
                  value={editarBreed}
                  onChange={(e) => setEditarBreed(e.target.value)}
                >
                  <option value="">Select breed</option>
                  <option value="Mixed">Mixed</option>
                  {breeds.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              )}

              {editarSpecies === "Cat" && (
                <select
                  className="form-select"
                  value={editarBreed}
                  onChange={(e) => setEditarBreed(e.target.value)}
                >
                  <option value="">Select breed</option>
                  <option value="Abyssinian">Abyssinian</option>
                  <option value="Maine Coon">Maine Coon</option>
                  <option value="Scottish Fold">Scottish Fold</option>
                </select>
              )}
              {editarSpecies === "Exotic" && (
                <select
                  className="form-select"
                  value={editarBreed}
                  onChange={(e) => setEditarBreed(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Small Mammal">Small Mammal</option>
                  <option value="Bird">Bird</option>
                  <option value="Other Exotic Pet">Other Exotic Pet</option>
                </select>
              )}
            </div>

         
            <div className="mb-3">
              <label className="form-label d-block">Gender</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={editarGender === true}
                  onChange={() => setEditarGender(true)}
                />
                <label className="form-check-label">Boy</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={editarGender === false}
                  onChange={() => setEditarGender(false)}
                />
                <label className="form-check-label">Girl</label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Color</label>
              <select
                className="form-select"
                value={editarColor}
                onChange={(e) => setEditarColor(e.target.value)}
              >
                <option value="">Select color</option>
                <option value="black&white">Black & White</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="brown">Brown</option>
                <option value="blue">Blue</option>
                <option value="tricolor">Tricolor</option>
                <option value="red">Red</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Type of Food</label>
              <input
                type="text"
                className="form-control"
                value={editarTypeFood}
                onChange={(e) => setEditarTypeFood(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Birth Date</label>
              <input
                type="date"
                className="form-control"
                value={editarBirthDate}
                onChange={(e) => setEditarBirthDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label d-block">Special Care</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={editarSpecialCare === true}
                  onChange={() => setEditarSpecialCare(true)}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={editarSpecialCare === false}
                  onChange={() => setEditarSpecialCare(false)}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">About My Pet</label>
              <textarea
                className="form-control"
                rows="4"
                value={editarAboutPet}
                onChange={(e) => setEditarAboutPet(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-warm w-100">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default ClientEditPet