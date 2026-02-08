import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../main";



const ServiceList = () => {

    const [service, setService] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getServices()
    }, [])

    const getServices = () => {
        fetch(BACKEND_URL+"api/services")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data => setService(data))
            .catch(err => console.log(err))
    }

    const deleteServices = async (id) => {

        const response = await fetch(
            BACKEND_URL+`api/services/${id}`,
            {
                method: "DELETE"
            }
        )

        if (!response.ok) {
            throw new Error("Error deleting service");
        }

        if (response.ok) {
            alert("Service Deleted")
            getServices()
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-end my-3">
                    <Link to="/newservices" className="btn btn-primary">Create Service</Link>
                </div>
                {
                    service?.map(el =>
                        <div className="col-lg-12" key={el.id}>
                            <div className="card flex-row d-flex justify-content-evenly">
                                <div className="card col-lg-3 border-0 py-3">
                                    <img className="rounded-circle w-50 ms-5" src="https://picsum.photos/200" alt="" />
                                </div>
                                <div className="card-body col-lg-6">
                                    <h4 className="card-text">{el.service_name}</h4>
                                    <ul className="list-unlisted">
                                        <li className="mb-2"><i className="fa-solid fa-clock me-2"></i>{el.duration_minutes}</li>
                                        <li className="mb-2"><i className="fa-solid fa-money-bill me-2"></i>{el.cost}</li>
                                    </ul>
                                </div>
                                <div className="card-footer col-lg-3 border-top-0 bg-transparent">
                                    <div className="d-flex justify-content-end flex-wrap gap-4">
                                        <i onClick={() => navigate("/viewservices/" + el.id)} className="fa-solid fa-info fs-3"></i>
                                        <i onClick={() => { deleteServices(el.id) }} className="fa-regular fa-trash-can fs-3"></i>
                                        <i onClick={() => navigate("/editservices/" + el.id)} className="fa-regular fa-pen-to-square fs-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}
export default ServiceList