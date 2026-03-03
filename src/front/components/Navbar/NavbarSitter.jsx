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

        <nav className="navbar navbar-light bg-light rounded-5">
            {localStorage.getItem("sitterToken") ?
                <>

                    <Link to="/sitters/home">
                        <span>
                            <FontAwesomeIcon className="ms-3" icon={faHome} size="2x" />
                        </span>
                    </Link>
                    <button className="btn btn-primary" onClick={()=>navigate("/appointments/list")}>Appointment's Request</button>
                    <button className="btn btn-primary" onClick={() => navigate("/appointments-sitters/own")}>Open Request</button>
                    <button className="btn btn-primary" onClick={() => navigate("/appointments-sitters/asigned")}>Asigned Appointments</button>
                    <button className="btn btn-primary" onClick={() => navigate("/appointments-sitter/background")}>Background</button>
                    <button className="btn btn-primary" onClick={() => navigate("/sitter/profile")}>My profile</button>
                    <button className="btn btn-danger me-3" onClick={handleLogoutClient}>Logout</button>
                    
                
                </>
                : <h1>logeate</h1>
            }
        </nav>

    )
}

export default NavbarSitter