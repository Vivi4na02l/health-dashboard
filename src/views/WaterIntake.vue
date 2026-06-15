<template>
  <div class="modal" v-show="modal">
    <div>
      <header>
        <h2>Add water</h2>
      </header>

      <div class="modal-body">
        <p class="info">
          You can add either the water you've taken manually, or add an ingredient that you've eaten
          and we will calculate the amount of water for you!
        </p>

        <form>
          <span class="formSection">
            <label for="nbrWater">Water drank:</label>
            <input type="number" id="nbrWater" v-model="form.nbrWater" min="0" />
            <select name="waterMeasurement" id="waterMeasurement" v-model="form.waterMeasurement">
              <option value="cl">cl</option>
              <option value="l">L</option>
            </select>
          </span>
        </form>
      </div>

      <footer>
        <button id="btnConfirm" @click="modalConfirm()">Confirm</button>
        <button id="btnCancel" @click="modal = !modal">Cancel</button>
      </footer>
    </div>
  </div>

  <section class="component water">
    <div>
      <span class="edit" @click="isEditing = !isEditing">
        <span v-if="!isEditing">
          <img src="../assets/images/icon-edit.png" alt="pencil icon" />
          <p>edit goal</p>
        </span>
        <img v-else src="../assets/images/icon-close.png" alt="red X close icon" />
      </span>

      <h2>WATER</h2>

      <div class="showingUserData">
        <label for="water">Goal:</label>
        <input
          id="water"
          :type="isEditing ? 'number' : 'text'"
          :disabled="!isEditing"
          :class="isEditing ? null : 'isDisabled'"
          min="0"
          v-model="water.goal"
        />
        <p>liters</p>
      </div>

      <transition name="fade" mode="out-in">
        <span v-if="water.achieved" class="showingUserData">
          <p>&#x2714; Achieved today:</p>
          <p class="waterProgress">{{ water.eaten }}</p>
          <p>liters</p>
        </span>

        <span v-else>
          <div v-if="water.eaten < water.goal" class="showingUserData">
            <p>&#10008; Only</p>
            <p class="waterProgress">{{ water.left }}</p>
            <p>liters left to go</p>
          </div>
          <div v-else>
            <p>Congrats, you achieved your daily goal!</p>
          </div>
        </span>
      </transition>

      <button @click="modal = !modal" class="addWater">Add water</button>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      modal: false,
      form: {
        nbrWater: 0,
        waterMeasurement: "l",
      },

      water: {
        achieved: true,
        goal: 2,
        eaten: 0,
        left: 2,
      },

      isEditing: false,
    };
  },

  created() {
    this.waterProgressCycle();
  },

  computed: {
    goalChange() {
      return `${(this.water.goal, this.isEditing)}`;
    },
  },

  watch: {
    "water.eaten": function () {
      this.water.left = (this.water.goal - +this.water.eaten).toFixed(2);
    },

    goalChange(oldValue, newValue) {
      const [oldValueGoal] = oldValue.split(",");
      const [newValueGoal, newValueEdit] = newValue.split(",");

      if (!newValueEdit && oldValueGoal != newValueGoal) {
        this.water.left = this.water.goal - this.water.eaten;
      }
    },
  },

  methods: {
    /**
     * changes every 10 seconds the sentence that comes after the water goal
     */
    waterProgressCycle() {
      this.water.achieved = !this.water.achieved;

      setTimeout(() => {
        this.waterProgressCycle();
      }, 10000);
    },

    modalConfirm() {
      if (this.form.waterMeasurement == "l") {
        this.water.eaten += +this.form.nbrWater;
      } else {
        this.water.eaten += +this.form.nbrWater / 100;
      }

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

.modal input,
.modal select {
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

input,
select {
  width: 5rem;

  border: solid 0.1rem #cbcbcb;
  border-radius: 0.5rem;
  padding: 0.2rem;
}

label {
  margin-right: 1rem;
}

.showingUserData input {
  margin-left: 1rem;
  margin-right: 1rem;

  text-align: center;
}

.showingUserData input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}

.waterProgress {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-bottom: solid 0.1rem #000;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

section {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #77b9ff;
}

section > div {
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  cursor: pointer;

  border: solid 0.1rem #000;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;

  background-color: #fff;
}
.addWater:hover {
  background-color: #d8d8d8;
}

.water::after {
  content: "";
  width: 200%;
  height: 200%;
  background-color: #8ac3ff;
  position: absolute;
  top: -150%;
  left: -50%;
  border-radius: 40%;
  animation: anim 12s linear infinite;
}

@keyframes anim {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
