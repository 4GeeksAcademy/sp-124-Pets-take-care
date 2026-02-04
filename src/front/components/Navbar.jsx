import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<button className="btn btn-primary" onClick={()=>navigate("/")}>Go Home</button>
				<button className="btn btn-primary" onClick={()=>navigate("/sitters")}>Go Sitters</button>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};