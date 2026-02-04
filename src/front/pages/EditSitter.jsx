import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditSitter = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [editarName, setEditarName] = useState("")
    const [editarLastName, setEditarLastName] = useState("")
    const [editarAddress, setEditarAddress] = useState("")
    const [editarPhone, setEditarPhone] = useState("")
    const [editarEmail, setEditarEmail] = useState("")
    const [editarPassword, setEditarPassword] = useState("")
    const [editarConfirmPassword, setEditarConfirmPassword] = useState("")
    const [editarStudies, setEditarStudies] = useState(false);
    const [editarStudiesComment, setEditarStudiesComment] = useState("");
    const [editarActive, setEditarActive] = useState(false);

    useEffect(() => {
        fetch(`https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/sitters/${id}`)
            .then(res => res.json())
            .then(data => {
                setEditarName(data.name);
                setEditarLastName(data.last_name);
                setEditarEmail(data.email);
                setEditarPhone(data.phone);
                setEditarAddress(data.address);
                setEditarStudies(data.studies);
                setEditarStudiesComment(data.studies_comment);
                setEditarActive(data.is_active);
            });
    }, [id]);

    const updateSitter = async () => {
        try {
            const response = await fetch(`https://fluffy-enigma-7vxq7xrwxw552p976-3001.app.github.dev/api/sitters/${id}`,
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
        console.log("ID desde useParams:", id, typeof id);
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
    const createConfirmPassword = (e) => {
        setEditarConfirmPassword(e.target.value)
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
        <div className="container">
            <h1>Edit Sitter</h1>
            <form>
                <div className="container">
                    <input type="text" placeholder="name" onChange={createName} value={editarName} />
                </div>
                <div className="container">
                    <input type="text" placeholder="last name" onChange={createLastName} value={editarLastName} />
                </div>
                <div className="container">
                    <input type="text" placeholder="email" onChange={createEmail} value={editarEmail} />
                </div>
                <div className="container">
                    <input type="text" placeholder="password" onChange={createPassword} value={editarPassword} />
                </div>
                <div className="container">
                    <input type="text" placeholder="confirm_password" onChange={createConfirmPassword} value={editarConfirmPassword} />
                </div>
                <div className="container">
                    <input type="text" placeholder="phone" onChange={createPhone} value={editarPhone} />
                </div>
                <h5>studies</h5>
                <div className="container">
                    <input type="radio" id="studies-yes" name="studies" checked={editarStudies === true}
                        onChange={() => setEditarStudies(true)} />
                    <label htmlFor="studies-yes">Yes</label>
                </div>

                <div className="container">
                    <input type="radio" id="studies-no" name="studies" checked={editarStudies === false}
                        onChange={() => setEditarStudies(false)} />
                    <label htmlFor="studies-no">No</label>
                </div>
                <div className="container">
                    <input type="text" placeholder="studies_comment" onChange={createStudiesComment} value={editarStudiesComment} />
                </div>
                <div className="container">
                    <input type="text" placeholder="address" onChange={createAddress} value={editarAddress} />
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
            </form>
            <button type="button" className="btn btn-success me-5 mt-5" onClick={updateSitter}>Save changes</button>
            <button type="button" className="btn btn-primary mt-5" onClick={() => navigate("/sitters")}>go back</button>
        </div>
    )
}

export default EditSitter