import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { BACKEND_URL } from "../../../main";


const SitterProfileForClient = () => {

const { appointmentId, sitterId } = useParams()
const navigate = useNavigate();

const [sitter, setSitter] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await fetch(
          BACKEND_URL +
            `api/appointment/request/${appointmentId}/sitters/${sitterId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("clientToken")}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Could not load sitter");
        }

        const data = await response.json();
        setSitter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSitter();
  }, [appointmentId, sitterId]);

  if (loading) {
    return <div className="container mt-5">Loading sitter profile...</div>;
  }

  if (!sitter) {
    return <div className="container mt-5">Sitter not found.</div>;
  }


    return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">
          {sitter.name} {sitter.last_name}
        </h2>

        <p><strong>Email:</strong> {sitter.email}</p>
        <p><strong>Phone:</strong> {sitter.phone}</p>
        <p><strong>Studies:</strong> {sitter.studies ? "Yes" : "No"}</p>
        <p><strong>Address:</strong> {sitter.address}</p>

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};



export default SitterProfileForClient