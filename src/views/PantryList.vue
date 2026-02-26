<template>
  <section>
    <!-- modal -->
    <div v-show="modal" class="modal">
      <div>
        <header>
          <h2>Add ingredient</h2>
          <select name="addIngredient" v-model="searchForm">
            <option value="searching">Searching</option>
            <option value="manually">Manually</option>
          </select>
        </header>

        <div v-if="searchForm == 'searching'" class="modal-body-search">
          <p class="intro">
            Search for an ingredient where we will estimate the amount of its nutrients. Or manually
            add and edit one yourself.
          </p>

          <form class="formAPI" @submit.prevent="formConfirm()">
            <input type="text" id="txtIngredient" v-model="form.txtIngredient" />
            <div class="gramsDiv">
              <input type="number" class="gramsInput" min="1" v-model="form.grams" />
              <span>grams</span>
            </div>
            <button type="submit">&#x2714;</button>
            <button>Add manually</button>
          </form>

          <aside>
            <p>Type an ingredient for results...</p>
          </aside>
        </div>

        <form v-else class="modal-body">
          <label for="txtIngredientManual">Ingredient:</label>
          <input
            type="text"
            id="txtIngredientManual"
            v-model="modalForm.txtIngredient"
            :style="
              modalForm.submit && modalForm.txtIngredient == ''
                ? 'border: solid 0.1rem var(--red);'
                : null
            "
          />

          <label for="nbrWeightManual">Weight</label>
          <div class="gramsDiv">
            <input
              type="number"
              class="gramsInput"
              id="nbrWeightManual"
              v-model="modalForm.nbrWeight"
              min="1"
              required
            />
            <span>grams</span>
          </div>

          <label for="nbrProteinManual">Protein</label>
          <div class="gramsDiv">
            <input
              type="number"
              class="gramsInput"
              id="nbrProteinManual"
              v-model="modalForm.nbrProtein"
              min="0"
              required
            />
            <span>grams</span>
          </div>

          <p v-if="modalForm.msg.txt != ''" :class="modalForm.msg.success ? 'success' : 'error'">
            {{ modalForm.msg.txt }}
          </p>
        </form>

        <footer>
          <button id="btnConfirm" @click="modalConfirm()">Confirm</button>
          <button id="btnCancel" @click="modalCancel()">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- catalog -->
    <div class="catalog">
      <header>
        <select name="onTab" v-model="onTab">
          <option value="pantry">Pantry</option>
          <option value="shopping">Shopping list</option>
        </select>

        <button type="submit" @click="modal = true">Add to list</button>
      </header>

      <div v-if="areIngredientsInList()" class="body">
        <!-- v-if="onTab == 'pantry'" -->
        <article
          v-for="ingredient of getIngredients"
          :key="ingredient.key"
          v-show="listChange(ingredient)"
          :class="arrangeStructure(ingredient)"
        >
          <!-- checkbox for shopping list -->
          <input
            v-show="arrangeStructure(ingredient) == 'shopping' ? true : false"
            type="checkbox"
            :checked="ingredient.checked"
            @change="toggleChecked(ingredient.ingredient, $event.target.checked)"
          />

          <!-- ingredient name and its info -->
          <div class="ingredientInfo">
            <p class="ingredientTitle">{{ ingredient.ingredient }}</p>
            <span>
              <p class="ingredientDetails">
                {{ ingredient.protein }}g of protein per {{ ingredient.weight }}g
              </p>
            </span>
          </div>

          <!-- to increase or decrease quantity of ingredient -->
          <div
            class="pantryIngredientQuantity"
            v-if="(onTab == 'pantry' && ingredient.quantity > 0) || onTab == 'shopping'"
          >
            <div
              class="btnQuantity"
              @click="changeIngredientQuantity(ingredient.ingredient, false)"
            >
              -
            </div>
            <p v-if="onTab == 'pantry'">{{ ingredient.quantity }}</p>
            <p v-else>
              {{
                ingredientChecks[ingredient.ingredient + "Quantity"]
                  ? ingredientChecks[ingredient.ingredient + "Quantity"]
                  : 0
              }}
              <!-- ingredientChecks[ingredient.ingredient + "Quantity"] || 0 -->
            </p>
            <div class="btnQuantity" @click="changeIngredientQuantity(ingredient.ingredient, true)">
              +
            </div>
          </div>

          <div
            class="ranOutIngredientQuantity"
            v-if="onTab == 'pantry' && ingredient.quantity == 0"
          >
            <div :class="ingredient.onShoppingList ? 'btnQuantity active' : 'btnQuantity inactive'">
              <div
                @click="changeIngredientList(ingredient.ingredient, true)"
                v-if="!ingredient.onShoppingList"
              >
                Shopping list
              </div>
              <div @click="changeIngredientList(ingredient.ingredient, false)" v-else>
                On shopping list
              </div>
            </div>
            <div
              class="btnQuantity"
              @click="
                (changeIngredientQuantity(ingredient.ingredient, true),
                changeIngredientList(ingredient.ingredient, false))
              "
            >
              Back to pantry
            </div>
          </div>

          <div
            class="btnRemove"
            v-if="arrangeStructure(ingredient) == 'shopping' ? true : false"
            @click="changeIngredientList(ingredient.ingredient, false)"
          >
            <img src="../assets/images/icon-close-black.png" alt="black cross close button" />
          </div>
        </article>

        <button class="btnComplete" v-show="onTab == 'shopping'" @click="completeShopping()">
          Complete grocery shopping
        </button>
      </div>

      <!-- if ingredients list empty -->
      <div v-else class="empty">
        <img src="../assets/images/icon-empty-box.png" alt="empty box with fly" />
        <p>There is no ingredients in this list.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

export default {
  data() {
    return {
      searchForm: "searching",

      onTab: "pantry",

      ingredientChecks: {},

      form: {
        txtIngredient: "",
        grams: 100,
      },

      modalForm: {
        submit: false,
        msg: {
          txt: "",
          success: false,
        },
        txtIngredient: "",
        nbrWeight: 100,
        nbrProtein: 0,
      },

      modal: false,
    };
  },

  created() {
    this.quantityOnShoppingList();
  },

  computed: {
    user() {
      const auth = authStore();
      return usersStore().getUser(auth.currentUsername);
    },

    getIngredients() {
      if (!this.user) {
        return [];
      }

      return (
        [...this.user.ingredients]
          .sort((a, b) => {
            if (a.quantity == 0 && b.quantity != 0) {
              return 1;
            }

            if (a.quantity != 0 && b.quantity == 0) {
              return -1;
            }

            return 0;
          })
          /**
           * adds to each position(ingredient) two parameters
           * shoppingQuantity -> stores the value on the shopping list (different then quantity of array in the store users.js that is the pantry quantity)
           * checked -> used on the shopping list that, if checked, will allow addition of "shoppingQuantity" integer to pantry quantity
           */
          .map((ingredient) => ({
            ...ingredient,
            // shoppingQuantity: 0,
            checked: this.ingredientChecks[ingredient.ingredient] || false,
          }))
      );
    },
  },

  methods: {
    listChange(ingredient) {
      if (this.onTab == "pantry") {
        return true;
      } else if (this.onTab == "shopping" && ingredient.onShoppingList) {
        return true;
      } else {
        return false;
      }
    },

    formConfirm() {},

    modalConfirm() {
      const auth = authStore();
      const users = usersStore();

      this.modalForm.submit = true; // responsible for making the inputs border red, if they're empty

      if (
        this.modalForm.txtIngredient === "" ||
        this.modalForm.nbrWeight === "" ||
        this.modalForm.nbrProtein === ""
      ) {
        this.modalForm.msg.txt = "All the contents must be filled!";
      } else {
        const result = users.addManualIngredient(
          auth.currentUsername,
          this.modalForm.txtIngredient,
          this.modalForm.nbrWeight,
          this.modalForm.nbrProtein,
        );

        console.log(result);
        this.modalForm.msg.txt = result.txt;
        this.modalForm.msg.success = result.success;

        if (result.success) {
          this.modalForm.submit = false;
          this.getIngredients();
        }
      }
    },

    modalCancel() {
      this.modal = false;
      this.modalForm.submit = false;
      this.modalForm.msg.txt = "";
    },

    areIngredientsInList() {
      if (
        this.onTab == "shopping" &&
        this.getIngredients.find((ingredient) => ingredient.onShoppingList == true)
      ) {
        return true;
      } else if (
        this.onTab == "pantry" &&
        this.getIngredients.find((ingredient) => ingredient.onShoppingList == false)
      ) {
        return true;
      } else {
        return false;
      }
    },

    quantityOnShoppingList() {
      for (const ingredient of this.getIngredients) {
        if (ingredient.onShoppingList) {
          this.ingredientChecks[ingredient.ingredient] = false;
          this.ingredientChecks[ingredient.ingredient + "Quantity"] = 0;
        }
      }
    },

    changeIngredientQuantity(ingredientName, isPlus, customAddition = 0) {
      if (this.onTab == "pantry" || customAddition != 0) {
        const auth = authStore();
        usersStore().changeIngredientQuantity(
          auth.currentUsername,
          ingredientName,
          isPlus,
          customAddition,
        );
      }
      // if on shopping list
      else {
        console.log(this.ingredientChecks);

        const key = ingredientName + "Quantity";

        if (key in this.ingredientChecks && isPlus) {
          this.ingredientChecks[ingredientName + "Quantity"]++;
        }
      }
    },

    changeIngredientList(ingredientName, toShoppingList) {
      const auth = authStore();
      usersStore().changeIngredientList(auth.currentUsername, ingredientName, toShoppingList);

      if (toShoppingList) {
        this.ingredientChecks[ingredientName + "Quantity"] = 0;
      }
    },

    /**
     * adds to the object ingredientChecks, "ingredientName: ingredientIsChecked"
     * @param ingredientName
     * @param ingredientIsChecked true/false
     */
    toggleChecked(ingredientName, ingredientIsChecked) {
      this.ingredientChecks[ingredientName] = ingredientIsChecked;
      // this.ingredientChecks[ingredientName+"Quantity"] = 0;
    },

    /**
     * If the ingredient's checkbox is checked, adds the ingredient shopping's quantity to the pantry quantity of that same ingredient
     */
    completeShopping() {
      for (const ingredient of this.user.ingredients) {
        const key = ingredient.ingredient;
        const keyQuantity = ingredient.ingredient + "Quantity";

        if (key in this.ingredientChecks && keyQuantity in this.ingredientChecks) {
          if (this.ingredientChecks[key]) {
            console.log(this.ingredientChecks[ingredient.ingredient + "Quantity"]);

            // ingredient.quantity += this.ingredientChecks[ingredient.ingredient + "Quantity"];
            this.changeIngredientQuantity(
              ingredient.ingredient,
              true,
              this.ingredientChecks[ingredient.ingredient + "Quantity"],
            );
          }
        }
      }
    },

    arrangeStructure(ingredient) {
      if (this.onTab == "pantry") {
        if (ingredient.quantity > 0) {
          return "pantry";
        } else {
          return "ranOut";
        }
      } else if (this.onTab == "shopping") {
        return "shopping";
      }
      //comment
      else {
        return "ranOut";
      }
    },
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;
}

.intro {
  margin: 0 0 0.5rem 0;
}

.formAPI {
  height: 3rem;

  display: grid;
  grid-template-columns: 3fr 2fr 1fr 2fr;
  gap: 0.5rem;
}

/* input style */
#txtIngredientManual,
#txtIngredient,
.gramsDiv,
aside {
  border: solid 0.1rem #cbcbcb;
  border-radius: 0.5rem;

  background-color: var(--white);
}

input {
  field-sizing: content;
  text-align: center;
  font-size: 1rem;
}

#txtIngredient {
  background-image: url("../assets/images/icon-search.png");
  background-size: 1.5rem;
  background-repeat: no-repeat;
  background-position: 5% 50%;

  text-indent: 2rem;
}

#txtIngredient:focus {
  outline: solid 1px #000;
}

.gramsDiv {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.gramsInput {
  border: none;
  background-color: transparent;
}

.gramsInput:focus {
  outline: none;
}

.gramsDiv:focus-within {
  outline: 1px solid #000;
}

.gramsDiv span {
  cursor: default;

  border-left: solid 0.1rem #cbcbcb;
  padding-left: 1rem;
  padding-right: 1rem;
  align-self: center;
  font-size: 1rem;
}

button {
  cursor: pointer;

  border: none;
  border-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  background-color: #000;
  color: var(--white);
  font-size: 1rem;
}
button:hover {
  background-color: #1b1b1b;
}

aside {
  margin-top: 0.5rem;

  background-color: var(--white);
}
aside p {
  width: 100%;
  text-align: center;
}

.redBorder {
  border: solid 0.1rem var(--red);
}

/* modal */
.modal {
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #0000004f;
}

.modal h2 {
  margin: 0;
  padding: 0;
}

.modal > div {
  width: 30%;

  border-radius: 1rem;
  padding: 2rem;

  background-color: var(--white);
}

.modal header {
  border-bottom: solid 0.1rem #000;
  padding-bottom: 1rem;

  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal header select {
  cursor: pointer;

  border-radius: 0.5rem;
  border: solid 0.1rem #cbcbcb;
  padding: 0.5rem;

  text-align: center;
  font-size: 1.1rem;
}

.modal-body {
  margin-top: 1rem;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-body input,
.modal footer button {
  height: 2rem;
}

.modal-body-search {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.modal footer {
  border-top: solid 0.1rem #000;
  padding-top: 1rem;

  display: flex;
  gap: 0.5rem;
}

.modal #btnCancel {
  border: solid 0.1rem #000;
  background-color: transparent;
  color: #000;
}
.modal #btnCancel:hover {
  background-color: #00000023;
}

.catalog {
  width: 40%;

  border-radius: 0.5rem;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: var(--light-green);
}

.catalog header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.catalog header select {
  cursor: pointer;
  width: 100%;

  border-radius: 0.5rem;
  border: solid 0.1rem #cbcbcb;
  padding: 1rem;

  text-align: center;
  font-size: 1.2rem;
}

.catalog .body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

article {
  border-radius: 0.5rem;
  padding: 1rem;

  display: flex;
}

article p {
  margin: 0;
}

article .ingredientInfo {
  width: 100%;
}

.shopping,
.pantry {
  background-color: var(--white);
}

.ranOut {
  align-items: center;
  border: solid 0.1rem #000;
}

.pantryIngredientQuantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ranOutIngredientQuantity {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.btnQuantity {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;
  border: solid #000 0.1rem;
}

.pantryIngredientQuantity .btnQuantity {
  width: 2rem;
  height: 2rem;
}

.ranOutIngredientQuantity .btnQuantity {
  padding-left: 1rem;
  padding-right: 1rem;
}

article .btnQuantity:hover {
  cursor: pointer;

  background-color: #00000023;
}

article .ingredientQuantity p {
  font-size: 1.2rem;
}

input[type="checkbox"] {
  width: 1rem;
  margin-right: 1rem;
}

.ingredientTitle {
  font-size: 1.5rem;
}

.btnRemove {
  cursor: pointer;
  margin-left: 1rem;

  display: flex;
}

.btnRemove img {
  width: 100%;
  max-width: 1rem;

  align-self: center;
}

.btnComplete {
  padding-top: 1rem;
  padding-bottom: 1rem;

  background-color: var(--even-darker-green);
}

.btnComplete:hover {
  background-color: var(--dark-green);
}

.ranOutIngredientQuantity .active {
  background-color: var(--even-darker-green);
  color: var(--white);
}

.ranOutIngredientQuantity .active:hover {
  background-color: var(--dark-green);
}

.inactive:hover {
  background-color: #0000002c;
}

.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty img {
  width: 100%;
  max-width: 20rem;
}

.empty p {
  text-align: center;
}
</style>
