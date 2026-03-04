import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const NewSkill = () => {
    const navigate = useNavigate();

    const [skill, setSkill] = useState("");


    const postSkill = async () => {

        const response = await fetch(
            BACKEND_URL+"api/skills",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "skill": skill,
                })
            }
        );

        if (!response.ok) {
            throw new Error("Error creating skill");
        }

        navigate("/skills");

    }



    return (

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Create Skill</h2>
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
        <form>
          <div className="mb-4">
            <label className="form-label">Skill Name</label>
            <input
              type="text"
              className="form-control"
              value={skill}
              onChange={e => setSkill(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={postSkill}
          >
            Create Skill
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default NewSkill;