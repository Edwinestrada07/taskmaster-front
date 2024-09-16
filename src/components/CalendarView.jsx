import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Función para obtener las tareas desde la API
const fetchTasks = async () => {
    const baseUrl = 'https://taskmaster-back.onrender.com/task';
    const url = `${baseUrl}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { authorization: localStorage.getItem('token') },
    });

    if (!response.ok) throw new Error('No se pudo obtener la lista de tareas.');
    return await response.json();
};

// Función para obtener detalles de la tarea desde la API
const fetchTaskDetails = async (taskId) => {
    const response = await fetch(`https://taskmaster-back.onrender.com/task/${taskId}/detail`, {
        headers: { authorization: localStorage.getItem('token') },
    });

    if (!response.ok) throw new Error('No se pudieron obtener los detalles de la tarea.');
    return await response.json();
};

const CalendarView = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const loadTasks = useCallback(async () => {
        try {
            const tasksData = await fetchTasks();
            setTasks(tasksData);
            setError(null);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
            setError('Error al obtener las tareas. Por favor, inténtalo de nuevo más tarde.');
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // Filtra las tareas por la fecha seleccionada
    const getTasksForDate = (date) => {
        const selectedDate = new Date(date).toLocaleDateString(); // Ajustamos formato
        return tasks.filter(task => {
            const taskDate = new Date(task.creationDate).toLocaleDateString();
            return taskDate === selectedDate;
        });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Calendario</h2>
            <Calendar
                onChange={handleDateChange}
                value={date}
                className="react-calendar"
            />
            <div className="mt-4 text-gray-800 dark:text-gray-200">
                <p className="font-semibold">Fecha seleccionada:</p>
                <p>{date.toDateString()}</p>
                <div className="mt-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Tareas en esta fecha:</h3>
                    <ul>
                        {getTasksForDate(date).map(task => (
                            <li key={task.id} className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                                <p className="font-semibold">{task.title}</p>
                                <p>{task.description}</p>
                                <button
                                    className="mt-1 px-2 py-1 bg-blue-500 text-white rounded"
                                    onClick={async () => {
                                        try {
                                            const taskDetails = await fetchTaskDetails(task.id);
                                            setDetails(taskDetails);
                                        } catch (error) {
                                            setError('Error al obtener los detalles de la tarea.');
                                        }
                                    }}
                                >
                                    Ver detalles
                                </button>
                            </li>
                        ))}
                        {getTasksForDate(date).length === 0 && (
                            <li className="text-gray-600 dark:text-gray-400">
                                No hay tareas para esta fecha.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {details && (
                <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Detalles de la Tarea</h3>
                    <p>{details.description}</p>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
