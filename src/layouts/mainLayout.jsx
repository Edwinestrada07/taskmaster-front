import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

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
            <Footer />
        </>
    )
}

export default Layout


//Outlet renderiza todos los childrens que se tengan en el Component 