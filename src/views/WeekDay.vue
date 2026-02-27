<template>
  <section>
    <span class="yesterday">
      <img src="../assets/images/icon-arrow.png" alt="arrow to the right" />

      <span>
        <p>Yesterday</p>
        <p>{{ notToday(false) }}</p>
      </span>
    </span>

    <div>
      <h2>{{ today.dayWeek }}</h2>
      <h3>{{ today.day }} of {{ today.month }}</h3>
    </div>

    <span class="tomorrow">
      <span>
        <p>Tomorrow</p>
        <p>{{ notToday(true) }}</p>
      </span>

      <img src="../assets/images/icon-arrow.png" alt="arrow to the right" />
    </span>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const today = ref({
  day: new Date().getDate(),
  month: new Date().toLocaleString("en-UK", { month: "long" }),
  dayWeek: new Intl.DateTimeFormat("en-UK", { weekday: "long" }).format(new Date()),
});

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
</script>

<style scoped>
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

section > div {
  width: 40%;
  text-align: center;
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
