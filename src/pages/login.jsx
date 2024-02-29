import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate ('/')
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
            //Con el fetch conectamos nuestro login al back
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login) //Va la Data como un String
            })

            const dataResponse = await response.json() //await porque nos devuelve una promesa

            // Guardar el usuario y el token en el almacenamiento local
            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)
            
            //este bloque de código se encarga de guardar el userId del usuario en el almacenamiento local 
            //si está presente en la respuesta del servidor. Esto podría ser útil para mantener información 
            //del usuario entre sesiones o para su uso posterior en la aplicación.
            if (dataResponse.user && dataResponse.user.userId) {
                localStorage.setItem('userId', dataResponse.user.userId)
            }

            navigate('/')
            
        } catch (error) {
            console.error('error', error)
        }
        
    }
    
    return (
        <div className="align-items-center vh-100">
            <div className="container">

                <form className="frame form-signin" onSubmit={submit} id='form-login'>
                    
                    <h3 className="text">Iniciar Sesión</h3>
                    <div className="mt-4">
                        <label className='text-a'>Correo</label>
                        <input
                            type="text"
                            className="form-styling"
                            name="email"
                            id="email"
                            onChange={ onChangeData }
                        />
                    </div>
                    <div className="mt-4">
                        <label className='text-a'>Contraseña</label>
                        <input
                            type="password"
                            className="form-styling"
                            name="password"
                            id="password"
                            onChange={ onChangeData }
                        />
                    </div>
                    <div className="d-grid">
                        <button 
                            className="btn-animate" 
                            type="submit"
                        >
                            Iniciar Sesión
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


//event.preventDefault funciona que cada que se le de un submit el form solo envie los datos que se requiren al Javascript
//console.log(event.target) --> Mostramos el formulario HTML en la consola
//const [login, setLogin] = useState({email: '', password: ''}) --> Paa mostrar la información del formulario en consola