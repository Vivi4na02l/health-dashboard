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

          return { gotRegistered: true, msg: "Account created successfully" };

          // if they don't match
        } else {
          return { gotRegistered: false, msg: "The passwords don't match!" };
        }
      } else {
        return { gotRegistered: false, msg: "This username already exists!" };
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
          return { loginMade: true, msg: `Welcome, ${username}!` };

          // if they don't match
        } else {
          return { loginMade: false, msg: "Password incorrect!" };
        }
      } else {
        // if user doesn't exist
        return { loginMade: false, msg: "The user doesn't exist!" };
      }
    },

    logout() {
      this.currentUser = null;
      sessionStorage.removeItem("currentUser");
    },
  },
});
