import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
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