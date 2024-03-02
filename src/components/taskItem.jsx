import React from 'react';

// Objeto de traducción para prioridades y estados
const translations = {
    "LOW": "Baja",
    "MEDIUM": "Media",
    "HIGH": "Alta",
    "PENDING": "Pendiente",
    "IN_PROGRESS": "En progreso",
    "COMPLETED": "Completada"
};

const translate = (text) => {
    return translations[text] || text; // Devuelve la traducción si está disponible, de lo contrario, devuelve el texto original
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
    const { description, dueDate, priority, status } = task;

    return (
        <div className={`col-lg-12 col-md-6 mb-3 ${status === 'PENDING' ? 'bg-danger p-2 frame-task' : status === 'IN_PROGRESS' ? 'bg-warning p-2 frame-task' : status === 'COMPLETED' ? 'bg-success p-2 frame-task' : ''}`}>
            <div className="card bg-white bg-opacity-50">
                <div className="card-body">
                    <h3 className="card-title">{description}</h3>
                    <p className="card-text">Fecha de Vencimiento: {formatDate(dueDate)}</p> {/* Formatea la fecha */}
                    <p className="card-text">Prioridad: {translate(priority)}</p> {/* Traduce la prioridad */}
                    <p className="card-text">Estado: {translate(status)}</p> {/* Traduce el estado */}
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={() => onDeleteTask(task.id)}>Eliminar</button>
                        <button className="btn btn-primary" onClick={() => onUpdateTask(task.id, task)}>Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
