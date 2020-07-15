import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Steam_stats from "../views/Steam_stats.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:steamid",
    name: "Steam_stats",
    component: Steam_stats,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
