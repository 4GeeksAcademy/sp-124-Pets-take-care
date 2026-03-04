import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


const ViewSkills = () => {

    const { id } = useParams();
    const [skill, setSkill] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getSkill()

    }, [id])

    const getSkill = () => {
        fetch(
            BACKEND_URL+`api/skills/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setSkill(data)
            )
            .catch(err => console.log(err))
    }

    if (!skill) {
        return <p>Loading skill...</p>;
    }

    return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Skill Details</h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <div>
          <strong>Skill Name</strong>
          <div>{skill.skill}</div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ViewSkills