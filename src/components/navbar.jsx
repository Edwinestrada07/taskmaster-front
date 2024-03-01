import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')

        navigate('/login')
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <Link
                className="navbar-brand navbar-text text-light" 
                to='/home'
            >
                Inicio
            </Link>
            <button class="navbar-toggler navbar-expand m-2" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">

                <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse navbar-text">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link text-light  ${ isActive ? 'active':'' }` }
                        to='task'
                    >
                        Tareas
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link text-light  ${ isActive ? 'active':'' }` }
                        to='profile'
                        
                    >
                        Perfil
                    </NavLink>
                </div>
            </div>
            <div className="navbar-collapse collapse w-100 justify-content-end m-3">
                <button
                    className="nav-item nav-link btn "
                    onClick={ logout }
                >
                    Cerrar Sesión
                </button>
            </div>
        </nav>  
    )
}

export default Navbar 
