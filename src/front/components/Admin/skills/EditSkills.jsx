import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const EditSkill = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editSkill, setEditSkill] = useState("")


    useEffect(() => {
        fetch(BACKEND_URL+`api/skills/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditSkill(data.skill);
            });
    }, [id]);

    const putSkill = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(BACKEND_URL+`api/skills/${id}`,
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
    };

    return (
  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Edit Skill</h2>

      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/skills")}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <form onSubmit={putSkill}>
          <div className="mb-4">
            <label className="form-label">Skill Name</label>
            <input
              type="text"
              className="form-control"
              value={editSkill}
              onChange={e => setEditSkill(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
)
}

export default EditSkill