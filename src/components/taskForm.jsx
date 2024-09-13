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
        <form onSubmit={handleSubmit}>
            {/* Mostrar mensaje de error si existe */}
            {error && <p style={{ color: 'red' }} className='mb-4'>{error}</p>}

            {/* Mostrar mensaje de éxito si la tarea se creó correctamente */}
            {successMessage && <p style={{ color: 'green' }} className='mb-4'>{successMessage}</p>}
            
            <input
                className="border-1 mb-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                type="text"
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                className="border-1 mb-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                type="date"
                name="dueDate"
                placeholder="Fecha de vencimiento"
                value={formData.dueDate}
                onChange={handleChange}
            />

            <select className="border-1 mb-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none" 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange}
            >
                <option className='bg-gray-800 text-white-50' value="">Selecciona una prioridad</option>
                <option className='bg-gray-800 text-white-50' value="LOW">Baja</option>
                <option className='bg-gray-800 text-white-50' value="MEDIUM">Media</option>
                <option className='bg-gray-800 text-white-50' value="HIGH">Alta</option>
            </select>

            <select className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
            >
                <option className='bg-gray-800 text-white-50' value="">Selecciona un estado</option>
                <option className='bg-gray-800 text-white-50' value="PENDING">Pendiente</option>
                <option className='bg-gray-800 text-white-50' value="IN_PROGRESS">En progreso</option>
                <option className='bg-gray-800 text-white-50' value="COMPLETED">Completada</option>
            </select>

            <button
                type="submit"
                className="transition-background mt-3 inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                disabled={loading}
            >
                {loading ? (
                <div className="flex justify-center items-center">
                    <svg className="w-5 h-5 mr-2 text-gray animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-85" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Guardando...
                </div>
                ) : 'Guardar tarea'}
            </button>
        </form>
    )
}

export default TaskForm

