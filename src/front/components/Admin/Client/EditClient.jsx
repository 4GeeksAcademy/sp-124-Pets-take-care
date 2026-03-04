import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const EditClient = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editarName, setEditarName] = useState("")
    const [editarLastName, setEditarLastName] = useState("")
    const [editarEmail, setEditarEmail] = useState("")
    const [editarPassword, setEditarPassword] = useState("")
    const [editarPhone, setEditarPhone] = useState("")
    const [editarAddress, setEditarAddress] = useState("")
    const [editarActive, setEditarActive] = useState(false);

    useEffect(() => {
        fetch(BACKEND_URL + `api/clients/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditarName(data.name);
                setEditarLastName(data.last_name);
                setEditarEmail(data.email);
                setEditarPhone(data.phone);
                setEditarAddress(data.address);
                setEditarActive(data.is_active);
            });
    }, [id]);

    const editClient = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(BACKEND_URL + `api/clients/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": editarName,
                        "last_name": editarLastName,
                        "email": editarEmail,
                        "password": editarPassword,
                        "phone": editarPhone,
                        "address": editarAddress,
                        "is_active": editarActive
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error updating client");
            }

            navigate("/clients");

        } catch (error) {
            console.error(error);
            alert("Could not update client");
        }
    };

    

    return (

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Edit Client</h2>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/clients")}
      >
        ← Back
      </button>
    </div>
    <div className="card shadow-sm">
      <div className="card-body">
        <form onSubmit={editClient}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={editarName}
              onChange={e => setEditarName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={editarLastName}
              onChange={e => setEditarLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={editarEmail}
              onChange={e => setEditarEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={editarPassword}
              onChange={e => setEditarPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={editarPhone}
              onChange={e => setEditarPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={editarAddress}
              onChange={e => setEditarAddress(e.target.value)}
              required
            />
          </div>

       
          <div className="mb-4">
            <label className="form-label d-block">Active</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarActive === true}
                onChange={() => setEditarActive(true)}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarActive === false}
                onChange={() => setEditarActive(false)}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
          <div className="d-flex gap-3">
            <button
              type="submit"
              className="btn btn-dark w-100"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={() => navigate("/clients")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

)
}

export default EditClient