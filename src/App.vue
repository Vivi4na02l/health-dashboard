<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div id="app">
    <header v-if="!$route.meta.hideNavBar">
      <NavBar></NavBar>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
header {
  height: 20%;
}

main {
  height: 80%;
}
</style>
