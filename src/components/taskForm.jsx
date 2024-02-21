import React, { useState } from 'react'

const TaskForm = ({ onSubmit }) => {
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ description, dueDate, priority: priority.toUpperCase(), status: status.toUpperCase() })
        setDescription('')
        setDueDate('')
        setPriority('')
        setStatus('')
    };

    return (
        <form onSubmit={handleSubmit}> {/* Corregido aquí */}
            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="date"
                placeholder="Fecha de vencimiento"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PENDING">Pendiente</option>
                <option value="IN_PROGRESS">En progreso</option>
                <option value="COMPLETED">Completada</option>
            </select>

            <button type="submit">Guardar tarea</button>
        </form>
    )
}

export default TaskForm
