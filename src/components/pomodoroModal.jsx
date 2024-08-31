import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PomodoroModal = ({ isOpen, onRequestClose, tasks }) => {
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            alert('¡Tiempo de Pomodoro completado!');
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const handleStart = () => {
        if (selectedTaskId) {
            setIsRunning(true);
        } else {
            alert('Seleccione una tarea para iniciar el Pomodoro.');
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Activar Pomodoro"
            className="bg-white p-6 rounded-md max-w-md mx-auto mt-20 shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <h2 className="text-2xl font-semibold mb-4">Activar Pomodoro</h2>
            <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
                <option value="">Seleccione una tarea</option>
                {tasks.map(task => (
                    <option key={task.id} value={task.id}>
                        {task.title}
                    </option>
                ))}
            </select>
            <div className="text-center mb-4">
                <span className="text-6xl font-bold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handleStart}
                    disabled={isRunning}
                    className={`px-4 py-2 rounded-md ${isRunning ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                    Iniciar
                </button>
                <button
                    onClick={() => setIsRunning(false)}
                    disabled={!isRunning}
                    className={`px-4 py-2 rounded-md ${!isRunning ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
                >
                    Pausar
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                    Reiniciar
                </button>
            </div>
        </Modal>
    );
};

export default PomodoroModal;
