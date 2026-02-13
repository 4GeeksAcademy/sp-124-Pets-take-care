
import {useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../main"; 


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
    <div className="container">
      <h2>Add skill to sitter</h2>

      {skills.map(skill => (
        <div key={skill.id} className="border p-2 mb-2">
          <span>{skill.skill}🐾</span>

          <button
            className="btn btn-primary ms-2"
            onClick={() => addSkillToSitter(skill.id)}
          >
            add
          </button>
        </div>
      ))}
    </div>
  );
};


export default NewSitterSkills