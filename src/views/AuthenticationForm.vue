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

          <button type="submit">Create account</button>
          <p @click="toggleAuth()">Já tenho uma conta.</p>
        </form>
      </div>

      <!-- USER -->
      <div v-else id="login">
        <h1>Log in</h1>

        <form @submit.prevent="loginUser()">
          <label for="lUsername">Username:</label>
          <input type="text" id="lUsername" name="username" v-model="login.username" />

          <label for="lPassword">Password:</label>
          <input type="password" id="lPassword" name="username" v-model="login.password" />

          <button type="submit">Log in</button>
          <p @click="toggleAuth()">Ainda não tenho uma conta.</p>
        </form>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isRegister: true,

      users: [],

      register: {
        username: "",
        password: "",
        passwordRepeat: "",
      },

      login: {
        username: "",
        password: "",
      },
    };
  },

  created() {
    this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
  },

  methods: {
    toggleAuth() {
      this.isRegister = !this.isRegister;
    },

    registerUser() {},

    loginUser() {
      this.$router.push({ name: "Home" });
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

p {
  cursor: pointer;

  text-align: center;
  text-decoration: underline;
}
p:hover {
  color: #117e00;
}
</style>
