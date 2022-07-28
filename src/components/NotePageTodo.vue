<template>
  <div
    :class="{ done: todoData.isDone }"
    v-if="isDisplayMode"
    @click="toggleDisplay"
  >
    {{ todoData.task }}
  </div>
  <div v-else @keydown.enter="sendUpdatedTodo">
    <input type="checkbox" v-model="status" />
    <input type="text" v-model="task" />
    <button @click="sendTodoDeletionKey">Delete</button>
    <button @click="toggleDisplay">Close</button>
  </div>
</template>

<script setup lang="ts">
import { ITodo } from "@/types/interfaces";
import { ref } from "vue";

const props = defineProps<{ todoData: ITodo }>();
const emits = defineEmits<{
  (e: "updateTodo", updatedTodo: ITodo): void;
  (e: "deleteTodo", key: string): void;
}>();

const task = ref(props.todoData.task);
const status = ref(props.todoData.isDone);
const isDisplayMode = ref(true);

function sendUpdatedTodo() {
  const updatedTodo = {
    task: task.value,
    key: props.todoData.key,
    isDone: status.value,
  };
  emits("updateTodo", updatedTodo);
  toggleDisplay();
}

function sendTodoDeletionKey() {
  emits("deleteTodo", props.todoData.key);
}

function toggleDisplay() {
  isDisplayMode.value = !isDisplayMode.value;
  task.value = props.todoData.task;
}
</script>

<style>
.done {
  color: brown;
}
</style>
