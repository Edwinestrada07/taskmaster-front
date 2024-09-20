import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

function OpenHelpModal({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Buscar Tarea"
            className="bg-gray-800 text-white p-4 sm:p-6 rounded-lg sm:rounded-3xl w-full max-w-lg sm:max-w-2xl relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <button
                className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600"
                onClick={onRequestClose}
            >
                <FaTimes size={20} />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold mb-4 modal-header">Video de Ayuda</h2>

            <div className="modal-body">
                <iframe
                    width="100%"
                    height="400"
                    className="sm:height-415"
                    src="https://www.youtube.com/embed/sq_dfV6iO8Y" 
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </Modal>
    );
}

export default OpenHelpModal;
