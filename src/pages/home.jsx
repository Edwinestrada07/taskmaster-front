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
        <section className="relative overflow-hidden py-10 px-4 md:px-8 bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#0f172a] dark:via-[#311065] dark:to-[#0f172a] transition-colors duration-500 shadow-[0px_2px_25px_1px_rgba(165,_39,_255,_0.48)]">
            <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 blur-2xl opacity-10"></div>
            <div className="relative flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                <div className="md:w-1/2 text-left">
                    <div className="py-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent ">
                            Bienvenido a TaskMaster
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl mt-4 text-[#10172A] dark:text-[#e2e8f0]">
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
                            className="py-2.5 px-8 text-gray-700 bg-white rounded-md duration-150 hover:bg-gray-100 dark:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
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
                        className="w-full h-auto dark:shadow-none transition-shadow duration-500"
                    />
                </div>
            </div>


            <div className="container mx-auto px-4 py-16">
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Texto del lado izquierdo */}
                        <div className="flex justify-start">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-200">
                                Mantén todo bajo control y haz seguimiento de tu progreso.
                            </h2>
                        </div>

                        {/* Texto del lado derecho */}
                        <div className="flex justify-end">
                            <p className="text-xl font-xs mb-4 text-gray-400 dark:text-gray-100">
                                Alcanza tus metas con TaskMaster.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección central con dos divs/imágenes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Columna izquierda (más pequeña) */}
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg md:col-span-1">
                        <img
                            src="./assets/imagen-5.png"
                            alt="Imagen 1"
                            className="w-full h-64 object-cover transition-transform duration-500 transform hover:scale-105"
                        />
                        <div className="p-8">
                            <p className="text-gray-600 dark:text-gray-400 text-left">
                                Prioriza lo más importante.
                            </p>
                        </div>
                    </div>

                    {/* Columna derecha (más grande) */}
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg md:col-span-2">
                        <img
                            src="./assets/imagen-6.png"
                            alt="Imagen 2"
                            className="w-full h-64 object-cover transition-transform duration-500 transform hover:scale-105"
                        />
                        <div className="p-8">
                            <p className="text-gray-600 dark:text-gray-400 text-right">
                                Logra más en menos tiempo.
                            </p>
                        </div>
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
