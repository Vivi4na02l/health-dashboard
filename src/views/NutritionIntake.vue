<template>
  <aside>
    <section class="nutritionDisplay animHigher">
      <header>
        <img
          :src="type === 'Protein' ? proteinIcon : type === 'Water' ? waterIcon : caloriesIcon"
          alt="icon to represent pantry"
        />
        <h2>{{ type }}</h2>
      </header>

      <h3
        :style="{
          color: type === 'Protein' ? '#E07800' : type === 'Water' ? '#00A887' : '#52A300',
        }"
      >
        {{ nutritionConsumed }}
      </h3>

      <div class="progressBar">
        <div
          :style="{ width: userNutritionToday.consumed == 0 ? '2%' : `${percentage}%` }"
          class="progressFill backgroundColorShift"
          :class="{
            bgWater: type === 'Water',
            bgProtein: type === 'Protein',
            bgCalories: type === 'Calories',
          }"
        ></div>
      </div>
    </section>

    <section class="buttons">
      <button
        class="backgroundColorShift"
        :class="{
          bgWater: type === 'Water',
          bgProtein: type === 'Protein',
          bgCalories: type === 'Calories',
        }"
      >
        +{{ button.lowestIncrement }} {{ userNutrition.unit }}
      </button>
      <button
        class="backgroundColorShift"
        :class="{
          bgWater: type === 'Water',
          bgProtein: type === 'Protein',
          bgCalories: type === 'Calories',
        }"
      >
        +{{ button.midIncrement }} {{ userNutrition.unit }}
      </button>
      <button
        class="backgroundColorShift"
        :class="{
          bgWater: type === 'Water',
          bgProtein: type === 'Protein',
          bgCalories: type === 'Calories',
        }"
      >
        +{{ button.highestIncrement }} {{ userNutrition.unit }}
      </button>
    </section>

    <section class="nutritionInfo">
      <div class="animHigher">
        <h4>Consumed</h4>
        <p>{{ userNutritionToday.consumed }} {{ userNutrition.unit }}</p>
      </div>

      <div class="animHigher">
        <h4>Missing</h4>
        <p>{{ userNutrition.goal - userNutritionToday.consumed }} {{ userNutrition.unit }}</p>
      </div>

      <div class="animHigher">
        <header>
          <h4>Goal</h4>
          <img
            v-if="!goalEdit"
            src="../assets/images/icon-edit.png"
            alt="pencil"
            @click="openGoalEdit"
          />
          <img
            v-else
            src="../assets/images/icon-close-black.png"
            alt="pencil"
            @click="closeGoalEdit"
          />
        </header>

        <p v-if="!goalEdit">{{ userNutrition.goal }} {{ userNutrition.unit }}</p>

        <input v-else type="text" v-model.number="inputGoal" />
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import proteinIcon from "@/assets/images/icon-protein.png";
import waterIcon from "@/assets/images/icon-water.png";
import caloriesIcon from "@/assets/images/icon-calories.png";

import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { usersStore } from "@/store/users";
import { authStore } from "@/store/auth";

const route = useRoute();
const type = route.query.type as string;

const user = computed(() => {
  const auth = authStore();
  return usersStore().getUser(auth.currentUsername);
});

const userNutrition = computed(() => {
  const indexType = user.value.nutrition.findIndex(
    (pos: { type: string }) => pos.type === type.toLowerCase(),
  );

  return user.value.nutrition[indexType];
});

const userNutritionToday = computed(() => {
  const indexDate = userNutrition.value.history.findIndex(
    (pos: { date: string }) => pos.date === todaysDate.value,
  );

  return userNutrition.value.history[indexDate];
});

const todaysDate = computed(() => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}${month}${year}`;
});

const nutritionConsumed = computed(() => {
  return userNutritionToday.value.consumed + userNutrition.value.unit;
});

const percentage = computed(() => {
  if (userNutrition.value.goal === 0) {
    return 0;
  }

  return (userNutritionToday.value.consumed / userNutrition.value.goal) * 100;
});

const button = computed(() => {
  if (type == "Protein") {
    return { lowestIncrement: 10, midIncrement: 25, highestIncrement: 50 };
  } else if (type == "Water") {
    return { lowestIncrement: 0.25, midIncrement: 0.5, highestIncrement: 0.75 };
  } else {
    return { lowestIncrement: 100, midIncrement: 250, highestIncrement: 500 };
  }
});

// logic to change goal:
const goalEdit = ref(false);
const inputGoal = ref(0);
const nutritionGoal = ref(userNutrition.value.goal);

function openGoalEdit() {
  inputGoal.value = userNutrition.value.goal;
  goalEdit.value = true;
}

function closeGoalEdit() {
  if (inputGoal.value != nutritionGoal.value) {
    nutritionGoal.value = inputGoal.value;
    const auth = authStore();
    usersStore().changeNutritionGoal(auth.currentUsername, type, inputGoal.value);
  }

  goalEdit.value = false;
}
</script>

<style scoped>
@import "@/assets/styles/view/NutritionIntake.css";
</style>
