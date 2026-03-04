import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";



const Sitters = () => {

    const [sitters, setSitters] = useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        readSitters()

    }, [])


    const readSitters = () => {
        fetch( BACKEND_URL + "api/sitters")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setSitters(data)
            )
            .catch(err => console.log(err))
    }

    const deleteSitter = async (id) => {
  
    const response = await fetch(
      BACKEND_URL +  `api/sitters/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Error deleting sitter");
    }

    if(response.ok) {
        alert("Sitter Deleted")
        window.location.reload();
    }

};

    

    return (

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Sitters</h2>
      <button
        className="btn btn-dark"
        onClick={() => navigate("/sitters/create")}
      >
        + Create Sitter
      </button>
    </div>
    {sitters.length === 0 ? (
      <div className="text-muted">
        No sitters found.
      </div>
    ) : (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sitters.map(el => (
              <tr key={el.id}>
                <td>{el.name} {el.last_name}</td>
                <td>{el.email}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigate(`/sitters/${el.id}`)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/sitters/edit/${el.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteSitter(el.id)}
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
);
}
export default Sitters