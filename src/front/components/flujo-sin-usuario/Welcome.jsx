import { useNavigate } from "react-router-dom"


const Welcome = () => {

    const navigate = useNavigate()

    return(
        <>
        <div className="container d-flex flex-column align-items-center my-5">
            <h1>Welcome</h1>
            <p>What are you?</p>
            <div className="d-flex">
                <button className="btn btn-primary me-4" onClick={()=>navigate("/clients/login")}>Client</button>
                <button className="btn btn-primary" onClick={()=>navigate("/sitters/login")}>Sitter</button>
            </div>
        </div>
        </>
    )
}

export default Welcome