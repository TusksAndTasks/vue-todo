<template>
  <div class="form-container">
    <form class="note-like-item" @submit.prevent="handleSubmit">
      <input
        type="text"
        v-model="title"
        @keydown.enter.prevent
        placeholder="Title"
        class="note-title-changer"
      />
      <div class="form-title-decorator"></div>
      <NotePageTodo
        v-for="todo in currentTodos"
        :todoData="todo"
        :key="todo.id"
        @updateTodo="updateTodo"
        @deleteTodo="deleteTodo"
      />
      <div class="create-todo-inputs">
        <input
          type="checkbox"
          v-model="inputStatus"
          :id="`check-${noteId}`"
          @keydown.enter.prevent
        />
        <label :for="`check-${noteId}`"></label>
        <input
          type="text"
          v-model="inputValue"
          @keydown.enter.prevent="addTodo"
          placeholder="your new TODO"
        />
      </div>
      <label :for="`check-${noteId}`"></label>
      <input type="submit" value="Confirm changes" />
    </form>
    <div class="form-history-buttons">
      <button @click="goBackInHistory">&#8630;</button>
      <button @click="goForwardInHistory">&#8631;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INote, ITodo } from "@/types/interfaces";
import { computed, ref } from "vue";
import { notesState } from "@/states/NotesState";
import NotePageTodo from "@/components/NotePageTodo.vue";
import { useRoute } from "vue-router";

const emits = defineEmits(["validationFail"]);

const noteId = useRoute().path.slice(1);
const initialNote = notesState.notes.find((note) => note.id === noteId);
const title = ref(initialNote ? initialNote.title : "");
const history = ref(
  initialNote
    ? [initialNote]
    : ([{ title: "", id: "temporal", todos: [] }] as Array<INote>)
);
const currentStep = ref(0);

const currentTodos = computed(
  () => history.value[currentStep.value].todos as ITodo[]
);

const inputValue = ref("");
const inputStatus = ref(false);

function goForwardInHistory() {
  if (currentStep.value + 1 < history.value.length) {
    currentStep.value++;
  }
}

function goBackInHistory() {
  if (currentStep.value - 1 > -1) {
    currentStep.value--;
  }
}

function handleCorrectHistoryUpdate() {
  if (currentStep.value < history.value.length - 1) {
    history.value = history.value.slice(0, currentStep.value + 1);
  }
}

function addTodo() {
  if (!inputValue.value) {
    emits("validationFail");
    return;
  }
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
  currentStep.value++;
  inputValue.value = "";
  inputStatus.value = false;
}

function updateTodo(updatedTodo: ITodo) {
  if (!updatedTodo.task) {
    emits("validationFail");
    return;
  }
  handleCorrectHistoryUpdate();
  history.value.push({
    title: title.value,
    id: "temporal",
    todos: currentTodos.value.map((todo) =>
      updatedTodo.id === todo.id ? updatedTodo : todo
    ),
  });
  currentStep.value++;
}

function deleteTodo(deletionId: string) {
  handleCorrectHistoryUpdate();
  history.value.push({
    title: title.value,
    id: "temporal",
    todos: currentTodos.value.filter((todo) => todo.id !== deletionId),
  });
  currentStep.value++;
}

function handleSubmit() {
  if (initialNote) {
    updateNote();
  } else {
    addNote();
  }
}

function addNote() {
  if (!title.value) {
    emits("validationFail");
    return;
  }
  notesState.notes.push({
    title: title.value,
    id: `note-${Date.now()}`,
    todos: history.value[currentStep.value].todos,
  });
  title.value = "";
  history.value = [{ title: "", id: "temporal", todos: [] }] as Array<INote>;
  currentStep.value = 0;
}

function updateNote() {
  notesState.notes = notesState.notes.map((note) =>
    note.id === (initialNote as INote).id
      ? {
          title: title.value,
          id: note.id,
          todos: history.value[currentStep.value].todos,
        }
      : note
  );
}
</script>

<style lang="scss">
$cover-dark: #343434;
$dark-paper-color: #cbcbc2;
$paper-color: #f0f0e8;

form {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  min-height: 400px;
  max-height: 800px;
  height: auto !important;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: $cover-dark;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }

  & input[type="submit"] {
    background-color: transparent;
    border: none;
    font-family: "Indie Flower", cursive;
    font-size: 20px;
    transition: 0.3s;

    &:hover {
      background-color: $dark-paper-color;
      color: $paper-color;
      cursor: pointer;
    }
  }
}

.create-todo-inputs {
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  gap: 0 20px;
  margin-top: 20px;

  & input[type="checkbox"] {
    opacity: 0;
    z-index: 2;
    position: absolute;
    left: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:hover ~ label {
      background-image: url("../assets/checkmark.png");
      background-size: contain;
      filter: grayscale(0.9) contrast(0.5);
    }

    &:checked ~ label {
      background-image: url("../assets/checkmark.png");
      background-size: contain;
      filter: brightness(0.7) contrast(0.5);
    }
  }

  & label {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: inherit;
    z-index: 1;
    border: #343434 1px solid;
    position: absolute;
    left: 10px;
    top: 10px;
  }
}

.note-title-changer {
  width: 100% !important;
  height: 50px !important;
  background-color: $cover-dark !important;
  font-size: 30px !important;

  &::placeholder {
    color: white;
    font-size: 20px;
  }
}

.form-title-decorator {
  content: "";
  position: absolute;
  width: 100%;
  height: 20px;
  top: 54px;
  background-image: url("../assets/ripped-paper-effect.png");
  filter: sepia(35%) drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2))
    brightness(0.91);
  background-size: contain;
  background-repeat: revert;
}

.form-history-buttons {
  width: 100%;
  text-align: center;

  & button {
    box-shadow: 2px 0 2px rgba(0, 0, 0, 0.4);
    background-color: $paper-color;
    font-size: 30px;
    margin: 10px;

    &:hover {
      background-color: $dark-paper-color;
      cursor: pointer;
    }
  }
}
</style>
