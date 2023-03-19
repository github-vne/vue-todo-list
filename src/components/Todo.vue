<script setup lang="ts">
import {TTodo} from '../types/todo';

defineProps<{
	todo: TTodo;
	removeTodo: (todo: TTodo) => void;
}>();
</script>

<template>
	<div class="todo-item">
		<label>
			<input type="checkbox" v-model="todo.done" />
			<span :class="`bubble ${todo.category}`" />
		</label>
		<input type="text" :class="`todo-content ${todo.done ? 'done' : ''}`" v-model="todo.content" />
		<button data-testid="delete" class="remove-button" @click="removeTodo(todo)">Delete</button>
	</div>
</template>

<style scoped>
.todo-item {
	align-items: center;
	background-color: #fff;
	padding: 16px;
	border-radius: 8px;
	box-shadow: var(--shadow);
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 8px;
}

.todo-content {
	color: var(--dark);
}

.todo-content.done {
	text-decoration: line-through;
	color: var(--grey);
}

.remove-button {
	font-size: 12px;
	display: block;
	padding: 8px;
	border-radius: 8px;
	color: #fff;
	cursor: pointer;
	transition: 0.2s ease-in-out;
	background-color: var(--danger);
}
</style>
