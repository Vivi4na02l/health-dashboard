<template>
  <div>
    <!-- components in line 1: -->
    <WeekDay
      class="weekDayComponent animHigher"
      @click="this.$router.push({ name: 'Week' })"
    ></WeekDay>
    <WaterIntake></WaterIntake>
    <ProteinIntake></ProteinIntake>

    <!-- components in line 2: -->
    <GroceriesList
      :componentList="'pantry'"
      class="animHigher"
      @click="this.$router.push({ name: 'Pantry' })"
    ></GroceriesList>
    <GroceriesList
      :componentList="'shopping'"
      class="animHigher"
      @click="this.$router.push({ name: 'Pantry' })"
    ></GroceriesList>
    <RecipesList
      class="recipeComponent animHigher"
      @click="this.$router.push({ name: 'Recipes' })"
    ></RecipesList>
  </div>
</template>

<script>
import WeekDay from "@/components/WeekDay.vue";
import WaterIntake from "@/components/WaterIntake.vue";
import ProteinIntake from "@/components/ProteinIntake.vue";
import GroceriesList from "@/components/GroceriesList.vue";
import RecipesList from "@/components/RecipesList.vue";

export default {
  components: {
    WeekDay,
    GroceriesList,
    WaterIntake,
    ProteinIntake,
    RecipesList,
  },
};
</script>

<style scoped>
@media screen and (max-width: 400px) {
  div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 1rem;

    padding: 1rem;
  }
}

@media screen and (min-width: 401px) and (max-width: 767px) {
  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 1rem;

    padding: 1rem;
  }

  .weekDayComponent,
  .recipeComponent {
    grid-column: span 2;
  }
}

@media screen and (min-width: 768px) and (max-width: 1022px) {
  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 1rem;

    padding: 1rem;
  }

  .weekDayComponent {
    grid-column: span 2;
  }

  .recipeComponent {
    grid-column: span 3;
  }
}

@media screen and (min-width: 1023px) {
  div {
    height: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 1rem;

    padding: 1rem;
  }

  .weekDayComponent,
  .recipeComponent {
    grid-column: span 2;
  }
}

/* div {
  height: 100%;
} */

div > * {
  overflow: hidden;
}
</style>
