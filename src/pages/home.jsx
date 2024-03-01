import React from 'react'

const Home = () => {
    return (
        <div className="form_container p-5">

            <h2 className='text'>Bienvenido a TaskMaster</h2>
            <p className='text m-4'>Una aplicación diseñada para ayudarte a organizar tus tareas diarias de manera eficiente.</p>

            <h4 className='text-a'>Funcionalidades:</h4>
            <ul className='text-ul'>
                <li>Agregar nuevas tareas con detalles como descripción, fecha de vencimiento, prioridad y estado.</li>
                <li>Editar y actualizar información de tareas existentes.</li>
                <li>Marcar tareas como completadas.</li>
                <li>Organizar tareas por diferentes criterios como fecha, prioridad, etc.</li>
                <li>Eliminar tareas que ya no son necesarias.</li>
                <li>Recordatorios y notificaciones para tareas próximas a la fecha de vencimiento.</li>
                <li>Interfaz intuitiva y fácil de usar.</li>
            </ul>

            <h4 className='text m-4'>Ejemplo de Lista de Tareas:</h4>
            <div className="row">
                <div className="col-sm-6">
                    <div className="frame-card">
                        <div className="frame-card text-a p-5">
                            <h5 className="text m-3">Comprar víveres para la semana</h5>
                            <p><strong>Fecha de vencimiento:</strong> 03/03/2024</p>
                            <p><strong>Prioridad:</strong> Alta</p>
                            <p><strong>Descripción:</strong> Comprar frutas, verduras, carne y productos básicos para la semana.</p>
                            <a href="/task" className="btn btn-primary">Realiza una pueba</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="frame-card">
                        <div className="frame-card text-a p-5">
                            <h5 className="text m-3">Preparar informe mensual</h5>
                            <p><strong>Fecha de vencimiento:</strong> 10/03/2024</p>
                            <p><strong>Prioridad:</strong> Media</p>
                            <p><strong>Descripción:</strong> Recolectar datos y preparar informe para la reunión mensual.</p>
                            <a href="/task" className="btn btn-primary">Realiza una pueba</a>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className="text m-4">Cambia tu información de usuario</h5>
                    <div className="frame-card text-a p-5">
                        <h5 className="text-a m-3">Gestiona tu perfil</h5>
                        <p>
                            Se logra gestionar el perfil de usuario de una manera sencilla y eficaz, otorgando una 
                            experiencia intuitiva a la hora de cambiar nombre de usuario, correo o contraseña
                        </p>
                        <a href="/profile" className="btn btn-primary">Cambia tu perfil</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home
