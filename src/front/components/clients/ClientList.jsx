import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../main";



const ClientList = () => {

    const [client, setClient] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getClients()
    }, [])

    const getClients = () => {
        fetch(BACKEND_URL+"api/clients")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data => setClient(data))
            .catch(err => console.log(err))
    }

    const deleteClients = async (id) => {

        const response = await fetch(
            BACKEND_URL+`api/clients/${id}`,
            {
                method: "DELETE"
            }
        )

        if (!response.ok) {
            throw new Error("Error deleting client");
        }

        if (response.ok) {
            alert("Client Deleted")
            getClients()
        }
    }

    console.log(client);

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-end my-3">
                    <Link to="/newclients" className="btn btn-primary">Create Client</Link>
                </div>
                {
                    client?.map(el =>
                        <div className="col-lg-12" key={el.id}>
                            <div className="card flex-row d-flex justify-content-evenly">
                                <div className="card col-lg-3 border-0 py-3">
                                    <img className="rounded-circle w-50 ms-5" src="https://picsum.photos/200" alt="" />
                                </div>
                                <div className="card-body col-lg-6">
                                    <h4 className="card-text">{el.name} {el.last_name}</h4>
                                    <ul className="list-unlisted">
                                        <li className="mb-2"><i className="fa-solid fa-envelope me-2"></i>{el.email}</li>
                                        
                                        <li className="mb-2"><i className="fa-solid fa-phone me-2"></i>{el.phone || "unavailable"}</li>
                                        <li className="mb-2"><i className="fa-solid fa-location-dot me-2"></i>{el.address || "unavailable"}</li>
                                    </ul>
                                </div>
                                <div className="card-footer col-lg-3 border-top-0 bg-transparent">
                                    <div className="d-flex justify-content-end flex-wrap gap-4">
                                        <i onClick={() => navigate("/viewclients/" + el.id)} className="fa-solid fa-info fs-3"></i>
                                        <i onClick={() => { deleteClients(el.id) }} className="fa-regular fa-trash-can fs-3"></i>
                                        <i onClick={() => navigate("/editclients/" + el.id)} className="fa-regular fa-pen-to-square fs-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}
export default ClientList