import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import hombreyperro from "../../assets/img/hombreyperro.png"
import mujeryperro from "../../assets/img/mujeryperro.png"
import "../../index.css"

const Welcome = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center my-3">
                        <h1>Welcome</h1>
                    </div>
                    <div className="col-12 col-md-6 border rounded shadow p-4 text-center bg-white">
                        <h2 className="my-3">Login as Client</h2>

                        <Link to="/clients/login">
                            <img
                                src={mujeryperro}
                                alt="Ir a iniciar sesión"
                                className="login-image"
                            />
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 border rounded shadow p-4 text-center bg-white">
                        <h2 className="my-3">Login as Sitter</h2>
                        <Link to="/sitters/login">
                            <img src={hombreyperro}
                                alt="Ir a iniciar sesión"
                                className="login-image"/>
                        </Link>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Welcome