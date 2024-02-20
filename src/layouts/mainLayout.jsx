import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useEffect } from 'react'

function Layout() {
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [navigate])  

    return (
        <>  
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout


//Outlet renderiza todos los childrens que se tengan en el Component 