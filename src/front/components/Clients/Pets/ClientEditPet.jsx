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
        <div className="container bg-secondary rounded mt-5 ">
            <h1 className="text-white">Edit Pet</h1>
            <div className="row">
                <form onSubmit={updatePet}>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label text-white">Pet Name</label>
                        <input type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name"
                            value={editarName}
                            onChange={(e) => setEditarName(e.target.value)} />

                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label text-white">
                            Pet species
                        </label>
                        <select placeholder="species" value={editarSpecies} className="form-control"
                            onChange={(e) => setEditarSpecies(e.target.value)} >
                            <option value="">Select species</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Exotic">Exotic</option>
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label text-white">
                            {editarSpecies === "Dog" || editarSpecies === "Cat"
                                ? "Select Breed"
                                : "Select Type"}
                        </label>

                        {editarSpecies === "Dog" && (
                            <select
                                className="form-control"
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
                                className="form-control"
                                value={editarBreed}
                                onChange={(e) => setEditarBreed(e.target.value)}
                            >
                                <option value="">Select breed</option>

                                <option value="Abyssinian">Abyssinian</option>
                                <option value="American Bobtail">American Bobtail</option>
                                <option value="American Curl">American Curl</option>
                                <option value="Balinese-Javanese">Balinese-Javanese</option>
                                <option value="Bengal">Bengal</option>
                                <option value="Birman">Birman</option>
                                <option value="Chartreux">Chartreux</option>
                                <option value="Devon Rex">Devon Rex</option>
                                <option value="Egyptian Mau">Egyptian Mau</option>
                                <option value="Havana Brown">Havana Brown</option>
                                <option value="Japanese Bobtail">Japanese Bobtail</option>
                                <option value="Maine Coon">Maine Coon</option>
                                <option value="Norwegian Forest Cat">Norwegian Forest Cat</option>
                                <option value="Munchkin">Munchkin</option>
                                <option value="Peterbald">Peterbald</option>
                                <option value="Scottish Fold">Scottish Fold</option>
                            </select>
                        )}
                        {editarSpecies === "Exotic" && (
                            <select
                                className="form-control"
                                value={editarBreed}
                                onChange={(e) => setEditarBreed(e.target.value)}
                            >
                                <option value="">Select pet</option>

                                <option value="Reptile">Reptile</option>
                                <option value="Small Mammal">Small Mammal</option>
                                <option value="Bird">Bird</option>
                                <option value="Other Exotic Pet">Other Exotic Pet</option>
                            </select>
                        )}
                    </div>


                    <div className="col-12 mb-3">
                        <label className="form-check-label mb-2 text-white">Gender</label>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="radioGender"
                                id="radioDefault1"
                                checked={editarGender === true}
                                onChange={() => setEditarGender(true)} />
                            <label className="form-check-label text-white" htmlFor="radioDefault1">
                                boy
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input"
                                type="radio"
                                name="radioGender"
                                id="radioDefault2"
                                checked={editarGender === false}
                                onChange={() => setEditarGender(false)}
                            />
                            <label className="form-check-label text-white" htmlFor="radioDefault2">
                                girl
                            </label>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="exampleFormControlInput4" className="form-label text-white">
                                Color
                            </label>
                            <select className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setEditarColor(e.target.value)}>
                                <option selected>Color</option>
                                <option value="black&white">black&white</option>
                                <option value="black">black</option>
                                <option value="white">white</option>
                                <option value="brown">brown</option>
                                <option value="blue">blue</option>
                                <option value="tricolor">tricolor</option>
                                <option value="red">red</option>
                            </select>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="exampleFormControlInput5" className="form-label text-white">Type of food</label>
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlInput5"
                                placeholder="food"
                                value={editarTypeFood}
                                onChange={(e) => setEditarTypeFood(e.target.value)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="exampleFormControlInput6" className="form-label text-white">Birth day</label>
                            <input type="date"
                                className="form-control"
                                id="exampleFormControlInput6"
                                placeholder="Birthday"
                                value={editarBirthDate}
                                onChange={(e) => setEditarBirthDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-check-label mb-2 text-white">Special care</label>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="radioSpecial"
                                id="radioDefault3"
                                checked={editarSpecialCare === true}
                                onChange={() => setEditarSpecialCare(true)} />
                            <label className="form-check-label text-white" htmlFor="radioDefault3">
                                yes
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input"
                                type="radio"
                                name="radioSpecial"
                                id="radioDefault4"
                                checked={editarSpecialCare === false}
                                onChange={() => setEditarSpecialCare(false)}
                            />
                            <label className="form-check-label text-white" htmlFor="radioDefault4">
                                No
                            </label>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="exampleFormControlInput2" className="form-label text-white">
                                about my pet
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="my pet ..."
                                value={editarAboutPet}
                                onChange={(e) => setEditarAboutPet(e.target.value)} />

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Save changes</button>
                </form>
            </div>
        </div>
    )
}

export default ClientEditPet