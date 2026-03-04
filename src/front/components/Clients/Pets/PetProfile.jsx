import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import iguana from "../../../assets/img/iguana.jpg"; 


const PetProfile = () => { 


    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null); 


    useEffect(()=>{ 

        readProfile() 

    },[id])

    
    const readProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}api/clients/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Error reading pet");
        }

        const data = await response.json();
        setPet(data);
        
      } catch (err) {
        console.error(err);
      }
    };
    
    if (!pet) {
      return <div className="container mt-5">Loading pet...</div>;
    }
    const species = pet.species?.trim().toLowerCase();
    
    const petImages = {
    cat: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800",
    dog: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800",
    exotic: iguana
  };
  const imageUrl = petImages[species] || petImages["dog"];
    return (
  <div className="container my-5">

    <div className="appointments-section p-4 p-md-5">

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="profile-card">
            <div className="pet-profile-image-wrapper">
              <img src={imageUrl} alt="pet" />
            </div>

            <div className="p-4">

              <h2 className="mb-4 text-center">
                {pet.name}
              </h2>

              <div className="mb-3">
                <span className="section-label">Species</span>
                <p className="mb-0">{pet.species}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Breed</span>
                <p className="mb-0">{pet.breed}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Gender</span>
                <p className="mb-0">{pet.gender}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Color</span>
                <p className="mb-0">{pet.color}</p>
              </div>

              <div className="mb-3">
                <span className="section-label">Sterilized</span>
                <p className="mb-0">
                  {pet.sterelized ? "Yes" : "No"}
                </p>
              </div>

              <div className="mb-4">
                <span className="section-label">About</span>
                <p className="mb-0">{pet.about_pet}</p>
              </div>

              <button
                className="btn btn-outline-warm w-100"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

            </div>

          </div>

        </div>
      </div>

    </div>

  </div>
);
}

export default PetProfile