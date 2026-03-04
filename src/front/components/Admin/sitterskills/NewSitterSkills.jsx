
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../main";


const NewSitterSkills = () => {

  const { id: sitter_id } = useParams();

  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(BACKEND_URL + "api/skills")
      .then(r => r.json())
      .then(data => setSkills(data));
  }, []);

  const addSkillToSitter = async (skill_id) => {
    const response = await fetch(
      BACKEND_URL + `api/sitters/${sitter_id}/skills/${skill_id}`,
      {
        method: "POST"
      }
    );

    if (!response.ok) {
      const data = await response.json();
      alert(data.msg);
      return;
    }

    alert("skill added");
    navigate("/sitterskills")
  };

  return (

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Add Skill to Sitter</h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
    {skills.length === 0 ? (
      <div className="text-muted">
        No skills available.
      </div>

    ) : (
      <div className="table-responsive">

        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Skill</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill.id}>
                <td>{skill.skill}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => addSkillToSitter(skill.id)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}

        </tbody>
        </table>
      </div>
    )}
  </div>
);
};


export default NewSitterSkills