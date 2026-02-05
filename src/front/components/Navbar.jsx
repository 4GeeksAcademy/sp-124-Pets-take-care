import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<button className="btn btn-primary" onClick={()=>navigate("/")}>Go Home</button>
				<button className="btn btn-primary" onClick={()=>navigate("/sitters")}>Go Sitters</button>
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