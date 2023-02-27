import { createSlice } from "@reduxjs/toolkit"

export const todosSlice = createSlice({
	name: "todos",
	initialState: {
		todos: [],
		completedTodos: [],
		activeTodos: [],
		showTodos: true,
		showCompletedTodos: true,
		showActiveTodos: false,
	},

	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload)
		},
		completeTodo: (state, action) => {
			state.todos.forEach((todo) => {
				if (todo.id === action.payload) {
					todo.completed = !todo.completed
				}
			})
		},
		removeTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload)

			if (
				state.completedTodos.findIndex((todo) => todo.id === action.payload) !==
				-1
			) {
				state.completedTodos = state.completedTodos.filter(
					(todo) => todo.id !== action.payload
				)
			}
			if (
				state.activeTodos.findIndex((todo) => todo.id === action.payload) !== -1
			) {
				state.activeTodos = state.activeTodos.filter(
					(todo) => todo.id !== action.payload
				)
			}
		},
		showAllFunctions: (state) => {
			state.showTodos = true
			state.showActiveTodos = false
			state.showCompletedTodos = false
		},

		showActiveFunction: (state) => {
			const activeTodos = state.todos.filter((todo) => !todo.completed)

			state.activeTodos = activeTodos

			state.showTodos = false
			state.showActiveTodos = true
			state.completedTodos = false
		},
	},
})

export const { increment, decrement, incrementByAmount } = todosSlice.actions

export const selectCount = (state) => state.counter.value

export default todosSlice.reducer
