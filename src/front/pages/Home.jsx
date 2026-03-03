import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import perrosImageUrl from "../assets/img/perros.webp"
import StepsSection from "../components/Home/StepsSection.jsx";

export const Home = () => {

	const navigate = useNavigate();

	const { store, dispatch } = useGlobalReducer()
	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="container-fluid p-0">
			<div className="position-relative px-0 jumbotron">
				<div className="position-relative z-2 h-100">
					<div className="container h-100 d-flex align-items-center">
						<div className="w-50">
							<div>
								<p className="fs-3 m-0">We take care of your pet</p>
								<h3 className="display-2">Sitters for all pets</h3>
								<p>we know your concerns when your are looking for a sitter for yourpet</p>
							</div>
							<button className="btn btn-dark rounded-0 fs-4 mt-4 px-5 py-3">START</button>
						</div>
					</div>
				</div>
				<div className="position-absolute z-1 start-0 end-0 top-0 bottom-0">
					<img src={perrosImageUrl} className="img-fluid h-100 w-100" alt="" />
				</div>
			</div>
			<StepsSection />
		</div>
	);
}; 