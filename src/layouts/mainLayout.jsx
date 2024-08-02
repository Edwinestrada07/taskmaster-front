import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

function AuthChecker({ children }) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    navigate('/login')
                    return
                }
                setLoading(false)
            } catch (error) {
                console.error('Error al verificar la autenticación:', error)
                navigate('/login')
            }
        };

        checkAuthentication()
    }, [navigate])

    return loading ? <p>Cargando...</p> : children
}

function Layout() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home') // Redirigir a /home cada vez que el usuario ingrese a la raíz (/)
    }, [navigate])

    return (
        <AuthChecker>
            <Navbar />
            <Outlet />
            <Footer />
        </AuthChecker>
    )
}

export default Layout

