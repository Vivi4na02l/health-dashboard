<template>
  <section>
    <transition name="fade" mode="out-in">
      <!-- REGISTER -->
      <div v-if="isRegister" id="register">
        <h1>Create an account</h1>

        <form @submit.prevent="registerUser()">
          <label for="rUsername">Username:</label>
          <input type="text" id="rUsername" name="username" v-model="register.username" />

          <label for="rPassword">Password:</label>
          <input type="password" id="rPassword" name="password" v-model="register.password" />

          <label for="rPasswordR">Repeat password:</label>
          <input
            type="password"
            id="rPasswordR"
            name="password"
            v-model="register.passwordRepeat"
          />

          <p v-if="msg != ''" :class="isSuccess ? 'success' : 'error'">{{ msg }}</p>

          <button type="submit">Create account</button>
          <p class="toggle" @click="toggleAuth()">I already have an account.</p>
        </form>
      </div>

      <!-- USER -->
      <div v-else id="login">
        <h1>Log in</h1>

        <form @submit.prevent="loginUser()">
          <label for="lUsername">Username:</label>
          <input type="text" id="lUsername" name="username" v-model="login.username" />

          <label for="lPassword">Password:</label>
          <input type="password" id="lPassword" name="password" v-model="login.password" />

          <p v-if="msg != ''" :class="isSuccess ? 'success' : 'error'">{{ msg }}</p>

          <button type="submit">Log in</button>
          <p class="toggle" @click="toggleAuth()">I don't have an account.</p>
        </form>
      </div>
    </transition>
  </section>
</template>

<script>
import { authStore } from "@/store/auth";

export default {
  data() {
    return {
      isRegister: true,

      register: {
        username: "",
        password: "",
        passwordRepeat: "",
      },

      login: {
        username: "",
        password: "",
      },

      msg: "",
      isSuccess: null,
    };
  },

  methods: {
    toggleAuth() {
      this.msg = "";
      this.isSuccess = null;
      this.isRegister = !this.isRegister;
    },

    registerUser() {
      const useAuthStore = authStore();

      const result = useAuthStore.register(
        this.register.username,
        this.register.password,
        this.register.passwordRepeat,
      );

      this.msg = result.msg;
      this.isSuccess = result.gotRegistered;

      if (result.gotRegistered) {
        setTimeout(() => {
          this.toggleAuth();
        }, 1000);
      }
    },

    loginUser() {
      const useAuthStore = authStore();

      const result = useAuthStore.login(this.login.username, this.login.password);

      this.msg = result.msg;
      this.isSuccess = result.loginMade;

      if (result.loginMade) {
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/Authentication.css";
</style>
