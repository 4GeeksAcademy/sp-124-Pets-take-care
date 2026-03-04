import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const CreatePet = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [hasNie, setHasNie] = useState(false);
  const [nie, setNie] = useState("");
  const [sterilized, setSterilized] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch(BACKEND_URL + "api/clients")
      .then(r => r.json())
      .then(data => {
        setUsers(data);
        if (data.length > 0) {
          setUserId(data[0].id);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const newPet = async (e) => {
    e.preventDefault();

    const response = await fetch(
      BACKEND_URL + "api/signup/pets",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          species,
          has_nie: hasNie,
          nie,
          sterilized,
          user_id: userId
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error creating pet");
    }

    navigate("/pets");
  };

  return (

    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Create Pet</h2>
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
          <form onSubmit={newPet}>
            <div className="mb-3">
              <label className="form-label">Owner</label>
              <select
                className="form-select"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
              >
                {users.map(el => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Pet Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Species</label>
              <input
                type="text"
                className="form-control"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label d-block">Has NIE?</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={hasNie === true}
                  onChange={() => setHasNie(true)}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={hasNie === false}
                  onChange={() => setHasNie(false)}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            {hasNie && (
              <div className="mb-3">
                <label className="form-label">NIE</label>
                <input
                  type="text"
                  className="form-control"
                  value={nie}
                  onChange={(e) => setNie(e.target.value)}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="form-label d-block">Sterilized</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={sterilized === true}
                  onChange={() => setSterilized(true)}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={sterilized === false}
                  onChange={() => setSterilized(false)}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark w-100"
            >
              Create Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePet;
