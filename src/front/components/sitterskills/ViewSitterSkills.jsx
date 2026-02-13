// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { BACKEND_URL } from "../../main";


// const ViewSitterSkills = () => {

//     const { id } = useParams();
//     const [sitterInfo, setSitterInfo] = useState(null)

//     useEffect(() => {

//         getSitterSkills()

//     }, [id])

//     const getSitterSkills = () => {
//         fetch(
//             BACKEND_URL+`api/sitters/${id}/skills`
//         )
//             .then(resp => {
//                 if (!resp.ok) {
//                     throw new Error("something went wrong")
//                 }
//                 return resp.json()
//             })

//             .then(data =>
//                 setSitterInfo(data)
//             )
//             .catch(err => console.log(err))
//     }

//     if (!sitterInfo) {
//         return <p>Loading service...</p>;
//     }

//     return (

//         <div className="container">
//             <h1>Service detail</h1>

//             <p><strong>Name:</strong> {sitterInfo.sitter_name}</p>
//             <p><strong>Duration:</strong> {sitterInfo.skills}</p>
//         </div>
//     );
// }

// export default ViewSitterSkills