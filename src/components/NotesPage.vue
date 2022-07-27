<template>
  <NotesPageNote v-for="note in notesState" :noteData="note" :key="note.key" />
  <NotePageForm />
</template>

<script setup lang="ts">
import { notesState } from "@/states/NotesState";

import NotesPageNote from "@/components/NotesPageNote.vue";
import NotePageForm from "@/components/NotePageForm.vue";
</script>
