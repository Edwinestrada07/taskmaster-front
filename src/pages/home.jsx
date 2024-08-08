import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactTyped as Typed } from 'react-typed'
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

    return (
        <div className="flex flex-col md:flex-row min-h-fit">
            {/* Sección izquierda */}
            <div className="w-full md:w-1/2 bg-gray-800 text-white flex items-center justify-center p-12 md:p-28 bg-gradient-to-b from-[#1a202c] via-[#2d3748] to-[#2d3748] dark:bg-gradient-to-b dark:from-[#E8E3F5] dark:via-[#EDEAFB] dark:to-[#F7FAFC]">
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-[#10172A] dark-bg:text-[#e2e8f0]">Bienvenido a TaskMaster</h1>
               
                    <p className="text-sm md:text-lg text-[#10172A]">
                        <Typed
                            strings={[
                                "Gestiona tus proyectos con facilidad.",
                                "Mantén el control de tus prioridades.",
                                "Simplifica tu vida con TaskMaster."
                            ]}
                            typeSpeed={15}
                            backSpeed={50}
                            loop
                        />
                    </p>
                </div>
            </div>
            
            {/* Sección derecha */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-12 md:p-32 bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC] dark:bg-gradient-to-b dark:from-[#1a202c] dark:via-[#2d3748] dark:to-[#2d3748]">
                <div className="w-full max-w-md mb-6">
                    {/* Aquí puedes incluir el contenido adicional si es necesario */}
                </div>
                <div className="w-full max-w-md flex justify-content-center md:justify-between m-16">
                    <button
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate-bounce"
                        onClick={() => navigate('/task')}
                    >
                        Empezar con la prueba
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
