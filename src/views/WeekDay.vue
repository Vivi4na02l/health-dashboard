<template>
  <section>
    <!-- modal -->
    <div class="modal" v-show="openModal">
      <div>
        <header>
          <h2>Add an activity</h2>
        </header>

        <span>
          <p>Available activities:</p>
          <select name="activities" v-model="form.activities">
            <option value="">select an activity</option>
            <option
              :value="activity"
              v-for="activity of getActivities"
              :key="activity.key"
              selected
            >
              {{ activity }}
            </option>
          </select>
        </span>

        <p v-show="modal.success" :class="modal.success ? 'success' : 'error'">{{ modal.txt }}</p>

        <footer>
          <button class="btnConfirm" @click="addActivity()">Confirm</button>
          <button class="btnCancel" @click="openModal = false">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- arrow left -->
    <span
      @click="onTab = 'yesterday'"
      :class="onTab != 'yesterday' ? 'yesterday' : 'yesterday hidden'"
    >
      <img src="../assets/images/icon-arrow.png" alt="arrow to the right" />

      <span v-if="onTab == 'tomorrow'">
        <p>Today</p>
        <p>{{ today.dayWeek }}</p>
      </span>

      <span v-else>
        <p>Yesterday</p>
        <p>{{ notToday(false) }}</p>
      </span>
    </span>

    <div class="activity">
      <h2>{{ today.dayWeek }}</h2>
      <h3>{{ today.day }} of {{ today.month }}</h3>

      <img src="../assets/images/icon-lazy.png" alt="lazy animal" />
      <p>You have no activities assign for {{ today.dayWeek }}s.</p>
      <button class="btnOpenModal" @click="openModal = true">Add activity</button>
    </div>

    <!-- arrow right -->
    <span @click="onTab = 'tomorrow'" :class="onTab != 'tomorrow' ? 'tomorrow' : 'tomorrow hidden'">
      <span v-if="onTab == 'yesterday'">
        <p>Today</p>
        <p>{{ today.dayWeek }}</p>
      </span>

      <span v-else>
        <p>Tomorrow</p>
        <p>{{ notToday(true) }}</p>
      </span>

      <img src="../assets/images/icon-arrow.png" alt="arrow to the right" />
    </span>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

const onTab = ref("today");
const openModal = ref(false);

const form = ref({
  activities: "",
});

const modal = ref({
  txt: "",
  success: false,
});

const today = ref({
  day: new Date().getDate(),
  month: new Date().toLocaleString("en-UK", { month: "long" }),
  dayWeek: new Intl.DateTimeFormat("en-UK", { weekday: "long" }).format(new Date()),
});

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const user = computed(() => {
  const auth = authStore();
  return usersStore().getUser(auth.currentUsername);
});

const getActivities = computed(() => {
  if (!user.value) {
    return [];
  }

  return [...user.value.week.activities];
});

function notToday(isTomorrow) {
  const todayIndex = week.findIndex((day) => day == today.value.dayWeek);

  if (isTomorrow) {
    if (todayIndex != week.length - 1) {
      return week[todayIndex + 1];
    } else {
      return week[0];
    }
  } else {
    if (todayIndex != 0) {
      return week[todayIndex - 1];
    } else {
      return week[week.length - 1];
    }
  }
}

function addActivity() {
  const auth = authStore();

  if (onTab.value == "today") {
    const result = usersStore().addActivity(
      auth.currentUsername,
      today.value.dayWeek.toLowerCase(),
      form.value.activities,
    );

    modal.value.txt = result.txt;
    modal.value.success = result.success;
  }
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
}

.modal {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  border-radius: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #00000044;
}

.modal > div {
  border-radius: 0.5rem;
  padding: 1rem;

  background-color: var(--white);
}

header {
  border-bottom: solid 0.1rem #000;
}

.modal span {
  margin-top: 1rem;
  margin-bottom: 1rem;

  display: flex;
  gap: 0.5rem;
}

.modal select {
  cursor: pointer;

  border-radius: 0.5rem;
  border: solid 0.1rem #cbcbcb;
  padding: 0.5rem;

  text-align: center;
}

.btnConfirm,
.btnCancel {
  border-radius: 0.5rem;
  padding: 0.5rem 2rem 0.5rem 2rem;
}

.btnConfirm {
  border: none;
  background-color: #000;
  color: #fff;
}

.btnCancel {
  border: #000 solid 0.1rem;
}
.btnCancel:hover {
  background-color: #0000001f;
}

footer {
  border-top: solid 0.1rem #000;
  padding-top: 1rem;

  display: flex;
  gap: 0.5rem;
}

section {
  height: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

section > * {
  border-radius: 0.5rem;
  padding: 1rem;

  background-color: var(--light-green);
}

.activity {
  width: 40%;
  text-align: center;
}

.activity img {
  width: 100%;
  max-width: 20rem;

  margin-top: 1rem;
  margin-bottom: 1rem;
}

.btnOpenModal {
  border: none;
  border-radius: 1rem;
  padding: 1rem 2rem 1rem 2rem;

  background-color: #000;
  color: #fff;
}

button:hover {
  cursor: pointer;
  background-color: #3a3a3a;
}

section > span {
  display: flex;
  align-items: center;
  gap: 1rem;
}

section > span:hover {
  cursor: pointer;
  background-color: var(--green);
}

span img {
  width: 100%;
  max-width: 3rem;
  height: fit-content;
}

.yesterday img {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

h2 {
  padding: 0 0 0.5rem 0;
  margin: 0;
}

h3 {
  padding: 0.5rem 0 0 0;
  margin: 0;

  border-top: solid 0.1rem #000;
}
</style>
