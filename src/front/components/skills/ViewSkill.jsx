import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const ViewSkills = () => {

    const { id } = useParams();
    const [skill, setSkill] = useState(null)

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

        <div className="container">
            <h1>Skill detail</h1>

            <p><strong>Skill:</strong> {skill.skill}</p>
        </div>
    );
}

export default ViewSkills