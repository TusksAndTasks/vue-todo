<template>
  <NotesPageNote
    v-for="note in notesState.notes"
    :noteData="note"
    :key="note.id"
  />
  <NotePageForm
    note-id="note-1658999816202"
    :currentStep="currentStep"
    @increase="++currentStep"
    @decrease="--currentStep"
    @setToNull="currentStep = 0"
  />
</template>

<script setup lang="ts">
import { notesState } from "@/states/NotesState";
console.log(notesState.notes);
import { ref, watch } from "vue";
import NotesPageNote from "@/components/NotesPageNote.vue";
import NotePageForm from "@/components/NotePageForm.vue";

const currentStep = ref(0);

watch(notesState, () => {
  localStorage.setItem("notesState", JSON.stringify(notesState.notes));
});
</script>
