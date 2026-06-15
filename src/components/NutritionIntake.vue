<template>
  <section
    class="backgroundColorShift"
    :class="{
      bgWater: componentList.name === 'Water',
      bgProtein: componentList.name === 'Protein',
      bgCalories: componentList.name === 'Calories',
    }"
  >
    <h4>{{ props.componentList.name }}</h4>

    <div class="body">
      <span class="subtitle">{{ protein.eaten }} {{ props.componentList.unit }}</span>

      <div class="progressBar">
        <div class="progressFill" :style="{ width: protein.eaten === 0 ? '2%' : `${percentage}%` }">
          <!-- progress bar filled -->
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="showPercentage" class="showingUserData">
          <span v-if="achieved">
            <p>Congratulations! You've reached your goal!</p>
          </span>

          <span v-else>
            <p>{{ percentage }}% achieved.</p>
          </span>
        </div>

        <div v-else>
          <span>
            <p>{{ protein.eaten }} / {{ protein.goal }}{{ props.componentList.unit }}</p>
          </span>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  componentList: {
    name: string;
    unit: string;
  };
}>();

const protein = ref({
  goal: 100,
  eaten: 0,
  left: 100,
});

const percentage = computed(() => {
  if (protein.value.goal === 0) {
    return 0;
  }

  return (protein.value.eaten / protein.value.goal) * 100;
});

const showPercentage = ref(false);

const achieved = computed(() => {
  if (protein.value.goal <= protein.value.eaten) {
    return true;
  } else {
    return false;
  }
});

let intervalTextCycle: number;
onMounted(() => {
  intervalTextCycle = window.setInterval(() => {
    showPercentage.value = !showPercentage.value;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalTextCycle);
});
</script>

<style scoped>
@import "@/assets/styles/MainPageComponents.css";

.bgCalories {
  background: linear-gradient(-45deg, #abffae, #b1ffa8, #c2ff77, #c0ff72);
}

.bgWater {
  background: linear-gradient(-45deg, #abfff0, #a8ffff, #77ffcf, #72ffc0);
}

.bgProtein {
  background: linear-gradient(-45deg, #ffffab, #ffd8a8, #ffc077, #ffff72);
}

.backgroundColorShift {
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progressBar {
  border-radius: 10rem;
  padding: 0.25rem;

  height: 2rem;

  background-color: #fff;
}

.progressFill {
  border-top-left-radius: 10rem;
  border-bottom-left-radius: 10rem;

  height: 100%;

  background-color: var(--green);
}
</style>
