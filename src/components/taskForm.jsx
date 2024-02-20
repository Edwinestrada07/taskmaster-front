function TaskForm(props) {

    const submit = async (event) => {
        event.preventDefault()
        
    props.onSubmit()
    }
    
    return (
        <>
            <form className="d-flex" onSubmit={submit}> 
                <div className="form-group m-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Descripción"
                        name="description"
                        id="description"
                        value={ props.task.description ||  ''}
                    />
                </div>
                <div className="form-group m-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Fecha de Vencimineto"
                        name="dueDate"
                        id="dueDate"
                        value={ props.task.dueDate ||  ''}
                    />
                </div>
                <div className="form-group m-2">
                    <button 
                        className="btn btn-primary" 
                        type="submit"
                    >
                        Guardar
                    </button>
                </div>
            </form>

            <div className="btn mx-2">
                <button 
                    className="btn btn-primary" 
                    type="submit"
                    onClick={props.onClear}
                >
                    Limpiar
                </button>
            </div>
        </>
    )
}

export default TaskForm