
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TaskUpdater = ({ taskToUpdate, updateTask, setTaskToUpdate, setUpdateMode, loading, error }) => {
    /*Formulario para actualizar tareas*/
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md relative">

                <button
                    className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600"
                    onClick={() => {
                        setUpdateMode(false);
                        setTaskToUpdate(null);
                    }}
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4">Formulario de Actualización</h2>

                {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}

                {taskToUpdate && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateTask(taskToUpdate.id, taskToUpdate);
                        }}
                    >
                        <input
                            className="border-1 mb-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                            type="text"
                            name="description"
                            placeholder="Descripción"
                            value={taskToUpdate.description}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value })}
                        />

                        <input
                            className="border-1 mb-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                            type="date"
                            name="dueDate"
                            placeholder="Fecha de vencimiento"
                            value={taskToUpdate.dueDate}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, dueDate: e.target.value })}
                        />

                        <select
                            className="border-1 mb-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                            name="priority"
                            value={taskToUpdate.priority}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, priority: e.target.value })}
                        >
                            <option className="bg-gray-800 text-white-50" value="LOW">Baja</option>
                            <option className="bg-gray-800 text-white-50" value="MEDIUM">Media</option>
                            <option className="bg-gray-800 text-white-50" value="HIGH">Alta</option>
                        </select>

                        <select
                            className="border-1 mb-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                            name="status"
                            value={taskToUpdate.status}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, status: e.target.value })}
                        >
                            <option className="bg-gray-800 text-white-50" value="PENDING">Pendiente</option>
                            <option className="bg-gray-800 text-white-50" value="IN_PROGRESS">En progreso</option>
                            <option className="bg-gray-800 text-white-50" value="COMPLETED">Completada</option>
                        </select>

                        <button
                            className="transition-background mt-3 inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                            type="submit"
                            disabled={loading} // Deshabilitar el botón mientras está cargando
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-gray animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-85" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    Actualizando...
                                </div>
                            ) : 'Actualizar Tarea'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TaskUpdater;
