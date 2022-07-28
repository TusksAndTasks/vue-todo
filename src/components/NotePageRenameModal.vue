<template>
  <button @click="handleModalDisplay" v-if="!isModalOpen">Delete</button>
  <div v-if="isModalOpen">
    <button @click="handleModalDisplay">Close</button>
    <button @click="handleDeleteNote">Confirm</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { notesState } from "@/states/NotesState";

const props = defineProps<{ noteId: string }>();
const emits = defineEmits<{ (e: "delete"): void }>();

const isModalOpen = ref(false);

console.log(props.noteId);

function handleDeleteNote() {
  notesState.notes = notesState.notes.filter(
    (note) => note.id !== props.noteId
  );
  emits("delete");
  handleModalDisplay();
}

function handleModalDisplay() {
  isModalOpen.value = !isModalOpen.value;
}
</script>
