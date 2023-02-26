import React, { useRef } from "react"
import moonIcon from "./images/icon-moon.svg"
import sunIcon from "./images/icon-sun.svg"
import Todo from "./Todo"

function Todos() {
	const inputRef = useRef()
	return (
		<div className="todos">
			<div className="todosHeader">
				<h1>TODOS</h1>
				<img src={moonIcon} alt="icon toggle theme moon" />
			</div>
			<div className="input_container">
				<div className="circle"></div>
				<form>
					<input
						type="text"
						ref={inputRef}
						placeholder="Create a new todo..."
					/>
					<button type="submit" hidden></button>
				</form>
			</div>
			<div className="todos_container">
				<Todo />
				<div className="todos_footer">
					<p>0 items left</p>

					<div className="types">
						<div className="types">
							<p className="clear">All</p>
							<p className="clear">Active</p>
							<p className="clear">Completed</p>
						</div>
						<p className="clear">Clear Completed</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Todos
