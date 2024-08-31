import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SearchModal = ({ isOpen, onRequestClose, tasks }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const results = tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Buscar Tarea"
            className="bg-white p-6 rounded-md max-w-lg mx-auto mt-20 shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <h2 className="text-2xl font-semibold mb-4">Buscar Tarea</h2>
            <input
                type="text"
                placeholder="Ingrese el título o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2 mb-4">
                <button
                    onClick={onRequestClose}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Buscar
                </button>
            </div>
            {searchResults.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                    {searchResults.map((task) => (
                        <li key={task.id} className="p-2 border-b border-gray-200">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No se encontraron tareas.</p>
            )}
        </Modal>
    );
};

export default SearchModal;
