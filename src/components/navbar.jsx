import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')

        navigate('/login')
    }

    return (

        <nav className="navbar navbar-expand-lg p-3 m-2 bg-dark">
    
            <Link 
                className="navbar-brand text-light" 
                to='/home'
            >
                Inicio
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav mx-auto">

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link text-light ${ isActive ? 'active':'' }` }
                        to='task'
                    >
                        Tareas
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link text-light ${ isActive ? 'active':'' }` }
                        to='profile'
                        
                    >
                        Perfil
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <button
                    className="nav-item nav-link btn text-light"
                    onClick={ logout }
                >
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    )
}

export default Navbar 
