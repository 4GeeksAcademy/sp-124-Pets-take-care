import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

const SkillsList = () => {

    const [skills, setSkills] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getSkills()
    }, [])

    const getSkills = () => {
        fetch(BACKEND_URL+"api/skills")
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
            BACKEND_URL+`api/skills/${id}`,
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
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-end my-3">
                    <Link to="/newskills" className="btn btn-primary">Create Skill</Link>
                </div>
                {
                    skills?.map(el =>
                        <div className="col-lg-12" key={el.id}>
                            <div className="card flex-row d-flex justify-content-evenly">
                                <div className="card col-lg-3 border-0 py-3">
                                    <img className="rounded-circle w-50 ms-5" src="https://picsum.photos/200" alt="" />
                                </div>
                                <div className="card-body col-lg-6">
                                    <h4 className="card-text">{el.skill}</h4>
                                </div>
                                <div className="card-footer col-lg-3 border-top-0 bg-transparent">
                                    <div className="d-flex justify-content-end flex-wrap gap-4">
                                        <i onClick={() => navigate("/viewskills/" + el.id)} className="fa-solid fa-info fs-3"></i>
                                        <i onClick={() => { deleteSkills(el.id) }} className="fa-regular fa-trash-can fs-3"></i>
                                        <i onClick={() => navigate("/editskills/" + el.id)} className="fa-regular fa-pen-to-square fs-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}
export default SkillsList