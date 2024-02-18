import { useState } from "react"

const registerForm = ({ onSubmit }) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ successMessage, setSuccessMessage ] = useState('')

    const handleSubmit = async (event) => {
        event.prevenDefault()
        onSubmit({ name, email, password })

        try {
            if(!signup.name || !signup.email || !signup.password) {
                setErrorMessage('Por favor, complete todos los campos')
                return
            }
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"    
                },
                body: JSON.stringify(signup)
            })

            if(!response.ok) {
                throw new Error('Error al registrar usuario')
            }

            const dataResponse = await response.json()

            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)

            setSuccessMessage('Usuario registrado con éxito')
            setErrorMessage('')

        } catch (error) {
            setErrorMessage('Error al registrar usuario. Verifica la información proporcionada')
            console.error('error', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <div>{errorMessage}</div>}
            {successMessage && <div>{successMessage}</div>}

            <h3>Registrarse</h3>

            <input
                type="text"
                placeholder="Nombre de usuario"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type='password'
                placeholder='Contraseña'
                value={password}
                onChange={(event) => setPassword(event.target.value)} 
            />
            <button type='submit'>Registrarse</button>
        </form>
    )
}

export default registerForm