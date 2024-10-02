import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation();

    // Oculta el footer si la ruta actual es "/task"
    if (location.pathname === '/task') {
        return null;
    }

    return (
        <footer className="bg-gray-800 dark:bg-gray-800 text-white dark:text-gray-100 md:bg-transparent">
            <div className="container p-4 flex flex-col lg:flex-row justify-between items-center">
                <h5 className="text-lg mb-4 lg:mb-0">© 2024 Todos los derechos reservados</h5>
                <ul className="list-inline flex space-x-4 mb-4 h-8 w-8">
                    <li className="list-inline-item">
                        <a href="https://github.com/Edwinestrada07" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;


