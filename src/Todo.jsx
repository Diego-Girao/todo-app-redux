import React from "react"
import crossIcon from "./images/icon-cross.svg"
import checkIcon from "./images/icon-check.svg"

import { useSelector } from "react-redux"
import { selectDarkMode } from "./features/slices/themeSlice"

function Todo() {
	const darkMode = useSelector(selectDarkMode)

	return (
		<div className="todo_container">
			<div className="circle">
				<img src={checkIcon} alt="" />
			</div>

			<li className={`todo ${!darkMode ? "whiteBg" : ""}`}>Example</li>

			<img src={crossIcon} className="delete-icon" alt="" />
		</div>
	)
}

export default Todo
