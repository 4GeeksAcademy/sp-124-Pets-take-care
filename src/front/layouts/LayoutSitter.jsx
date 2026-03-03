import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const LayoutSitter = () => {

    const navigate = useNavigate()

    useEffect (()=>{
        if(!localStorage.getItem("sitterToken")){
            navigate("/welcome")
        }
    })
    return(
        <>
        <Outlet />
        </>
    )
}