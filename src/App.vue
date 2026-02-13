<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div id="app" :key="$route.fullPath">
    <header v-if="!$route.meta.hideNavBar">
      <NavBar />
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

header {
  height: 20%;
}

main {
  height: 80%;
}
</style>
