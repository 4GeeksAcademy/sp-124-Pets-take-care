import { Link, useNavigate } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";
import NavbarClient from "./Navbar/NavbarClient";
import NavbarSitter from "./Navbar/NavbarSitter";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import NavbarPublic from "./Navbar/NavbarPublic";

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
				<nav className="navbar navbar-light bg-light">
					<div className="container">
						{/* <Link to="/">
							<span className="navbar-brand mb-0 h1">Home</span>
						</Link> */}
						{localStorage.getItem("clientToken") && <NavbarClient />}
						{localStorage.getItem("sitterToken") && <NavbarSitter />}
						{localStorage.getItem("adminToken") && <NavbarAdmin />}

						{!localStorage.getItem("clientToken") &&
						  !localStorage.getItem("adminToken") &&
						  !localStorage.getItem("sitterToken") && <NavbarPublic />}

						

						

						<button className="btn btn-danger" onClick={() => navigate("/welcome")}>Login</button>
						<button className="btn btn-danger" onClick={() => navigate("/welcome")}>Sing Up</button>

						
						{/* <button className="btn btn-danger" onClick={() => navigate("/sitters/login")}>Go sitters login</button>
						<Link to="/clients/login" className="btn btn-primary me-3">Client's Login</Link>
						<Link to="/admin/login" className="btn btn-primary me-3">Admin's Login</Link> */}
						{/* <button className="btn btn-primary" onClick={() => navigate("/pets/")}>Go Pets</button> */}
						{/* botton para ver appointments propios */}
						{/* botton para ver sitters con mas detalles */}
						{/* <button className="btn btn-primary" onClick={() => navigate("/pets")}>Go Pets</button> */}
						{/* <button className="btn btn-primary" onClick={() => navigate("/sitterpets")}>Go sitters&pets</button> */}
						{/* {store.auth ?
							<button className="btn btn-danger" onClick={handleLogout}>Logout</button>
							: null}
						<div className="ml-auto">
							<Link to="/sitterskills" className="btn btn-primary me-3">SitterSkill's List</Link>
							<Link to="/clients" className="btn btn-primary me-3">Client's List</Link>
							<Link to="/skills" className="btn btn-primary me-3">Skill's List</Link>
							<Link to="/services" className="btn btn-primary me-3">Services's List</Link>
							<Link to="/appointments/sitters" className="btn btn-primary me-3">Appointment Sitter's List</Link>
						</div> */}
					</div>
				</nav>
		</>
	);
};