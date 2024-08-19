import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTyped as Typed } from 'react-typed';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <section className="relative overflow-hidden py-10 px-4 md:px-8 bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e] transition-colors duration-500 shadow-[0px_1px_5px_1px_rgba(165,_39,_255,_0.48)]">
            <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#7d96d1] to-[#914bb9] blur-2xl opacity-5"></div>
            <div className="relative flex flex-col md:flex-row max-w-6xl mx-auto items-center mb-5">
                <div className="md:w-1/2 text-left">
                    <div className="py-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
                            Bienvenido a TaskMaster
                        </h1>
                        <p className="text-lg font-semibold md:text-xl lg:text-2xl mt-4 text-[#10172A] dark:text-[#e2e8f0]">
                            <Typed
                                strings={[
                                    "Gestiona tus proyectos con facilidad",
                                    "Mantén el control de tus prioridades",
                                    "Simplifica tu vida con TaskMaster"
                                ]}
                                typeSpeed={35}
                                backSpeed={20}
                                loop
                            />
                        </p>
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button
                            className="py-2.5 px-8 text-gray-700 font-semibold bg-white rounded-md duration-150 hover:bg-gray-100 dark:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                            onClick={() => navigate('/task')}
                        >
                            Empezar con la prueba
                        </button>
                        <a
                            href="#learn-more"
                            className="py-2.5 text-decoration-none px-8 text-gray-300 bg-gray-700 rounded-md duration-150 hover:bg-gray-800 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            Leer más <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 md:pl-15 flex justify-center">
                    <img
                        src="./assets/imagen-7.png"
                        alt="Imagen de TaskMaster"
                        className="w-full h-auto dark:shadow-none transition-shadow duration-500 scale-125 mr-24"
                    />
                </div>
            </div>

            <div id="learn-more" className="container mx-auto px-4 py-20">
                <div className="bg-gray-100 dark:bg-gray-900 p-10 rounded-2xl shadow-lg mb-7 mx-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Texto del lado izquierdo */}
                        <div className="flex justify-start">
                            <h2 className="text-3xl font-extrabold mb-4 text-center ml-10 text-gray-900 dark:text-gray-200">
                                Mantén todo bajo control y haz seguimiento de tu <span className='bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent'>PROGRESO.</span>
                            </h2>
                        </div>

                        {/* Texto del lado derecho */}
                        <div className="flex justify-end">
                            <p className="text-xl font-xs mt-10 mr-10 text-gray-600 dark:text-gray-300">
                                Alcanza tus metas con TaskMaster.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección central con dos divs/imágenes */}
                <div className="grid grid-cols-1 md:grid-cols-3 mb-7">
                    {/* Columna izquierda (más pequeña) */}
                    <div className="relative overflow-hidden bg-gray-300 dark:bg-gray-900 rounded-2xl ml-24 shadow-lg">
                        <img
                            src="./assets/imagen-5.png"
                            alt="Imagen 1"
                            className="w-full h-auto scale-150 ml-16 mt-8"
                        />
                        <div className="p-5">
                            <p className="text-xl font-extrabold text-center text-gray-600 dark:text-gray-300">
                                Prioriza lo más importante.
                            </p>
                        </div>
                    </div>


                    {/* Columna derecha (más grande) */}
                    <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-2xl ml-7 mr-24 shadow-lg md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <img
                                src="./assets/imagen-6.png"
                                alt="Imagen 2"
                                className="w-full h-full scale-150 mt-5 ml-2"
                            />
                            <div className="mt-20">
                                <p className="text-xl font-extrabold mt-32 text-center text-gray-600 dark:text-gray-300">
                                    Logra más en menos tiempo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-5">
                    <div className="relative overflow-hidden bg-gray-300 dark:bg-gray-900 rounded-2xl ml-24 mr-7 shadow-lg p-5">
                        <img
                            src="./assets/imagen-6.png"
                            alt="Imagen 1"
                            className="w-full h-auto scale-150 mt-8"
                        />
                    </div>

                    <div className="relative overflow-hidden bg-gray-300 dark:bg-gray-900 rounded-2xl mr-24 shadow-lg p-5">
                        <img
                            src="./assets/imagen-5.png"
                            alt="Imagen 1"
                            className="w-full h-auto scale-150 ml-16 mt-8"
                        />  
                    </div>
                </div>


                {/* Sección inferior con div o imagen grande */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                    <img
                        src="./assets/imagen-8.png"
                        alt="Imagen Grande"
                        className="w-full h-64 object-cover transition-transform duration-500 transform hover:scale-105"
                    />
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-200">Organiza tus tareas de manera efectiva.</h3>
                    </div>
                </div>
            </div>
        </section>  
    );
}

export default Home;
