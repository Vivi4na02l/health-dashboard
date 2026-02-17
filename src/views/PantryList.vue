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

    <div></div>
  </section>
</template>

<script lang="ts">
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

export default {
  data() {
    return {
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

  methods: {
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
        }
      }
    },

    modalCancel() {
      this.modal = false;
      this.modalForm.submit = false;
      this.modalForm.msg.txt = "";
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
</style>
