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
          <p class="toggle" @click="toggleAuth()">Já tenho uma conta.</p>
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
          <p class="toggle" @click="toggleAuth()">Ainda não tenho uma conta.</p>
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
/* FADE-IN AND OUT ANIMATION */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

section {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

div {
  width: 40%;
  border-radius: 2rem;
  padding: 5rem;

  background-color: var(--white);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
}

input {
  border: solid 0.1rem #cbcbcb;
  border-radius: 0.5rem;
  padding: 1rem;
}

button {
  cursor: pointer;

  margin-top: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;

  background-color: var(--green);
}
button:hover {
  background-color: #6de15b;
}

.toggle {
  cursor: pointer;

  text-align: center;
  text-decoration: underline;
}
.toggle:hover {
  color: var(--dark-green);
}

.success {
  color: var(--dark-green);
}
.error {
  color: var(--red);
}
</style>
