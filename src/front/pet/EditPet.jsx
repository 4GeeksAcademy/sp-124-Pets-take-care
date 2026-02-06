import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditPet = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editarName, setEditarName] = useState("")
    const [editarSpecies, setEditarSpecies] = useState("")
    const [editarRace, setEditarRace] = useState("")
    const [editarGender, setEditarGender] = useState(false)
    const [editarColor, setEditarColor] = useState("")
    const [editarHasNie, setEditarHasNie] = useState(false);
    const [editarNie, setEditarNie] = useState("")
    const [editarBirthDate, setEditarBirthDate] = useState("")
    const [editarTypeFood, setEditarTypeFood] = useState("");
    const [editarSpecialCare, setEditarSpecialCare] = useState(false);
    const [editarSterilized, setEditarSterilized] = useState(false);

    useEffect(() => {
        fetch( BACKEND_URL + `api/pets/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditarName(data.name);
                setEditarSpecies(data.species);
                setEditarRace(data.race);
                setEditarGender(data.gender);
                setEditarColor(data.color);
                setEditarNie(data.nie);
                setEditarBirthDate(data.birth_date);
                setEditarTypeFood(data.type_food);
                setEditarSpecialCare(data.special_care);
                setEditarSterilized(data.sterilized);
            });
    }, [id]);

    const updatePet = async () => {
        try {
            const response = await fetch( BACKEND_URL + `api/pets/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": editarName,
                        "species": editarSpecies,
                        "race": editarRace,
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
    const createRace = (e) => {
        setEditarRace(e.target.value)
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
        <div className="container">
            <h1>Edit Pet</h1>
            <form>
                <div className="container">
                    <input type="text" placeholder="name" onChange={createName} value={editarName} />
                </div>
                <div className="container">
                    <input type="text" placeholder="Species" onChange={createSpecies} value={editarSpecies} />
                </div>
                <div className="container">
                    <input type="text" placeholder="Race" onChange={createRace} value={editarRace} />
                </div>
                <h5>Gender</h5>
                <div className="container">
                    <input type="radio" id="masc" name="gender" checked={editarGender === true}
                        onChange={() => setEditarGender(true)} />
                    <label htmlFor="masc">boy</label>
                </div>

                <div className="container">
                    <input type="radio" id="fem" name="gender" checked={editarGender === false}
                        onChange={() => setEditarGender(false)} />
                    <label htmlFor="fem">girl</label>
                </div>
                <div className="container">
                    <input type="text" placeholder="Color" onChange={createColor} value={editarColor} />
                </div>
                <h5>Has Nie?</h5>
                <div className="container">
                    <input type="radio" id="nie-yes" name="has_nie" checked={editarHasNie === true}
                        onChange={() => setEditarHasNie(true)} />
                    <label htmlFor="nie-yes">yes</label>
                </div>

                <div className="container">
                    <input type="radio" id="nie-no" name="has_nie" checked={editarHasNie === false}
                        onChange={() => setEditarHasNie(false)} />
                    <label htmlFor="nie-no">no</label>
                </div>
                {editarHasNie && (
                    <div className="container">
                    <input
                        placeholder="Nie"
                        value={editarNie}
                        onChange={createNie}
                    />
                    </div>
                )}
                <h5>Birth Date</h5>
                <div className="container">
                    <input type="date" placeholder="BirthDate" onChange={createBirthDate} value={editarBirthDate} />
                </div>
                <div className="container">
                    <input type="text" placeholder="type of food" onChange={createTypeFood} value={editarTypeFood} />
                </div>
                <h5>Special Care</h5>
                <div className="container">
                    <input type="radio" id="special-care-yes" name="special-care" checked={editarSpecialCare === true}
                        onChange={() => setEditarSpecialCare(true)} />
                    <label htmlFor="special-care-yes">Yes</label>
                </div>

                <div className="container">
                    <input type="radio" id="special-care-no" name="special-care" checked={editarSpecialCare === false}
                        onChange={() => setEditarSpecialCare(false)} />
                    <label htmlFor="special-care-no">No</label>
                </div>
                <h5>Sterilized</h5>
                <div className="container">
                    <input type="radio" id="sterilized-yes" name="sterilized" checked={editarSterilized === true}
                        onChange={() => setEditarSterilized(true)} />
                    <label htmlFor="sterilized-yes">Yes</label>
                </div>

                <div className="container">
                    <input type="radio" id="sterilized-no" name="sterilized" checked={editarSterilized === false}
                        onChange={() => setEditarSterilized(false)} />
                    <label htmlFor="sterilized-no">No</label>
                </div>
            </form>
            <button type="button" className="btn btn-success me-5 mt-5" onClick={updatePet}>Save changes</button>
            <button type="button" className="btn btn-primary mt-5" onClick={() => navigate("/pets")}>go back</button>
        </div>
    )
}

export default EditPet