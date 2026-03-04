import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";



const ClientList = () => {

    const [client, setClient] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getClients()
    }, [])

    const getClients = () => {
        fetch(BACKEND_URL + "api/clients")
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
            BACKEND_URL + `api/clients/${id}`,
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

    return (

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Clients</h2>
      <button
        className="btn btn-dark"
        onClick={() => navigate("/newclients")}
      >
        + Create Client
      </button>
    </div>
    {client?.length === 0 ? (
      <div className="text-muted">
        No clients found.
      </div>

    ) : (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>

            {client.map(el => (
              <tr key={el.id}>
                <td>{el.name} {el.last_name}</td>
                <td>{el.email}</td>
                <td>{el.phone || "Unavailable"}</td>
                <td>{el.address || "Unavailable"}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigate("/viewclients/" + el.id)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate("/editclients/" + el.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteClients(el.id)}
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
export default ClientList