<template>
  <section class="component">
    <div id="day">
      <p>{{ today.day }} {{ today.month }}</p>
      <h2>{{ today.dayWeek }}</h2>
    </div>

    <div>
      <p>Stretching</p>
      <img src="../assets/images/icon-stretch.png" alt="woman doing stretching pose" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      today: {
        day: new Date().getDate(),
        month: new Date().toLocaleString("en-UK", { month: "long" }),
        dayWeek: new Intl.DateTimeFormat("en-UK", { weekday: "long" }).format(new Date()),
      },
    };
  },

  created() {
    // this.getTodaysDate();
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
