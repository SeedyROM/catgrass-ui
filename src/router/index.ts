import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
    { path: "/", name: "home", component: () => import("../views/Home.vue") },
    {
      path: "/explore",
      name: "explore",
      component: () => import("../views/Explore.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("../views/Stats.vue"),
    },
    {
      path: "/agents",
      name: "agents",
      component: () => import("../views/Agents.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/Create.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
      children: [
        {
          path: "accounts",
          component: () => import("../views/ProfileAccounts.vue"),
        },
        {
          path: "recipes",
          component: () => import("../views/ProfileRecipes.vue"),
        },
        {
          path: "settings",
          component: () => import("../views/ProfileSettings.vue"),
        },
      ],
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("../views/Tasks.vue"),
      children: [
        {
          path: "all",
          component: () => import("../views/TasksAll.vue"),
        },
        {
          path: ":hash",
          component: () => import("../views/TaskDetail.vue"),
        },
      ],
    },
  ],
});

export default router;
