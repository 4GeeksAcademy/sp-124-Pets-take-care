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
        <div className = "container">
        <nav className="navbar navbar-light bg-light">
            <Link to="/">
                <span>
                    <FontAwesomeIcon className="ms-3" icon={faHome} size="2x" />
                </span>
            </Link>
        <button className="btn btn-success" onClick={() => navigate("/welcome")}>Login</button>
						<button className="btn btn-success" onClick={() => navigate("/welcome")}>Sing Up</button>
        </nav>
        </div>

    )
}

export default NavbarPublic