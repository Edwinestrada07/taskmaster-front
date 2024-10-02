import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faStar, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faAlignLeft, faRotateRight, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isAsideVisible, toggleAsideVisibility, handleViewMode, toggleFormVisibility }) => {
    const asideRef = useRef(null);

    // Detectar clics fuera del sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (asideRef.current && !asideRef.current.contains(event.target)) {
                if (isAsideVisible) {
                    toggleAsideVisibility();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAsideVisible, toggleAsideVisibility]);

    return (
        <>
            <aside
                ref={asideRef}  // Usar el ref en el sidebar
                className={`fixed inset-y-1 bg-gray-800 text-white shadow-lg transition-transform duration-300 ease-in-out ${
                    isAsideVisible ? 'translate-x-0 w-40' : '-translate-x-full w-40'
                }`}
            >
                <div className="flex justify-between items-center p-2 mt-5 border-b border-gray-400">
                    <h1 className="text-lg font-bold tracking-wide hidden sm:block">TaskMaster</h1>
                    <button
                        className="bg-white text-gray-800 rounded-full p-1.5 focus:outline-none"
                        onClick={toggleAsideVisibility}
                    >
                        <FontAwesomeIcon icon={isAsideVisible ? faChevronLeft : faChevronRight}  />
                    </button>
                </div>
                <div className="mt-16 space-y-2">
                    <button
                        className={`bg-white text-gray-900 font-semibold py-2 ml-3 rounded-lg flex items-center justify-center ${
                            isAsideVisible ? 'w-32' : 'w-10'
                        }`}
                        onClick={toggleFormVisibility}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        {isAsideVisible && <span className="ml-2">Crear Tarea</span>}
                    </button>
                    <button
                        className="w-full flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
                        onClick={() => handleViewMode('registered')}
                    >
                        <FontAwesomeIcon icon={faStickyNote} size="lg" className="mr-3" />
                        <span>Registros</span>
                    </button>
                    <button
                        className="w-full flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
                        onClick={() => handleViewMode('byStatus')}
                    >
                        <FontAwesomeIcon icon={faAlignLeft} size="lg" className="mr-3" />
                        <span>Estados</span>
                    </button>
                    <button
                        className="w-full flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
                        onClick={() => handleViewMode('byFavorites')}
                    >
                        <FontAwesomeIcon icon={faStar} size="lg" className="mr-3" />
                        <span>Favoritos</span>
                    </button>
                    <button
                        className="w-full flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
                        onClick={() => handleViewMode('history')}
                    >
                        <FontAwesomeIcon icon={faRotateRight} size="lg" className="mr-3" />
                        <span>Historial</span>
                    </button>
                    <button
                        className="w-full flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
                        onClick={() => handleViewMode('calendar')}
                    >
                        <FontAwesomeIcon icon={faCalendar} size="lg" className="mr-3" />
                        <span>Calendario</span>
                    </button>
                </div>
            </aside>

            {/* Botón para mostrar el sidebar cuando está oculto */}
            {!isAsideVisible && (
                <button
                    className="fixed top-20 left-3 bg-white text-gray-800 rounded-full p-1.5 z-50 focus:outline-none transition-transform hover:scale-105"
                    onClick={toggleAsideVisibility}
                >
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            )}
        </>
    );
};

export default Sidebar;
