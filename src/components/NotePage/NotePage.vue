<template>
  <div class="form-wrapper">
    <NotePageForm @validationFail="isPopupOpen = true" />
    <NotePageDeleteModal :noteId="noteId" @delete="$router.push('/')" />
  </div>
  <ValidationPopup v-if="isPopupOpen" @closePopup="isPopupOpen = false" />
  <NotePageLeaveModal />
</template>

<script setup lang="ts">
import { notesState } from "@/states/NotesState";
import { ref, watch } from "vue";
import NotePageForm from "@/components/NotePage/NotePageForm.vue";
import { useRoute } from "vue-router";
import NotePageDeleteModal from "@/components/NotePage/NotePageDeleteModal.vue";
import NotePageLeaveModal from "@/components/NotePage/NotePageLeaveModal.vue";
import ValidationPopup from "@/components/ValidationPopup.vue";

const isPopupOpen = ref(false);
const noteId = useRoute().path.slice(1);

watch(notesState, () => {
  localStorage.setItem("notesState", JSON.stringify(notesState.notes));
});
</script>

<style>
.form-wrapper {
  position: relative;
}
</style>
