import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import useGlobalReducer from "../../hooks/useGlobalReducer";
import storeReducer from "../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarPublic = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();






    return (
  <nav className="main-navbar d-flex justify-content-between align-items-center rounded-5 px-4 py-2">

    {/* Logo */}
    <Link to="/">
      <img
        className="logo"
        src="https://www.tiendapetcare.es/wp-content/uploads/2024/11/logo-horizontal-petcare.png"
        alt="PetCare"
      />
    </Link>

    {/* Right side */}
    <div className="d-flex align-items-center gap-3">

      <button
        className="nav-link-btn"
        onClick={() => navigate("/welcome")}
      >
        Login
      </button>

      <button
        className="nav-btn-primary"
        onClick={() => navigate("/welcome")}
      >
        Sign Up
      </button>

    </div>

  </nav>
);
}

export default NavbarPublic