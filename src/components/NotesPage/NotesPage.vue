<template>
  <div class="notes-container">
    <NotesPageNote
      v-for="note in notesState.notes"
      :noteData="note"
      :key="note.id"
    />
  </div>
  <NotePageForm @validationFail="isPopupOpen = true" />
  <ValidationPopup v-if="isPopupOpen" @closePopup="isPopupOpen = false" />
</template>

<script setup lang="ts">
import { notesState } from "@/states/NotesState";
import { ref, watch } from "vue";
import NotesPageNote from "@/components/NotesPage/NotesPageNote.vue";
import NotePageForm from "@/components/NotePage/NotePageForm.vue";
import ValidationPopup from "@/components/ValidationPopup.vue";

const isPopupOpen = ref(false);

watch(notesState, () => {
  localStorage.setItem("notesState", JSON.stringify(notesState.notes));
});
</script>

<style lang="scss">
.notes-container {
  display: flex;
  justify-content: center;
  gap: 20px 40px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
