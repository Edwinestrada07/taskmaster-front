import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';

const TaskDetailsModal = ({ isOpen, onClose, task, onSave }) => {
    const [details, setDetails] = useState([]);
    const [newDetail, setNewDetail] = useState('');
    const [editDetailId, setEditDetailId] = useState(null);
    const [editDetailText, setEditDetailText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task && isOpen) {
            // Cargar detalles de la tarea al abrir el modal
            fetch(`https://taskmaster-back.onrender.com/task/${task.id}/detail`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(`Error ${response.status}: ${text}`);
                        });
                    }
                    return response.json();
                })
                .then(data => setDetails(data))
                .catch(error => setError(error.message));
        }
    }, [task, isOpen]);

    // Agregar un nuevo detalle
    const handleAddDetail = async () => {
        if (newDetail.trim() === '') {
            setError('El campo no puede estar vacío.');
            setTimeout(() => setError(), 2000);
            return;
        }
        
        try {
            setLoading(true);
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${task.id}/detail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({ detail: newDetail })
            });

            if (!response.ok) throw new Error('Error al agregar el detalle.');

            const newDetailData = await response.json();
            setDetails([...details, newDetailData]);
            setNewDetail('');
            setSuccess('Detalle agregado exitosamente.');
            setTimeout(() => setSuccess(), 2000);
            setError('');


        } catch (error) {
            setError(error.message);
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    // Actualizar un detalle existente
    const handleUpdateDetail = async (id) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${task.id}/detail/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({ detail: editDetailText })
            });

            if (!response.ok) throw new Error('Error al actualizar el detalle.');

            const updatedDetail = await response.json();
            setDetails(details.map(detail => detail.id === id ? updatedDetail : detail));
            setEditDetailId(null);
            setEditDetailText('');
            setSuccess('Detalle actualizado exitosamente.');
            setTimeout(() => setSuccess(), 2000);
            setError('');

        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    // Eliminar un detalle
    const handleDeleteDetail = async (id) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${task.id}/detail/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });

            if (!response.ok) throw new Error('Error al eliminar el detalle.');

            setDetails(details.filter(detail => detail.id !== id));
            setSuccess('Detalle eliminado exitosamente.');
            setError('');
            setTimeout(() => setSuccess(), 2000);

        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    if (!isOpen) return null;

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

                {/* Mostrar mensajes de error y éxito */}
                {error && (
                    <p className="mb-4 font-bold text-red-500">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="mb-4 font-bold text-green-500">
                        {success}
                    </p>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        value={newDetail}
                        onChange={(e) => setNewDetail(e.target.value)}
                        placeholder="Agregar nuevo detalle"
                        className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="transition-background mt-3 inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                        disabled={loading}
                        onClick={handleAddDetail}
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

                {/* Lista de detalles */}
                <ul className="list-disc pl-5 space-y-2">
                    {details.map(detail => (
                        <li key={detail.id} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                            {editDetailId === detail.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editDetailText}
                                        onChange={(e) => setEditDetailText(e.target.value)}
                                        className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleUpdateDetail(detail.id)}
                                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        <FaSave />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>{detail.detail}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => { setEditDetailId(detail.id); setEditDetailText(detail.detail); }}
                                            className="text-yellow-500 hover:text-yellow-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDetail(detail.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskDetailsModal;