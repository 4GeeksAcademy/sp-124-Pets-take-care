import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditSkill = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editSkill, setEditSkill] = useState("")


    useEffect(() => {
        fetch(`https://curly-space-spork-wrjvvvxxg66qc6jw-3001.app.github.dev/api/skills/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditSkill(data.skill);
            });
    }, [id]);

    const putSkill = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://curly-space-spork-wrjvvvxxg66qc6jw-3001.app.github.dev/api/skills/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "skill": editSkill,
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error updating skill");
            }

            navigate("/skills");

        } catch (error) {
            console.error(error);
            alert("Could not update skill");
        }
        console.log("ID desde useParams:", id, typeof id);
    };

    // const handleEdit = () => {
    //     alert("Contacto editado correctamente")
    //     navigate("/clients")
    // }

    return (
        <div className="container">
            <h2>Edit Skill</h2>
            <form onSubmit={putSkill}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={editSkill} onChange={e => setEditSkill(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Edit Client</button>
                <Link className="btn btn-primary ms-2" to="/clients">Back</Link>
            </form>
        </div>
    )
}

export default EditSkill