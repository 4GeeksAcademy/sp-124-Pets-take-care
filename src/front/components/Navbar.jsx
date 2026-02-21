import { Link, useNavigate } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";
import NavbarClient from "./Flujo-client/componentesClient/NavbarClient";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();


	const handleLogout = () => {

		localStorage.removeItem("sitterToken");

		dispatch({

			type: "set_auth",
			payload: false

		})

		navigate("/sitters/login")

	}

	const handleLogoutClient = () => {

		localStorage.removeItem("clientToken");

		dispatch({

			type: "set_auth",
			payload: false

		})

		navigate("/clients/login")

	}

	return (
		<>
			{localStorage.getItem("clientToken") ? <NavbarClient /> :
				<nav className="navbar navbar-light bg-light">
					<div className="container">
						<Link to="/">
							<span className="navbar-brand mb-0 h1">Home</span>
						</Link>
						{/* botones publicos */}
						<button className="btn btn-primary" onClick={() => navigate("/sitters")}>Go Sitters</button>


						{/* botones deslogeado */}
						<button className="btn btn-danger" onClick={() => navigate("/sitters/login")}>Go sitters login</button>
						{/* botton crear sitter(signup) */}
						<Link to="/clients/login" className="btn btn-primary me-3">Client's Login</Link>
						{/* botton crear cliente(signup) */}
						<Link to="/admin/login" className="btn btn-primary me-3">Admin's Login</Link>

						{/* botones cliente */}
						<button className="btn btn-primary" onClick={() => navigate("/pets/")}>Go Pets</button>
						{/* botton para ver appointments propios */}
						{/* botton para ver sitters con mas detalles */}
						{/*  */}
						<button className="btn btn-primary" onClick={() => navigate("/pets")}>Go Pets</button>
						<button className="btn btn-primary" onClick={() => navigate("/sitterpets")}>Go sitters&pets</button>
						{store.auth ?
							<button className="btn btn-danger" onClick={handleLogout}>Logout</button>
							: null}
						<button className="btn btn-primary" onClick={() => navigate("/appointments")}>Go appointments</button>

						<div className="ml-auto">
							<Link to="/sitterskills" className="btn btn-primary me-3">SitterSkill's List</Link>
							<Link to="/clients" className="btn btn-primary me-3">Client's List</Link>
							<Link to="/skills" className="btn btn-primary me-3">Skill's List</Link>
							<Link to="/services" className="btn btn-primary me-3">Services's List</Link>
							<Link to="/appointments/sitters" className="btn btn-primary me-3">Appointment Sitter's List</Link>
						</div>

					</div>
				</nav>}
		</>
	);
};