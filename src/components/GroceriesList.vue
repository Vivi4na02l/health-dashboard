<template>
  <section class="component">
    <h2>{{ componentList.toUpperCase() }}</h2>

    <div v-if="areIngredientsInList()">
      <p>You haven't added ingredients to your {{ componentList.toLowerCase() }} list yet...</p>
      <button>Add to pantry</button>
    </div>

    <div v-else>
      <article
        v-show="ingredientsList(ingredient)"
        v-for="ingredient of getIngredients"
        :key="ingredient.key"
      >
        <p>{{ ingredient.ingredient }}</p>

        <p>{{ ingredient.protein }}g of protein in {{ ingredient.weight }}g</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

const props = defineProps({
  componentList: String,
});

const user = computed(() => {
  const auth = authStore();
  return usersStore().getUser(auth.currentUsername);
});

const getIngredients = computed(() => {
  if (!user.value) {
    return [];
  }

  return [...user.value.ingredients];
});

function areIngredientsInList() {
  if (
    props.componentList == "shopping" &&
    getIngredients.value.find((ingredient) => ingredient.onShoppingList == true)
  ) {
    return false;
  } else if (
    props.componentList == "pantry" &&
    getIngredients.value.find((ingredient) => ingredient.onShoppingList == false)
  ) {
    return false;
  } else {
    return true;
  }
}

function ingredientsList(ingredient) {
  if (ingredient.onShoppingList == true && props.componentList == "shopping") {
    return true;
  } else if (ingredient.onShoppingList == false && props.componentList == "pantry") {
    return true;
  } else {
    return false;
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--light-green);
}

section div {
  width: 80%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

article {
  width: 100%;

  border-radius: 1rem;
  border: solid 0.1rem #cbcbcb;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 1rem;
  padding-right: 1rem;

  display: flex;
  justify-content: space-between;

  background-color: var(--white);
}
</style>
