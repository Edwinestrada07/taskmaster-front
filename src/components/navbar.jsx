import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Estilo del modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#1a202c',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        border: 'none',
    },
};

Modal.setAppElement('#root');

function Navbar() {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Verifica el estado de autenticación del usuario
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        setModalIsOpen(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/home');
        setModalIsOpen(false);
    };

    // Alterna el estado del menú colapsable
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <>
            <nav className="bg-gray-800 text-white p-3">
                <div className="mx-auto flex items-center justify-between">
                    <Link className="text-white text-lg font-bold" to='/home'>
                        Inicio
                    </Link>

                    <div className="hidden lg:flex lg:items-center lg:space-x-4">
                        {isLoggedIn ? (
                            <>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/task'
                                >
                                    Tareas
                                </NavLink>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/profile'
                                >
                                    Perfil
                                </NavLink>
                                <button
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/login'
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/signup'
                                >
                                    Signup
                                </NavLink>
                            </>
                        )}
                    </div>

                    <button 
                        className="lg:hidden text-white focus:outline-none" 
                        onClick={toggleOptions}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <div className={`lg:hidden transition-transform duration-300 ease-in-out ${showOptions ? 'flex' : 'hidden'} justify-center`}>
                    <div className="flex flex-row space-x-4">
                        {isLoggedIn ? (
                            <>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/task'
                                    onClick={() => setShowOptions(false)}
                                >
                                    Tareas
                                </NavLink>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/profile'
                                    onClick={() => setShowOptions(false)}
                                >
                                    Perfil
                                </NavLink>
                                <button
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                                    onClick={() => {
                                        handleLogout();
                                        setShowOptions(false);
                                    }}
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/login'
                                    onClick={() => setShowOptions(false)}
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" 
                                    to='/signup'
                                    onClick={() => setShowOptions(false)}
                                >
                                    Signup
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Confirm Logout"
            >
                <h2 className="text-lg mb-4">Confirmar Cierre de Sesión</h2>
                <p>¿Estás seguro de que quieres cerrar sesión?</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <button 
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={confirmLogout}
                    >
                        Sí
                    </button>
                    <button 
                        className="bg-gray-600 text-white px-4 py-2 rounded-md"
                        onClick={() => setModalIsOpen(false)}
                    >
                        No
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default Navbar;









