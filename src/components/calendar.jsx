import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [date, setDate] = useState(new Date());   // Fecha seleccionada
    const [tasks, setTasks] = useState([]);         // Todas las tareas
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]); // Tareas para la fecha seleccionada
    const [error, setError] = useState(null);       // Manejo de errores
    
    // Actualiza la fecha seleccionada cuando se hace clic en el calendario
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    // Función para obtener todas las tareas del mes
    const fetchTasks = async () => {
        const baseUrl = `https://taskmaster-back.onrender.com/task`;
        try {
            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: { authorization: localStorage.getItem('token') },
            });

            if (!response.ok) throw new Error('No se pudieron obtener las tareas.');
            
            const data = await response.json();
            setTasks(data);
            setError(null); // Limpiar error si la solicitud fue exitosa
        } catch (err) {
            console.error(err.message);
            setError('No se pudieron obtener las tareas.');
            setTasks([]); // Vaciar las tareas si hay error
        }
    };

    // Filtrar las tareas según la fecha seleccionada (memoizada con useCallback)
    const filterTasksByDate = useCallback((selectedDate) => {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Formatea la fecha (YYYY-MM-DD)
        const tasksForDate = tasks.filter(task => task.createdAt.split('T')[0] === formattedDate);
        setTasksForSelectedDate(tasksForDate);
    }, [tasks]);

    // Llama a fetchTasks al cargar el componente
    useEffect(() => {
        fetchTasks();
    }, []);

    // Filtra las tareas cuando cambia la fecha seleccionada
    useEffect(() => {
        filterTasksByDate(date);
    }, [date, filterTasksByDate]);

    // Resaltar los días en los que hay tareas en el calendario
    const highlightTasksOnCalendar = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            const taskDates = tasks.map(task => task.createdAt.split('T')[0]);
            if (taskDates.includes(formattedDate)) {
                return (
                    <div className="highlight bg-red-500 rounded-full w-2 h-2 mx-auto mt-1"></div>
                );
            }
        }
    };

    return (
        <div className="flex justify-center items-center mb-3">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-4 max-w-4xl w-full lg:w-3/4 md:w-full shadow-lg border-1 border-purple-500 animate-pulse-border">
                <Calendar
                    onChange={handleDateChange}   // Cambia la fecha cuando se selecciona en el calendario
                    value={date}                  // Fecha actualmente seleccionada
                    className="react-calendar rounded-3xl w-full"
                    tileContent={highlightTasksOnCalendar} // Resalta los días con tareas
                    tileClassName="text-lg"       // Para que los números del calendario sean más grandes
                />
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Tareas creadas el {date.toDateString()}:
                    </h3>
                    {error && (
                        <p className="text-red-500">{error}</p>
                    )}
                    {!error && tasksForSelectedDate.length === 0 && (
                        <p className="text-red-600 dark:text-red-400 font-bold">
                            No hay tareas creadas en esta fecha.
                        </p>
                    )}
                    {tasksForSelectedDate.length > 0 && (
                        <ul className="space-y-2 max-h-64 overflow-auto sm:max-h-40">
                            {tasksForSelectedDate.map(task => (
                                <li key={task.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow text-gray-800 dark:text-gray-200">
                                    <p className="font-semibold">{task.title}</p>
                                    <p>{task.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
