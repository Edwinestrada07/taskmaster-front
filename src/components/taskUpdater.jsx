
import React from 'react';

const TaskUpdater = ({ taskToUpdate, updateTask, setTaskToUpdate, setUpdateMode, loading, error }) => {
    /*Formulario para actualizar tareas*/
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md relative">
                <h2 className="text-2xl font-bold mb-4 dark:text-[#e2e8f0]">Formulario de Actualización</h2>

                {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}

                {taskToUpdate && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateTask(taskToUpdate.id, taskToUpdate);
                        }}
                    >
                        <input
                            className="form-styling-inf"
                            type="text"
                            name="description"
                            placeholder="Descripción"
                            value={taskToUpdate.description}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value })}
                        />

                        <input
                            className="form-styling-inf"
                            type="date"
                            name="dueDate"
                            placeholder="Fecha de vencimiento"
                            value={taskToUpdate.dueDate}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, dueDate: e.target.value })}
                        />

                        <select
                            className="form-styling-inf"
                            name="priority"
                            value={taskToUpdate.priority}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, priority: e.target.value })}
                        >
                            <option className="text-dark" value="LOW">Baja</option>
                            <option className="text-dark" value="MEDIUM">Media</option>
                            <option className="text-dark" value="HIGH">Alta</option>
                        </select>

                        <select
                            className="form-styling-inf"
                            name="status"
                            value={taskToUpdate.status}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, status: e.target.value })}
                        >
                            <option className="text-dark" value="PENDING">Pendiente</option>
                            <option className="text-dark" value="IN_PROGRESS">En progreso</option>
                            <option className="text-dark" value="COMPLETED">Completada</option>
                        </select>

                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            type="submit"
                            disabled={loading} // Deshabilitar el botón mientras está cargando
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/8000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    Actualizando...
                                </div>
                            ) : 'Actualizar Tarea'}
                        </button>
                        <button
                            className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            type="button"
                            onClick={() => {
                                setUpdateMode(false);
                                setTaskToUpdate(null);
                            }}
                        >
                            Cancelar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TaskUpdater;
