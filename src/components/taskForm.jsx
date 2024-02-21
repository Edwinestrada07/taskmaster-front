import React, { useState } from 'react';

function TaskForm(props) {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!description || !dueDate || !priority || !status) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        setError(null);

        props.onSubmit({ description, dueDate, priority: priority.toUpperCase(), status: status.toUpperCase() });
        setDescription('');
        setDueDate('');
        setPriority('');
        setStatus('');
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

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
                <option value="">Selecciona una prioridad</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Selecciona un estado</option>
                <option value="PENDING">Pendiente</option>
                <option value="IN_PROGRESS">En progreso</option>
                <option value="COMPLETED">Completada</option>
            </select>

            <button type="submit">Guardar tarea</button>
        </form>
    );
}

export default TaskForm;
