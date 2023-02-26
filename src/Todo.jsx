import React from "react"
import crossIcon from "./images/icon-cross.svg"
import checkIcon from "./images/icon-check.svg"

function Todo() {
	return (
		<div className="todo_container">
			<div className="circle">
				<img src={checkIcon} alt="" />
			</div>

			<li className="todo">Example</li>

			<img src={crossIcon} className="delete-icon" alt="" />
		</div>
	)
}

export default Todo
