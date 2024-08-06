import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ThemeDarkMode, toggleTheme } from '../themeDarkMode/themeDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

// Estilo del modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#1a202c',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        border: 'none',
    },
};

Modal.setAppElement('#root')

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const navigate = useNavigate()
    const [showOptions, setShowOptions] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
    )

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
    }, [])

    useEffect(() => {
        ThemeDarkMode()
      }, [darkMode])

    const handleLogout = () => {
        setModalIsOpen(true)
    }

    const confirmLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/home')
        setModalIsOpen(false)
    }

    const toggleOptions = () => {
        setShowOptions(!showOptions)
    }

    const toggleDarkMode = () => {
        toggleTheme()
        setDarkMode(!darkMode)
    }

    return (
        <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={toggleOptions}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to="/home">
                                <img alt="logo" src="./assets/logo.jpg" className="h-9 w-auto rounded-full" />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block text-sm font-medium">
                            <div className="flex space-x-2">
                                {isLoggedIn ? (
                                <>
                                    <NavLink
                                        to="/task"
                                        className={({ isActive }) =>
                                            classNames(
                                            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2'
                                            )
                                        }
                                    >
                                        Tareas
                                    </NavLink>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            classNames(
                                            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2'
                                            )
                                        }
                                    >
                                        Perfil
                                    </NavLink>
                                </>
                                ) : (
                                <>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            classNames(
                                            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2'
                                            )
                                        }
                                    >
                                        Iniciar Sesión
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className={({ isActive }) =>
                                            classNames(
                                            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2'
                                            )
                                        }
                                    >
                                        Registrarse
                                    </NavLink>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button onClick={toggleDarkMode} className="mr-4">
                            {darkMode 
                                ? <FontAwesomeIcon icon={faMoon} />
                                : <FontAwesomeIcon icon={faSun} />
                            }
                        </button>
                        {isLoggedIn && (
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                                        <span className="sr-only">Open user menu</span>
                                        <UserCircleIcon aria-hidden="true" className="h-8 w-8" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                                >
                                    <MenuItem>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Tu perfil
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <a href="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Configuración
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Cerrar Sesión
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {isLoggedIn ? (
                        <>
                        <DisclosureButton
                            as={NavLink}
                            to="/task"
                            className={({ isActive }) =>
                            classNames(
                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )
                            }
                        >
                            Tareas
                        </DisclosureButton>
                        <DisclosureButton
                            as={NavLink}
                            to="/profile"
                            className={({ isActive }) =>
                            classNames(
                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )
                            }
                        >
                            Perfil
                        </DisclosureButton>
                        </>
                    ) : (
                        <>
                        <DisclosureButton
                            as={NavLink}
                            to="/login"
                            className={({ isActive }) =>
                            classNames(
                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )
                            }
                        >
                            Iniciar Sesión
                        </DisclosureButton>
                        <DisclosureButton
                            as={NavLink}
                            to="/signup"
                            className={({ isActive }) =>
                            classNames(
                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )
                            }
                        >
                            Registrarse
                        </DisclosureButton>
                        </>
                    )}
                </div>
            </DisclosurePanel>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
                <h2 className="text-lg font-semibold mb-4">¿Estás seguro de que quieres cerrar sesión?</h2>
                <div className="flex justify-end">
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </Modal>
        </Disclosure>
    )
}

export default Navbar
