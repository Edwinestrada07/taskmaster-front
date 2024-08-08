import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// AuthChecker se asegura de que las rutas protegidas solo sean accesibles para usuarios autenticados
function AuthChecker({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false); // Permitir acceso a la página de inicio
                    return;
                }
                setLoading(false);
                navigate('/home'); // Redirige a /home si el usuario está autenticado
            } catch (error) {
                console.error('Error al verificar la autenticación:', error);
                navigate('/login'); // Redirige a la página de login en caso de error
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
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/start'); // Redirige a /start solo cuando la ruta es exactamente / y no hay token
            } else {
                navigate('/home'); // Redirige a /home si ya está autenticado
            }
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

export default Layout;

