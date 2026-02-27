import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main"

const CreatePet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [users, setUsers] = useState([])

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [hasNie, setHasNie] = useState(false);
  const [nie, setNie] = useState("");
  const [sterilized, setSterilized] = useState(false);
  const [userId, setUserId] = useState(null);

  



  useEffect(() => {
    
    readDogBreeds()

    fetch(BACKEND_URL + "api/clients")
      .then(r => r.json())
      .then(data => {
        setUsers(data)
        if (data.length > 0) {
          setUserId(data[0].id)
        }
      })
      .catch(err => console.log(err));
  }, []);

   

  const newPet = async () => {

    const response = await fetch(
      BACKEND_URL + "api/signup/pets",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          species: species,
          has_nie: hasNie,
          nie: nie,
          sterilized: sterilized,
          user_id: userId
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
        <div>
          <h5>owner</h5>
          <select name="users" value={userId} onChange={(e) => 
            setUserId(Number(e.target.value))
          }>
            {
              users.map(el =>
                <option
                  key={el.id}
                  value={el.id}>
                  {el.name}
                </option>
              )
            }
          </select>

        </div>
        <div>
          <h5>pet name</h5>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h5>especies</h5>
          <input type="text"
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

        <button type="button" className="btn btn-primary mt-4" onClick={newPet}>
          New Pet
        </button>
      </form>
    </div>
  );
};

export default CreatePet;
