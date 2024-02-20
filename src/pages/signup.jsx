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

        <form className="login template d-flex justify-content-center align-items-center vh-100 bg-dark" onSubmit={handleSubmit}>

            <div className="form_container p-5 rounded bg-white">

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    
                <div className="mt-4">

                    <h3 className="text-center">Registrarse</h3>
                    <label htmlFor="name" className="form-label" />
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Nombre"
                            onChange={onChangeData}
                        />
                </div>

                <div className="mt-4">
                    <label htmlFor="email" className="form-label" />   
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Correo"
                            onChange={onChangeData}
                        />
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="form-label" />
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Contraseña"
                            onChange={onChangeData}
                        />
                </div>

                <div className="d-grid">
                    <button 
                        className="mt-4 btn btn-primary" 
                        type="submit" 
                        onClick={submit}
                    >
                        Registrarse

                    </button>
                </div>

                <div className="d-grid">
                    <button 
                        className="mt-4 btn btn-secundary" 
                        type="submit" 
                        onClick={submit}
                    >
                        <Link to="/login">Iniciar Sesión</Link> 

                    </button>    
                </div>

            </div>  
             
        </form>
    )
}

export default Signup