<template>
  <button
    class="delete-note-button"
    @click="handleModalDisplay"
    v-if="!isModalOpen"
  >
    Delete
  </button>
  <Teleport to="body">
    <div v-if="isModalOpen" class="delete-note-modal">
      <button @click="handleModalDisplay">Close</button>
      <button @click="handleDeleteNote">Confirm</button>
    </div>
  </Teleport>
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

<style>
.delete-note-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.delete-note-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
}
</style>
