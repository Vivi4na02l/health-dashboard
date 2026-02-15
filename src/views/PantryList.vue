<template>
  <section>
    <!-- form -->
    <div>
      <p class="intro">
        Search for an ingredient where we will estimate the amount of its nutrients. Or manually add
        and edit one yourself.
      </p>

      <form @submit.prevent="formConfirm()">
        <input type="text" id="txtIngredient" v-model="form.txtIngredient" />
        <div class="gramsDiv">
          <input type="number" class="gramsInput" v-model="form.grams" />
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

          <div class="modal-body">
            <label for="txtIngredientManual">Ingredient:</label>
            <input type="text" id="txtIngredientManual" />

            <label for="nbrGramsManual">Weight</label>
            <div class="gramsDiv">
              <input
                type="number"
                class="gramsInput"
                id="nbrGramsManual"
                v-model="form.grams"
                required
              />
              <span>grams</span>
            </div>

            <label for="nbrProteinManual">Protein</label>
            <input type="number" id="nbrProteinManual" />
          </div>

          <footer>
            <button id="btnConfirm">Confirm</button>
            <button id="btnCancel" @click="modal = false">Cancel</button>
          </footer>
        </div>
      </div>
    </div>

    <div></div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isEditing: false,

      form: {
        txtIngredient: "",
        grams: 100,
      },

      modal: false,
    };
  },

  methods: {
    formConfirm() {},

    modalConfirm() {},
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

form {
  height: 3rem;

  display: grid;
  grid-template-columns: 3fr 2fr 1fr 2fr;
  gap: 0.5rem;
  align-items: stretch;
}

/* input style */
#txtIngredientManual,
#nbrProteinManual,
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
