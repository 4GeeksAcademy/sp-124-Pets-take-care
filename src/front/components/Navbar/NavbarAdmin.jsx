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

        localStorage.removeItem("clientToken");

        navigate("/")

    }

    return (

        <nav className="navbar navbar-light bg-light">
            {localStorage.getItem("adminToken") ?
                <>

                    <Link to="/clients/home">
                        <span>
                            <FontAwesomeIcon className="ms-3" icon={faHome} size="2x" />
                        </span>
                    </Link>
                    <button className="btn btn-primary" onClick={() => navigate("/pets/")}>Pets</button>
                    <button className="btn btn-primary" onClick={() => navigate("/sitters")}>Sitters</button>
                    <button className="btn btn-primary" onClick={() => navigate("/sitterpets")}>Go sitters&pets</button>
                    <button className="btn btn-danger me-3" onClick={handleLogout}>Logout</button>
                    <Link to="/sitterskills" className="btn btn-primary me-3">SitterSkill's List</Link>
							<Link to="/clients" className="btn btn-primary me-3">Client's List</Link>
							<Link to="/skills" className="btn btn-primary me-3">Skill's List</Link>
							<Link to="/services" className="btn btn-primary me-3">Services's List</Link>
							<Link to="/appointments/sitters" className="btn btn-primary me-3">Appointment Sitter's List</Link>


                </>
                : <h1>logeate</h1>
            }
        </nav>

    )
}

export default NavbarAdmin