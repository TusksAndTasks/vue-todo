import { createApp } from "vue";
import App from "./App.vue";
import NotesPage from "./components/NotesPage/NotesPage.vue";
import NotePage from "./components/NotePage/NotePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "NotesPage", component: NotesPage },
  { path: "/note-:id", name: "NotePage", component: NotePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
