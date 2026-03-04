import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import useGlobalReducer from "../../hooks/useGlobalReducer";
import storeReducer from "../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarSitter = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();




    const handleLogoutClient = () => {

        localStorage.removeItem("sitterToken");

        navigate("/sitters/login")

    }

    return (

       <nav className="main-navbar d-flex justify-content-between align-items-center rounded-5 px-4 py-2">

  {localStorage.getItem("sitterToken") ? (
    <>
      
      <div className="d-flex align-items-center gap-4">
        <Link to="/sitters/home" className="nav-icon">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <button
          className="nav-link-btn"
          onClick={() => navigate("/appointments/list")}
        >
          Requests
        </button>
        <button
          className="nav-link-btn"
          onClick={() => navigate("/appointments-sitters/own")}
        >
          Open
        </button>
        <button
          className="nav-link-btn"
          onClick={() => navigate("/appointments-sitters/asigned")}
        >
          Assigned
        </button>
        <button
          className="nav-link-btn"
          onClick={() => navigate("/appointments-sitter/background")}
        >
          Background
        </button>
        <button
          className="nav-link-btn"
          onClick={() => navigate("/sitter/profile")}
        >
          Profile
        </button>
      </div>
      <button
        className="btn btn-logout"
        onClick={handleLogoutClient}
      >
        Logout
      </button>
    </>
  ) : (
    <h6 className="mb-0">Please login</h6>
  )}

</nav>

    )
}

export default NavbarSitter