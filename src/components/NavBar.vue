<template>
  <nav>
    <h1>Health</h1>

    <div>
      <ul>
        <div class="slider" :style="sliderStyle"></div>

        <li
          v-for="item in items"
          :key="item.key"
          :class="{ active: $route.name === item.key }"
          @click="changePage(item.key, $event)"
        >
          {{ item.label }}
        </li>
      </ul>

      <button class="btn-logout" @click="logout()">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { key: "Home", label: "Dashboard" },
        { key: "Week", label: "Week day" },
        { key: "Daily", label: "Daily intakes" },
        { key: "Pantry", label: "Pantry" },
        { key: "Shopping", label: "Shopping list" },
        { key: "Recipes", label: "Recipes" },
      ],

      sliderStyle: {
        width: "0px",
        transform: "translateX(0px)",
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.moveSlider(this.$el.querySelector(".active"));
    });
  },

  watch: {
    $route() {
      this.moveSlider(event.currentTarget);
    },
  },

  methods: {
    logout() {
      sessionStorage.removeItem("currentUser");
      this.$router.push({ name: "Auth" });
    },

    changePage(page) {
      this.$router.push({ name: `${page}` });
    },

    moveSlider(element) {
      const { offsetLeft, offsetWidth } = element;

      this.sliderStyle = {
        width: offsetWidth + "px",
        transform: `translateX(${offsetLeft}px)`,
      };
    },
  },
};
</script>

<style scoped>
nav {
  padding-left: 2rem;
  padding-right: 2rem;

  display: flex;
  justify-content: space-between;
}

div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

ul {
  position: relative;

  border-radius: 100px;
  padding: 0;

  display: flex;

  background-color: var(--white);

  overflow: hidden;
}

li {
  cursor: pointer;

  position: relative;
  padding: 1rem;

  list-style: none;
  z-index: 2;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;

  border-radius: 100px;

  color: #fff;
  background: #000;

  transition:
    transform 0.3s ease,
    width 0.3s ease;
  z-index: 1;
}

a {
  text-decoration: none;
}

.active {
  color: var(--white);
}

.btn-logout {
  cursor: pointer;

  border: none;
  border-radius: 100px;
  padding: 1rem;

  background-color: #c73c3c;
  color: #fff;
}
.btn-logout:hover {
  background-color: #ae2b2b;
}
</style>
