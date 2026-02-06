import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreatePet = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [hasNie, setHasNie] = useState(false);
  const [nie, setNie] = useState("");
  const [sterilized, setSterilized] = useState(false);



  const newPet = async () => {
    const response = await fetch(
      "https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/signup/pets",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          species: species,
          has_nie: hasNie,
          nie: nie,
          sterilized: sterilized,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error creating pet");
    }

    navigate("/pets");
  };

  return (
    <div className="container">
      <h1>Post new Pet 🐾</h1>

      <form>
        <div className="container">
          <input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="container">
          <input
            placeholder="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </div>
        <h5>has nie?</h5>
        <div className="container">
          <input
            type="radio"
            id="nie-yes"
            name="has-nie"
            checked={hasNie === true}
            onChange={() => setHasNie(true)}
          />
          <label htmlFor="nie-yes">Yes</label>
        </div>

        <div className="container">
          <input
            type="radio"
            id="nie-no"
            name="has-nie"
            checked={hasNie === false}
            onChange={() => setHasNie(false)}
          />
          <label htmlFor="nie-no">No</label>
        </div>

        {hasNie && (
          <input
            placeholder="nie"
            value={nie}
            onChange={(e) => setNie(e.target.value)}
          />
        )}

        <h5>Sterilized</h5>
        <div className="container">
          <input
            type="radio"
            id="sterilized-yes"
            name="sterilized"
            checked={sterilized === true}
            onChange={() => setSterilized(true)}
          />
          <label htmlFor="sterilized-yes">Yes</label>
        </div>

        <div className="container">
          <input
            type="radio"
            id="sterilized-no"
            name="sterilized"
            checked={sterilized === false}
            onChange={() => setSterilized(false)}
          />
          <label htmlFor="sterilized-no">No</label>
        </div>

        <button type="button" onClick={newPet}>
          New Pet
        </button>
      </form>
    </div>
  );
};

export default CreatePet;
