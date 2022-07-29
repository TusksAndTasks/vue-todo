<template>
  <button
    class="delete-note-button"
    @click="handleModalDisplay"
    v-if="!isModalOpen"
  />
  <Teleport to="body">
    <div v-if="isModalOpen" class="modal-wrapper">
      <div>
        <h3>Are you sure you want to delete note?</h3>
        <button @click="handleModalDisplay">Close</button>
        <button @click="handleDeleteNote">Confirm</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { notesState } from "@/states/NotesState";

const props = defineProps<{ noteId: string }>();
const emits = defineEmits<{ (e: "delete"): void }>();

const isModalOpen = ref(false);

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

<style lang="scss">
$paper-color: #f0f0e8;
$dark-paper-color: #cbcbc2;

.delete-note-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  background-image: url("../../assets/garbage-can.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 30px;
  height: 35px;
  filter: invert(1);

  &:hover {
    filter: invert(1) opacity(0.3) drop-shadow(0 0 0 red);
    cursor: pointer;
  }
}
.modal-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    background-color: $paper-color;
    font-family: "Indie Flower", cursive;
    width: 500px;
    box-shadow: 2px 0 2px rgb(0 0 0 / 40%);
    text-align: center;

    & button {
      background-color: transparent;
      font-family: "Indie Flower", cursive;
      border: none;
      font-size: 20px;
      &:hover {
        background-color: $dark-paper-color;
        cursor: pointer;
      }
    }
  }
}
</style>
