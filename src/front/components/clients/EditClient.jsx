import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
        fetch(`https://curly-space-spork-wrjvvvxxg66qc6jw-3001.app.github.dev/api/clients/${id}`)
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
            const response = await fetch(`https://curly-space-spork-wrjvvvxxg66qc6jw-3001.app.github.dev/api/clients/${id}`,
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
        console.log("ID desde useParams:", id, typeof id);
    };

    // const handleEdit = () => {
    //     alert("Contacto editado correctamente")
    //     navigate("/clients")
    // }

    return (
        <div className="container">
            <h2>Edit Client</h2>
            <form onSubmit={editClient}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={editarName} onChange={e => setEditarName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={editarLastName} onChange={e => setEditarLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" value={editarEmail} onChange={e => setEditarEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={editarPassword} onChange={e => setEditarPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={editarPhone} onChange={e => setEditarPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" value={editarAddress} onChange={e => setEditarAddress(e.target.value)} />
                </div>

                <h5>is_active</h5>
                <div className="container">
                    <input type="radio" id="active-yes" name="active" checked={editarActive === true}
                        onChange={() => setEditarActive(true)} />
                    <label htmlFor="active-yes">Yes</label>
                </div>

                <div className="container">
                    <input type="radio" id="active-no" name="active" checked={editarActive === false}
                        onChange={() => setEditarActive(false)} />
                    <label htmlFor="active-no">No</label>
                </div>
                <button type="submit" className="btn btn-primary">Edit Client</button>
                <Link className="btn btn-primary ms-2" to="/clients">Back</Link>
            </form>
        </div>
    )
}

export default EditClient