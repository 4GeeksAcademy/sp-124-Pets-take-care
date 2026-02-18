import React from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";

const ClientHome = () => {

    const { store, dispatch } = useGlobalReducer();




    console.log(store.auth)

    return (
        <div className="container ">
            <h1 className="text-center">HOLA CLIENT</h1>
            <div className="container">
            </div>
        </div>
    )
}

export default ClientHome