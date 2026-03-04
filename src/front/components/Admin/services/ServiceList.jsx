import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";



const ServiceList = () => {

    const [service, setService] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getServices()
    }, [])

    const getServices = () => {
        fetch(BACKEND_URL + "api/services")
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
            BACKEND_URL + `api/services/${id}`,
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

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Services</h2>
      <button
        className="btn btn-dark"
        onClick={() => navigate("/newservices")}
      >
        + Create Service
      </button>
    </div>
    {service?.length === 0 ? (
      <div className="text-muted">
        No services available.
      </div>
    ) : (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Service Name</th>
              <th>Duration (min)</th>
              <th>Cost</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {service?.map(el => (
              <tr key={el.id}>
                <td>{el.service_name}</td>
                <td>{el.duration_minutes}</td>
                <td>${el.cost}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigate("/viewservices/" + el.id)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate("/editservices/" + el.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteServices(el.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)
}
export default ServiceList