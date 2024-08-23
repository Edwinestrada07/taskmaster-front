const apiUrl = process.env.REACT_APP_API_URL;

export const fetchFromApi = async (endpoint, method = 'GET', body = null, headers = {}) => {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers, // Permite añadir headers adicionales si es necesario
            },
            body: body ? JSON.stringify(body) : null, // Serializa el cuerpo solo si es necesario
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        // Si la respuesta tiene contenido JSON, se devuelve; de lo contrario, se retorna null
        return response.status !== 204 ? response.json() : null; 
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};
