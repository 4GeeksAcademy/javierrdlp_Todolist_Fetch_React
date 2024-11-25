import React, { useEffect, useState } from 'react';

//include images into your bundle

import Li from "./Li"

//create your first component
const Home = () => {

	const [listTodo, setListTodo] = useState([])
	const [newTodo, setNewTodo] = useState("")
	
	useEffect(
		() =>{
			fetch("https://playground.4geeks.com/todo/users/javierR")
	.then((response) => {console.log(response)
		return response.json()
	})
	.then((data) => {
		console.log(data)
		const arrayTodos = []
		data.todos.forEach(element => {
			console.log(element)
			arrayTodos.push(element.label)
		});
		
		setListTodo(arrayTodos)
	})
	.catch((err) => {err})

		}, []);

	function postToDo(task){
		
		let data = {
			"label": task,
			"is_done": false
		}

		fetch("https://playground.4geeks.com/todo/todos/javierR",{
			method: "POST",
			body: JSON.stringify(data),
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

	


	return (
		<div className="container">
			<div className="row">
				<div className="col-4" />
				<div className="col-4">
					<h1 className="display-1 text-danger-emphasis mt-5">To Do List...</h1>
					<div className="input-group flex-nowrap">
						<input type="text" className="form-control mb-3" placeholder="Write something to do later..."
							value={newTodo}
							onChange={(e) => {
								setNewTodo(e.target.value)
							}}
							onKeyUp={(e) => {
								if (e.key === "Enter" && newTodo.length > 0) {

									postToDo(newTodo)
									
									//setListTodo([...listTodo, newTodo])
									setNewTodo("")
								}
							}}
						/>
					</div>
					<ul className="list-group list-group-flush">
						{listTodo.length === 0 ? (
							<li className="list-group-item">
								<p className='text-danger-emphasis fw-bold'>No tasks yet, add one...</p>
							</li>
						) : (
							listTodo.map((value, index) => (
								<Li key={index} toDo={value} index={index} setListToDo={setListTodo} />
							))
						)}
						<li className="list-group-item">
							<span className="fw-light fst-italic text-danger-emphasis fw-bold" style={{ fontSize: "12px" }}>{listTodo.length} items left</span>
						</li>
					</ul>
				</div>
				<div className="col-4" />
			</div>
		</div>
	);
};

export default Home;
