import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



const Sitters = () => {

    const [sitters, setSitters] = useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        readSitters()

    }, [])


    const readSitters = () => {
        fetch("https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/sitters")
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
      `https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/sitters/${id}`,
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

    //cuando me respodmna ok, hacer segundo paso 
};

    

    return (
        <div className="container">
            <h1>Get Sitter</h1>
            {sitters.map(el => (
                <div
                    key={el.id}
                    className="container border p-2 bg-secondary-subtle d-flex justify-content-between align-items-center">
                    <span>{el.name}</span>
                    <div>
                    <button className="btn btn-primary" onClick={() => navigate(`/sitters/${el.id}`)}>info
                    </button>
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/sitters/edit/${el.id}`)}>Edit
                    </button>
                    <button className="btn btn-danger ms-2"  onClick={() => deleteSitter(el.id)}>Delete
                    </button>
                    </div>
                </div>
            ))}
            <div className="container">
                <button className="btn btn-primary mt-5" onClick={() => navigate("/sitters/create")}>Go Create Sitter</button>
            </div>
        </div>

    )
}
export default Sitters