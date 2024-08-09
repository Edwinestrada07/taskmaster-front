import React, { useState } from 'react'

function TaskForm(props) {
    const [formData, setFormData] = useState({
        description: '',
        dueDate: '',
        priority: '',
        status: '',
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!formData.description || !formData.dueDate || !formData.priority || !formData.status) {
            setError('Por favor, completa todos los campos.')
            return
        }

        setError(null)

        props.onSubmit({
            description: formData.description,
            dueDate: formData.dueDate,
            priority: formData.priority.toUpperCase(),
            status: formData.status.toUpperCase(),
        });

        setFormData({
            description: '',
            dueDate: '',
            priority: '',
            status: '',
        });
    };

    return (
        <form className="frame-task" onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }} className='mb-4'>{error}</p>}
            
            <input
                className="form-styling-inf"
                type="text"
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                className="form-styling-inf"
                type="date"
                name="dueDate"
                placeholder="Fecha de vencimiento"
                value={formData.dueDate}
                onChange={handleChange}
            />

            <select className="form-styling-inf" 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange}
            >
                <option className='text-dark' value="">Selecciona una prioridad</option>
                <option className='text-dark' value="LOW">Baja</option>
                <option className='text-dark' value="MEDIUM">Media</option>
                <option className='text-dark' value="HIGH">Alta</option>
            </select>

            <select className="form-styling-inf" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
            >
                <option className='text-dark' value="">Selecciona un estado</option>
                <option className='text-dark' value="PENDING">Pendiente</option>
                <option className='text-dark' value="IN_PROGRESS">En progreso</option>
                <option className='text-dark' value="COMPLETED">Completada</option>
            </select>

            <button className="btn-animate" type="submit">Guardar tarea</button>
        </form>
    )
}

export default TaskForm
