<template>
  <section>
    <header>
      <img
        :src="
          ingredientType === 'Ingredients'
            ? ingredientsIcon
            : ingredientType === 'IngredientsGroceries'
              ? groceryIcon
              : ingredientType === 'IngredientsPantry'
                ? pantryIcon
                : recipesIcon
        "
        alt="icon to represent pantry"
      />
      <h4>
        {{
          ingredientType === "Ingredients"
            ? "Ingredients"
            : ingredientType === "IngredientsGroceries"
              ? "Groceries List"
              : ingredientType === "IngredientsPantry"
                ? "Pantry"
                : "Recipes"
        }}
      </h4>
    </header>

    <p class="subtitle">{{ ingredientsData }}</p>

    <p v-if="ingredientType === 'Ingredients'">Total ingredients added.</p>
    <p v-else-if="ingredientType === 'IngredientsGroceries'">Pending ingredients.</p>
    <p v-else-if="ingredientType === 'IngredientsPantry'">Ingredients available.</p>
    <p v-else>Recipes available.</p>
  </section>
</template>

<script setup lang="ts">
import ingredientsIcon from "@/assets/images/icon-ingredients.png";
import pantryIcon from "@/assets/images/icon-pantry.png";
import groceryIcon from "@/assets/images/icon-grocery.png";
import recipesIcon from "@/assets/images/icon-recipes.png";

import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";
import { computed } from "vue";

const props = defineProps<{
  ingredientType: string;
}>();

const user = computed(() => {
  const auth = authStore();
  return usersStore().getUser(auth.currentUsername);
});

const ingredientsData = computed(() => {
  if (props.ingredientType == "Ingredients") {
    return user.value.ingredients.length;
  } else if (props.ingredientType == "IngredientsGroceries") {
    let nbrIngredients = 0;

    for (const ingredient of user.value.ingredients) {
      if (ingredient.onShoppingList) {
        nbrIngredients++;
      }
    }

    return nbrIngredients;
  } else {
    let nbrIngredients = 0;

    for (const ingredient of user.value.ingredients) {
      if (!ingredient.onShoppingList) {
        nbrIngredients++;
      }
    }

    return nbrIngredients;
  }
});
</script>

<style scoped>
@import "@/assets/styles/MainPageComponents.css";

section {
  background-color: #fff;
}

.nbrIngredients {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
