<template>
  <NotePageForm
    :noteId="noteId"
    :currentStep="currentStep"
    @increase="++currentStep"
    @decrease="--currentStep"
    @setToNull="currentStep = 0"
  />
  <router-link to="/">To main</router-link>
</template>

<script setup lang="ts">
import { notesState } from "@/states/NotesState";
import { ref, watch } from "vue";
import NotePageForm from "@/components/NotePageForm.vue";
import { useRoute } from "vue-router";

const currentStep = ref(0);
const noteId = useRoute().path.slice(1);

watch(notesState, () => {
  localStorage.setItem("notesState", JSON.stringify(notesState.notes));
});
</script>
