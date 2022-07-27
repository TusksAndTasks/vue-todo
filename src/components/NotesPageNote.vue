<template>
  <div>{{ noteData.title }}</div>
  <ul>
    <li v-for="todo in noteData.todos" :key="todo.key">{{ todo.task }}</li>
  </ul>
</template>

<script setup lang="ts">
import { INote } from "@/types/interfaces";

defineProps<{ noteData: INote }>();
</script>
