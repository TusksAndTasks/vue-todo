<template>
  <AppHeader></AppHeader>
  <router-view></router-view>
</template>

<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
</script>

<style lang="scss">
#app {
  background-color: beige;
  position: relative;
  font-family: "Indie Flower", cursive;
  font-size: 20px;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 40px 0;

  & input[type="text"] {
    font-family: "Indie Flower", cursive;
    border: none;
    font-size: 20px;
    border-bottom: 1px black solid;
    margin: 0 5px;
    background-color: inherit;
    width: 300px;
    height: 40px;

    &:focus {
      outline: none;
      border-bottom: 1px red solid;
    }
  }

  button {
    border: none;
  }
}

body {
  margin: 0;
  min-height: 100vh;
}

html {
  min-height: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: black;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }
}
</style>
