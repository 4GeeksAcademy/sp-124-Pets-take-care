import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const LayoutAdmin = () => {

    const navigate = useNavigate()

    useEffect (()=>{
        if(!localStorage.getItem("adminToken")){
            navigate("/welcome")
        }
    })
    console.log("en layout prueba")
    return(
        <>
        <Outlet />
        </>
    )
}