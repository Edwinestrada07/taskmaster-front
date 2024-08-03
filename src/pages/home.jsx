import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si el usuario está autenticado
        if (!localStorage.getItem('token')) {
            // Redirige al login si no está autenticado
            navigate('/login')
        } else {
            setLoggedIn(true)
        }
    }, [navigate])

    return (
        <section className="bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC]">
            <div className="items-center px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
                <div className="justify-center w-full text-center lg:p-5 max-auto">
                    <div className="justify-center w-full mx-auto">
                        <div class="flex flex-col p-4 items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
                            <img
                                class='w-28 h-28 rounded-full border border-[#E8E3F4]'
                                src='https://i.pinimg.com/736x/97/f0/cb/97f0cb0bd91313be32a74ff14584d0f7.jpg'
                            />
                        </div>

                        <p class="sm:mt-8 sm:px-31 text-[#10172A] text-4xl sm:text-6xl font-semibold tracking-tighter">
                            <span class="underline leading-8 underline-offset-8	decoration-8 decoration-[#8B5CF6]">TaskMaster </span> 
                            es tu aliado perfecto para organizar tus tareas diarias.
                        </p>

                        <p class="sm:mt-8 mt-10 text-[#10172A] sm:leading-loose text-lg font-normal tracking-tighter">
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
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Leer más <span aria-hidden="true">→</span>
                            </a>
                        </div>

                        <div id="learn-more" className="mt-8 flex flex-col lg:flex-row">
                            <div className="lg:w-1/2 pr-4">
                                <p class="text-[#10172A] text-2xl sm:text-3xl font-semibold tracking-tighter">
                                    <span class="underline leading-8 underline-offset-8	decoration-5 decoration-[#8B5CF6]">TaskMaster </span>
                                </p>
                                <p className="m-3 font-semibold">TaskMaster es tu aliado perfecto para organizar tus tareas diarias con eficiencia y facilidad. Descubre todas las funcionalidades que te ofrece:</p>
                                <ul className="list-disc list-inside mb-4">
                                    <li><strong>Agrega nuevas tareas:</strong> Incluye detalles importantes como descripción, fecha de vencimiento, prioridad y estado.</li>
                                    <li><strong>Edita y actualiza:</strong> Modifica la información de tus tareas en cualquier momento para mantener todo al día.</li>
                                    <li><strong>Marca como completadas:</strong> Da por finalizadas tus tareas y sigue avanzando en tus objetivos.</li>
                                    <li><strong>Elimina tareas innecesarias:</strong> Borra las tareas que ya no necesitas para mantener tu lista limpia y enfocada.</li>
                                    <li><strong>Disfruta de una interfaz intuitiva:</strong> Navega por nuestra plataforma con facilidad gracias a su diseño amigable y sencillo de usar.</li>
                                </ul>
                            </div>

                            <div className="lg:w-1/2">
                                <Carousel showThumbs={false} autoPlay infiniteLoop>
                                    <div>
                                        <img className="h-50 object-cover" src="./assets/blog-1.jpg" alt="Imagen 1" />
                                    </div>
                                    <div>
                                        <img className="h-50 object-cover" src="./assets/blog-2.jpg" alt="Imagen 2" />
                                    </div>
                                    <div>
                                        <img className="h-50 object-cover" src="./assets/blog-3.jpg" alt="Imagen 3" />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home