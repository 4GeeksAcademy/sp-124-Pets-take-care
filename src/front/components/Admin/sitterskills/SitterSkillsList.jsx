import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


const SitterSkillsList = () => {

    const [sitterSkills, setSitterSkills] = useState([])

    const [sitters, setSitters] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        ReadSitterSkills()
        ReadSitters()

    }, [])


    const ReadSitters = () => {
        fetch(BACKEND_URL + "api/sitters")
            .then(r => r.json())
            .then(data => setSitters(data));
    }

    const ReadSitterSkills = () => {
        fetch(BACKEND_URL + "api/sitterskills")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setSitterSkills(data)
            )
            .catch(err => console.log(err))
    }

    const deleteSitterSkill = async (sitter_id, skill_id) => {

        const response = await fetch(
            BACKEND_URL + `api/sitters/${sitter_id}/skills/${skill_id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Error deleting skill from sitter");
        }



        ReadSitterSkills()
        ReadSitters()

    };

    const skillsList = {};

    sitters.forEach(sitter => {
        skillsList[sitter.id] = {
            sitter_name: sitter.name,
            skills: []
        };
    });

    sitterSkills.forEach(rel => {
        if (skillsList[rel.sitter_id]) {
            skillsList[rel.sitter_id].skills.push({
                skill: rel.skill_name,
                skill_id: rel.skill_id
            });
        }
    });

    return (

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Sitter & Skill Relations</h2>
    </div>
    {Object.entries(skillsList).length === 0 ? (

      <div className="text-muted">
        No relations found.
      </div>
    ) : (
      Object.entries(skillsList).map(([sitter_id, sitter]) => (
        <div key={sitter_id} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{sitter.sitter_name}</h5>
            <button
              className="btn btn-sm btn-dark"
              onClick={() => navigate(`/newsitter/${sitter_id}/newskills`)}
            >
              + Add Skill
            </button>
          </div>
          {sitter.skills.length === 0 ? (
            <div className="text-muted mb-3">
              No skills assigned.
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
                  {sitter.skills.map(skill => (
                    <tr key={skill.skill_id}>
                      <td>{skill.skill}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteSitterSkill(sitter_id, skill.skill_id)
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <hr />
        </div>
      ))
    )}
  </div>
);
}
export default SitterSkillsList