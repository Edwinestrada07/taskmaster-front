//index.js. Este archivo es el punto de entrada de tu aplicación, y es 
//el lugar adecuado para incluir configuraciones globales y efectos secundarios

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import router from './router';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ThemeDarkMode } from './themeDarkMode/themeDark';
import TaskList from './components/taskList';

// Aplica el modo oscuro
ThemeDarkMode();

const App = () => {
    const [tasks, setTasks] = useState([
        <TaskList />
    ]);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // Verifica si el destino es nulo (es decir, se soltó fuera de una zona droppable)
        if (!destination) return;

        // Verifica si la posición de destino es la misma que la posición de origen
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Actualiza el estado de las tareas
        const updatedTasks = tasks.map(task => {
            if (task.id === draggableId) {
                return { ...task, status: destination.droppableId }; // Asigna el nuevo estado basado en el ID del destino
            }
            return task;
        });

        setTasks(updatedTasks);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <RouterProvider router={router} />
        </DragDropContext>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();






