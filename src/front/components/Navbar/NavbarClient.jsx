import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import useGlobalReducer from "../../hooks/useGlobalReducer";
import storeReducer from "../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarClient = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();




    const handleLogoutClient = () => {

        localStorage.removeItem("clientToken");

        navigate("/clients/login")

    }

    return (
        <nav className="main-navbar d-flex justify-content-between align-items-center rounded-5 px-4 py-2">

  {localStorage.getItem("clientToken") ? (
    <>
      <div className="d-flex align-items-center gap-4">
        <Link to="/clients/home" className="nav-icon">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <button
          className="nav-link-btn"
          onClick={() => navigate("/clients/appointments")}
        >
          Appointments
        </button>
        <button
          className="nav-link-btn"
          onClick={() => navigate("/clients/pets")}
        >
          Pets
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

</nav>)
}

export default NavbarClient