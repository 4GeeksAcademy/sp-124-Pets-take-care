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
				<div className="ml-auto">
					<Link to="/clients">
						<button className="btn btn-primary me-3">Client's List</button>
					</Link>
					<Link to="/newclients">
						<button className="btn btn-primary">Create Client</button>
					</Link>
				</div>
				
			</div>
		</nav>
	);
};