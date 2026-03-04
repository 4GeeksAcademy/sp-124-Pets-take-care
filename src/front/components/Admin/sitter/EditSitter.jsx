import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";

const EditSitter = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editarName, setEditarName] = useState("")
    const [editarLastName, setEditarLastName] = useState("")
    const [editarAddress, setEditarAddress] = useState("")
    const [editarPhone, setEditarPhone] = useState("")
    const [editarEmail, setEditarEmail] = useState("")
    const [editarPassword, setEditarPassword] = useState("")
    const [editarStudies, setEditarStudies] = useState(false);
    const [editarStudiesComment, setEditarStudiesComment] = useState("");
    const [editarActive, setEditarActive] = useState(false);

    useEffect(() => {
        fetch(
            BACKEND_URL + `api/sitters/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditarName(data.name || "");
                setEditarLastName(data.last_name || "");
                setEditarEmail(data.email || "");
                setEditarPhone(data.phone || "");
                setEditarAddress(data.address || "");
                setEditarStudies(data.studies ?? false);
                setEditarStudiesComment(data.studies_comment || "");
                setEditarActive(data.is_active ?? false);
            });
    }, [id]);

    const updateSitter = async () => {
        try {
            const response = await fetch(
                BACKEND_URL + `api/sitters/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": editarName,
                        "last_name": editarLastName,
                        "email": editarEmail,
                        "phone": editarPhone,
                        "address": editarAddress,
                        "studies": editarStudies,
                        "studies_comment": editarStudiesComment,
                        "is_active": editarActive
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error updating sitter");
            }

            navigate("/sitters");

        } catch (error) {
            console.error(error);
            alert("Could not update sitter");
        }

    };


    const createName = (e) => {
        setEditarName(e.target.value)
    }
    const createLastName = (e) => {
        setEditarLastName(e.target.value)
    }
    const createEmail = (e) => {
        setEditarEmail(e.target.value)
    }
    const createPassword = (e) => {
        setEditarPassword(e.target.value)
    }
    const createPhone = (e) => {
        setEditarPhone(e.target.value)
    }

    const createStudiesComment = (e) => {
        setEditarStudiesComment(e.target.value)

    }
    const createAddress = (e) => {
        setEditarAddress(e.target.value)
    }



    return (

  <div>

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Edit Sitter</h2>

      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigate("/sitters")}
      >
        ← Back
      </button>
    </div>

    <div className="card shadow-sm">
      <div className="card-body">

        <form>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={editarName}
              onChange={createName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={editarLastName}
              onChange={createLastName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={editarEmail}
              onChange={createEmail}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={editarPassword}
              onChange={createPassword}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={editarPhone}
              onChange={createPhone}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={editarAddress}
              onChange={createAddress}
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Studies</label>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarStudies === true}
                onChange={() => setEditarStudies(true)}
              />
              <label className="form-check-label">Yes</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                checked={editarStudies === false}
                onChange={() => setEditarStudies(false)}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
          {editarStudies && (
            <div className="mb-3">
              <label className="form-label">Studies Comment</label>
              <input
                type="text"
                className="form-control"
                value={editarStudiesComment}
                onChange={createStudiesComment}
              />
            </div>
          )}

        
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
              type="button"
              className="btn btn-dark w-100"
              onClick={updateSitter}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={() => navigate("/sitters")}
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

export default EditSitter