<template>
  <section class="component">
    <div id="day">
      <p>{{ today.day }} {{ today.month }}</p>
      <h2>{{ today.dayWeek }}</h2>
    </div>

    <div v-if="!getWeek[today.dayWeek.toLocaleLowerCase()].length">
      <img src="../assets/images/icon-lazy.png" alt="lazy animal" />
      <p>You have no activities assign for {{ today.dayWeek }}s.</p>
    </div>

    <div v-else>
      <Transition name="fade" mode="out-in">
        <div :key="currentActivity?.activity">
          <img :src="currentActivity?.img" :alt="'person ' + currentActivity?.activity" />
          <p>Today is day of {{ currentActivity?.activity }}!</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script>
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

import stretchingImg from "@/assets/images/icon-stretching.png";
import climbingImg from "@/assets/images/icon-climbing.png";
import runningImg from "@/assets/images/icon-running.png";
import gymImg from "@/assets/images/icon-gym.png";

const activityImages = {
  stretching: stretchingImg,
  climbing: climbingImg,
  running: runningImg,
  gym: gymImg,
};

let interval = null;

export default {
  data() {
    return {
      today: {
        day: new Date().getDate(),
        month: new Date().toLocaleString("en-UK", { month: "long" }),
        dayWeek: new Intl.DateTimeFormat("en-UK", { weekday: "long" }).format(new Date()),
      },

      currentIndex: 0,
    };
  },

  mounted() {
    const day = this.getWeek[this.today.dayWeek.toLocaleLowerCase()];

    interval = setInterval(() => {
      if (day.length > 1) {
        if (this.currentIndex != day.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      }
    }, 5000);
  },

  unmounted() {
    this.currentIndex = 0;
  },

  computed: {
    user() {
      const auth = authStore();
      return usersStore().getUser(auth.currentUsername);
    },

    getWeek() {
      if (!this.user) {
        return null;
      }

      return this.user.week;
    },

    currentActivity() {
      const day = this.getWeek[this.today.dayWeek.toLocaleLowerCase()];

      console.log(day);

      if (!day.length) {
        return null;
      }

      const activityName = day[this.currentIndex];

      return { activity: activityName, img: activityImages[activityName] };
    },
  },

  methods: {
    getTodaysDate() {
      const todayDate = new Date();
      // const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"]

      this.today.dayWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(todayDate);
      console.log(this.today.dayWeek);

      // this.today.day = ;
    },
  },
};
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr 2fr;

  padding: 1rem;

  background-color: var(--light-green);
}

section div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  min-width: 0;
  width: 15rem;
}

#day {
  border-right: solid 0.1rem #000;
}
</style>
