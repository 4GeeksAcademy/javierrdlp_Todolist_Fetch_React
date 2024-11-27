import React, { useState } from 'react';

const Li = ({ toDo, index, setListToDo, id }) => {
    const [classButton, setClassButton] = useState(
        "position-absolute top-50 end-0 translate-middle-y me-2 text-danger-emphasis d-none"
    );

    function borrarTodo(idTodo){
        fetch("https://playground.4geeks.com/todo/todos/" + idTodo,{
			method: "DELETE",			
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((data) => {console.log(data)})
		.catch((err) => {err})

    }
    const borrado = () => {
        setListToDo((list) => list.filter((_, indice) => indice !== index));
       
    };

    const aparecer = () => {
        setClassButton(
            "bi bi-x-square position-absolute top-50 end-0 translate-middle-y me-3 text-danger-emphasis h5"
        );
    };

    const ocultar = () => {
        setClassButton(
            "bi bi-x-square position-absolute top-50 end-0 translate-middle-y me-3 text-danger-emphasis h5 d-none"
        );
    };

    if (toDo.length == 0) {
        return (<li className="list-group-item">There isn't taks, add one...</li>);
    }
    else {

        return (
            <li className="list-group-item" onMouseLeave={ocultar} onMouseOver={aparecer}>
                <span>{toDo}</span>
                <i className={classButton}
                    onClick={
                        () => borrarTodo(id)                        
                    }>
                </i>
            </li>
        );
    }
};

export default Li;