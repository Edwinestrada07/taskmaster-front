import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

// AuthChecker se asegura de que las rutas protegidas solo sean accesibles para usuarios autenticados
function AuthChecker({ children }) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirige a la página de login si no está autenticado
                    return;
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al verificar la autenticación:', error);
                navigate('/home'); // Redirige a la página de login en caso de error
            }
        };

        checkAuthentication();
    }, [navigate]);

    // Muestra un mensaje de carga mientras se verifica la autenticación
    return loading ? <p>Cargando...</p> : children;
}

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/home'); // Redirige a /home solo cuando la ruta es exactamente /
        }
    }, [navigate, location.pathname]);

    return (
        <>
            <AuthChecker>
                <Navbar />
                <Outlet />
                <Footer />
            </AuthChecker>
        </>
    );
}

export default Layout

