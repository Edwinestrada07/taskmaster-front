import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

    const onChangeData = (event) => {
        setLogin({
            ...login,
            [event.target.id]: event.target.value
        })
    }

    const submit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            })

            // Validación de campos obligatorios
            if (!login.email || !login.password) {
                setError('Por favor, complete todos los campos.')
                return
            }

            const dataResponse = await response.json()

            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)

            if (dataResponse.user && dataResponse.user.userId) {
                localStorage.setItem('userId', dataResponse.user.userId)
            }

            navigate('/')
        } catch (error) {
            setError(error.message || 'Hubo un problema al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="align-items-center vh-100">
            <div className="container">

                {error && <div className="alert alert-danger">{error}</div>}
                
                <form className="frame form-signin" onSubmit={submit} id='form-login'>

                    <h3 className="text">Iniciar Sesión</h3>
                    
                    <div className="mt-4">
                        <label className='text-a'>Correo</label>
                        <input
                            type="text"
                            className="form-styling"
                            name="email"
                            id="email"
                            onChange={onChangeData}
                        />
                    </div>

                    <div className="mt-4">
                        <label className='text-a'>Contraseña</label>
                        <input
                            type="password"
                            className="form-styling"
                            name="password"
                            id="password"
                            onChange={onChangeData}
                        />
                    </div>

                    <div className="d-grid">
                        <button
                            className="btn-animate"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                        </button>
                    </div>

                    <div className="link"> ¿Olvidaste tu contraseña? </div>
                    <div className="link">
                        ¿No tienes una cuenta?
                        <Link to='/signup' className="link ms-2">Regístrate aquí</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
