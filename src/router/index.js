import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/views/MainPage.vue";
import AuthenticationForm from "@/views/AuthenticationForm.vue";
import WeekDay from "@/views/WeekDay.vue";
import PantryList from "@/views/PantryList.vue";
import ShoppingList from "@/views/ShoppingList.vue";
import RecipesList from "@/views/RecipesList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/week-day",
    name: "Week",
    component: WeekDay,
    meta: { requiresAuth: true },
  },
  {
    path: "/pantry",
    name: "Pantry",
    component: PantryList,
    meta: { requiresAuth: true },
  },
  {
    path: "/shopping-list",
    name: "Shopping",
    component: ShoppingList,
    meta: { requiresAuth: true },
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: RecipesList,
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
  const isLoggedIn = sessionStorage.currentUser ? true : false;

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "Auth" };
  }
});

export default router;
