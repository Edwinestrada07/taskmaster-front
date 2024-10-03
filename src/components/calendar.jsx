import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
    const [error, setError] = useState(null);
    const [showTaskDays, setShowTaskDays] = useState(false);  // Estado para mostrar días con tareas

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

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
            setError(null);
        } catch (err) {
            console.error(err.message);
            setError('No se pudieron obtener las tareas.');
            setTasks([]);
        }
    };

    const filterTasksByDate = useCallback((selectedDate) => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const tasksForDate = tasks.filter(task => task.createdAt.split('T')[0] === formattedDate);
        setTasksForSelectedDate(tasksForDate);
    }, [tasks]);

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        filterTasksByDate(date);
    }, [date, filterTasksByDate]);

    // Resalta los días en los que se crearon tareas
    const highlightTasksOnCalendar = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            const taskDates = tasks.map(task => task.createdAt.split('T')[0]);
            if (taskDates.includes(formattedDate)) {
                return <div className="highlight bg-red-500 rounded-full w-2 h-2 mx-auto mt-1"></div>;
            }
        }
    };

    // Botón que al hacer clic muestra todas las fechas con tareas
    const handleShowTaskDays = () => {
        setShowTaskDays(!showTaskDays);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center mb-24 p-4 space-x-4">
            <div className="rounded-xl shadow-lg border-2 dark:border-gray-700 p-4 w-full sm:w-auto sm:max-w-lg bg-white dark:bg-gray-800">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="rounded-2xl w-full mx-auto"
                    tileContent={showTaskDays ? highlightTasksOnCalendar : null}
                    tileClassName="text-XL"
                />
                <button
                    onClick={handleShowTaskDays}
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    {showTaskDays ? 'Ocultar días con tareas' : 'Mostrar días con tareas'}
                </button>
            </div>

            <div className="w-64 sm:w-1/2">
                <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-200 m-4">
                    Tareas creadas el {date.toDateString()}:
                </h3>

                {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

                {!error && tasksForSelectedDate.length === 0 && (
                    <p className="text-center text-red-600 dark:text-red-400 font-bold">
                        No hay tareas creadas en esta fecha.
                    </p>
                )}
                
                {tasksForSelectedDate.length > 0 && (
                    <ul className="space-y-2 max-h-64 overflow-auto sm:max-h-40">
                        {tasksForSelectedDate.map(task => (
                            <li
                                key={task.id}
                                className="bg-gray-300 dark:bg-gray-700 p-3 rounded-lg shadow-md text-gray-800 dark:text-gray-200"
                            >
                                <p className="font-semibold">{task.title}</p>
                                <p className="text-sm">{task.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CalendarView;
