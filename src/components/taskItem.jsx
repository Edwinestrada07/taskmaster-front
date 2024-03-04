import React from 'react'

const translations = {
    "LOW": "Baja",
    "MEDIUM": "Media",
    "HIGH": "Alta",
    "PENDING": "Pendiente",
    "IN_PROGRESS": "En progreso",
    "COMPLETED": "Completada"
}

const translate = (text) => {
    return translations[text] || text
}

const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
}

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
    if (!task) return null

    const { id, description, dueDate, priority, status } = task

    const getStatusClass = () => {
        switch (status) {
            case 'PENDING':
                return 'bg-danger'
            case 'IN_PROGRESS':
                return 'bg-warning'
            case 'COMPLETED':
                return 'bg-success'
            default:
                return ''
        }
    }

    return (
        <div className={`col-lg-12 col-md-6 mb-3 ${getStatusClass()} p-2 frame-task`}>

            <div className="card bg-white bg-opacity-50">

                <div className="card-body">
                    <h3 className="card-title">{description}</h3>
                    <p className="card-text">Fecha de Vencimiento: {formatDate(dueDate)}</p>
                    <p className="card-text">Prioridad: {translate(priority)}</p>
                    <p className="card-text">Estado: {translate(status)}</p>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={() => onDeleteTask(id)}>Eliminar</button>
                        <button className="btn btn-primary" onClick={() => onUpdateTask(id, task)}>Actualizar</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default TaskItem
