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
        <div className = "container">
        <nav className="navbar navbar-light bg-light rounded-5">
            {localStorage.getItem("clientToken") ?
                <>
                    <Link to="/clients/home">
                        <span>
                            <FontAwesomeIcon className="ms-3" icon={faHome} size="2x" />
                        </span>
                    </Link>
                    <button className="btn btn-primary" onClick={() => navigate("/clients/appointments")}>My appointments</button>
                    <button className="btn btn-primary" onClick={() => navigate("/clients/pets")}>My Pets</button>
                    <button className="btn btn-danger me-3" onClick={handleLogoutClient}>Logout</button>


                </>
                : <h1>logeate</h1>
            }
        </nav>
        </div>

    )
}

export default NavbarClient