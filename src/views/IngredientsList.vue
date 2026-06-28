<template>
  <aside>
    <!-- modals -->
    <div class="modalBackground" v-show="modal.modalOn">
      <article v-show="modal.modalAddIngredient">
        <header>
          <h2 v-if="modal.modalType == 'add'">New ingredient</h2>
          <h2 v-else>Edit ingredient</h2>
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
          v-show="!modalMsg.success"
        >
          {{ modalMsg.txt }}
        </p>

        <footer>
          <button v-if="modal.modalType == 'add'" class="btnConfirm" @click="addNewIngredient()">
            Add ingredient
          </button>
          <button v-else class="btnConfirm" @click="addNewIngredient()">Confirm changes</button>
          <button
            class="btnCancel"
            @click="(clearForm(), (modal.modalAddIngredient = false), (modal.modalOn = false))"
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

    <!-- notification -->
    <PopupNotification :show="modalMsg.success" :message="modalMsg.txt" />

    <header>
      <div>
        <span>
          <img src="@/assets/images/icon-ingredients.png" alt="ingredients icon" />
          <h2>{{ type }}</h2>
        </span>
        <!-- INGREDIENTS -->
        <p v-if="type.toLowerCase() == 'ingredients'">
          Managing ingredients and nutritional information
        </p>
        <!-- PANTRY -->
        <p v-else-if="type.toLowerCase() == 'pantry'">Managing available inventory</p>
        <!-- GROCERY LIST -->
        <p v-else>Managing supermarket ingredients</p>
      </div>

      <button
        v-if="type.toLowerCase() == 'ingredients'"
        @click="
          ((modal.modalAddIngredient = true), (modal.modalOn = true), (modal.modalType = 'add'))
        "
      >
        Add ingredient
      </button>
    </header>

    <section class="infoSection">
      <div class="animHigher">
        <h3>{{ ingredientsData.ingredients }}</h3>
        <p>Ingredients</p>
      </div>

      <div v-if="type.toLowerCase() == 'ingredients'" class="animHigher">
        <h3>{{ ingredientsData.groups }}</h3>
        <p>Ingredient groups</p>
      </div>

      <div v-if="type.toLowerCase() == 'pantry'" class="animHigher">
        <h3 style="color: var(--red)">{{ ingredientsData.outOfStock }}</h3>
        <p>Out of stock</p>
      </div>

      <div v-if="type.toLowerCase() == 'pantry'" class="animHigher">
        <h3>{{ ingredientsData.onGroceryList }}</h3>
        <p>On groceries list</p>
      </div>
    </section>

    <!-- FILTERS -->
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

      <button v-show="type.toLowerCase() == 'pantry'">Out of stock</button>
    </section>

    <!-- TABLE -->
    <section class="tableSection">
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Group</th>

            <th>
              <p v-if="type.toLowerCase() == 'ingredients'">Weight</p>
              <p v-else-if="type.toLowerCase() == 'pantry'">Quantity</p>
            </th>

            <th v-if="type.toLowerCase() == 'ingredients'">Protein</th>
            <th v-else-if="type.toLowerCase() == 'pantry'">Status</th>

            <th v-if="type.toLowerCase() == 'ingredients'">Calories</th>
            <th v-else-if="type.toLowerCase() == 'pantry'">Grocery list</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="ingredient in ingredientsArray"
            :key="ingredient"
            :class="ingredient.quantity == 0 ? 'outOfStock' : ''"
          >
            <td>{{ ingredient.ingredient }}</td>
            <td>{{ ingredient.group }}</td>

            <td>
              <!-- weight -->
              <p v-if="type.toLowerCase() == 'ingredients'">{{ ingredient.weight }}g</p>

              <span class="quantity" v-else-if="type.toLowerCase() == 'pantry'">
                <button @click="changePantryQuantity(ingredient.ingredient, false)">-</button>

                <div>
                  <p class="units">{{ ingredient.quantity }} units</p>
                  <p class="weight">{{ ingredient.weight }}g</p>
                </div>

                <button @click="changePantryQuantity(ingredient.ingredient, true)">+</button>
              </span>
            </td>

            <td>
              <!-- protein or status -->
              <span v-if="type.toLowerCase() == 'ingredients'"> {{ ingredient.protein }}g </span>

              <span v-else-if="type.toLowerCase() == 'pantry'">
                <span v-if="ingredient.quantity == 0" class="status outOf backgroundColorShift"
                  >Out of stock</span
                >

                <span v-else class="status onList backgroundColorShift"> In stock </span>
              </span>
            </td>

            <td>
              <!-- protein or grocery list -->
              <span v-if="type.toLowerCase() == 'ingredients'"> {{ ingredient.calories }}cal </span>

              <span v-else-if="type.toLowerCase() == 'pantry'">
                <span v-if="ingredient.onShoppingList" class="status onList backgroundColorShift">
                  on grocery list
                </span>

                <span v-else>&#x2014;</span>
              </span>
            </td>

            <!-- BUTTONS: add/remove OR add/remove from grocery list OR -->
            <td v-if="type.toLowerCase() == 'ingredients'" class="buttons">
              <button class="btnEdit" @click="editIngredient(ingredient)">Edit</button>
              <button class="btnRemove" @click="isRemovingIngredient(ingredient.ingredient)">
                Remove
              </button>
            </td>

            <td v-else-if="type.toLowerCase() == 'pantry'" class="buttons">
              <button
                v-if="!ingredient.onShoppingList"
                class="btnAddGrocery backgroundColorShift"
                @click="addOrRemoveGroceryList(ingredient.ingredient, true)"
              >
                Add to grocery list
              </button>

              <button v-else @click="addOrRemoveGroceryList(ingredient.ingredient, false)">
                Remove from grocery list
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </aside>
</template>

<script setup lang="ts">
import PopupNotification from "../components/PopupNotification.vue";

import { computed, ref, watch } from "vue";

import { usersStore } from "@/store/users";
import { authStore } from "@/store/auth";
import { useRoute } from "vue-router";

const route = useRoute();
const type = route.query.type as string;

const newIngredient = ref({
  name: "",
  weight: "",
  protein: "",
  calories: "",
  group: "",
});

const changeIngredient = ref("");

let notificationTimer: number | undefined;

const modalMsg = ref({
  success: false,
  txt: "",
});

const modal = ref({
  modalOn: false,
  modalType: "add",
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
  const ingredientsOutOfStock = user.value.ingredients.filter(
    (ing: { quantity: number }) => ing.quantity == 0,
  );
  const ingredientsOnGroceryList = user.value.ingredients.filter(
    (ing: { onShoppingList: boolean }) => ing.onShoppingList == true,
  );

  return {
    ingredients: user.value.ingredients.length,
    groups: user.value.groups.length,
    outOfStock: ingredientsOutOfStock.length,
    onGroceryList: ingredientsOnGroceryList.length,
  };
});

type Ingredient = {
  ingredient: string;
  group: string;
  weight: number;
  protein: number;
  quantity: number;
  onShoppingList: boolean;
};

/**
 * changes the order and/or filters through the array of ingredients
 * @param array
 * @param sort
 */
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

/**
 * creates a new ingredient
 */
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
    let result;
    if (modal.value.modalType == "add") {
      result = users.addManualIngredient(
        auth.currentUsername,
        newIngredient.value.name,
        newIngredient.value.group,
        newIngredient.value.weight,
        newIngredient.value.protein,
        newIngredient.value.calories,
      );
    } else {
      result = users.editIngredient(
        auth.currentUsername,
        changeIngredient.value,
        newIngredient.value.name,
        newIngredient.value.group,
        newIngredient.value.weight,
        newIngredient.value.protein,
        newIngredient.value.calories,
      );
    }

    if (result) {
      modalMsg.value.success = result.success;
      modalMsg.value.txt = result.txt;
    }

    if (result.success) {
      modal.value.modalAddIngredient = false;
      modal.value.modalOn = false;

      clearForm();
    }
  }
}

/**
 * edit selected ingredient's info
 * @param ingredient
 */
function editIngredient(ingredient: {
  ingredient: string;
  group: string;
  weight: string;
  protein: string;
  calories: string;
}) {
  modal.value.modalType = "edit";
  modal.value.modalAddIngredient = true;
  modal.value.modalOn = true;

  changeIngredient.value = ingredient.ingredient;

  newIngredient.value = {
    name: ingredient.ingredient,
    weight: ingredient.weight,
    protein: ingredient.protein,
    calories: ingredient.calories,
    group: ingredient.group,
  };
}

function isRemovingIngredient(ingredient: string) {
  modal.value.modalOn = true;
  modal.value.modalRemoveIngredient = true;
  removingIngredient.value = ingredient;
}

/**
 * deletes ingredient entirely
 */
function removeIngredient() {
  const auth = authStore();
  const users = usersStore();

  const result = users.removeIngredient(auth.currentUsername, removingIngredient.value);

  if (result.success) {
    modalMsg.value.success = result.success;
    modalMsg.value.txt = result.txt;

    modal.value.modalRemoveIngredient = false;
    modal.value.modalOn = false;
  }
}

/**
 * clears the ingredient create/edit form after it closes
 */
function clearForm() {
  newIngredient.value = {
    name: "",
    weight: "",
    protein: "",
    calories: "",
    group: "",
  };
}

function changePantryQuantity(ingredient: string, isPlus: boolean) {
  const auth = authStore();
  const users = usersStore();

  users.changePantryIngredientQuantity(auth.currentUsername, ingredient, isPlus);
}

/**
 * adds ingredient to the grocery list
 * @param ingredient
 */
function addOrRemoveGroceryList(ingredient: string, isAdding: boolean) {
  const auth = authStore();
  const users = usersStore();

  users.addOrRemoveIngredientFromGroceryList(auth.currentUsername, ingredient, isAdding);
}

// controls how long the notification is on for
watch(
  () => modalMsg.value,
  (newVal) => {
    if (newVal.success && newVal.txt) {
      clearTimeout(notificationTimer);

      notificationTimer = window.setTimeout(() => {
        modalMsg.value = {
          success: false,
          txt: "",
        };
      }, 3500);
    }
  },
  { deep: true },
);
</script>

<style scoped>
@import "@/assets/styles/view/IngredientsList.css";
</style>
