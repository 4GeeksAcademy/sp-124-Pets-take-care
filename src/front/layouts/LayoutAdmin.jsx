import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const LayoutAdmin = () => {

    const navigate = useNavigate()

    useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
        navigate("/welcome")
    }
}, [navigate])
    
    return (
  <div className="admin-layout d-flex">
    <div className="admin-sidebar p-4">
      <h5 className="mb-4">Admin Panel</h5>
      <button
        onClick={() => navigate("/admin/home")}
        className="admin-link"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("/appointments")}
        className="admin-link"
      >
        Appointments
      </button>
      <button
        onClick={() => navigate("/appointments/sitters")}
        className="admin-link"
      >
        Appointment Sitters
      </button>
      <button
        onClick={() => navigate("/pets")}
        className="admin-link"
      >
        Pets
      </button>
      <button
        onClick={() => navigate("/services")}
        className="admin-link"
      >
        Services
      </button>
      <button
        onClick={() => navigate("/sitters")}
        className="admin-link"
      >
        Sitters
      </button>
      <button
        onClick={() => navigate("/sitterpets")}
        className="admin-link"
      >
        Sitter Pets
      </button>
      <button
        onClick={() => navigate("/sitterskills")}
        className="admin-link"
      >
        Sitter Skills
      </button>
      <button
        onClick={() => navigate("/skills")}
        className="admin-link"
      >
        Skills
      </button>
      <button
        onClick={() => navigate("/clients")}
        className="admin-link"
      >
        Clients
      </button>
    </div>
    
    <div className="admin-content flex-grow-1 p-5">
      <Outlet />
    </div>
  </div>
)
}