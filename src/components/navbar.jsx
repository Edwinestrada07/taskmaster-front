import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'

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

Modal.setAppElement('#root');

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        setModalIsOpen(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/home');
        setModalIsOpen(false);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <Disclosure as="nav" className="bg-gray-800 text-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={toggleOptions}>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to='/home'>
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {isLoggedIn ? (
                                    <>
                                        <NavLink 
                                            to='/task'
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )
                                            }
                                        >
                                            Tareas
                                        </NavLink>
                                        <NavLink 
                                            to='/profile'
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )
                                            }
                                        >
                                            Perfil
                                        </NavLink>
                                        <button
                                            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                                            onClick={handleLogout}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink 
                                            to='/login'
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )
                                            }
                                        >
                                            Login
                                        </NavLink>
                                        <NavLink 
                                            to='/signup'
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )
                                            }
                                        >
                                            Signup
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                                        <Link to='/profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Your Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Settings
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Sign out
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
                                to='/task'
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
                                to='/profile'
                                className={({ isActive }) =>
                                    classNames(
                                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )
                                }
                            >
                                Perfil
                            </DisclosureButton>
                            <DisclosureButton
                                as="button"
                                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </DisclosureButton>
                        </>
                    ) : (
                        <>
                            <DisclosureButton
                                as={NavLink}
                                to='/login'
                                className={({ isActive }) =>
                                    classNames(
                                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )
                                }
                            >
                                Login
                            </DisclosureButton>
                            <DisclosureButton
                                as={NavLink}
                                to='/signup'
                                className={({ isActive }) =>
                                    classNames(
                                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )
                                }
                            >
                                Signup
                            </DisclosureButton>
                        </>
                    )}
                </div>
            </DisclosurePanel>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Confirm Logout"
            >
                <h2 className="text-lg mb-4">Confirmar Cierre de Sesión</h2>
                <p>¿Estás seguro de que quieres cerrar sesión?</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <button 
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={confirmLogout}
                    >
                        Sí
                    </button>
                    <button 
                        className="bg-gray-600 text-white px-4 py-2 rounded-md"
                        onClick={() => setModalIsOpen(false)}
                    >
                        No
                    </button>
                </div>
            </Modal>
        </Disclosure>
    )
}
