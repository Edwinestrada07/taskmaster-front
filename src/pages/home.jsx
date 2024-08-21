import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTyped as Typed } from 'react-typed'
import MagicCard from '../components/MagicCard';

const Home = () => {
    const navigate = useNavigate();

    // Redirige a la página de login si no hay un token en el almacenamiento local
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/start');
        }
    }, [navigate]);

    // Datos para las tarjetas en la página principal
    const cardsData = [
        {
            title: "Agrega nuevas tareas",
            description:
                "Incluye detalles importantes como descripción, fecha de vencimiento, prioridad y estado. Organiza cada aspecto de tus tareas para asegurarte de que nada se te escape.",
            size: 'large',
        },
        {
            title: "Edita y actualiza",
            description:
                "Modifica la información de tus tareas en cualquier momento para mantener todo al día. Actualiza detalles a medida que cambian las circunstancias.",
            size: 'large',
        },
        {
            title: "Marca como completadas",
            description:
                "Da por finalizadas tus tareas y sigue avanzando en tus objetivos. Mantén un registro claro de lo que has logrado y lo que aún necesitas hacer.",
            size: 'large',
        },
        {
            title: "Elimina tareas innecesarias",
            description:
                "Borra las tareas que ya no necesitas para mantener tu lista limpia y enfocada. Deshazte del desorden y concédele atención a lo que realmente importa.",
            size: 'large',
        },
        {
            title: "Disfruta de una interfaz intuitiva",
            description:
                "Navega por nuestra plataforma con facilidad gracias a su diseño amigable y sencillo de usar. Encuentra lo que necesitas rápidamente y gestiona tus tareas.",
            size: 'large',
        },
    ];

    return (
        <section className="relative overflow-hidden py-10 px-1 md:px-8 bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e] transition-colors duration-500 shadow-[0px_1px_5px_1px_rgba(165,_39,_255,_0.48)]">
            <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#7d96d1] to-[#914bb9] blur-2xl opacity-5"></div>
            <div className="relative flex flex-col md:flex-row max-w-6xl mx-auto items-center mb-5">
                <div className="md:w-1/2 ml-4">
                    <div className="py-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent mr-5">
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
                    <div className="mt-2 flex gap-3">
                        <button
                            className="py-2.5 px-4 text-gray-700 font-semibold bg-white rounded-md duration-150 hover:bg-gray-100 dark:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                            onClick={() => navigate('/task')}
                        >
                            Empezar
                        </button>
                        <a
                            href="#learn-more"
                            className="py-2.5 text-decoration-none px-4 text-gray-300 bg-gray-700 rounded-md duration-150 hover:bg-gray-800 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            Leer más
                        </a>
                    </div>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center ml-10">
                    <img
                        src="./assets/imagen-7.png"
                        alt="Imagen de TaskMaster"
                        className="w-full h-auto dark:shadow-none transition-shadow duration-500 scale-125 mr-8"
                    />
                </div>
            </div>

            <div id="learn-more" className="container mx-auto px-4 py-20">
                <div className="bg-gray-100 dark:bg-gray-900 p-10 rounded-3xl shadow-lg mb-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex justify-center md:justify-start">
                            <h2 className="text-3xl font-extrabold mb-4 text-center md:text-left text-gray-900 dark:text-gray-200">
                                Mantén todo bajo control y haz seguimiento de tu{" "}
                                <span className='bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent'>
                                    PROGRESO.
                                </span>
                            </h2>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <p className="text-xl font-xs mt-10 text-center md:text-right text-gray-600 dark:text-gray-400">
                                Alcanza tus metas con TaskMaster.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-lg">
                        <img
                            src="./assets/imagen-5.png"
                            alt="Imagen 1"
                            className="w-full h-64 scale-125 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
                                Prioriza lo más importante.
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-3xl shadow-lg md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 p-4">
                            <img
                                src="./assets/imagen-9.png"
                                alt="Imagen 2"
                                className="w-full h-full scale-150 object-cover"
                            />
                            <div className="mt-1">
                                <p className="text-xl font-semibold mt-5 text-center text-gray-700 dark:text-gray-200">
                                    Filtra por estados{" "}
                                    <span className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
                                        y ten a la mano todas tus tareas.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-5">
                    <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-3xl shadow-lg p-4">
                        <img
                            src="./assets/imagen-6.png"
                            alt="Imagen 1"
                            className="w-full h-auto scale-125 "
                        />
                        <div>
                            <p className="text-xl font-semibold text-center mt-5 text-gray-700 dark:text-gray-200">
                                Logra más en menos tiempo.
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-lg p-3">
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Destellos en forma de brillos */}
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                            <div className="absolute top-3/4 left-3/4 w-40 h-40 bg-purple-300 opacity-30 rounded-full filter blur-xl animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-300 opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                            <div className="absolute bottom-3/4 right-3/4 w-40 h-40 bg-blue-300 opacity-25 rounded-full filter blur-xl animate-pulse"></div>
                        </div>
                        <img
                            src="./assets/imagen-10.png"
                            alt="Imagen 1"
                            className="w-full h-auto scale-125 "
                        />
                        <p className="text-xl font-semibold text-center bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
                            TaskMaster es tu compañero ideal para gestionar tus
                            tareas diarias de manera eficiente y sencilla.
                        </p>
                    </div>
                </div>

                <div className="border-t-4 border-gray-900 dark:border-gray-500 rounded-3xl shadow-lg mb-4"></div>

                <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-3xl mt-16 shadow-lg">
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Destellos en forma de brillos */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute top-3/4 left-3/4 w-40 h-40 bg-purple-300 opacity-30 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-300 opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute bottom-3/4 right-3/4 w-40 h-40 bg-blue-300 opacity-25 rounded-full filter blur-xl animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 m-4">
                        {cardsData.map((card, index) => (
                            <MagicCard
                                key={index}
                                title={card.title}
                                description={card.description}
                                size={card.size}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-3xl mt-24 shadow-lg">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center py-8 px-4 bg-gray-900 dark:bg-gray-800 text-gray-100 dark:text-gray-200">
                        ¡Únete a la comunidad TaskMaster!
                    </h2>
                    <p className="font-semibold text-center text-gray-700 dark:text-gray-200 px-4 py-6">
                        Empieza a organizar tu vida y ver los resultados en poco
                        tiempo. Aprovecha nuestra plataforma para mantener todo
                        bajo control.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Home;
