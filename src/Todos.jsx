import React, { useRef } from "react"
import moonIcon from "./images/icon-moon.svg"
import sunIcon from "./images/icon-sun.svg"
import Todo from "./Todo"

import { useDispatch, useSelector } from "react-redux"
import { selectDarkMode, toggleTheme } from "./features/slices/themeSlice"

import {
	addTodo,
	clearCompleted,
	selectActiveTodos,
	selectCompletedTodos,
	selectShowActiveTodos,
	selectShowCompletedTodos,
	selectShowTodos,
	selectTodos,
} from "./features/slices/todosSlice"

import { showAllFunctions } from "./features/slices/todosSlice"
import { showCompletedFunction } from "./features/slices/todosSlice"
import { showActiveFunction } from "./features/slices/todosSlice"

function Todos() {
	const inputRef = useRef()

	const darkMode = useSelector(selectDarkMode)
	const dispatch = useDispatch()

	const todos = useSelector(selectTodos)
	const completedTodos = useSelector(selectCompletedTodos)
	const activeTodos = useSelector(selectActiveTodos)

	const showTodos = useSelector(selectShowTodos)
	const showActiveTodos = useSelector(selectShowActiveTodos)
	const showCompletedTodos = useSelector(selectShowCompletedTodos)

	let todosToRender
	let activeTodosNumber = 0

	const submitTodo = (e) => {
		e.preventDefault()

		if (inputRef.current.value.trim()) {
			dispatch(
				addTodo({
					id: Math.random() * 1000,
					content: inputRef.current.value,
					completed: false,
				})
			)
		}

		inputRef.current.value = ""
	}

	const showCompletedHandler = () => {
		dispatch(showCompletedFunction())
	}

	const showAllHandler = () => {
		dispatch(showAllFunctions())
	}

	const showActiveHandler = () => {
		dispatch(showActiveFunction())
	}

	const clearCompletedHandler = () => {
		dispatch(clearCompleted())
	}

	if (showActiveTodos) {
		todosToRender = activeTodos
	} else if (showCompletedTodos) {
		todosToRender = completedTodos
	} else {
		todosToRender = todos
	}

	todos?.forEach((todo) => {
		if (!todo.completed) {
			activeTodosNumber++
		}
	})

	return (
		<div className="todos">
			<div className="todosHeader">
				<h1>TODO</h1>
				{darkMode ? (
					<img
						src={sunIcon}
						alt="icon toggle theme sun"
						onClick={() => dispatch(toggleTheme())}
					/>
				) : (
					<img
						src={moonIcon}
						alt="icon toggle theme moon"
						onClick={() => dispatch(toggleTheme())}
					/>
				)}
			</div>

			<div className="input_container">
				<div className="circle"></div>
				<form onSubmit={submitTodo}>
					<input
						type="text"
						ref={inputRef}
						placeholder="Create a new todo..."
						className={!darkMode ? "whiteBg" : ""}
					/>
					<button type="submit" hidden></button>
				</form>
			</div>

			<div className={`todos_container ${!darkMode ? "whiteBg" : ""}`}>
				{todosToRender.map((todo) => (
					<Todo
						content={todo.content}
						key={todo.id}
						completed={todo.completed}
					/>
				))}

				<div className={`todos_footer ${!darkMode ? "whiteBg" : ""}`}>
					<p>0 items left</p>

					<div className="types">
						<div className="types">
							<p className={`clear ${showTodos ? "active" : ""}`}>All</p>

							<p className={`clear ${showActiveTodos ? "active" : ""}`}>
								Active
							</p>

							<p className={`clear ${showCompletedTodos ? "active" : ""}`}>
								Completed
							</p>
						</div>
					</div>
					<p className="clear" onClick={clearCompletedHandler}>
						Clear Completed
					</p>
				</div>
			</div>
		</div>
	)
}

export default Todos
