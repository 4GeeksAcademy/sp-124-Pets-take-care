import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import Swal from 'sweetalert2'


const ClientNewPets = () => {



    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [hasNie, setHasNie] = useState(false);
    const [nie, setNie] = useState("");
    const [sterilized, setSterilized] = useState(false);


    const newPetById = async (e) => {
        e.preventDefault()
        const response = await fetch(
            BACKEND_URL + "api/clients/pets/newpet",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
                },
                body: JSON.stringify({
                    name: name,
                    species: species,
                    has_nie: hasNie,
                    nie: nie,
                    sterilized: sterilized
                }),
            },
        );
        if (!response.ok) {
            throw new Error("Error creating pet");
        }
        Swal.fire({
            title: "New pet added!",
            icon: "success",
            draggable: true
        });

        navigate("/clients/pets");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={newPetById}>
                        <div className="my-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Pet Name</label>
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Pupy the cheesse master"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="my-3">
                            <label htmlFor="exampleFormControlInput2" className="form-label">Species</label>
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlInput2"
                                placeholder="Species"
                                onChange={(e) => setSpecies(e.target.value)} />
                        </div>
                        <label className="form-check-label mb-2">Has nie?</label>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="radioHasNie"
                                id="radioDefault1"
                                checked={hasNie === true}
                                onChange={() => setHasNie(true)} />
                            <label className="form-check-label" htmlFor="radioDefault1">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="radioHasNie"
                                id="radioDefault2"
                                checked={hasNie === false}
                                onChange={() => setHasNie(false)}
                            />
                            <label className="form-check-label" htmlFor="radioDefault2">
                                No
                            </label>
                        </div>
                        {hasNie && (
                            <div className="my-3">
                                <label htmlFor="exampleFormControlInput3"
                                    className="form-label">Pet Nie</label>
                                <input type="text"
                                    className="form-control"
                                    id="exampleFormControlInput3"
                                    placeholder="XXXXXXXXXX-X"
                                    onChange={(e) => setNie(e.target.value)} />
                            </div>

                        )}
                        <label className="form-check-label mb-2">Sterilized</label>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="radioSterilized"
                                id="radioDefault3"
                                checked={sterilized === true}
                                onChange={() => setSterilized(true)} />
                            <label className="form-check-label" htmlFor="radioDefault3">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="radioSterilized"
                                id="radioDefault4"
                                checked={sterilized === false}
                                onChange={() => setSterilized(false)} />
                            <label className="form-check-label" htmlFor="radioDefault4">
                                No
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Add new pet</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ClientNewPets