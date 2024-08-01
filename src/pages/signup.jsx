import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    // Estado para almacenar los datos del formulario de registro
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const [error, setError] = useState('') // Estado para manejar mensajes de error
    const [successMessage, setSuccessMessage] = useState('') // Estado para manejar mensajes de éxito
    const [loading, setLoading] = useState(false) // Estado para manejar el estado de carga

    const navigate = useNavigate() // Hook para la navegación programática

    // Función para manejar los cambios en los campos del formulario
    const onChangeData = (event) => {
        setSignup({
            ...signup,
            [event.target.id]: event.target.value
        })
    }

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            // Validación de campos obligatorios
            if (!signup.name || !signup.email || !signup.password) {
                setError('Por favor, complete todos los campos.')
                return
            }

            // Petición al backend para registrar al usuario
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signup)
            })

            const dataResponse = await response.json()

            if (dataResponse.error) {
                setError(dataResponse.error)
                return
            }

            // Guardar datos en localStorage
            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)

            // Mostrar mensaje de éxito y redirigir al usuario a la página de inicio de sesión
            setSuccessMessage('Registro exitoso. Redirigiendo a inicio de sesión...')
            setTimeout(() => navigate('/login'), 3000)
        } catch (error) {
            // Manejo de errores
            setError(error.message || 'Hubo un problema al registrarse')
        } finally {
            // Finalizar el estado de carga
            setLoading(false)
        }
    }

    // useEffect para redirigir al usuario si ya está autenticado
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

    return (
        <div className="dark:bg-gray-900">
            <div className="container flex flex-col items-center justify-center">

                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </Link>

                <div className="w-full bg-gray-500 rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-4 space-y-2 md:space-y-4 sm:p-8">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Registrarse
                        </h1>

                        {error && <div className="alert alert-danger text-bg-danger text-lg font-medium leading-tight">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit} >
                            <div className="mt-4">
                                <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={signup.name}
                                    onChange={onChangeData}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Correo</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={signup.email}
                                    onChange={onChangeData}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={signup.password}
                                    onChange={onChangeData}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={loading}
                            >
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Iniciar Sesión</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
