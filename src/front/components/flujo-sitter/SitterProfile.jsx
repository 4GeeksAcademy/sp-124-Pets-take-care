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
  <div className="container my-5">

    <div className="appointments-section p-4 p-md-5">

      <div className="row justify-content-center">
        <div className="col-12 col-md-6">

          <div className="profile-card p-4">

            <h2 className="mb-4 text-center">My Profile</h2>

            <div className="profile-info">

              <div className="mb-3">
                <span className="section-label">Name</span>
                <p className="mb-0">{sitter.name}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Last Name</span>
                <p className="mb-0">{sitter.last_name}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Email</span>
                <p className="mb-0">{sitter.email}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Phone</span>
                <p className="mb-0">{sitter.phone}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Address</span>
                <p className="mb-0">{sitter.address}</p>
              </div>

              <div className="mb-4">
                <span className="section-label">Studies</span>
                <p className="mb-0">{sitter.studies_comment}</p>
              </div>

            </div>

            <button
              className="btn btn-warm w-100"
              onClick={() => navigate("/sitter/profile/edit")}
            >
              Edit Profile
            </button>

          </div>

        </div>
      </div>

    </div>

  </div>
);
}

export default SitterProfile