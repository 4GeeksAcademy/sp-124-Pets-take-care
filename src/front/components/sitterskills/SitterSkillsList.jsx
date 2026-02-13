import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../main";


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


        // setSitterPets(prev =>
        //     prev.filter(el => !(el.sitter_id === sitter_id && el.pet_id === pet_id))
        // );

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
        <div className="container">
            <h1>Get relation sitter & skill</h1>

            {Object.entries(skillsList).map(([sitter_id, sitter]) => (
                <div
                    key={sitter_id}
                    className="container border p-2 bg-secondary-subtle mb-3"
                >
                    <h4>👤 {sitter.sitter_name}</h4>

                    {sitter.skills.length === 0 && (
                        <p className="text-muted">No skills assigned</p>
                    )}

                    <ul>
                        {sitter.skills.map(skill => (
                            <li key={skill.skill_id}>
                                {skill.skill}

                                <button
                                    className="btn btn-danger ms-5 btn-sm"
                                    onClick={() => deleteSitterSkill(sitter_id, skill.skill_id)}
                                >
                                    delete
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="btn btn-primary ms-5 btn-sm"
                        onClick={() => navigate(`/newsitter/${sitter_id}/newskills`)}
                    >
                        add skill
                    </button>
                </div>
            ))}
        </div>
    );
}
export default SitterSkillsList