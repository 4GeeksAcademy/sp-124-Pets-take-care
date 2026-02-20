import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../main";


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

        <div className="container">
            <h1>Skill detail</h1>

            <p><strong>Skill:</strong> {skill.skill}</p>
            <button className="btn btn-primary" onClick={()=>navigate(-1)} >Go Back</button>
        </div>
    );
}

export default ViewSkills