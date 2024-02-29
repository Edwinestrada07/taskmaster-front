import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
        navigate('/')
        }
    }, [navigate])

    const onChangeData = (event) => {
        setSignup({
        ...signup,
        [event.target.id]: event.target.value
        })
    }

    const submit = async (event) => {
        event.preventDefault()

        try {
            // Validación de campos obligatorios
            if (!signup.name || !signup.email || !signup.password) {
                setErrorMessage('Por favor, complete todos los campos.')
                return
            }

            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signup)
            })

            const dataResponse = await response.json()

            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)

            setSuccessMessage('Usuario registrado con éxito.')
            setErrorMessage('') // Limpiar cualquier mensaje de error existente

            navigate('/')

        } catch (error) {
            setErrorMessage('Error al registrar usuario. Verifica la información proporcionada.')
            console.error('error', error)
        }
    }

    return (

        <div className='container'>
            <form className="frame form-signup" onSubmit={handleSubmit}>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <h3 className="text">Registrarse</h3> 

                <div className="mt-4">
                    <label className='text-a'>Nombre</label>
                        <input
                            type="text"
                            className="form-styling"
                            id="name"
                            onChange={onChangeData}
                        />
                </div>
                <div className="mt-4">
                    <label className='text-a'>Correo</label>   
                        <input
                            type="text"
                            className="form-styling"
                            id="email"
                            onChange={onChangeData}
                        />
                </div>
                <div className="mt-4">
                    <label className='text-a'>Contraseña</label>
                        <input
                            type="password"
                            className="form-styling"
                            id="password"
                            onChange={onChangeData}
                        />
                </div>
                <div className="d-grid">
                    <button 
                        className="btn-animate" 
                        type="submit" 
                        onClick={submit}
                    >
                        Registrarse

                    </button>
                </div>
                <div className="link">
                    <Link to='/login' className="link">Iniciar Sesión</Link>
                </div> 
            </form>
        </div>
    )
}

export default Signup