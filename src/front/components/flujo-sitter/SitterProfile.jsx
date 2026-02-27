import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../main"


const SitterProfile = () => {

    const [sitter, setSitter] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSitter()
    }, [])

    const getSitter = () => {
        fetch(BACKEND_URL + `api/sitter/profile`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("sitterToken")
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Somenthing went wrong")
                }
                return resp.json()
            })
            .then(data => {
                console.log(data)
                setSitter(data)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container w-50">
            <form>
                <fieldset disabled>
                    <label className="display-5 mb-3">Profile</label>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input value={sitter.name} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input value={sitter.last_name} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input value={sitter.email} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input value={sitter.phone} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input value={sitter.address} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Studies</label>
                        <input value={sitter.studies_comment} type="text" className="form-control" />
                    </div>
                </fieldset>
                    <div className="mt-4">
                    <button type="submit" className="btn btn-primary" onClick={()=> navigate("/sitter/profile/edit")}>Edit</button>
                    </div>
            </form>
        </div>
    )
}

export default SitterProfile