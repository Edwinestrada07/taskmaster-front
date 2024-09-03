import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faAlignLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ 
    isAsideVisible, 
    toggleAsideVisibility, 
    handleViewMode,
    toggleFormVisibility,
    isFormVisible,
    setTaskStatus
}) => {
    return (
        <aside className={`relative inset-y-0 h-screen bg-gray-800 ${isAsideVisible ? 'w-64' : 'w-16'} sm:flex flex-col items-center rounded-lg shadow-lg transition-all duration-300`}>
            <div className="p-3 w-full flex justify-between items-center">
                {isAsideVisible && (
                    <a href="/start" className="text-white text-xl font-extrabold">
                        TaskMaster
                    </a>
                )}
                <button 
                    className="bg-white text-gray-800 rounded-full ml-2 p-1 focus:outline-none" 
                    onClick={toggleAsideVisibility}
                >
                    <i className={`fas ${isAsideVisible ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                </button>
            </div>
            <div className="w-3/4 flex flex-col justify-center mt-4 mr-3">
                <button 
                    className={`bg-white text-gray-900 font-semibold py-2 rounded-lg flex items-center justify-center ml-2.5 ${isAsideVisible ? 'w-full' : 'w-10'}`} 
                    onClick={toggleFormVisibility}
                >
                    <i className="fas fa-plus"></i>
                    {isAsideVisible && 'Crear Tarea'}
                </button>
            </div>
            <div className="flex flex-col items-center w-full mt-6">
                <button 
                    className="flex items-center text-white opacity-75 py-3 cursor-pointer hover:bg-gray-600 w-full justify-center"
                    onClick={() => handleViewMode('registered')}
                >
                    <FontAwesomeIcon icon={faStickyNote} />
                    {isAsideVisible && <span className='ml-3'>Registros</span>}
                </button>
                <button 
                    className="flex items-center text-white opacity-75 py-3 cursor-pointer hover:bg-gray-600 w-full justify-center"
                    onClick={() => handleViewMode('byStatus')}
                >
                    <FontAwesomeIcon icon={faAlignLeft} />
                    {isAsideVisible && <span className='ml-3'>Estados</span>}
                </button>
                <button 
                    className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600"
                    onClick={() => handleViewMode('byFavorites')}
                >
                    <FontAwesomeIcon icon={faBookmark} />
                    {isAsideVisible && <span className='ml-3'>Favoritos</span>}
                </button>
                <button 
                    className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600"
                    onClick={() => handleViewMode('history')}
                >
                    <FontAwesomeIcon icon={faRotateRight} />
                    {isAsideVisible && <span className='ml-3'>Historial</span>}
                </button>
                <a href="calendar.html" className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600">
                    <i className="fas fa-calendar"></i>
                    {isAsideVisible && <span className='ml-3'>Calendario</span>}
                </a>      
            </div>
        </aside>
    );
}

export default Sidebar;
