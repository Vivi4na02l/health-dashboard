<template>
  <section class="component">
    <div id="day">
      <p>02 FEV</p>
      <h2>MONDAY</h2>
    </div>

    <div>
      <p>Stretching</p>
      <img src="../assets/images/icon-stretch.png" alt="woman doing stretching pose" />
    </div>
  </section>
</template>

<script lang="ts" setup></script>

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
