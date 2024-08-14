import React, { useEffect, useState } from 'react';

const TaskHistoryPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/task/history');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Historial de Tareas</h1>
            <div>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <h3>{task.description}</h3>
                            <p>Status: {task.priority}</p>
                            <p>Status: {task.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay tareas en el historial.</p>
                )}
            </div>
        </div>
    );
};

export default TaskHistoryPage;
