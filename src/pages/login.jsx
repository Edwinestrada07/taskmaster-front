import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    // Estado para almacenar los datos del formulario de inicio de sesión
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    
    const [error, setError] = useState('') // Estado para manejar mensajes de error
    const [loading, setLoading] = useState(false) // Estado para manejar el estado de carga

    const navigate = useNavigate() // Hook para la navegación programática

    // useEffect para redirigir al usuario si ya está autenticado
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

    // Función para manejar los cambios en los campos del formulario
    const onChangeData = (event) => {
        setLogin({
            ...login,
            [event.target.id]: event.target.value
        })
    }

    // Función para manejar el envío del formulario
    const submit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            // Validación de campos obligatorios
            if (!login.email || !login.password) {
                setError('Por favor, complete todos los campos.')
                setTimeout(() => setError(''), 2000)
                return
            }

            // Petición al backend para iniciar sesión
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            })

            const dataResponse = await response.json()

            // Guardar datos en localStorage
            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)

            if (dataResponse.user && dataResponse.user.userId) {
                localStorage.setItem('userId', dataResponse.user.userId)
            }

            // Redirigir al usuario a la página principal
            navigate('/')
        } catch (error) {
            // Manejo de errores
            setError(error.message || 'Hubo un problema al iniciar sesión')
        } finally {
            // Finalizar el estado de carga
            setLoading(false)
        }
    }

    return (
        <div className="dark:bg-gray-900">
            <div className="container flex flex-col items-center justify-center">

                <h1 className="flex mb-6 text-3xl font-semibold text-white">
                    <img className="w-10 h-10 mr-2" src="./assets/logo copia.png" alt="logo" />
                    TaskMaster
                </h1>

                <div className="w-full bg-gray-500 rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-4 space-y-2 md:space-y-4 sm:p-8">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Iniciar Sesión
                        </h1>

                        {error && <div className="alert alert-danger text-bg-danger text-lg font-medium leading-tight">{error}</div>}
                        <form className="space-y-2 md:space-y-4" onSubmit={submit} id='form-login'>
                            <div className="mt-4">
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Correo</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={login.email}
                                    onChange={onChangeData}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={login.password}
                                    onChange={onChangeData}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                
                                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={loading}
                            >
                                {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿No tienes una cuenta? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Regístrate aquí</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
