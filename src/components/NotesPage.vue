<template>
  <NotesPageNote v-for="note in notesState" :noteData="note" :key="note.key" />
  <NotePageForm
    :currentStep="currentStep"
    @increase="++currentStep"
    @decrease="--currentStep"
    @setToNull="currentStep = 0"
  />
</template>

<script setup lang="ts">
import { notesState } from "@/states/NotesState";
import { ref } from "vue";
import NotesPageNote from "@/components/NotesPageNote.vue";
import NotePageForm from "@/components/NotePageForm.vue";

const currentStep = ref(0);
</script>
