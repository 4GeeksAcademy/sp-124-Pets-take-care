import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../main"
import { bool } from "prop-types"


const SitterProfileEdit = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [studies, setStudies] = useState(false)
    const [studiesComment, setStudiesComment] = useState("")
    const [active, setActive] = useState(false)
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
                setName(data.name || "")
                setLastName(data.last_name || "")
                setPhone(data.phone || "")
                setEmail(data.email || "")
                setAddress(data.address || "")
                setStudies(Boolean(data.studies))
                setStudiesComment(data.studies_comment || "")
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await fetch(BACKEND_URL + `api/sitter/profile/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("sitterToken")
                },
                body: JSON.stringify({
                    name: name,
                    last_name: lastName,
                    phone: phone,
                    email: email,
                    password: password,
                    address: address,
                    studies: studies,
                    studies_comment: studiesComment,
                })

            })
            if (!resp.ok) {
                throw new Error("Something went wrong")
            }
            navigate("/sitter/profile")
        } catch (err) {
            console.log(err)
        }

    }
    return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h2 className="text-center mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                value={name}
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                value={lastName}
                type="text"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                value={email}
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                value={phone}
                type="text"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                value={address}
                type="text"
                className="form-control"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                value={password}
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                checked={studies}
                type="checkbox"
                className="form-check-input"
                id="studiesCheck"
                onChange={(e) => setStudies(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="studiesCheck">
                Has Studies
              </label>
            </div>
            <div className="mb-4">
              <label className="form-label">Studies Comments</label>
              <textarea
                value={studiesComment}
                className="form-control"
                disabled={!studies}
                rows="3"
                onChange={(e) => setStudiesComment(e.target.value)}
              />
            </div>
            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-warm w-100">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-warm w-100"
                onClick={() => navigate("/sitter/profile")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default SitterProfileEdit