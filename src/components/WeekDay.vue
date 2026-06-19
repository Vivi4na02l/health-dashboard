<template>
  <section class="component">
    <div id="day">
      <p>{{ today.day }} of {{ today.month }}</p>
      <p class="subtitle">{{ today.dayWeek }}</p>
    </div>

    <div v-if="!getWeek[today.dayWeek.toLocaleLowerCase()].length">
      <img src="../assets/images/icon-lazy.png" alt="lazy animal" />
      <p>You have no activities assigned for {{ today.dayWeek }}s.</p>
    </div>

    <div v-else>
      <Transition name="fade" mode="out-in">
        <div :key="currentActivity?.activity">
          <img :src="currentActivity?.img" :alt="'person ' + currentActivity?.activity" />
        </div>
      </Transition>

      <p v-if="getWeek[today.dayWeek.toLocaleLowerCase()].length == 1">
        Today is day of <span class="activity">{{ currentActivity?.activity }}</span
        >!
      </p>

      <p v-else>
        You have
        <span class="activity">{{ getWeek[today.dayWeek.toLocaleLowerCase()].length }}</span>
        activities assigned for today!
      </p>
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
    clearInterval(interval);
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
@import "@/assets/styles/MainPageComponents.css";

section {
  display: grid;
  grid-template-columns: 1fr 2fr;

  background-color: #fff;
}

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

#day {
  border-right: solid 0.1rem #000;
}

.activity {
  text-decoration: underline;
}

@media screen and (max-width: 399px) {
  img {
    min-width: 0;
    width: 7rem;
  }
}

@media screen and (min-width: 400px) and (max-width: 767px) {
  img {
    min-width: 0;
    width: 10rem;
  }
}

@media screen and (min-width: 768px) {
  img {
    min-width: 0;
    width: 15rem;
  }
}
</style>
