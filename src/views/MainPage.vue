<template>
  <aside>
    <header>
      <h2>Welcome back, {{ user.username }}!</h2>

      <span class="date">
        <p>{{ today.dayWeek }}, {{ today.day }} of {{ today.month }}</p>
      </span>
    </header>

    <div>
      <!-- Nutrition -->
      <h3>Nutrition</h3>
      <article class="nutrition">
        <NutritionIntake
          class="component animHigher"
          :componentList="{ name: 'Calories', unit: 'kcal' }"
          @click="this.$router.push({ name: 'Nutrition', query: { type: 'Calories' } })"
        />
        <NutritionIntake
          class="component animHigher"
          :componentList="{ name: 'Water', unit: 'L' }"
          @click="this.$router.push({ name: 'Nutrition', query: { type: 'Water' } })"
        />
        <NutritionIntake
          class="component animHigher"
          :componentList="{ name: 'Protein', unit: 'g' }"
          @click="this.$router.push({ name: 'Nutrition', query: { type: 'Protein' } })"
        />
      </article>

      <!-- Inventory -->
      <h3>Inventory</h3>
      <article class="inventory">
        <InventoryList
          :ingredientType="'Ingredients'"
          class="component animHigher"
          @click="this.$router.push({ name: 'Pantry' })"
        />
        <InventoryList
          :ingredientType="'IngredientsPantry'"
          class="component animHigher"
          @click="this.$router.push({ name: 'Pantry' })"
        />
        <InventoryList
          :ingredientType="'IngredientsGroceries'"
          class="component animHigher"
          @click="this.$router.push({ name: 'Shopping' })"
        />
      </article>

      <!-- Kitchen -->
      <h3>Kitchen</h3>
      <article class="kitchen">
        <InventoryList
          :ingredientType="'Recipes'"
          class="component animHigher"
          @click="this.$router.push({ name: 'Recipes' })"
        />
      </article>

      <!-- Activity -->
      <h3>Activity</h3>
      <article class="activity">
        <WeekDay class="component animHigher" @click="this.$router.push({ name: 'Week' })" />
      </article>
    </div>
  </aside>
</template>

<script setup>
import WeekDay from "@/components/WeekDay.vue";
import NutritionIntake from "@/components/NutritionIntake.vue";
import InventoryList from "@/components/InventoryList.vue";

import { computed, ref, onBeforeMount } from "vue";

import { usersStore } from "@/store/users";
import { authStore } from "@/store/auth";

const user = computed(() => {
  const auth = authStore();
  return usersStore().getUser(auth.currentUsername);
});

const today = ref({
  day: new Date().getDate(),
  month: new Date().toLocaleString("en-UK", { month: "long" }),
  dayWeek: new Intl.DateTimeFormat("en-UK", { weekday: "long" }).format(new Date()),
});

const todaysDate = computed(() => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}${month}${year}`;
});

onBeforeMount(() => {
  const auth = authStore();

  if (!user.value.nutrition[0].history.find((pos) => pos.date === todaysDate.value)) {
    usersStore().addTodaysDate(auth.currentUsername, todaysDate);
  }
});
</script>

<style scoped>
@import "@/assets/styles/MainPage.css";
</style>
