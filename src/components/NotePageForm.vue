<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="title" @keydown.enter.prevent />
    <NotePageTodo
      v-for="todo in currentTodos"
      :todoData="todo"
      :key="todo.id"
      @updateTodo="updateTodo"
      @deleteTodo="deleteTodo"
    />
    <input type="text" v-model="inputValue" @keydown.enter.prevent="addTodo" />
    <input type="checkbox" v-model="inputStatus" @keydown.enter.prevent />
    <input type="submit" content="Submit" />
  </form>
  <button @click="goBackInHistory">Back</button>
  <button @click="goForwardInHistory">Forward</button>
</template>

<script setup lang="ts">
import { INote, ITodo } from "@/types/interfaces";
import { computed, ref } from "vue";
import { notesState } from "@/states/NotesState";
import NotePageTodo from "@/components/NotePageTodo.vue";

const props = defineProps<{ noteId?: string; currentStep: number }>();
const emits = defineEmits(["increase", "decrease", "setToNull"]);

console.log(props.noteId);

const initialNote = notesState.notes.find((note) => note.id === props.noteId);
const title = ref(initialNote ? initialNote.title : "");
const history = ref(
  initialNote
    ? [initialNote]
    : ([{ title: "", id: "temporal", todos: [] }] as Array<INote>)
);
const currentTodos = computed(
  () => history.value[props.currentStep].todos as ITodo[]
);

const inputValue = ref("");
const inputStatus = ref(false);

function goForwardInHistory() {
  if (props.currentStep + 1 < history.value.length) {
    emits("increase");
  }
}

function goBackInHistory() {
  if (props.currentStep - 1 > -1) {
    emits("decrease");
  }
}

function handleCorrectHistoryUpdate() {
  if (props.currentStep < history.value.length - 1) {
    history.value = history.value.slice(0, props.currentStep + 1);
  }
}

function addTodo() {
  handleCorrectHistoryUpdate();
  history.value.push({
    title: title.value,
    id: "temporal",
    todos: [
      ...currentTodos.value,
      {
        task: inputValue.value,
        id: `task-${Date.now()}`,
        isDone: inputStatus.value,
      },
    ],
  });
  emits("increase");
  inputValue.value = "";
  inputStatus.value = false;
}

function updateTodo(updatedTodo: ITodo) {
  handleCorrectHistoryUpdate();
  history.value.push({
    title: title.value,
    id: "temporal",
    todos: currentTodos.value.map((todo) =>
      updatedTodo.id === todo.id ? updatedTodo : todo
    ),
  });
  emits("increase");
}

function deleteTodo(deletionId: string) {
  handleCorrectHistoryUpdate();
  history.value.push({
    title: title.value,
    id: "temporal",
    todos: currentTodos.value.filter((todo) => todo.id !== deletionId),
  });
  emits("increase");
}

function handleSubmit() {
  if (initialNote) {
    updateNote();
  } else {
    addNote();
  }
}

function addNote() {
  notesState.notes.push({
    title: title.value,
    id: `note-${Date.now()}`,
    todos: history.value[props.currentStep].todos,
  });
  title.value = "";
  history.value = [{ title: "", id: "temporal", todos: [] }] as Array<INote>;
  emits("setToNull");
}

function updateNote() {
  notesState.notes = notesState.notes.map((note) =>
    note.id === (initialNote as INote).id
      ? {
          title: title.value,
          id: note.id,
          todos: history.value[props.currentStep].todos,
        }
      : note
  );
}
</script>

<style></style>
