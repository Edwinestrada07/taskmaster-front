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

            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)

            navigate('/')
            
        } catch (error) {
            console.error('error', error)
        }
        
    }
    
    return (
        <div className="login template d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="form_container p-5 rounded bg-white">

                <form className="d-grid" onSubmit={submit} id='form-login'>
                    
                    <h3 className="text-center font-weight-normal">Iniciar Sesión</h3>
                    <div className="mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name="email"
                            id="email"
                            onChange={ onChangeData }
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="password"
                            id="password"
                            onChange={ onChangeData }
                        />
                    </div>
                    <div className="d-grid">
                        <button 
                            className="mt-4 btn btn-primary" 
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                                
                </form>
                <div className="mt-4">
                    ¿No tienes una cuenta?
                        <Link to='/signup' className="ms-2">Regístrate aquí</Link>
                </div>
            
            </div>
          
        </div>
    )
}

export default Login 


//event.preventDefault funciona que cada que se le de un submit el form solo envie los datos que se requiren al Javascript
//console.log(event.target) --> Mostramos el formulario HTML en la consola
//const [login, setLogin] = useState({email: '', password: ''}) --> Paa mostrar la información del formulario en consola