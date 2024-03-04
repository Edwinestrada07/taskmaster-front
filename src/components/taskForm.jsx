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
        <form className="frame-task" onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label className='text-a'>Descripción</label> 
            <input
                className="form-styling"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                className="form-styling-inf"
                type="date"
                placeholder="Fecha de vencimiento"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <select className="form-styling-inf" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option className='text-dark' value="">Selecciona una prioridad</option>
                <option className='text-dark' value="LOW">Baja</option>
                <option className='text-dark' value="MEDIUM">Media</option>
                <option className='text-dark' value="HIGH">Alta</option>
            </select>

            <select className="form-styling-inf" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option className='text-dark' value="">Selecciona un estado</option>
                <option className='text-dark' value="PENDING">Pendiente</option>
                <option className='text-dark' value="IN_PROGRESS">En progreso</option>
                <option className='text-dark' value="COMPLETED">Completada</option>
            </select>

            <button className="btn-animate" type="submit">Guardar tarea</button>
        </form>
    );
}

export default TaskForm;
