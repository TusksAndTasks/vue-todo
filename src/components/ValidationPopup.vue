<template>
  <teleport to="body">
    <div>Please make sure fields you modify are not empty!</div>
  </teleport>
</template>

<script setup>
import { onMounted } from "vue";

const emits = defineEmits(["closePopup"]);

onMounted(() =>
  setTimeout(() => {
    emits("closePopup");
  }, 3000)
);
</script>

<style scoped lang="scss">
$paper-color: #f0f0e8;
div {
  position: fixed;
  right: 15px;
  bottom: 15px;
  background-color: $paper-color;
  width: 200px;
  height: 80px;
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: (1px 2px 10px rgba(0, 0, 0, 0.3));
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Indie Flower", cursive;
}
</style>
