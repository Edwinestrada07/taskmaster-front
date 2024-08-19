import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTyped as Typed } from 'react-typed'

function Start() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <section className="relative overflow-hidden px-4 md:px-8 bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e] transition-colors duration-500 shadow-[0px_1px_2px_1px_rgba(165,_39,_255,_0.48)]">
            <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#7d96d1] to-[#914bb9] blur-2xl opacity-5"></div>
            <div className="items-center px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
                <div className="justify-center w-full text-center lg:p-5 max-auto">
                    <div className="justify-center w-full mx-auto">
                        <div className="flex flex-col p-2 items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
                            <img
                                className="w-28 h-28 rounded-full shadow hover:shadow-lg"
                                src='./assets/logo.jpg'
                                alt='TaskMaster Logo'
                            />
                        </div>

                        <h1 className="p-2 text-4xl font-extrabold mx-auto md:text-5xl text-[#10172A] dark:text-[#e2e8f0]">
                            <Typed
                                strings={["TaskMaster"]}
                                className="underline leading-8 underline-offset-8 decoration-8 decoration-[#8B5CF6]"
                                typeSpeed={160}
                                backSpeed={130}
                                loop
                            />
                        </h1>

                        <p className="mt-3 text-3xl font-extrabold mx-auto md:text-5xl text-[#1e2538] dark:text-[#e2e8f0]">
                            Es tu aliado perfecto para organizar tus tareas diarias.
                        </p>

                        {/* Sección inferior con div o imagen grande */}
                        <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-3xl shadow-lg mt-12 border-2 border-purple-500 animate-pulse-border">
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Destellos en forma de brillos */}
                                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                                <div className="absolute top-3/4 left-3/4 w-40 h-40 bg-purple-300 opacity-30 rounded-full filter blur-xl animate-pulse"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-300 opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                                <div className="absolute bottom-3/4 right-3/4 w-40 h-40 bg-blue-300 opacity-25 rounded-full filter blur-xl animate-pulse"></div>
                            </div>
                            <img
                                src="./assets/imagen-8.png"
                                alt="Imagen Grande"
                                className="w-full h-auto object-cover transition-transform duration-500 transform hover:scale-105"
                            />
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">Organiza tus tareas de manera efectiva.</h3>
                            </div>
                        </div>

                        <p className="mt-10 mb-10 max-w-2xl font-semibold mx-auto text-gray-600 dark:text-[#e2e8f0]">
                            TaskMaster transforma tu manera de gestionar tus tareas, haciéndolo todo más simple y eficiente. ¡Empieza ahora y alcanza tus metas con facilidad!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Start;
