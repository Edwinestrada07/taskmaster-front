import React from 'react'
import { useLocation } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaPortrait } from "react-icons/fa"

const Footer = () => {
    const location = useLocation();

    // Oculta el footer si la ruta actual es "/task"
    if (location.pathname === '/task') {
        return null;
    }

    const socialInfo = [
        {
            icon: <FaLinkedin className="w-8 h-8" />,
            href: "https://www.linkedin.com/in/edwinestradam/"
        },
        {
            icon: <FaGithub className="w-8 h-8" />,
            href: "https://github.com/Edwinestrada07"
        },
        {
            icon: <FaPortrait className="w-8 h-8" />,
            href: "https://portafolioedwinestrada.netlify.app/"
        }
    ]

    return (
        <footer className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="justify-between sm:flex">
                    <div className="space-y-6">
                        <img
                            src="./assets/logo.jpg"
                            alt="Logo_T4skMaster"
                            className="w-20 sm:mx-auto rounded-full shadow-xl"
                        />
                    </div>
                    <div className="mt-6">
                        {/* iconos redes */}
                        <div className="flex items-center justify-center gap-x-3 text-gray-600 text-3xl mt-6 ">
                            {
                                socialInfo.map((item, idx) => (
                                    <a key={idx} href={item.href} aria-label="social media" target="_blank" rel="noreferrer">
                                        {item.icon}
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-10 py-10 border-t md:text-center">
                    <p className="text-gray-600 text-center">© 2024 Edwin Estrada. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;


