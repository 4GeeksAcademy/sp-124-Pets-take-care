import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";


const InfoSitter = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [sitter, setSitter] = useState(null)

    useEffect(() => {

        readSitter()

    }, [id])

    
    const readSitter = () => {
        fetch(
            BACKEND_URL + `api/sitters/${id}`
        )
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>
                setSitter(data)
            )
            .catch(err => console.log(err))

            
    }
    if (!sitter) {
        return <p>Loading sitter...</p>;}
        
    return (

  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Sitter Details</h2>
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
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Name</strong>
            <div>{sitter.name}</div>
          </div>

          <div className="col-md-6">
            <strong>Last Name</strong>
            <div>{sitter.last_name}</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Email</strong>
            <div>{sitter.email}</div>
          </div>
          <div className="col-md-6">
            <strong>Phone</strong>
            <div>{sitter.phone}</div>
          </div>
        </div>
        <div className="mb-3">
          <strong>Address</strong>
          <div>{sitter.address}</div>
        </div>

        <hr />
        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Studies</strong>
            <div>{sitter.studies ? "Yes" : "No"}</div>
          </div>
          <div className="col-md-4">
            <strong>Active</strong>
            <div>{sitter.is_active ? "Yes" : "No"}</div>
          </div>
        </div>
        {sitter.studies && (
          <div className="mt-3">
            <strong>Studies Comment</strong>
            <div>{sitter.studies_comment}</div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default InfoSitter
