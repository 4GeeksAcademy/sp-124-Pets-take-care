import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../main";

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
        <div className="container">
            <h1>New Skill</h1>

            <form>
                <div className="container">
                    <input placeholder="skill" value={skill} onChange={e => setSkill(e.target.value)} />
                </div>

                <button type="button" onClick={postSkill}>
                    New Skill
                </button>
            </form>
        </div>
    );
};

export default NewSkill;