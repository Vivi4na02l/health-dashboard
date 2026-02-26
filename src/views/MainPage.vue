<template>
  <div>
    <!-- components in line 1: -->
    <WeekDay class="span2 animHigher" @click="this.$router.push({ name: 'Week' })"></WeekDay>
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
      class="span2 animHigher"
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
div {
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 1rem;

  padding: 1rem;
}

div > * {
  overflow: hidden;
}

.span2 {
  grid-column: span 2;
}
</style>
