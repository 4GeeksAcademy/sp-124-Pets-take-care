import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import useGlobalReducer from "../../hooks/useGlobalReducer";
import storeReducer from "../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();




    const handleLogout = () => {

        localStorage.removeItem("adminToken");

        navigate("/")

    }

    return (

  <nav className="d-flex justify-content-between align-items-center px-4 py-3">

    <div className="d-flex align-items-center gap-3">

      <button
        className="btn btn-sm btn-outline-dark"
        onClick={() => navigate("/admin/home")}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>

      <span className="fw-semibold">
        Admin Panel
      </span>

    </div>

    <div className="d-flex align-items-center gap-3">

      <span className="text-muted small">
        Administrator
      </span>

      <button
        className="btn btn-sm btn-outline-dark"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  </nav>

);
}

export default NavbarAdmin