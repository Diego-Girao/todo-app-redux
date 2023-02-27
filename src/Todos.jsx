import React, { useRef } from "react"
import moonIcon from "./images/icon-moon.svg"
import sunIcon from "./images/icon-sun.svg"
import Todo from "./Todo"

import { useSelector } from "react-redux"
import { selectDarkMode, toggleTheme } from "./features/slices/themeSlice"
import { useDispatch } from "react-redux"

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
	// Referência para o input de adição de tarefas
	const inputRef = useRef()

	// Estado de tema escuro da aplicação
	const darkMode = useSelector(selectDarkMode)
	const dispatch = useDispatch()

	// Seleciona todas as tarefas, tarefas completas e tarefas ativas da store
	const todos = useSelector(selectTodos)
	const completedTodos = useSelector(selectCompletedTodos)
	const activeTodos = useSelector(selectActiveTodos)

	// Estados para controlar o filtro de exibição de tarefas
	const showTodos = useSelector(selectShowTodos)
	const showActiveTodos = useSelector(selectShowActiveTodos)
	const showCompletedTodos = useSelector(selectShowCompletedTodos)

	// Variável para armazenar as tarefas que devem ser exibidas na lista
	let todosToRender

	// Contador de tarefas ativas
	let activeTodosNumber = 0

	// Função para adicionar nova tarefa à store
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

	// Funções para atualizar o estado de filtro de exibição de tarefas
	const showCompletedHandler = () => {
		dispatch(showCompletedFunction())
	}

	const showAllHandler = () => {
		dispatch(showAllFunctions())
	}

	const showActiveHandler = () => {
		dispatch(showActiveFunction())
	}

	// Função para limpar tarefas completas da store
	const clearCompletedHandler = () => {
		dispatch(clearCompleted())
	}

	// Define qual conjunto de tarefas deve ser exibido com base no estado de filtro
	if (showActiveTodos) {
		todosToRender = activeTodos
	} else if (showCompletedTodos) {
		todosToRender = completedTodos
	} else {
		todosToRender = todos
	}

	// Conta o número de tarefas ativas
	todos?.forEach((todo) => {
		if (!todo.completed) {
			activeTodosNumber++
		}
	})

	return (
		<div className="todos">
			{/* Cabeçalho da aplicação */}
			<div className="todosHeader">
				<h1>TODO</h1>
				{/* Botão de alternância de tema */}
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
						id={todo.id}
						completed={todo.completed}
					/>
				))}

				<div className={`todos_footer ${!darkMode ? "whiteBg" : ""}`}>
					<p>{activeTodosNumber} items left</p>

					<div className="types">
						<div className="types">
							<p
								className={`clear ${showTodos ? "active" : ""}`}
								onClick={showAllHandler}
							>
								All
							</p>

							<p
								className={`clear ${showActiveTodos ? "active" : ""}`}
								onClick={showActiveHandler}
							>
								Active
							</p>

							<p
								className={`clear ${showCompletedTodos ? "active" : ""}`}
								onClick={showCompletedHandler}
							>
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
