import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCross, faHeartCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import iguana from "../../../assets/img/iguana.jpg"

const ClientsPets = () => {

  const [pets, setPets] = useState([])


  const navigate = useNavigate()

  useEffect(() => {

    readPets()

  }, [])


  const readPets = () => {
    fetch(BACKEND_URL + "api/clients/pets", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("something went wrong")
        }
        return response.json()
      })

      .then(data =>
        setPets(data)
      )
      .catch(err => console.log(err))
  }

  const deletePet = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        BACKEND_URL + `api/clients/pets/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting pet");
      }


      setPets(prev => prev.filter(pet => pet.id !== id));

      Swal.fire({
        title: "deleted",
        text: "pet deleted.",
        icon: "success"
      });

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "couldn't delete.",
        icon: "error"
      });
    }
  };



  return (
    <div className="container my-5">

      <div className="appointments-section p-4 p-md-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">My Pets</h1>

          <button
            className="btn btn-warm"
            onClick={() => navigate("/clients/pets/newpet")}
          >
            Add New Pet 🐾
          </button>
        </div>

        <div className="row">

          {pets.length === 0 ? (

            <div className="col-12">
              <div className="empty-state text-center py-5">
                <h4 className="mb-3">No pets yet 🐾</h4>
                <p className="mb-4">
                  Add your first pet to start booking services.
                </p>

                <button
                  className="btn btn-warm"
                  onClick={() => navigate("/clients/pets/newpet")}
                >
                  Add Your First Pet
                </button>
              </div>
            </div>

          ) : (

            pets.map(el => {

              const species = el.species?.toLowerCase();

              const imageUrl =
                species === "cat"
                  ? "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800"
                  : species === "dog"
                    ? "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800"
                    : species === "exotic"
                      ? iguana
                      : "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=800";

              return (
                <div key={el.id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="pet-card h-100">
                    <div className="pet-image-wrapper">
                      <img
                        src={imageUrl}
                        alt="pet"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h4 className="mb-4">{el.name}</h4>
                      <div className="d-flex justify-content-center gap-3">
                        <button
                          className="icon-btn"
                          onClick={() => navigate(`/clients/pets/edit/${el.id}`)}
                        >
                          <span className="fa-regular fa-pen-to-square"></span>
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() => navigate(`/clients/pets/profile/${el.id}`)}
                        >
                          <FontAwesomeIcon icon={faBookOpen} />
                        </button>

                        <button
                          className="icon-btn danger"
                          onClick={() => deletePet(el.id)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientsPets