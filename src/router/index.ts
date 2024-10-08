import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import SearchResults from "../views/SearchResults.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/artwork/:id",
      name: "ArtDetail",
      component: () => import("@/views/ArtDetail.vue"),
    },
    {
      path: "/search",
      name: "SearchResults",
      component: SearchResults,
    },
  ],
});

export default router;
