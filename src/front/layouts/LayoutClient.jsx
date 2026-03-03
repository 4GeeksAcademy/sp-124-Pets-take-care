import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const LayoutClient = () => {

    const navigate = useNavigate()

    useEffect (()=>{
        if(!localStorage.getItem("clientToken")){
            navigate("/welcome")
        }
    })
    return(
        <>
        <Outlet />
        </>
    )
}