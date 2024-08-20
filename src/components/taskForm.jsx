import React, { useState } from 'react'

function TaskForm(props) {
    const [formData, setFormData] = useState({
        description: '',
        dueDate: '',
        priority: '',
        status: '',
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false) // Estado para el spinner
    const [successMessage, setSuccessMessage] = useState('') // Estado para el mensaje de éxito

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // Manejar la sumisión del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!formData.description || !formData.dueDate || !formData.priority || !formData.status) {
            setError('Por favor, complete todos los campos.')
            return
        }

        setError(null)
        setLoading(true) // Iniciar el spinner

        // Simular un retraso de 2 segundos
        setTimeout(() => {
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

            setLoading(false) // Detener el spinner
            setSuccessMessage('¡Tarea creada con éxito!') // Mostrar mensaje de éxito

            // Limpiar el mensaje de éxito después de unos segundos
            setTimeout(() => setSuccessMessage(''), 3000)
        }, 2000) // Espera de 2 segundos para el spinner
    };

    return (
        <form className="frame-task" onSubmit={handleSubmit}>
            {/* Mostrar mensaje de error si existe */}
            {error && <p style={{ color: 'red' }} className='mb-4'>{error}</p>}

            {/* Mostrar mensaje de éxito si la tarea se creó correctamente */}
            {successMessage && <p style={{ color: 'green' }} className='mb-4'>{successMessage}</p>}
            
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

            <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={loading}
            >
                {loading ? (
                <div className="flex justify-center items-center">
                    <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/8000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Guardando...
                </div>
                ) : 'Guardar tarea'}
            </button>
        </form>
    )
}

export default TaskForm

