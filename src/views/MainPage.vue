<template>
  <div>
    <!-- components in line 1: -->
    <WeekDay class="span2 animHigher" @click="this.$router.push({ name: 'Week' })"></WeekDay>
    <WaterIntake class="animHigher"></WaterIntake>
    <ProteinIntake class="animHigher"></ProteinIntake>

    <!-- components in line 2: -->
    <PantryList class="animHigher" @click="this.$router.push({ name: 'Pantry' })"></PantryList>
    <ShoppingList
      class="animHigher"
      @click="this.$router.push({ name: 'Shopping' })"
    ></ShoppingList>
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
import PantryList from "@/components/PantryList.vue";
import ShoppingList from "@/components/ShoppingList.vue";
import RecipesList from "@/components/RecipesList.vue";

export default {
  components: {
    WeekDay,
    PantryList,
    ShoppingList,
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
  grid-template-rows: 1fr 1fr;
  gap: 1rem;

  padding: 1rem;
}

.span2 {
  grid-column: span 2;
}
</style>
