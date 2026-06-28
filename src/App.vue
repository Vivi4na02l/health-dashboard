<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div id="app" :class="{ navbarIsActive: $route.meta.requiresAuth }">
    <NavBar v-if="!$route.meta.hideNavBar" />

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  #app.navbarIsActive {
    display: grid;
    grid-template-columns: min-content auto;
    overflow: hidden;
  }

  #app {
    overflow: hidden;
  }
}

#app {
  width: 100%;
  height: 100vh;
}

main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
