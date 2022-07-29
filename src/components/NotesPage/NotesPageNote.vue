<template>
  <div class="note-wrapper">
    <router-link :to="pathToNote">
      <div
        class="note-like-item note"
        :class="{ 'multiple-todo-note': todosShortList.length === 3 }"
      >
        <h2>{{ noteData.title }}</h2>
        <ul>
          <li
            v-for="todo in todosShortList"
            :key="todo.id"
            :class="{ 'done-todo': todo.isDone }"
          >
            {{ todo.task }}
          </li>
        </ul>
      </div>
    </router-link>
    <NotePageDeleteModal :noteId="noteData.id" />
  </div>
</template>

<script setup lang="ts">
import { INote } from "@/types/interfaces";
import { computed } from "vue";
import NotePageDeleteModal from "@/components/NotePage/NotePageDeleteModal.vue";

const props = defineProps<{ noteData: INote }>();
const pathToNote = `/${props.noteData.id}`;
const todosShortList = computed(() => props.noteData.todos?.slice(0, 3));
</script>

<style lang="scss">
$paper-color: #f0f0e8;
$dark-paper-color: #cbcbc2;
$cover-dark: #343434;

a {
  color: inherit;
  text-decoration: none;
}

.note-wrapper {
  z-index: 1;
  position: relative;
}

.multiple-todo-note {
  &:before,
  &:after {
    content: "";
    width: 4px;
    background-color: $paper-color;
    display: block;
    position: absolute;
    box-shadow: 2px 0 2px rgba(0, 0, 0, 0.4);
  }

  &:before {
    right: -4px;
    height: 98%;
    z-index: -1;
  }

  &:after {
    height: 96%;
    right: -8px;
    z-index: -2;
  }

  & h2 {
    &:after {
      content: "";
      position: absolute;
      width: 3.8%;
      height: 100%;
      right: -3.4%;
      background-color: #282828;
      transform: rotateY(51deg);
    }
  }
}

.note-like-item {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: $paper-color;
  box-shadow: 2px 0 2px rgba(0, 0, 0, 0.4);
  position: relative;

  & h2,
  .note-title-changer {
    margin: 0;
    width: 100%;
    text-align: center;
    height: 50px;
    background-color: $cover-dark;
    color: white;
    position: relative;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 20px;
      background-image: url("../../assets/ripped-paper-effect.png");
      filter: sepia(35%) drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2))
        brightness(0.91);
      background-size: contain;
      background-repeat: revert;
      bottom: -20px;
      left: 0;
    }
  }

  & ul {
    list-style: none;
    text-align: center;
    padding: 0;

    & li {
      margin: 50px 0;
      width: 100%;

      &:after {
        content: "";
        display: block;
        width: 380px;
        height: 2px;
        border-bottom: 1px groove;
      }
    }
  }

  .done-todo {
    color: #e77171;
    text-decoration: line-through;
  }
}

.note {
  &:hover {
    background-color: $dark-paper-color;
    transition: 0.3s;
  }
}
</style>
