<template>
  <div
    :class="{ done: todoData.isDone }"
    v-if="isDisplayMode"
    @click="toggleDisplay"
  >
    {{ todoData.task }}
  </div>
  <div v-else>
    <input
      type="text"
      v-model="task"
      @keydown.enter="sendUpdatedTodoAndClose"
    />
    <button @click="toggleDisplay">Close</button>
  </div>
  <input type="checkbox" v-model="status" @click="sendUpdatedTodo" />
  <button @click="sendTodoDeletionId">Delete</button>
</template>

<script setup lang="ts">
import { ITodo } from "@/types/interfaces";
import { ref } from "vue";

const props = defineProps<{ todoData: ITodo }>();
const emits = defineEmits<{
  (e: "updateTodo", updatedTodo: ITodo): void;
  (e: "deleteTodo", id: string): void;
}>();

const task = ref(props.todoData.task);
const status = ref(props.todoData.isDone);
const isDisplayMode = ref(true);

function sendUpdatedTodo() {
  const updatedTodo = {
    task: task.value,
    id: props.todoData.id,
    isDone: status.value,
  };
  emits("updateTodo", updatedTodo);
}

function sendTodoDeletionId() {
  emits("deleteTodo", props.todoData.id);
}

function toggleDisplay() {
  isDisplayMode.value = !isDisplayMode.value;
  task.value = props.todoData.task;
}

function sendUpdatedTodoAndClose() {
  sendUpdatedTodo();
  toggleDisplay();
}
</script>

<style>
.done {
  color: brown;
}
</style>
