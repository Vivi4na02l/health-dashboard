import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/views/MainPage.vue";
import AuthenticationForm from "@/views/AuthenticationForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthenticationForm,
    meta: { hideNavBar: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const isLoggedIn = sessionStorage.user ? true : false;

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "Auth" };
  }
});

export default router;
