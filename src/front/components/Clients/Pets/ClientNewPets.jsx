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
  <div className="container my-5">

    <div className="appointments-section p-4 p-md-5">

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <h1 className="mb-4 text-center">Add New Pet</h1>

          <form onSubmit={newPetById} className="appointment-form">
            <div className="mb-3">
              <label className="form-label">Pet Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Pupy the cheese master"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pet Species</label>
              <select
                value={species}
                className="form-select"
                onChange={(e) => setSpecies(e.target.value)}
              >
                <option value="">Select species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Exotic">Exotic</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label d-block">Has NIE?</label>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={hasNie === true}
                  onChange={() => setHasNie(true)}
                />
                <label className="form-check-label">Yes</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={hasNie === false}
                  onChange={() => setHasNie(false)}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            {hasNie && (
              <div className="mb-3">
                <label className="form-label">Pet NIE</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="XXXXXXXXXX-X"
                  onChange={(e) => setNie(e.target.value)}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="form-label d-block">Sterilized</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={sterilized === true}
                  onChange={() => setSterilized(true)}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={sterilized === false}
                  onChange={() => setSterilized(false)}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <button type="submit" className="btn btn-warm w-100">
              Add New Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default ClientNewPets