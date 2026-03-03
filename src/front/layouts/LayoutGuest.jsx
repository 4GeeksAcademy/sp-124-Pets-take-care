import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const LayoutGuest = () => {

    const navigate = useNavigate()

    useEffect (()=>{
        console.log(localStorage)
        if(localStorage.length>0){
            navigate("/")
        }
    })
    return(
        <>
        <Outlet />
        </>
    )
}