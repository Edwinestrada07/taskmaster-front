import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactTyped as Typed } from 'react-typed'
import { useInView } from 'react-intersection-observer'

const Home = () => {
    const navigate = useNavigate()
    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.5 })
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.5 })
    const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.5 })
    const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.5 })
    const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.5 })
    const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.5 })

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [navigate])

    const imagesAndTexts = [
        {
            img: "url('./assets/imagen-2.jpg')",
            text: 'Organiza tus tareas de manera efectiva.',
            ref: ref1,
            inView: inView1
        },
        {
            img: "url('./assets/imagen-5.png')",
            text: 'Prioriza lo más importante.',
            ref: ref2,
            inView: inView2
        },
        {
            img: "url('/assets/imagen-6.png')",
            text: 'Logra más en menos tiempo.',
            ref: ref3,
            inView: inView3
        },
        {
            img: "url('/path-to-image4.jpg')",
            text: 'Mantén todo bajo control.',
            ref: ref4,
            inView: inView4
        },
        {
            img: "url('/path-to-image5.jpg')",
            text: 'Haz seguimiento de tu progreso.',
            ref: ref5,
            inView: inView5
        },
        {
            img: "url('/path-to-image6.jpg')",
            text: 'Alcanza tus metas con TaskMaster.',
            ref: ref6,
            inView: inView6
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#0f172a] dark:via-[#311065] dark:to-[#0f172a]">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center px-6 py-16 bg-[#e5e3f1] dark:bg-[#0f172a] shadow-[0px_5px_70px_5px_rgba(165,_39,_255,_0.48)] w-full max-w-7xl">
                {/* Sección de texto */}
                <div className="text-left lg:w-1/2 mb-6 lg:mb-0 px-4">
                    <h1 className="text-4xl ml-10 md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
                        Bienvenido a TaskMaster
                    </h1>
                    <p className="text-base md:text-lg lg:text-2xl mt-4 text-[#10172A] dark:text-[#e2e8f0]">
                        <Typed
                            strings={[
                                "Gestiona tus proyectos con facilidad",
                                "Mantén el control de tus prioridades",
                                "Simplifica tu vida con TaskMaster"
                            ]}
                            typeSpeed={20}
                            backSpeed={50}
                            loop
                        />
                    </p>
                    <button
                        className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm md:text-base font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => navigate('/task')}
                    >
                        Empezar con la prueba
                    </button>
                    <a
                        href="#learn-more"
                        className="mt-2 block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
                    >
                        Leer más <span aria-hidden="true">→</span>
                    </a>
                </div>
                {/* Sección de la imagen */}
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="./assets/imagen-1.jpg"
                        alt="TaskMaster"
                        className="w-full max-w-lg h-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Sección de imágenes y textos alternados */}
            <div id="learn-more" className="flex flex-col gap-12 w-full max-w-7xl px-6 py-12">
                {imagesAndTexts.map((item, index) => (
                    <div
                        key={index}
                        ref={item.ref}
                        className={`w-full flex flex-col md:flex-row items-center justify-between transition-all duration-500 ${
                            item.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full md:translate-x-0'
                        } ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div
                            className="w-full md:w-1/2 h-80 bg-cover bg-center rounded-lg shadow-lg mb-6 md:mb-0"
                            style={{ backgroundImage: item.img }}
                        />
                        <div className="w-full md:w-1/2 text-center md:text-left px-4">
                            <p className="text-xl md:text-2xl font-bold text-[#10172A] dark:text-[#e2e8f0]">
                                {item.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
