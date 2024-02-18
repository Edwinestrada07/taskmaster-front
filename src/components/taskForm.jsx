import { useState } from "react"

const taskForm = ({ onSubmit }) => {
    const [ description, setDescription ] = useState('')
    const [ dueDate, setDueDate ] = useState('')
    const [ priority, setPriority ] = useState('')
    const [ status, setStatus ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit({ description, dueDate, priority, status })
        setDescription('')
        setDueDate('')
        setPriority('')
        setStatus('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha de vencimiento"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
            />
            <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option value="LOW'">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
            </select>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="PENDING">Pendiente</option>
                <option value="IN_PROGRESS">En progreso</option>
                <option value="COMPLETED">Completada</option>
            </select>
            <button type="submit">Guardar Tarea</button>
        </form>
    )
}

export default taskForm