<template>
  <nav>
    <h1>Health <span>(still in development)</span></h1>

    <div class="right">
      <div class="desktop-menu">
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

      <div class="mobile-menu">
        <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
          <img
            class="hamburgerMenu"
            src="../assets/images/hamburger.png"
            alt="menu hamburger icon"
          />
        </button>

        <div v-if="isMenuOpen" class="dropdown">
          <ul>
            <li
              v-for="item in items"
              :key="item.key"
              @click="
                changePage(item.key);
                isMenuOpen = false;
              "
            >
              {{ item.label }}
            </li>
          </ul>

          <button class="btn-logout" @click="logout()">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { authStore } from "@/store/auth";

export default {
  data() {
    return {
      isMenuOpen: false,

      items: [
        { key: "Home", label: "Dashboard" },
        { key: "Week", label: "Week day" },
        { key: "Pantry", label: "Groceries" },
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
      this.$nextTick(() => {
        const activeElement = this.$el.querySelector(".active");
        if (activeElement) {
          this.moveSlider(activeElement);
        }
      });
    },
  },

  methods: {
    logout() {
      authStore().logout();
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
h1 span {
  color: red;
  font-size: 1.2rem;
}

nav {
  padding-left: 2rem;
  padding-right: 2rem;

  display: flex;
  justify-content: space-between;
}

.right {
  display: flex;
  align-items: center;
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu {
  display: none;
}

.hamburgerMenu {
  min-width: 0;
  width: 2.5rem;
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

  background-color: var(--red);
  color: #fff;
}
.btn-logout:hover {
  background-color: #ae2b2b;
}

@media screen and (max-width: 767px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: block;
    position: relative;
  }

  .hamburger {
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: 50px;

    background: white;
    border-radius: 10px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .dropdown ul {
    display: flex;
    flex-direction: column;
    background: none;
  }

  .dropdown li {
    padding: 0.5rem 1rem;
  }
}
</style>
