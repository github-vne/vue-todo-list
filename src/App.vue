<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import Todo from './components/Todo.vue';
import {TTodo} from './types/todo';
import {CATEGORY_LIST, CATEGORY_TITLE} from './constants/category';

const input_content = ref('');
const input_category = ref<TTodo['category']>(null);
const todos = ref<TTodo[]>([]);

const todos_asc = computed(() => todos.value.sort((a, b) => b.createdAt - a.createdAt));

const removeTodo = (todo: TTodo) => {
	todos.value = todos.value.filter((t) => t !== todo);
};

onMounted(() => {
	todos.value = JSON.parse(localStorage.getItem('todos') || '') || [];
});

watch(
	todos,
	(newValue) => {
		localStorage.setItem('todos', JSON.stringify(newValue));
	},
	{deep: true},
);

const isDisabledSubmit = computed(() => !input_content.value.trim() || !input_category.value);

const addTodo = () => {
	todos.value.push({
		content: input_content.value,
		category: input_category.value,
		done: false,
		createdAt: new Date().getTime(),
	});

	input_content.value = '';
	input_category.value = null;
};
</script>

<template>
	<main class="app space-column">
		<h1 class="title">Todo list (Vue / Vite / TS )</h1>
		<form @submit.prevent="addTodo" class="space-column">
			<input
				class="create-todo-content"
				type="text"
				placeholder="Enter your todo"
				v-model="input_content"
				data-testid="input_content"
			/>
			<div class="options" v-if="!!CATEGORY_LIST.length">
				<label class="option" v-for="category in CATEGORY_LIST">
					<input type="radio" name="category" :value="category" v-model="input_category" />
					<span :class="`bubble ${category}`" />
					<span>{{ CATEGORY_TITLE[category] }}</span>
				</label>
			</div>
			<input
				class="create-todo-button"
				type="submit"
				value="Add todo"
				:disabled="isDisabledSubmit"
				data-testid="add_todo"
			/>
		</form>

		<section class="space-column" v-if="!!todos.length">
			<Todo
				v-for="todo in todos_asc"
				:key="todo.createdAt"
				:todo="todo"
				:removeTodo="removeTodo"
				:data-testid="`${todo.createdAt}`"
			/>
		</section>
	</main>
</template>

<style scoped>
.app {
	width: 500px;
	margin: 30px auto;
}

.title {
	text-align: center;
	font-size: 24px;
}

.create-todo-content {
	display: block;
	width: 100%;
	padding: 16px;
	color: var(--dark);
	background-color: #fff;
	border-radius: 8px;
	box-shadow: var(--shadow);
}

.options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
}

.option {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 16px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: var(--shadow);
	cursor: pointer;
}

.create-todo-button {
	display: block;
	width: 100%;
	padding: 16px;
	color: #fff;
	background-color: var(--primary);
	border-radius: 8px;
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-todo-button:disabled {
	color: #333;
	background-color: var(--grey);
}
</style>
