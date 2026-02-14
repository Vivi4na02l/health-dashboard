<template>
  <div class="modal" v-show="modal">
    <div>
      <header>
        <h2>Add protein</h2>
      </header>

      <div class="modal-body">
        <p class="info">
          You can add either the protein you've taken manually, or add an ingredient that you've
          eaten and we will calculate the amount of protein for you!
        </p>

        <form>
          <span class="formSection">
            <label for="nbrProtein">Protein:</label>
            <input type="number" id="nbrProtein" v-model="form.nbrProtein" min="0" />
            <p>grams</p>
          </span>

          <br />

          <span class="formSection">
            <label for="txtIngredient">Ingredient:</label>
            <input type="text" id="txtIngredient" v-model="form.txtIngredient" />
            <p>
              which is about
              <span class="ingredientProtein">{{ form.ingredientProtein }}</span> grams
            </p>
          </span>
        </form>

        <p class="total">Total: {{ form.total }} grams</p>
      </div>

      <footer>
        <button id="btnConfirm" @click="modalConfirm()">Confirm</button>
        <button id="btnCancel" @click="modal = !modal">Cancel</button>
      </footer>
    </div>
  </div>

  <section class="component">
    <div class="edit" @click="isEditing = !isEditing">
      <span v-if="!isEditing">
        <img src="../assets/images/icon-edit.png" alt="pencil icon" />
        <p>edit goal</p>
      </span>
      <img v-else src="../assets/images/icon-close.png" alt="red X close icon" />
    </div>

    <h2>PROTEIN</h2>

    <div class="showingUserData">
      <label for="protein">Goal:</label>
      <input
        id="protein"
        :type="isEditing ? 'number' : 'text'"
        :disabled="!isEditing"
        :class="isEditing ? null : 'isDisabled'"
        min="0"
        v-model="protein.goal"
      />
      <p>grams</p>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="protein.achieved" class="showingUserData">
        <p>&#x2714; Achieved today:</p>
        <p class="proteinProgress">{{ protein.eaten }}</p>
        <p>grams</p>
      </div>

      <div v-else>
        <div v-if="protein.eaten < protein.goal" class="showingUserData">
          <p>&#10008; Only</p>
          <p class="proteinProgress">{{ protein.left }}</p>
          <p>grams left to go</p>
        </div>
        <div v-else>
          <p>Congrats, you achieved your daily goal!</p>
        </div>
      </div>
    </transition>

    <button @click="modal = !modal" class="addProtein">Add protein</button>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      modal: false,

      form: {
        nbrProtein: 0,
        txtIngredient: "",
        ingredientProtein: 0,
        total: 0,
      },

      protein: {
        achieved: true,
        goal: 100,
        eaten: 0,
        left: 100,
      },

      isEditing: false,
    };
  },

  created() {
    this.proteinProgressCycle();
  },

  computed: {
    goalChange() {
      return `${(this.protein.goal, this.isEditing)}`;
    },
  },

  watch: {
    "form.ingredientProtein": function () {
      this.form.total = +this.form.nbrProtein + +this.form.ingredientProtein;
    },

    "form.nbrProtein": function () {
      this.form.total = +this.form.nbrProtein + +this.form.ingredientProtein;
    },

    "protein.eaten": function () {
      this.protein.left = this.protein.goal - this.protein.eaten;
    },

    goalChange(oldValue, newValue) {
      const [oldValueGoal] = oldValue.split(",");
      const [newValueGoal, newValueEdit] = newValue.split(",");

      if (!newValueEdit && oldValueGoal != newValueGoal) {
        this.protein.left = this.protein.goal - this.protein.eaten;
      }
    },
  },

  methods: {
    /**
     * changes every 10 seconds the sentence that comes after the protein goal
     */
    proteinProgressCycle() {
      this.protein.achieved = !this.protein.achieved;

      setTimeout(() => {
        this.proteinProgressCycle();
      }, 10000);
    },

    modalConfirm() {
      this.protein.eaten += this.form.nbrProtein + this.form.ingredientProtein;

      this.modal = !this.modal;
    },
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #0000004f;
}

.modal h2 {
  margin-top: 0;
  margin-bottom: 1rem;
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

.modal .modal-body {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.modal .info {
  margin-bottom: 1rem;
}

.modal .total {
  margin-top: 1rem;
}

.modal footer {
  border-top: solid 0.1rem #000;
  padding-top: 1rem;
}

.modal input {
  padding: 0.5rem;
}

.modal .formSection {
  display: flex;
  align-items: center;
}

.modal .ingredientProtein {
  border-bottom: solid 0.1rem #000;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.modal p {
  margin: 0;
}

#btnConfirm {
  margin-right: 0.5rem;

  background-color: #000;
  color: #fff;
}
#btnConfirm:hover {
  background-color: #1a1a1a;
}

#btnCancel:hover {
  background-color: #d8d8d8;
}

section {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffb429;
}

.edit {
  cursor: pointer;

  right: 0;
  top: 0;
  position: absolute;

  margin: 1rem;
  border-radius: 10rem;
  padding: 0.3rem;

  background-color: var(--white);
}
.edit:hover {
  background-color: #eeeeee;
}
.edit span {
  display: flex;
}
.edit img {
  height: 100%;
  max-height: 1rem;

  display: block;
}
.edit p {
  margin: 0 0 0 0.5rem;
  padding: 0;
}

.isDisabled {
  cursor: default;
  background-color: #eeeeee;
}

.showingUserData {
  display: flex;
  align-items: center;
}

input {
  width: 5rem;

  margin-left: 1rem;
  margin-right: 1rem;
  border: solid 0.1rem #cbcbcb;
  border-radius: 0.5rem;
  padding: 0.2rem;
}

.showingUserData input {
  text-align: center;
}

.showingUserData input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}

button {
  cursor: pointer;

  border: solid 0.1rem #000;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;

  background-color: #fff;
}
.addProtein:hover {
  background-color: #d8d8d8;
}

.proteinProgress {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-bottom: solid 0.1rem #000;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
