<template>
  <nav>
    <span>
      <img src="@/assets/images/logo.png" alt="app logo of an apple with a cardiac graphic" />
      <h1>NutriDash</h1>
    </span>

    <div class="desktop-menu">
      <ul>
        <div class="slider"></div>

        <li
          v-for="item in items"
          :key="item.key"
          :class="{
            active:
              $route.name === item.key && (!item.query || $route.query.type === item.query.type),
          }"
          @click="changePage(item, $event)"
        >
          {{ item.label }}
        </li>
      </ul>

      <button class="btn-logout" @click="logout()">Logout</button>
    </div>

    <div class="mobile-menu">
      <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
        <img class="hamburgerMenu" src="../assets/images/hamburger.png" alt="menu hamburger icon" />
      </button>

      <div v-if="isMenuOpen" class="dropdown">
        <ul>
          <li
            v-for="item in items"
            :key="item.key"
            @click="
              changePage(item);
              isMenuOpen = false;
            "
          >
            {{ item.label }}
          </li>
        </ul>

        <button class="btn-logout" @click="logout()">Logout</button>
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
        { key: "Week", label: "Activities" },
        { key: "Nutrition", label: "Water", query: { type: "Water" } },
        { key: "Nutrition", label: "Protein", query: { type: "Protein" } },
        { key: "Nutrition", label: "Calories", query: { type: "Calories" } },
        { key: "Ingredients", label: "Ingredients", query: { type: "Ingredients" } },
        { key: "Ingredients", label: "Pantry", query: { type: "Pantry" } },
        { key: "Ingredients", label: "Grocery List", query: { type: "Groceries" } },
        { key: "Recipes", label: "Recipes" },
      ],
    };
  },

  methods: {
    logout() {
      authStore().logout();
      this.$router.push({ name: "Auth" });
    },

    changePage(item) {
      console.log(item);

      if (item.query) {
        this.$router.push({
          name: `${item.key}`,
          query: item.query,
        });
      } else {
        this.$router.push({ name: `${item.key}` });
      }
    },
  },
};
</script>

<style scoped>
nav {
  position: sticky;
  top: 0;

  width: 100%;

  background-color: #fff;
  border-right: solid 0.1rem #dddddd;
}

span > img {
  width: 2rem;
}

.desktop-menu {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

ul {
  padding: 0;

  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

li {
  cursor: pointer;

  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%;

  list-style: none;
}

li:hover {
  color: #fff;
  background-color: var(--green);
}

.active {
  color: #fff;
  background-color: var(--green);
}

a {
  text-decoration: none;
}

.btn-logout {
  cursor: pointer;

  border: none;
  border-radius: 0.5rem;
  padding: 1rem;

  width: 100%;

  background-color: var(--red);
  color: #fff;
}
.btn-logout:hover {
  background-color: #ae2b2b;
}

.mobile-menu {
  display: none;
}

.hamburgerMenu {
  min-width: 0;
  width: 2.5rem;
}

@media screen and (max-width: 767px) {
  nav {
    padding-left: 2rem;
    padding-right: 2rem;

    display: flex;
    justify-content: space-between;
  }

  nav > span {
    display: flex;
    align-items: center;
  }

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

@media screen and (min-width: 768px) {
  nav {
    padding-left: 2rem;
    padding-right: 2rem;

    padding-top: 5rem;
    padding-bottom: 5rem;

    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  nav > span {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
