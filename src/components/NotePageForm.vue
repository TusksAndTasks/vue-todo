<template>
  <form @submit.prevent="addNote">
    <input type="text" v-model="title" @keydown.enter.prevent />
    <ul>
      <li
        v-for="todo in history[currentStep].todos"
        :key="todo.key"
        :class="{ done: todo.isDone }"
      >
        {{ todo.task }}
      </li>
      <!--TODO: Вот эти листы переделать под отдельный компонент, который может переключаться на инпут-->
    </ul>
    <input type="text" v-model="inputValue" @keydown.enter.prevent="addTodo" />
    <input type="checkbox" v-model="inputStatus" @keydown.enter.prevent />
    <input type="submit" content="Submit" />
  </form>
  <button @click="goBackInHistory">Back</button>
  <button @click="goForwardInHistory">Forward</button>
</template>

<script setup lang="ts">
import { INote, ITodo } from "@/types/interfaces";
import { ref } from "vue";
import { notesState } from "@/states/NotesState";

const props = defineProps<{ noteData?: INote; currentStep: number }>();
const emits = defineEmits(["increase", "decrease", "setToNull"]);

const title = ref(props.noteData?.title ? props.noteData?.title : "");
const inputValue = ref("");
const inputStatus = ref(false);

const history = ref(
  props.noteData
    ? [props.noteData]
    : ([{ title: "", key: "temporal", todos: [] }] as Array<INote>)
);

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

function addTodo() {
  handleCorrectHistoryUpdate();
  emits("increase");
  inputValue.value = "";
  inputStatus.value = false;
}

function handleCorrectHistoryUpdate() {
  if (props.currentStep < history.value.length - 1) {
    history.value = history.value.slice(0, props.currentStep + 1);
  }
  history.value.push({
    title: title.value,
    key: "temporal",
    todos: [
      ...(history.value[props.currentStep].todos as ITodo[]),
      {
        task: inputValue.value,
        key: `task-${Date.now()}`,
        isDone: inputStatus.value,
      },
    ],
  });
}

function addNote() {
  notesState.push({
    title: title.value,
    key: `note-${Date.now()}`,
    todos: history.value[props.currentStep].todos,
  });
  title.value = props.noteData?.title ? title.value : "";
  history.value = [{ title: "", key: "temporal", todos: [] }] as Array<INote>;
  emits("setToNull");
}
</script>

<style>
.done {
  color: brown;
}
</style>
