import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
    const navigate = useNavigate()
    const [showOptions, setShowOptions] = useState(false)

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const toggleOptions = () => {
        setShowOptions(!showOptions)
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-lg">

            <Link className="navbar-brand navbar-text text-light" to='/home'>
                Inicio
            </Link>

            <button 
                className="navbar-toggler navbar-expand m-2" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
                onClick={toggleOptions}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${showOptions ? 'show' : ''} navbar-text`} id="navbarSupportedContent">

                <div className="navbar-nav">

                    <NavLink 
                        className="nav-item nav-link text-light" 
                        to='task'
                    >
                        Tareas
                    </NavLink>

                    <NavLink 
                        className="nav-item nav-link text-light" 
                        to='profile'
                    >
                        Perfil
                    </NavLink>
                </div>
                
            </div>

            <div className="navbar-collapse collapse w-100 justify-content-end m-3">
                <button
                    className="nav-item nav-link btn "
                    onClick={logout}
                >
                    Cerrar Sesión
                </button>
            </div>

        </nav>  
    )
}

export default Navbar

