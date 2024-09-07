import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
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
            contentLabel="Activar Pomodoro"
            className="bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >   
            <button
                className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600"
                onClick={onRequestClose}
            >
                <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Activar Pomodoro</h2>
            <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
            >
                <option value="" className="bg-gray-800 text-white-50">Seleccione una tarea</option>
                {tasks.map(task => (
                    <option key={task.id} value={task.id} className="bg-gray-800 text-white-50">
                        {task.description}
                    </option>
                ))}
            </select>
            <div className="text-center m-4">
                <span className="text-5xl font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex justify-center mx-auto">
                <button
                    onClick={handleStart}
                    disabled={isRunning}
                    className={`px-4 py-2 mr-2 rounded-md ${isRunning ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`}
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
                    className="px-4 ml-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                    Reiniciar
                </button>
            </div>
        </Modal>
    );
};

export default PomodoroModal;
