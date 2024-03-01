import React from 'react'

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
    return translations[text] || text // Devuelve la traducción si está disponible, de lo contrario, devuelve el texto original
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
}

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
    const { description, dueDate, priority, status } = task

    return (
        <div className='frame-task text m-2 bg-primary bg-opacity-25'>
            <h3>{description}</h3>
            <p>Fecha de Vencimiento: {formatDate(dueDate)}</p> {/* Formatea la fecha */}
            <p>Prioridad: {translate(priority)}</p> {/* Traduce la prioridad */}
            <p>Estado: {translate(status)}</p> {/* Traduce el estado */}
            <button className="btn-animate" onClick={() => onDeleteTask(task.id)}>Eliminar</button>
            <button className="btn-animate"onClick={() => onUpdateTask(task.id, task)}>Actualizar</button>
        </div>
    )
}

export default TaskItem
