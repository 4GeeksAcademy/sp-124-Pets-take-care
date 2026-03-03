import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { BACKEND_URL } from "../../../main";
import silueta from "../../../assets/img/silueta.webp"


const SitterProfile = () => {

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
<div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <div className="profile-card p-4 text-center">
        <div className="profile-image-wrapper mb-4">
          <img
            src={silueta}
            alt="Sitter profile"
            className="profile-image"
          />
        </div>
        <h2 className="mb-4">
          {sitter?.name} {sitter.last_name}
        </h2>
        <div className="profile-info text-start mx-auto">
          <p><span className="section-label">Email</span><br />{sitter.email}</p>
          <p><span className="section-label">Phone</span><br />{sitter.phone}</p>
          <p><span className="section-label">Studies</span><br />{sitter.studies ? "Yes" : "No"}</p>
          <p><span className="section-label">Address</span><br />{sitter.address}</p>
        </div>
        <button
          className="btn btn-outline-warm mt-4"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  </div>
);
};



export default SitterProfile