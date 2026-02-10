import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="navbar-brand mb-0 h1">Home</Link>
				<button className="btn btn-primary" onClick={()=>navigate("/sitters")}>Go Sitters</button>
				<button className="btn btn-primary" onClick={()=>navigate("/pets")}>Go Pets</button>
				<button className="btn btn-primary" onClick={()=>navigate("/sitterpets")}>Go sitters&pets</button>
				<div className="ml-auto">
					<Link to="/clients" className="btn btn-primary me-3">Client's List</Link>
					<Link to="/skills" className="btn btn-primary me-3">Skill's List</Link>
					<Link to="/services" className="btn btn-primary me-3">Services's List</Link>
				</div>
				
			</div>
		</nav>
	);
};