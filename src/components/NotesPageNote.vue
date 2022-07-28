<template>
  <router-link :to="pathToNote">
    <div>{{ noteData.title }}</div>
    <ul>
      <li v-for="todo in todosShortList" :key="todo.id">{{ todo.task }}</li>
    </ul>
  </router-link>
</template>

<script setup lang="ts">
import { INote } from "@/types/interfaces";
import { computed } from "vue";

const props = defineProps<{ noteData: INote }>();
const pathToNote = `/${props.noteData.id}`;
const todosShortList = computed(() => props.noteData.todos?.slice(0, 3));
</script>
