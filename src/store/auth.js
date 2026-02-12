import { defineStore } from "pinia";
import { usersStore } from "./users";

export const authStore = defineStore("auth", {
  state() {
    return {
      currentUser: JSON.parse(sessionStorage.getItem("currentUser")) || null,
    };
  },

  getters: {
    isAuthenticated(state) {
      return !!state.currentUser;
    },
  },

  actions: {
    register(username, password, passwordR) {
      const useUsersStore = usersStore();
      const user = useUsersStore.getUser(username);

      if (!user) {
        // if user doesn't exist

        // if passwords match
        if (password == passwordR) {
          useUsersStore.addUser({
            username: username,
            password: password,
          });

          alert("Account created successfully");
          return true;

          // if they don't match
        } else {
          alert("The passwords don't match!");
          return false;
        }
      } else {
        alert("This username already exists!");
      }
    },

    login(username, password) {
      const useUsersStore = usersStore();
      const user = useUsersStore.getUser(username);

      if (user) {
        // if user exists

        // if passwords match
        if (user.password == password) {
          this.currentUser = user;
          sessionStorage.setItem("currentUser", JSON.stringify(user));
          return true;

          // if they don't match
        } else {
          alert("Password incorrect!");
          return false;
        }
      } else {
        // if user doesn't exist
        alert("The user doesn't exist!");
        return false;
      }
    },

    logout() {
      this.currentUser = null;
      sessionStorage.removeItem("currentUser");
    },
  },
});
