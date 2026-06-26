<template>
  <aside>
    <!-- modals -->
    <div class="modalBackground" v-show="modal.modalOn">
      <article v-show="modal.modalAddIngredient">
        <header>
          <h2>New ingredient</h2>
        </header>

        <input type="text" placeholder="Name of the ingredient" v-model="newIngredient.name" />
        <input
          type="number"
          placeholder="Ingredient's weight"
          v-model.number="newIngredient.weight"
        />
        <input
          type="number"
          placeholder="Protein per 100g"
          v-model.number="newIngredient.protein"
        />
        <input
          type="number"
          placeholder="Calories per 100g"
          v-model.number="newIngredient.calories"
        />
        <select name="ingredientGroup" v-model="newIngredient.group">
          <option value="">Select group</option>
          <option v-for="group in user.groups" :key="group" :value="group">{{ group }}</option>
        </select>

        <p
          class="message"
          :class="modalMsg.success ? 'messageGreen' : 'messageRed'"
          v-show="modalMsg.txt != ''"
        >
          {{ modalMsg.txt }}
        </p>

        <footer>
          <button class="btnConfirm" @click="addNewIngredient()">Add ingredient</button>
          <button
            class="btnCancel"
            @click="((modal.modalAddIngredient = false), (modal.modalOn = false))"
          >
            Cancel
          </button>
        </footer>
      </article>

      <article v-show="modal.modalRemoveIngredient" class="deletingModal">
        <header>
          <h2>Warning</h2>
        </header>

        <p>This action will permanently remove "{{ removingIngredient }}".</p>

        <footer>
          <button class="btnConfirm" @click="removeIngredient()">Confirm</button>
          <button
            class="btnCancel"
            @click="((modal.modalRemoveIngredient = false), (modal.modalOn = false))"
          >
            Cancel
          </button>
        </footer>
      </article>
    </div>

    <header>
      <div>
        <span>
          <img src="@/assets/images/icon-ingredients.png" alt="ingredients icon" />
          <h2>Ingredients</h2>
        </span>
        <p>Managing ingredients and nutritional information</p>
      </div>

      <button @click="((modal.modalAddIngredient = true), (modal.modalOn = true))">
        Add ingredient
      </button>
    </header>

    <section class="infoSection">
      <div class="animHigher">
        <h3>{{ ingredientsData.ingredients }}</h3>
        <p>Ingredients</p>
      </div>

      <div class="animHigher">
        <h3>{{ ingredientsData.groups }}</h3>
        <p>Ingredient groups</p>
      </div>
    </section>

    <section class="filtersSection">
      <input type="text" placeholder="Search ingredient..." v-model="filterSearch" />

      <select name="order" v-model="filterOrder">
        <option value="orderAdded">Order added</option>
        <option value="orderAZ">Order A-Z</option>
        <option value="orderZA">Order Z-A</option>
      </select>

      <select name="groupFilter" v-model="filterGroup">
        <option value="allGroups">All groups</option>
        <option v-for="group in user.groups" :key="group" :value="group">{{ group }}</option>
      </select>
    </section>

    <section class="tableSection">
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Group</th>
            <th>Weight</th>
            <th>Protein</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="ingredient in ingredientsArray" :key="ingredient">
            <td>{{ ingredient.ingredient }}</td>
            <td>{{ ingredient.group }}</td>
            <td>{{ ingredient.weight }}g</td>
            <td>{{ ingredient.protein }}g</td>
            <td>{{ ingredient.calories }}kcal</td>
            <td class="buttons">
              <button class="btnEdit">Edit</button>
              <button class="btnRemove" @click="isRemovingIngredient(ingredient.ingredient)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { usersStore } from "@/store/users";
import { authStore } from "@/store/auth";

const newIngredient = ref({
  name: "",
  weight: "",
  protein: "",
  calories: "",
  group: "",
});

const modalMsg = ref({
  success: false,
  txt: "",
});

const modal = ref({
  modalOn: false,
  modalAddIngredient: false,
  modalRemoveIngredient: false,
});

const removingIngredient = ref("");

const filterSearch = ref("");
const filterOrder = ref("orderAdded");
const filterGroup = ref("allGroups");

const user = computed(() => {
  const auth = authStore();
  return usersStore().getUser(auth.currentUsername);
});

const ingredientsData = computed(() => {
  return { ingredients: user.value.ingredients.length, groups: user.value.groups.length };
});

type Ingredient = {
  ingredient: string;
  group: string;
  weight: number;
  protein: number;
  quantity: number;
  onShoppingList: boolean;
};
function orderIngredients(array: Ingredient[], sort: number) {
  return array.sort(
    (
      ingredient1: {
        ingredient: string;
      },
      ingredient2: {
        ingredient: string;
      },
    ) => {
      if (ingredient1.ingredient > ingredient2.ingredient) {
        return 1 * sort;
      } else if (ingredient1.ingredient == ingredient2.ingredient) {
        return 0;
      } else {
        return -1 * sort;
      }
    },
  );
}

const ingredientsArray = computed(() => {
  if (
    filterSearch.value == "" &&
    filterOrder.value == "orderAdded" &&
    filterGroup.value == "allGroups"
  ) {
    return user.value.ingredients;
  }

  let filteredIngredientsArray = [...user.value.ingredients];

  // orders the array by [user option]
  if (filterOrder.value == "orderAdded") {
    filteredIngredientsArray = [...user.value.ingredients];
  }

  if (filterOrder.value == "orderAZ") {
    filteredIngredientsArray = orderIngredients(filteredIngredientsArray, 1);
  }

  if (filterOrder.value == "orderZA") {
    filteredIngredientsArray = orderIngredients(filteredIngredientsArray, -1);
  }

  // filters by whats written in the input
  if (filterSearch.value != "") {
    filteredIngredientsArray = filteredIngredientsArray.filter(
      (ingredient: {
        ingredient: string;
        group: string;
        weight: number;
        protein: number;
        quantity: number;
        onShoppingList: boolean;
      }) => ingredient.ingredient.toLowerCase().includes(filterSearch.value.toLowerCase()),
    );
  }

  // filters by group
  if (filterGroup.value != "allGroups") {
    filteredIngredientsArray = filteredIngredientsArray.filter(
      (ingredient: { ingredient: string; group: string }) =>
        ingredient.group.toLowerCase() == filterGroup.value.toLowerCase(),
    );
  }

  console.log(filteredIngredientsArray);

  return filteredIngredientsArray;
});

function addNewIngredient() {
  const auth = authStore();
  const users = usersStore();

  const areEmpty = Object.values(newIngredient.value).some(
    (aboutIngredient) => aboutIngredient == "",
  );

  if (areEmpty) {
    modalMsg.value.success = false;
    modalMsg.value.txt = "All the contents must be filled!";
  } else {
    const result = users.addManualIngredient(
      auth.currentUsername,
      newIngredient.value.name,
      newIngredient.value.group,
      newIngredient.value.weight,
      newIngredient.value.protein,
      newIngredient.value.calories,
    );

    if (result.success) {
      modalMsg.value.success = result.success;
      modalMsg.value.txt = result.txt;
    }
  }
}

function isRemovingIngredient(ingredient: string) {
  modal.value.modalOn = true;
  modal.value.modalRemoveIngredient = true;
  removingIngredient.value = ingredient;
}

function removeIngredient() {
  const auth = authStore();
  const users = usersStore();

  const result = users.removeIngredient(auth.currentUsername, removingIngredient.value);

  if (result.success) {
    modalMsg.value.success = result.success;
    modalMsg.value.txt = result.txt;
  }
}
</script>

<style scoped>
@import "@/assets/styles/view/IngredientsList.css";
</style>
