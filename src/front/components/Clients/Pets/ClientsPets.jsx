import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCross, faHeartCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

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
        <div className="container">
            <div className="row">
                {pets.map(el => (
                    <div className="col-4" key={el.id}>
                        <div className="card shadow mt-4" style={{ width: "18rem" }}>
                            <img src={el.species == "Cat" ? "https://imgs.search.brave.com/m16ZiABxPzlzT1GkCukGYkClKbNyBzTV0IM2qWlpdU8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNC8w/NC8xMy8yMC80OS9j/YXQtMzIzMjYyXzY0/MC5qcGc"
                                : "https://imgs.search.brave.com/nCFECc9LfBs-fIH7mFGwV59rdZcUqAQ-gNzKLYAhdZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZHpvb20ub3JnLmVz/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L2ZvdG9zLW1h/c2NvdGFzLWFuaW1h/bC1wZXJyby1jb25z/ZWpvcy1mb3RvZ3Jh/ZmlhLWVuZm9jYXIt/b2pvcy1taXJhZGEt/cGVycm8tNzM0eDQ4/OS5qcGc"}
                                className="card-img-top" alt="pets" />
                            <div className="card-body  container">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="card-text mb-2 text-center">
                                            {el.name}
                                        </h3>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn" onClick={() => navigate(`/clients/pets/edit/${el.id}`)}>
                                            <span className="fa-regular fa-pen-to-square fs-3"></span>
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn"
                                            onClick={() => navigate(`/clients/pets/profile/${el.id}`)} >
                                            <FontAwesomeIcon
                                                icon={faBookOpen}
                                                size="2x"
                                            />
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn"
                                            onClick={() => deletePet(el.id)} >
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                size="2x"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="container">
                    <button className="btn btn-primary mt-5"
                        onClick={() => navigate("/clients/pets/newpet")}>
                        Add a new pet🐾
                    </button>
                </div>
            </div>


        </div>
    )
}

export default ClientsPets