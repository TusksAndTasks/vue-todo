<template>
  <div class="form-todo-inputs">
    <input
      type="checkbox"
      :id="`check-${todoData.id}`"
      :checked="todoData.isDone"
      @click="sendStatusUpdate"
    />
    <label :for="`check-${todoData.id}`"></label>
    <div
      :class="{ 'todo-done': todoData.isDone }"
      v-if="isDisplayMode"
      @click="toggleDisplay"
      class="todo-data"
    >
      {{ todoData.task }}
    </div>
    <div class="todo-text-changer" v-else>
      <input type="text" v-model="task" @keydown.enter="sendContentUpdate" />
      <button @click="toggleDisplay">&#10060;</button>
    </div>
    <button class="todo-delete-button" @click="sendTodoDeletionId" />
  </div>
</template>

<script setup lang="ts">
import { ICheckEvent, ITodo } from "@/types/interfaces";
import { ref } from "vue";

const props = defineProps<{ todoData: ITodo }>();
const emits = defineEmits<{
  (e: "updateTodo", updatedTodo: ITodo): void;
  (e: "deleteTodo", id: string): void;
}>();

const task = ref(props.todoData.task);
const isDisplayMode = ref(true);

function sendStatusUpdate(e: ICheckEvent) {
  const updatedTodo = {
    ...props.todoData,
    isDone: e.target.checked,
  };
  emits("updateTodo", updatedTodo);
}

function sendContentUpdate() {
  const updatedTodo = {
    ...props.todoData,
    task: task.value,
  };
  emits("updateTodo", updatedTodo);
  toggleDisplay();
}

function sendTodoDeletionId() {
  emits("deleteTodo", props.todoData.id);
}

function toggleDisplay() {
  isDisplayMode.value = !isDisplayMode.value;
  task.value = props.todoData.task;
}
</script>

<style lang="scss">
.todo-done {
  color: #e77171;
  text-decoration: line-through;
}

.todo-delete-button {
  position: absolute;
  right: 5px;
  top: 5px;
  background-image: url("../../assets/garbage-can.png");
  width: 30px;
  height: 35px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    filter: opacity(0.5) drop-shadow(0 0 0 red);
  }
}

.todo-data {
  font-size: 20px;
  margin-top: 10px;
  text-align: start;
  width: 300px;
}
.todo-text-changer {
  position: relative;

  & button {
    position: absolute;
    font-size: 20px;
    right: 0;
    top: 4px;
    transition: 0.3s;
    padding: 0;

    &:hover {
      transform: rotate(90deg);
      cursor: pointer;
    }
  }
}
</style>
