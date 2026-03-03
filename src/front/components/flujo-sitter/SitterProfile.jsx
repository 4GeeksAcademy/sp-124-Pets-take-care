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
                setSitter(data)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container w-50">
            <form>
                <fieldset disabled>
                    <h3 className="display-5 mb-3">Profile</h3>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name" >Name</label>
                        <input value={sitter.name} type="text" className="form-control" id="name" autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="last_name">Last Name</label>
                        <input value={sitter.last_name} type="text" className="form-control" id="last_name" autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input value={sitter.email} type="text" className="form-control" id="email" autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <input value={sitter.phone} type="text" className="form-control" id="phone" autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="address">Address</label>
                        <input value={sitter.address} type="text" className="form-control" id="address" autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="studies">Studies</label>
                        <input value={sitter.studies_comment} type="text" className="form-control" id="studies" autoComplete="off"/>
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