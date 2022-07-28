<template>
  <button @click="handleModalDisplay" v-if="!isModalOpen">Leave</button>
  <div v-if="isModalOpen">
    <button @click="handleModalDisplay">Cancel</button>
    <button @click="$router.push('/')">Confirm</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isModalOpen = ref(false);

function handleModalDisplay() {
  isModalOpen.value = !isModalOpen.value;
}
</script>
