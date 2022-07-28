<template>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
#app {
  background-color: beige;
  position: relative;
  font-family: "Indie Flower", cursive;

  & input[type="text"] {
    font-family: "Indie Flower", cursive;
    border: none;
    border-bottom: 1px black solid;
    margin: 0 5px;
    background-color: #f8deb8;
    width: 80%;
  }

  //& input[type="checkbox"] {
  //  opacity: 0;
  //  position: relative;
  //
  //  &:after {
  //    opacity: 100%;
  //    position: absolute;
  //    content: "";
  //    display: block;
  //    width: 20px;
  //    height: 20px;
  //    border-radius: 50%;
  //    background-color: red;
  //  }
  //
  //  &:checked:after {
  //    background-color: green;
  //  }
  //}
}
</style>
