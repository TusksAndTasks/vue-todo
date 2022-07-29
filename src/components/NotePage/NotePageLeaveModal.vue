<template>
  <button
    class="leave-page-button"
    @click="handleModalDisplay"
    v-if="!isModalOpen"
  >
    Go to main page
  </button>
  <teleport to="body">
    <div v-if="isModalOpen" class="modal-wrapper">
      <div>
        <h3>
          Are you sure you want return to main page? All unsaved changes would
          be lost
        </h3>
        <button @click="handleModalDisplay">Cancel</button>
        <button @click="$router.push('/')">Confirm</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isModalOpen = ref(false);

function handleModalDisplay() {
  isModalOpen.value = !isModalOpen.value;
}
</script>

<style lang="scss">
$dark-paper-color: #cbcbc2;

.leave-page-button {
  box-shadow: 2px 0 2px rgb(0 0 0 / 40%);
  font-family: "Indie Flower", cursive;
  font-size: 22px;

  &:hover {
    background-color: $dark-paper-color;
    cursor: pointer;
  }
}
</style>
