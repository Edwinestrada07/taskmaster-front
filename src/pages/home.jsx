import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si el usuario está autenticado
        if (!localStorage.getItem('token')) {
            // Redirige al login si no está autenticado
            navigate('/login');
        } else {
            setLoggedIn(true);
        }
    }, [navigate]);

    return (
        <div className="dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Bienvenido a TaskMaster
            </h1>
            <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-12">
                Una aplicación diseñada para ayudarte a organizar tus tareas diarias de manera eficiente.
            </p>
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Funcionalidades:
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Agregar nuevas tareas con detalles como descripción, fecha de vencimiento, prioridad y estado.</li>
                    <li>Editar y actualizar información de tareas existentes.</li>
                    <li>Marcar tareas como completadas.</li>
                    <li>Organizar tareas por diferentes criterios como fecha, prioridad, etc.</li>
                    <li>Eliminar tareas que ya no son necesarias.</li>
                    <li>Recordatorios y notificaciones para tareas próximas a la fecha de vencimiento.</li>
                    <li>Interfaz intuitiva y fácil de usar.</li>
                </ul>
                <div className="mt-8">
                    <Carousel showThumbs={false} autoPlay infiniteLoop>
                        <div>
                            <img src="image1.jpg" alt="Imagen 1" />
                        </div>
                        <div>
                            <img src="image2.jpg" alt="Imagen 2" />
                        </div>
                        <div>
                            <img src="image3.jpg" alt="Imagen 3" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Home;



