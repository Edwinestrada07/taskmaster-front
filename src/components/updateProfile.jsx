import { useEffect } from "react";
import { useState } from "react";

function UpdateProfile({ user, setUser }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [formData, setFormData] = useState({}); // Inicializamos formData como un objeto vacío

    // Actualizamos el formData cuando el usuario cambia
    useEffect(() => {
        setFormData({
            id: user.id || '', // Si user.id es undefined, lo inicializamos como una cadena vacía
            name: user.name || '', // Si user.name es undefined, lo inicializamos como una cadena vacía
            email: user.email || '', // Si user.email es undefined, lo inicializamos como una cadena vacía
        });
    }, [user]); // Volvemos a ejecutar este efecto cuando el usuario cambia

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {   
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No se encontró token de autorización.");
                return;
            }
            
            const updatedUser = { id: formData.id, name: formData.name, email: formData.email }; // Usamos formData en lugar de user
            const response = await fetch(`http://localhost:5000/user/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify(updatedUser)
            });
    
            if (!response.ok) {
                throw new Error('No se pudo actualizar la información del usuario.');
            }
    
            const responseData = await response.json();
            console.log('Perfil actualizado:', responseData);
            
            setUser(responseData);
        } catch (error) {
            console.error('Error al actualizar Perfil', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const handleChangePassword = async () => {
        try {
            const response = await fetch('http://localhost:5000/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ password, newPassword }),
            });

            if (response.ok) {
                alert('Contraseña cambiada exitosamente.');
            } else {
                const errorData = await response.json();
                console.error('Error al cambiar la contraseña:', errorData.message);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const handleImageChange = async (e) => {
        try {
            const selectedImage = e.target.files[0];
            const formData = new FormData();
            formData.append('image', selectedImage);
            
            const response = await fetch(`http://localhost:5000/user/${user.id}/avatar`, {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('token')
                },
                body: formData
            });
            
            if (response.ok) {
                alert('Imagen de perfil actualizada correctamente.');
                
            } else {
                const errorData = await response.json();
                console.error('Error al actualizar la imagen de perfil:', errorData.message);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h3>Actualizar Información</h3>
            <div>
                <img src={user.profileImageUrl} alt="Perfil" />
                <input type="file" onChange={handleImageChange} />
            </div>
            <div>
                <label>Nombre de Usuario:</label>
                <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </div>
            <div>
                <label>Correo Electrónico:</label>
                <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>
            <div>
                <label>Contraseña Actual:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Nueva Contraseña:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button type="submit">Actualizar Perfil</button>
            <button type="button" onClick={handleChangePassword}>Cambiar Contraseña</button>
        </form>
    );
}

export default UpdateProfile;
