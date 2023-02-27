import React from "react"
import crossIcon from "./images/icon-cross.svg"
import checkIcon from "./images/icon-check.svg"

import { useSelector, useDispatch } from "react-redux"
import { selectDarkMode } from "./features/slices/themeSlice"

import { completeTodo, removeTodo } from "./features/slices/todosSlice"

function Todo({ content, completed, id }) {
	const darkMode = useSelector(selectDarkMode)
	const dispatch = useDispatch()

	const completedTodoHandler = () => {
		dispatch(completeTodo(id))
	}

	const removeTodoHandler = () => {
		dispatch(removeTodo(id))
	}

	return (
		<div className="todo_container">
			<div className={`circle ${completed ? "active" : ""}`}>
				<img src={checkIcon} alt="" />
			</div>

			<li className={`todo ${!darkMode ? "whiteBg" : ""}`}>{content}</li>

			<img src={crossIcon} className="delete-icon" alt="" />
		</div>
	)
}

export default Todo
