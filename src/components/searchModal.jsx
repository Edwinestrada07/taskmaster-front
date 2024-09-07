import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SearchModal = ({ isOpen, onRequestClose, tasks, loading }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const results = tasks.filter(task =>
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Buscar Tarea"
            className="bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >   
            <button
                className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600"
                onClick={onRequestClose}
            >
                <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Buscar Tarea</h2>
            <input
                type="text"
                placeholder="Ingrese el título o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
            />
            <div className="flex justify-end space-x-2 mb-4">
                <button
                    type="submit"
                    className="transition-background mt-3 inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                    disabled={loading}
                    onClick={handleSearch}
                >
                    {loading ? (
                        <>
                            <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Cargando.....
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faStickyNote} className='mr-2'/>
                            Buscar Tareas
                        </>
                    )}
                </button>
            </div>
            {searchResults.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                    {searchResults.map((task) => (
                        <li key={task.id} className="p-2 border-b border-gray-200">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-xl text-gray-300">{task.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-xl font-semibold mb-4">No se encontraron tareas.</p>
            )}
        </Modal>
    );
};

export default SearchModal;
