<template>
  <section class="component water">
    <div>
      <h2>WATER</h2>
      <p>goal: 2000ml</p>
      <p>achieved: 500ml</p>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
section {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #77b9ff;
}

div {
  z-index: 1;
}

.water::before {
  content: "";
  width: 200%;
  height: 200%;
  background-color: #8ac3ff;
  position: absolute;
  top: -150%;
  left: -50%;
  border-radius: 40%;
  animation: anim 12s linear infinite;
}

@keyframes anim {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
