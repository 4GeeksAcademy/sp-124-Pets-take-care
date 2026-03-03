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
        <nav className="navbar navbar-light bg-light rounded-5">
            <div className="container d-flex align-items-center">
                <Link to="/">
                    <img className="logo" src="https://www.tiendapetcare.es/wp-content/uploads/2024/11/logo-horizontal-petcare.png" alt="" />
                </Link>
                <div className="d-flex ms-auto">
                <button className="btn btn-warning rounded-pill px-4 me-3" onClick={() => navigate("/welcome")}>Login</button>
                <button className="btn btn-warning rounded-pill px-4" onClick={() => navigate("/welcome")}>Sing Up</button>
                </div>
            </div>
        </nav>

    )
}

export default NavbarPublic