import { useState } from "react"

const profileForm = ({ user, onSubmit }) => {
    const [ name, setName ] = useState(user.name)
    const [ email, setEmail ] = useState(user.email)

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit({ name, email })
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Guardar cambios</button>
        </form>
    )
}

export default profileForm