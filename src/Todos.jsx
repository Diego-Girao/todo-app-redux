import React, { useRef } from "react"
import moonIcon from "./images/icon-moon.svg"
import sunIcon from "./images/icon-sun.svg"
import Todo from "./Todo"

import { useDispatch, useSelector } from "react-redux"
import { selectDarkMode, toggleTheme } from "./features/slices/themeSlice"

function Todos() {
	const inputRef = useRef()

	const darkMode = useSelector(selectDarkMode)
	const dispatch = useDispatch()

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
				<form>
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
				<Todo />

				<div className={`todos_footer ${!darkMode ? "whiteBg" : ""}`}>
					<p>0 items left</p>

					<div className="types">
						<div className="types">
							<p className="clear">All</p>

							<p className="clear">Active</p>

							<p className="clear">Completed</p>
						</div>
					</div>
					<p className="clear">Clear Completed</p>
				</div>
			</div>
		</div>
	)
}

export default Todos
