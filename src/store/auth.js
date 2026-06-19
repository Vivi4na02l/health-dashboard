import { defineStore } from "pinia";
import { usersStore } from "./users";

export const authStore = defineStore("auth", {
  state() {
    return {
      currentUsername: JSON.parse(sessionStorage.getItem("currentUsername")) || null,
    };
  },

  getters: {
    isAuthenticated(state) {
      return !!state.currentUsername;
    },

    currentUserData() {
      const users = usersStore();
      return users.getUser(this.currentUsername);
    },
  },

  actions: {
    register(username, password, passwordR, today) {
      const users = usersStore();
      const user = users.getUser(username);

      if (!user) {
        // if user doesn't exist

        // if passwords match
        if (password == passwordR) {
          // date of account creation
          let creationDate;
          if (today.month <= 9) {
            let month = "0" + today.month;
            creationDate = today.day + "" + month + "" + today.year;
          } else {
            creationDate = today.day + "" + today.month + "" + today.year;
          }

          users.addUser(username, password, creationDate);

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
      const users = usersStore();
      const user = users.getUser(username);

      if (user) {
        // if user exists

        // if passwords match
        if (user.password == password) {
          this.currentUsername = username;
          sessionStorage.setItem("currentUsername", this.currentUsername);
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
      this.currentUsername = null;
      sessionStorage.removeItem("currentUsername");
    },
  },
});
