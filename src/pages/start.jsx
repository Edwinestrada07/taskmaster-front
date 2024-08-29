import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTyped as Typed } from 'react-typed'

function Start() {
    const navigate = useNavigate();

    // Redirecciona al usuario a la página de inicio si no está autenticado
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/start');
        }
    }, [navigate]);

    return (
        <section className="relative overflow-hidden px-4 md:px-8 bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e] transition-colors duration-500 shadow-md">
            {/* Fondo decorativo con blur */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#7d96d1] to-[#914bb9] blur-2xl opacity-10"></div>

            <div className="flex flex-col items-center px-4 mx-auto max-w-6xl lg:px-12 md:px-8">
                {/* Logo e imagen de bienvenida */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        className="w-24 h-24 rounded-full shadow-lg mt-3"
                        src='./assets/logo.jpg'
                        alt='TaskMaster Logo'
                    />
                    <h1 className="text-4xl font-extrabold text-center text-[#10172A] dark:text-[#e2e8f0] md:text-5xl">
                        <Typed
                            strings={["TaskMaster"]}
                            className="underline leading-tight underline-offset-8 decoration-8 decoration-[#8B5CF6]"
                            typeSpeed={100}
                            backSpeed={80}
                            loop
                        />
                    </h1>
                    <p className="mt-3 text-2xl font-extrabold text-center text-[#1e2538] dark:text-[#e2e8f0] md:text-2xl">
                        Tu aliado perfecto para organizar tus tareas diarias.
                    </p>
                </div>

                {/* Sección decorativa con imagen */}
                <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-3xl shadow-lg mt-12 border-1 border-purple-500 animate-pulse-border">
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Destellos de brillo animados */}
                        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-purple-300 opacity-30 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-300 opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute bottom-3/4 right-3/4 w-32 h-32 bg-blue-300 opacity-25 rounded-full filter blur-xl animate-pulse"></div>
                    </div>
                    <div className='flex-1 text-center mt-7 lg:mt-0 lg:ml-3'>
                        <img
                            src="./assets/imagen-8.png"
                            alt="Imagen Grande"
                            className="w-full h-auto object-cover transition-transform duration-500 transform hover:scale-105"
                        />
                    </div>
                    <div className="p-8">
                        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-200 md:text-2xl">
                            Organiza tus tareas de manera efectiva.
                        </h3>
                    </div>
                </div>

                <p className="mt-10 mb-10 text-lg font-semibold text-center text-gray-600 max-w-xl dark:text-[#e2e8f0] md:text-xl">
                    TaskMaster transforma tu manera de gestionar tus tareas, haciéndolo todo más simple y eficiente. ¡Empieza ahora y alcanza tus metas con facilidad!
                </p>
            </div>
        </section>
    );
}

export default Start;
