import React, { useEffect, useState } from 'react';
import TaskItem from '../components/taskItem';

const FavoriteTasksPage = () => {
    const [favoriteTasks, setFavoriteTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchFavoriteTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/task/favorites', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('No se pudo obtener las tareas favoritas.');
            }
            const data = await response.json();
            setFavoriteTasks(data);
            setError(null);
        } catch (error) {
            console.error("Error al obtener las tareas favoritas:", error);
            setError("Error al obtener las tareas favoritas. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    useEffect(() => {
        fetchFavoriteTasks();
    }, []);

    return (
        <div className="p-3 bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC] dark:bg-gradient-to-b dark:from-[#1a202c] dark:via-[#2d3748] dark:to-[#2d3748]">
            {error && <p className="text-red-500">{error}</p>}
            {favoriteTasks.length > 0 ? (
                <div>
                    {favoriteTasks.map((task, index) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            index={index}
                            // Otros props como onFavoriteTask
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-700 dark:text-gray-300">No hay tareas marcadas como favoritas.</p>
            )}
        </div>
    );
};

export default FavoriteTasksPage;

