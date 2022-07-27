<template>
  <form @submit.prevent="addNote">
    <input type="text" v-model="title" @keydown.enter.prevent />
    <ul>
      <li v-for="todo in todos" :key="todo.key" :class="{ done: todo.isDone }">
        {{ todo.task }}
      </li>
      <!--TODO: Вот эти листы переделать под отдельный компонент, который может переключаться на инпут-->
    </ul>
    <input type="text" v-model="inputValue" @keydown.enter.prevent="addTodo" />
    <input type="checkbox" v-model="inputStatus" @keydown.enter.prevent />
    <input type="submit" content="Submit" />
  </form>
</template>

<script setup lang="ts">
import { INote, ITodo } from "@/types/interfaces";
import { ref } from "vue";
import { notesState } from "@/states/NotesState";

const props = defineProps<{ noteData?: INote }>();

const title = ref(props.noteData?.title ? props.noteData?.title : "");
const todos = ref(
  props.noteData?.todos ? props.noteData?.todos : ([] as Array<ITodo>)
);
const inputValue = ref("");
const inputStatus = ref(false);

function addTodo() {
  todos.value.push({
    task: inputValue.value,
    key: `todo-${Date.now()}`,
    isDone: inputStatus.value,
  });
  inputValue.value = "";
  inputStatus.value = false;
}

function addNote() {
  notesState.push({
    title: title.value,
    key: `note-${Date.now()}`,
    todos: todos.value,
  });
  title.value = props.noteData?.title ? title.value : "";
  todos.value = props.noteData?.todos ? todos.value : [];
}
</script>

<style>
.done {
  color: brown;
}
</style>
