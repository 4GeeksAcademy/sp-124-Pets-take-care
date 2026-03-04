import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const SkillsList = () => {

    const [skills, setSkills] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getSkills()
    }, [])

    const getSkills = () => {
        fetch(BACKEND_URL + "api/skills")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data => setSkills(data))
            .catch(err => console.log(err))
    }

    const deleteSkills = async (id) => {

        const response = await fetch(
            BACKEND_URL + `api/skills/${id}`,
            {
                method: "DELETE"
            }
        )

        if (!response.ok) {
            throw new Error("Error deleting skill");
        }

        if (response.ok) {
            alert("Skill Deleted")
            getSkills()
        }
    }


    return (

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Skills</h2>
      <button
        className="btn btn-dark"
        onClick={() => navigate("/newskills")}
      >
        + Create Skill
      </button>
    </div>

    {skills?.length === 0 ? (

      <div className="text-muted">
        No skills found.
      </div>

    ) : (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Skill</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(el => (
              <tr key={el.id}>
                <td>{el.skill}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigate("/viewskills/" + el.id)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate("/editskills/" + el.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteSkills(el.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)
}
export default SkillsList