<template>
  <Transition name="notification">
    <div v-if="show" class="notification">
      {{ message }}
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.notification {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  z-index: 9999;

  background: var(--green);
  color: white;

  padding: 14px 22px;
  border-radius: 12px;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  font-weight: 500;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.35s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translate(-50%, 80px);
}

.notification-enter-to,
.notification-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
