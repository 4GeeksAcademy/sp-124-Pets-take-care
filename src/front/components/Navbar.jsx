import { Link, useNavigate } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate(); 
	

	const handleLogout = () => { 

		localStorage.removeItem("sitterToken"); 

		dispatch({

			type:"set_auth",
			payload: false 

		})

		navigate ("/sitters/login")

	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<button className="btn btn-primary" onClick={()=>navigate("/sitters")}>Go Sitters</button>
				<button className="btn btn-primary" onClick={()=>navigate("/pets")}>Go Pets</button>
				<button className="btn btn-primary" onClick={()=>navigate("/sitterpets")}>Go sitters&pets</button>
				{store.auth ? 
				 <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
				 : null }
				<div className="ml-auto">
					<Link to="/admin/login" className="btn btn-primary me-3">Admin's Login</Link>
					<Link to="/clients/login" className="btn btn-primary me-3">Client's Login</Link>
					<Link to="/sitterskills" className="btn btn-primary me-3">SitterSkill's List</Link>
					<Link to="/clients" className="btn btn-primary me-3">Client's List</Link>
					<Link to="/skills" className="btn btn-primary me-3">Skill's List</Link>
					<Link to="/services" className="btn btn-primary me-3">Services's List</Link>
				</div>
				
			</div>
		</nav>
	);
};