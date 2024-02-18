import { useState } from 'react'

const loginForm = ({ onSubmit }) => {
    const [ email, setEmail ] = useState('')
    const  [password, setPassword ] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        onSubmit({ email, password })

        try {
            //Con el fetch conectamos nuestro login al back
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login) // Va la data como un String    
            })

            if(!response.ok) {
                throw new Error('Error al iniciar sesión')
            }

            const dataResponse = await response.json()

            localStorage.setItem('user', JSON.stringify(dataResponse.user))
            localStorage.setItem('token', dataResponse.token)

        } catch (error) {
            console.error('error', error)            
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Iniciar Sesión</h3>
            
            <input
                type='email'
                placeholder='Correo Electrónico'
                value={email}
                onChange={(event) => setEmail(event.target.value)} 
            />
            <input
                type='password'
                placeholder='Contraseña'
                value={password}
                onChange={(event) => setPassword(event.target.value)} 
            />
            <button type='submit'>Iniciar Sesión</button>
        </form>
    )
}

export default loginForm