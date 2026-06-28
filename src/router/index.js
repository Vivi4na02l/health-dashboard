import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/views/MainPage.vue";
import AuthenticationForm from "@/views/AuthenticationForm.vue";
import WeekDay from "@/views/WeekDay.vue";
import NutritionIntake from "@/views/NutritionIntake.vue";
import IngredientsList from "@/views/IngredientsList.vue";
import RecipesList from "@/views/RecipesList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
    meta: { requiresAuth: true, hideNavBar: false },
  },
  {
    path: "/week-day",
    name: "Week",
    component: WeekDay,
    meta: { requiresAuth: true, hideNavBar: false },
  },
  {
    path: "/nutrition-intake",
    name: "Nutrition",
    component: NutritionIntake,
    meta: { requiresAuth: true, hideNavBar: false },
  },
  {
    path: "/ingredients",
    name: "Ingredients",
    component: IngredientsList,
    meta: { requiresAuth: true, hideNavBar: false },
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: RecipesList,
    meta: { requiresAuth: true, hideNavBar: false },
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
  const isLoggedIn = sessionStorage.currentUsername ? true : false;

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "Auth" };
  }
});

export default router;
