<template>
  <section>
    <!-- form -->
    <div>
      <p class="intro">
        Search for an ingredient where we will estimate the amount of its nutrients. Or manually add
        and edit one yourself.
      </p>

      <form class="formAPI" @submit.prevent="formConfirm()">
        <input type="text" id="txtIngredient" v-model="form.txtIngredient" />
        <div class="gramsDiv">
          <input type="number" class="gramsInput" min="1" v-model="form.grams" />
          <span>grams</span>
        </div>
        <button type="submit">&#x2714;</button>
        <button @click="modal = true">Add manually</button>
      </form>

      <aside>
        <p>Type an ingredient for results...</p>
      </aside>

      <!-- modal -->
      <div v-show="modal" class="modal">
        <div>
          <header>
            <h2>Add ingredient</h2>
          </header>

          <form class="modal-body">
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
    </div>

    <!-- catalog -->
    <div class="catalog">
      <header>
        <select name="onTab" v-model="onTab">
          <option value="pantry">Pantry</option>
          <option value="shopping">Shopping list</option>
          <option value="ranOut">Ran out of</option>
        </select>

        <button type="submit">Add to list</button>
      </header>

      <div>
        <!-- v-if="onTab == 'pantry'" -->
        <article
          v-for="ingredient of user.ingredients"
          :key="ingredient.key"
          v-show="listArrayChange(ingredient)"
          class="pantry"
        >
          <!-- <input type="checkbox" name="" id="" /> -->

          <div class="ingredientInfo">
            <p class="ingredientTitle">{{ ingredient.ingredient }}</p>
            <span>
              <p class="ingredientDetails">
                {{ ingredient.protein }}g of protein per {{ ingredient.weight }}g
              </p>
            </span>
          </div>

          <div class="pantryIngredientQuantity" v-if="onTab == 'pantry'">
            <div class="btnQuantity" @click="changeQuantity(ingredient.ingredient, false)">-</div>
            <p>{{ ingredient.quantity }}</p>
            <div class="btnQuantity" @click="changeQuantity(ingredient.ingredient, true)">+</div>
          </div>

          <div class="ranOutIngredientQuantity" v-else-if="onTab == 'ranOut'">
            <div class="btnQuantity">Shopping list</div>
            <div class="btnQuantity" @click="changeQuantity(ingredient.ingredient, true)">
              Back to pantry
            </div>
          </div>
        </article>
      </div>

      <!-- <div v-else>
        <article
          v-for="ingredient of user.ingredients"
          :key="ingredient.key"
          v-show="ingredient.quantity == 0"
          class="ranOut"
        >
          <!- <input type="checkbox" name="" id="" /> ->

          <div class="ingredientInfo">
            <p class="ingredientTitle">{{ ingredient.ingredient }}</p>
            <span>
              <p class="ingredientDetails">
                {{ ingredient.protein }}g of protein per {{ ingredient.weight }}g
              </p>
            </span>
          </div>

          <div class="ingredientQuantity">
            <div class="btnQuantity">Shopping list</div>
            <div class="btnQuantity" @click="changeQuantity(ingredient.ingredient, true)">
              Back to pantry
            </div>
          </div>
        </article>
      </div> -->
    </div>
  </section>
</template>

<script lang="ts">
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

export default {
  data() {
    return {
      user: { ingredients: [] },

      listArray: [],

      onTab: "pantry",

      isEditing: false,

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
    this.getIngredients();
  },

  watch: {
    onTab() {
      this.listArrayChange(this.user);
    },
  },

  methods: {
    getIngredients() {
      const auth = authStore();
      const user = usersStore().getUser(auth.currentUsername);

      this.user = user;

      this.listArrayChange(user);
    },

    listArrayChange(ingredient) {
      if (this.onTab == "pantry") {
        if (ingredient.quantity >= 1 && !ingredient.onShoppingList) {
          return true;
        }
      } else if (this.onTab == "shopping" && ingredient.onShoppingList) {
        return true;
      } else if (this.onTab == "ranOut" && ingredient.quantity == 0) {
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

    changeQuantity(ingredient, isPlus) {
      const auth = authStore();
      usersStore().changeIngredient(auth.currentUsername, ingredient, isPlus);
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

section > div {
  width: 40%;

  border-radius: 0.5rem;
  padding: 2rem;

  background-color: var(--light-green);
}

.intro {
  margin: 0 0 0.5rem 0;
}

.formAPI {
  height: 3rem;

  display: grid;
  grid-template-columns: 3fr 2fr 1fr 2fr;
  gap: 0.5rem;
  align-items: stretch;
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
  margin: 0 0 1rem 0;
}

.modal > div {
  width: 30%;

  border-radius: 1rem;
  padding: 2rem;

  background-color: var(--white);
}

.modal header {
  border-bottom: solid 0.1rem #000;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.catalog .active {
  background-color: #000;
  color: var(--white);
}
.catalog .active:hover {
  background-color: #000000d7;
}

.catalog .inactive:hover {
  background-color: #0000002c;
}

article {
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: var(--white);

  display: flex;
}

article p {
  margin: 0;
}

article .ingredientInfo {
  width: 100%;
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
}

.ingredientTitle {
  font-size: 1.5rem;
}
</style>
