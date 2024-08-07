import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactTyped as Typed } from 'react-typed'
import Slider from 'react-slick'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        // Verifica si el usuario está autenticado
        if (!localStorage.getItem('token')) {
            // Redirige al login si no está autenticado
            navigate('/login')
        }
    }, [navigate])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '200px',
    }

    return (
        <section className="bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC] dark:bg-gradient-to-b dark:from-[#1a202c] dark:via-[#2d3748] dark:to-[#2d3748]">
            <div className="items-center px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
                <div className="justify-center w-full text-center lg:p-5 max-auto">
                    <div className="justify-center w-full mx-auto">
                        <div className="flex flex-col p-4 items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
                            <img
                                className="w-32 h-32 rounded-full shadow hover:shadow-lg"
                                src='./assets/logo.jpg'
                                alt='TaskMaster Logo'
                            />
                        </div>

                        <h1 className="sm:mt-6 sm:px-31 text-[#10172A] text-4xl sm:text-5xl font-semibold tracking-tighter dark:text-[#e2e8f0]">
                            <Typed
                                strings={["TaskMaster"]}
                                className="underline leading-8 underline-offset-8 decoration-8 decoration-[#8B5CF6]"
                                typeSpeed={220}
                                backSpeed={130}
                                loop
                            />
                        </h1>

                        <p className="sm:mt-8 sm:px-31 text-[#10172A] text-4xl sm:text-4xl font-semibold tracking-tighter dark:text-[#e2e8f0]">
                            Es tu aliado perfecto para organizar tus tareas diarias.
                        </p>

                        <p className="sm:mt-8 mt-10 text-[#10172A] sm:leading-loose text-lg font-normal tracking-tighter dark:text-[#e2e8f0]">
                            TaskMaster transforma tu manera de gestionar tus tareas, haciéndolo todo más simple y eficiente. ¡Empieza ahora y alcanza tus metas con facilidad!
                        </p>

                        <div className="mt-14 flex items-center justify-center gap-x-6">
                            <a
                                href="/login"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Empezar
                            </a>
                            <a
                                href="#learn-more"
                                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
                            >
                                Leer más <span aria-hidden="true">→</span>
                            </a>
                        </div>

                        <div id="learn-more" className="mt-8 flex flex-col lg:flex-row">
                            <div className="lg:w-1/2 lg:pr-16">
                                <p className="text-[#10172A] text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tighter dark:text-[#e2e8f0]">
                                    <span className="underline leading-8 underline-offset-8 decoration-5 decoration-[#8B5CF6]">TaskMaster</span>
                                </p>
                                <p className="m-3 font-semibold dark:text-[#e2e8f0]">
                                    TaskMaster es tu compañero ideal para gestionar tus tareas diarias de manera eficiente y sencilla. Explora todas las características que tiene para ofrecerte:
                                </p>
                                <Slider {...settings}>
                                    {[
                                        "Agrega nuevas tareas",
                                        "Edita y actualiza",
                                        "Marca como completadas",
                                        "Elimina tareas innecesarias",
                                        "Disfruta de una interfaz intuitiva"
                                    ].map((title, index) => (
                                        <div key={index} className="p-6 sm:p-8 lg:p-16 border rounded-lg shadow-sm bg-white dark:bg-[#EDEAFB] dark:text-[#10172A] transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                                            <h2 className="text-lg sm:text-xl font-bold mb-2">{title}</h2>
                                            <p>
                                                {[
                                                    "Incluye detalles importantes como descripción, fecha de vencimiento, prioridad y estado. Organiza cada aspecto de tus tareas para asegurarte de que nada se te escape.",
                                                    "Modifica la información de tus tareas en cualquier momento para mantener todo al día. Actualiza detalles a medida que cambian las circunstancias.",
                                                    "Da por finalizadas tus tareas y sigue avanzando en tus objetivos. Mantén un registro claro de lo que has logrado y lo que aún necesitas hacer.",
                                                    "Borra las tareas que ya no necesitas para mantener tu lista limpia y enfocada. Deshazte del desorden y concéntrete en lo que realmente importa.",
                                                    "Navega por nuestra plataforma con facilidad gracias a su diseño amigable y sencillo de usar. Encuentra lo que necesitas rápidamente y gestiona tus tareas."
                                                ][index]}
                                            </p>
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            <div className="w-full lg:w-1/2 lg:pl-16 mt-8 lg:mt-0">
                                <Slider {...settings} showThumbs={false} autoPlay infiniteLoop>
                                    <div>
                                        <img className="w-full h-auto object-cover" src="./assets/imagen-1.png" alt="Imagen 1" />
                                        <a href="https://iradesign.io" target='_blank' rel="noopener noreferrer" className="block mb-2 dark:text-[#e2e8f0]">
                                            Illustrations by IRA Design
                                        </a>
                                    </div>
                                    <div>
                                        <img className="w-full h-auto object-cover" src="./assets/imagen-2.png" alt="Imagen 2" />
                                    </div>
                                    <div>
                                        <img className="w-full h-auto object-cover" src="./assets/imagen-3.png" alt="Imagen 3" />
                                    </div>
                                    <div>
                                        <img className="w-full h-auto object-cover" src="./assets/imagen-4.png" alt="Imagen 4" />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
