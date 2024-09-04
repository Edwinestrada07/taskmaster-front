import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const TaskDetailsModal = ({ isOpen, onClose, task, onSave, onDeleteDetail }) => {
    const [details, setDetails] = useState('');
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (task) {
            setDetails(task.details || '');
        }
    }, [task, isOpen]);

    if (!isOpen || !task) return null;

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await onSave(task.id, details);
            setMessage({ type: 'success', text: 'Detalles guardados exitosamente.' });
            setEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'No se pudieron guardar los detalles. Inténtalo de nuevo.' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleDeleteDetail = async (detailId) => {
        try {
            await onDeleteDetail(task.id, detailId);
            setDetails(details.filter(detail => detail.id !== detailId));
        } catch (error) {
            setMessage({ type: 'error', text: 'No se pudo eliminar el detalle. Inténtalo de nuevo.' });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md relative">
                {/* Botón para cerrar el modal */}
                <button
                    className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600"
                    onClick={onClose}
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4">Detalles de la Tarea</h2>

                {message.text && (
                    <p className={`mb-4 font-bold ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message.text}
                    </p>
                )}

                {/* Sección de vista previa y edición de detalles */}
                {editing ? (
                    <form onSubmit={handleSave}>
                        <div className="mb-4">
                            <textarea
                                id="details"
                                name="details"
                                className="w-full p-2 bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                                rows="5"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="Agrega detalles importantes de la tarea aquí..."
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        Guardar Detalles
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <ul className="list-disc pl-5 mb-4">
                            {details.split('\n').map((detail, index) => (
                                <li key={index} className="flex justify-between items-center mb-2">
                                    <span>{detail || "No se han agregado detalles aún."}</span>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteDetail(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end">
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                                onClick={() => setEditing(true)}
                            >
                                <FaEdit className="mr-2" />
                                Editar Detalles
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetailsModal;
