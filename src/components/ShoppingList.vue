<template>
  <section class="component">
    <h2>SHOPPING LIST</h2>
    <p>You haven't added ingredients to your shopping list yet...</p>
    <button>Add to list</button>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--light-green);
}
</style>
